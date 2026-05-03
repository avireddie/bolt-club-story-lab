# Printables — bedtime PDFs and panels

## Naming (why “lantern html”?)

**`lantern-parcel-chest-3-bedtime.html`** is named after **that mission’s slug** (*The Lantern in Parcel Chest 3*). It is **not** the name of the art style.

For each new seed/mission, add a **new** HTML file, for example:

- `upside-down-wheel-bedtime.html`
- `library-lift-wrong-floor-bedtime.html`

Use the **same layout and picture style for every mission:**

| What | File |
|------|------|
| Page layout (banner, hero panel, text column) | [`css/bolt-club-chapter-pdf.css`](css/bolt-club-chapter-pdf.css) |
| **Shared image style** for every mission | [`panel-manifests/bolt-club-panel-defaults.json`](panel-manifests/bolt-club-panel-defaults.json) |
| Starter HTML shell | [`bolt-club-chapter-template.html`](bolt-club-chapter-template.html) |

Per mission you only maintain **story-specific** files: `*-bedtime.html`, `panel-manifests/<slug>.json` (usually **panels[] only** — defaults supply the style), and PNGs under `images/`.

## Seed → PDF (full system)

From repo root (after `npm install` and `.env`):

```bash
npm run mission:pdf -- --seed "Your seed text…"
```

Produces `printables/<slug>-bedtime.html`, panel PNGs, and `printables/<slug>.pdf`. See [**scripts/README.md**](../scripts/README.md).

## Panel generation (manifest only)

From repo root: `npm run generate:panels -- --manifest printables/panel-manifests/<your-mission>.json`

Defaults merge automatically from `bolt-club-panel-defaults.json` (see [`scripts/README.md`](../scripts/README.md)).
