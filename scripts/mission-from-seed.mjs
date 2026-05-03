#!/usr/bin/env node
/**
 * Seed → story JSON (OpenAI) → bedtime HTML + panel manifest → images → PDF
 *
 *   node scripts/mission-from-seed.mjs --seed "Mystery: ... Place: ..."
 *   node scripts/mission-from-seed.mjs --seed-file path/to/seed.txt
 *
 * Env: OPENAI_API_KEY, optional OPENAI_MODEL (default gpt-4o)
 *
 * Flags:
 *   --skip-images     do not call image API
 *   --skip-pdf        do not run Puppeteer
 *   --out-slug x      force output slug (kebab-case)
 *   --with-instructions  append first ~15k chars of instructions.md to the user message
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import OpenAI from "openai";
import dotenv from "dotenv";
import { slugify } from "./lib/slugify.mjs";
import { renderBedtimeHtml } from "./lib/render-bedtime-html.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(repoRoot, ".env") });

function argValue(name) {
  const i = process.argv.indexOf(name);
  if (i === -1) return null;
  return process.argv[i + 1] ?? null;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

const JSON_INSTRUCTIONS = `Return a single JSON object with this exact shape (no extra keys at root except optional "logicMap" string):
{
  "slug": "kebab-case-slug",
  "missionTitle": "Title in Title Case",
  "tagline": "One line, e.g. A printable story for Soham...",
  "storyPages": [
    {
      "chapterTitle": "Short chapter title",
      "panelArtBrief": "2-4 sentences: setting, who, action, camera, mood — for the figcaption under the art.",
      "imagePrompt": "One detailed paragraph for image generation: scene, Indian kids, props, wide/medium/close, mood. No speech bubbles.",
      "paragraphs": [
        { "type": "p", "text": "Story sentence or paragraph as one string." },
        { "type": "sign", "text": "Exact text of a sign, card, or label (own line in the story)." }
      ]
    }
  ],
  "debrief": {
    "items": [
      { "dt": "Case gist", "dd": "Question for the child (mission-specific)." }
    ],
    "parentKey": {
      "gist": "Answer for parents.",
      "recap": "Answer.",
      "evidence": "Answer with quoted proof line if possible.",
      "trap": "Answer.",
      "inference": "Answer."
    }
  }
}

Rules:
- Exactly 4 objects in storyPages (standard packet).
- debrief.items should include these sections in order: Case gist; Three-sentence recap; Evidence hunt; Tiny Logic Word Trap (or your reading-razor label); Sentence threading; Detective inference; Build tomorrow's mission — each with mission-specific dd text.
- paragraphs: 6-10 blocks per page total (mix type p and sign as needed).`;

function validateMission(m) {
  if (!m.missionTitle) throw new Error("JSON missing missionTitle");
  if (!Array.isArray(m.storyPages) || m.storyPages.length !== 4) {
    throw new Error("storyPages must have exactly 4 entries (standard packet)");
  }
  m.storyPages.forEach((p, i) => {
    if (!p.imagePrompt || !p.panelArtBrief) throw new Error(`storyPages[${i}] needs imagePrompt and panelArtBrief`);
    if (!Array.isArray(p.paragraphs) || p.paragraphs.length < 4) {
      throw new Error(`storyPages[${i}] needs paragraphs array (at least 4 blocks)`);
    }
  });
  if (!m.debrief?.items?.length) throw new Error("debrief.items required");
  if (!m.debrief?.parentKey) throw new Error("debrief.parentKey required");
}

async function main() {
  const seed =
    argValue("--seed") ??
    (argValue("--seed-file") ? fs.readFileSync(path.resolve(repoRoot, argValue("--seed-file")), "utf8") : null);

  if (!seed?.trim()) {
    console.error(
      "Provide --seed \"...\" or --seed-file path/to/seed.txt"
    );
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY in .env");
    process.exit(1);
  }

  const systemPath = path.join(repoRoot, "prompts/mission-from-seed-system.md");
  const system = fs.readFileSync(systemPath, "utf8");

  let userMsg = `Seed:\n${seed.trim()}\n\n${JSON_INSTRUCTIONS}`;

  if (hasFlag("--with-instructions")) {
    const insPath = path.join(repoRoot, "instructions.md");
    const full = fs.readFileSync(insPath, "utf8");
    userMsg += `\n\n---\nAuthoring reference (excerpt of instructions.md):\n${full.slice(0, 15000)}`;
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o";
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log(`Calling ${model}…`);

  const completion = await openai.chat.completions.create({
    model,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: userMsg },
    ],
    temperature: 0.65,
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("Empty model response");

  let mission;
  try {
    mission = JSON.parse(raw);
  } catch {
    console.error("Model did not return valid JSON. Raw:\n", raw.slice(0, 2000));
    process.exit(1);
  }

  const forcedSlug = argValue("--out-slug");
  if (forcedSlug) mission.slug = slugify(forcedSlug);
  if (!mission.slug) mission.slug = slugify(mission.missionTitle ?? "bolt-club-mission");

  validateMission(mission);

  const slug = mission.slug;
  const htmlPath = path.join(repoRoot, "printables", `${slug}-bedtime.html`);
  const manifestPath = path.join(repoRoot, "printables/panel-manifests", `${slug}.json`);
  const pdfPath = path.join(repoRoot, "printables", `${slug}.pdf`);

  const html = renderBedtimeHtml(mission, { includePipelineNote: true });
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log("Wrote", path.relative(repoRoot, htmlPath));

  const panels = mission.storyPages.map((pg, i) => ({
    file: `${slug}-page${i + 1}.png`,
    prompt: pg.imagePrompt.trim(),
  }));

  const manifest = {
    comment: `Generated from seed — ${new Date().toISOString().slice(0, 10)}`,
    panels,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Wrote", path.relative(repoRoot, manifestPath));

  const genImg = path.join(repoRoot, "scripts/generate-panel-images.mjs");

  if (!hasFlag("--skip-images")) {
    console.log("\nGenerating panel images…");
    const r = spawnSync(process.execPath, [genImg, "--manifest", manifestPath], {
      cwd: repoRoot,
      stdio: "inherit",
      env: process.env,
    });
    if (r.status !== 0) {
      console.error("Image generation failed; fix errors or run with --skip-images");
      process.exit(r.status ?? 1);
    }
  }

  if (!hasFlag("--skip-pdf")) {
    const pdfScript = path.join(repoRoot, "scripts/html-to-pdf.mjs");
    console.log("\nWriting PDF…");
    const r2 = spawnSync(process.execPath, [pdfScript, "--input", path.relative(repoRoot, htmlPath), "--output", path.relative(repoRoot, pdfPath)], {
      cwd: repoRoot,
      stdio: "inherit",
      env: process.env,
    });
    if (r2.status !== 0) {
      console.error("PDF failed (install puppeteer: npm install puppeteer). HTML and images may still be ready.");
      process.exit(r2.status ?? 1);
    }
  }

  console.log("\nDone.");
  console.log(`  HTML:  printables/${slug}-bedtime.html`);
  console.log(`  PDF:   printables/${slug}.pdf`);
}

main().catch((e) => {
  console.error(e?.message ?? e);
  process.exit(1);
});
