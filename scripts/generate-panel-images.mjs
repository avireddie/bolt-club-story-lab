#!/usr/bin/env node
/**
 * Generates black-and-white panel PNGs from a JSON manifest using OpenAI Images API.
 *
 * One-time setup:
 *   cp .env.example .env
 *   # put OPENAI_API_KEY in .env
 *
 * Run:
 *   npm install
 *   npm run generate:panels -- --manifest printables/panel-manifests/lantern-parcel-chest-3.json
 *
 * Shared image style: printables/panel-manifests/bolt-club-panel-defaults.json (merged into every manifest).
 * Output: printables/images/<file> for each panel.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(repoRoot, ".env") });

function argValue(name) {
  const i = process.argv.indexOf(name);
  if (i === -1) return null;
  return process.argv[i + 1] ?? null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Merges bolt-club-panel-defaults with the mission manifest.
 * Mission keys win. `panels` always come from the mission file only.
 */
function mergeManifest(defaults, mission) {
  const mPanels = mission.panels;
  if (!Array.isArray(mPanels)) {
    return { ...defaults, ...mission };
  }
  const { panels: _dPanels, ...restDefaults } = defaults;
  return { ...restDefaults, ...mission, panels: mPanels };
}

async function main() {
  const manifestPath = path.resolve(
    repoRoot,
    argValue("--manifest") ?? "printables/panel-manifests/lantern-parcel-chest-3.json"
  );

  const defaultsPath = path.resolve(
    repoRoot,
    argValue("--defaults") ?? "printables/panel-manifests/bolt-club-panel-defaults.json"
  );

  if (!process.env.OPENAI_API_KEY) {
    console.error(
      "Missing OPENAI_API_KEY. Copy .env.example to .env and add your key, or export it in the shell."
    );
    process.exit(1);
  }

  const raw = fs.readFileSync(manifestPath, "utf8");
  const missionOnly = JSON.parse(raw);
  const defaults = readJsonIfExists(defaultsPath) ?? {};
  const manifest = mergeManifest(defaults, missionOnly);

  const styleSuffix = manifest.styleSuffix ?? "";
  const model = manifest.imageModel ?? "dall-e-3";
  const size = manifest.imageSize ?? "1792x1024";
  const outputSubdir = manifest.outputSubdir ?? "images";
  const outputBase = manifest.outputBase ?? "printables";
  const outDir = path.join(repoRoot, outputBase, outputSubdir);

  fs.mkdirSync(outDir, { recursive: true });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const panels = manifest.panels;
  if (!Array.isArray(panels) || panels.length === 0) {
    console.error("Manifest has no panels[] array.");
    process.exit(1);
  }

  console.log(`Manifest: ${path.relative(repoRoot, manifestPath)}`);
  if (fs.existsSync(defaultsPath)) {
    console.log(`Defaults: ${path.relative(repoRoot, defaultsPath)}`);
  }
  console.log(`Output:   ${path.relative(repoRoot, outDir)}`);
  console.log(`Model:    ${model}  size: ${size}\n`);

  for (let i = 0; i < panels.length; i++) {
    const p = panels[i];
    const file = p.file;
    const scene = p.prompt ?? p.scene;
    if (!file || !scene) {
      console.error(`Panel ${i}: missing "file" or "prompt"`);
      process.exit(1);
    }

    const fullPrompt = [scene.trim(), styleSuffix.trim()].filter(Boolean).join("\n\n");

    process.stdout.write(`[${i + 1}/${panels.length}] ${file} … `);

    let b64;
    try {
      const res = await openai.images.generate({
        model,
        prompt: fullPrompt,
        n: 1,
        size,
        response_format: "b64_json",
      });
      b64 = res.data?.[0]?.b64_json;
      if (!b64) {
        const url = res.data?.[0]?.url;
        if (url && typeof fetch === "function") {
          const imgRes = await fetch(url);
          const buf = Buffer.from(await imgRes.arrayBuffer());
          const outPath = path.join(outDir, file);
          fs.writeFileSync(outPath, buf);
          console.log(`saved`);
          await sleep(1200);
          continue;
        }
        throw new Error("No b64_json or url in API response");
      }
    } catch (e) {
      console.error("\n", e?.message ?? e);
      process.exit(1);
    }

    const outPath = path.join(outDir, file);
    fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
    console.log(`saved`);

    await sleep(1200);
  }

  console.log(
    "\nDone. PNGs are in " +
      path.relative(repoRoot, outDir) +
      ". Open your mission’s `*-bedtime.html` in a browser when those filenames match its `<img>` tags."
  );
}

main();
