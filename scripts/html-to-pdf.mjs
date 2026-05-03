#!/usr/bin/env node
/**
 * Renders a printables HTML file to a PDF (A4) using headless Chrome.
 *
 *   node scripts/html-to-pdf.mjs --input printables/my-mission-bedtime.html --output printables/my-mission.pdf
 *
 * Requires: npm install puppeteer
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

function argValue(name) {
  const i = process.argv.indexOf(name);
  if (i === -1) return null;
  return process.argv[i + 1] ?? null;
}

async function main() {
  const input = argValue("--input");
  const output = argValue("--output");
  if (!input || !output) {
    console.error("Usage: node scripts/html-to-pdf.mjs --input <printables/...-bedtime.html> --output <printables/....pdf>");
    process.exit(1);
  }

  const inputPath = path.isAbsolute(input) ? input : path.join(repoRoot, input);
  const outputPath = path.isAbsolute(output) ? output : path.join(repoRoot, output);

  if (!fs.existsSync(inputPath)) {
    console.error("Input not found:", inputPath);
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.error("Install puppeteer: npm install puppeteer");
    process.exit(1);
  }

  const fileUrl = pathToFileURL(inputPath).href;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto(fileUrl, { waitUntil: "load", timeout: 120000 });
    // Let local images decode
    await new Promise((r) => setTimeout(r, 400));
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "14mm", left: "12mm" },
    });
    console.log("Wrote", path.relative(repoRoot, outputPath));
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
