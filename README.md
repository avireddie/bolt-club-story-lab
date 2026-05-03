# Bolt Club Story Lab

Docs and prompts for **print-ready Bolt Club reading missions**—stories for Soham that are fun and mischievous, with reading comprehension and physical logic built in. The full spec (pedagogy, characters, non-negotiable rules, output format) lives in one place so the Custom GPT and you stay aligned.

## Start here

| Step | What to open |
|------|----------------|
| 1. **Read the rules** (or upload to a Custom GPT as Knowledge) | [**instructions.md**](instructions.md) |
| 2a. **Seed → PDF (local pipeline)** | `npm install`, `.env` with `OPENAI_API_KEY`, then **`npm run mission:pdf -- --seed "…"`** — [**scripts/README.md**](scripts/README.md) |
| 2b. **Generate a mission (chat / Custom GPT)** | [**prompts/generate-story.md**](prompts/generate-story.md) (see [**prompts/README.md**](prompts/README.md)) |
| (Optional) **More seeds** | [**prompts/generate-seeds.md**](prompts/generate-seeds.md) → append rows to [**seeds.md**](seeds.md) |
| 3. **Review the output** | [**qa-checklist.md**](qa-checklist.md) |

## Other files

| File | Use |
|------|-----|
| [**story-template.md**](story-template.md) | Plan a mission before you generate |
| [**seeds.md**](seeds.md) | Story seeds and your seed bank |
| [**regression-tests.md**](regression-tests.md) | Repeatable checks after you change the spec or GPT |
| [**test-log.md**](test-log.md) | Log generation runs |
| [**failed-examples.md**](failed-examples.md) | Bad outputs + follow-ups |
| [**changelog.md**](changelog.md) | What changed in this repo |

**Navigation:** [`instructions.md`](instructions.md) includes a “Where to find what” table with the same links in context.

**Automated B&W panels:** [`scripts/README.md`](scripts/README.md) (`npm run generate:panels:lantern`) writes PNGs into `printables/images/` for the bedtime HTML.

**Chapter PDF layout:** [`printables/css/bolt-club-chapter-pdf.css`](printables/css/bolt-club-chapter-pdf.css) + [`printables/bolt-club-chapter-template.html`](printables/bolt-club-chapter-template.html) replicate the big-panel-then-text look (print → Save as PDF).

**Naming:** Each mission gets its own `*-bedtime.html` (e.g. [`printables/lantern-parcel-chest-3-bedtime.html`](printables/lantern-parcel-chest-3-bedtime.html)); shared **image style** for every seed lives in [`printables/panel-manifests/bolt-club-panel-defaults.json`](printables/panel-manifests/bolt-club-panel-defaults.json) — see [`printables/README.md`](printables/README.md).

## Custom GPT

Upload [**instructions.md**](instructions.md) as Knowledge. In the short Instructions field, tell the model to follow that file. Optional: add [**qa-checklist.md**](qa-checklist.md) if you want review criteria available in chat.

**Images:** Most Custom GPT chats are **text-only**—the model outputs **panel art briefs** you can draw from or feed to another illustration tool; see **instructions.md → Illustrations and Custom GPT**.
