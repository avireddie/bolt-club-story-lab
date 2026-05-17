# Scripts — Seed → PDF pipeline

End-to-end flow:

**Seed** → Chat model writes structured JSON → **`printables/<slug>-bedtime.html`** + **`panel-manifests/<slug>.json`** → panel images (same house style as [`bolt-club-panel-defaults.json`](../printables/panel-manifests/bolt-club-panel-defaults.json)) → **`printables/<slug>.pdf`**.

## One-time setup

1. [Node.js](https://nodejs.org/) LTS.
2. Repo root: `npm install` (installs `openai`, `dotenv`, `puppeteer` — Puppeteer downloads Chromium for PDF).
3. Copy `.env.example` to `.env`: set **`OPENAI_API_KEY`** (chat + images billing per OpenAI).
4. Optional: **`OPENAI_MODEL`** (default `gpt-4o`).

## Run: seed in → PDF out

```bash
npm run mission:pdf -- --seed "Mystery: … Place: … Stakes: … Gadget: …"
```

Or:

```bash
npm run mission:pdf -- --seed-file path/to/seed.txt
```

Outputs (same slug derived from `missionTitle` unless you pass **`--out-slug my-slug`**):

| Artifact | Path |
|----------|------|
| Printable HTML | `printables/<slug>-bedtime.html` |
| Panel manifest | `printables/panel-manifests/<slug>.json` |
| PNG panels | `printables/images/<slug>-page1.png` … `page5.png` |
| PDF | `printables/<slug>.pdf` |

### Flags

| Flag | Meaning |
|------|--------|
| `--skip-images` | Only HTML + manifest (no DALL·E calls) |
| `--skip-pdf` | HTML + images, no Puppeteer PDF |
| `--out-slug x` | Force filename slug |
| `--with-instructions` | Append start of `instructions.md` to the writer prompt (longer, stricter) |

### PDF only (existing HTML)

```bash
npm run html:pdf -- --input printables/my-mission-bedtime.html --output printables/my-mission.pdf
```

### Writer prompt files

- System rules: [`prompts/mission-from-seed-system.md`](../prompts/mission-from-seed-system.md)
- Orchestrator: `scripts/mission-from-seed.mjs`
- HTML renderer: `scripts/lib/render-bedtime-html.mjs`

---

## Panel images only (existing manifest)

After a story exists with panel filenames in `printables/…bedtime.html`, you can generate PNGs with:

```bash
npm run generate:panels -- --manifest printables/panel-manifests/<slug>.json
```

Or the Lantern example:

```bash
npm run generate:panels:lantern
```

## Chapter PDF layout (Upside-Down Wheel style)

Printable pages use **`printables/css/bolt-club-chapter-pdf.css`**: series banner, all-caps mission title, **Page N: chapter** line, thick-bordered hero panel (~top half), then justified story text. Panel art briefs are hidden when you print (clean PDF). Copy **`printables/bolt-club-chapter-template.html`** for hand-built missions.

## Same picture style on every new mission

**`printables/panel-manifests/bolt-club-panel-defaults.json`** holds the shared **Bolt Club** look (manga-style B&W, model, size, output folders). The generator **merges** it with each mission manifest automatically.

Each mission JSON usually lists only **`panels[]`** (filenames + scene prompts). To change the house style for **all** stories, edit **`bolt-club-panel-defaults.json`** once.

Optional per-mission overrides: put `styleSuffix`, `imageModel`, or `imageSize` in that mission’s JSON — they override defaults.

(`imageSize` must match [supported sizes](https://platform.openai.com/docs/guides/images) for the chosen model.)

Optional CLI for panel script: `--defaults path/to/other-defaults.json`
