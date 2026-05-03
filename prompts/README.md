# Prompts

Ready-made text you can paste into Cursor, ChatGPT, or your Custom GPT.  
The full Bolt Club spec is in [`instructions.md`](../instructions.md).

| Prompt | Use when |
|--------|----------|
| [**generate-story.md**](generate-story.md) | You have a seed and want a full print-ready mission |
| [**generate-seeds.md**](generate-seeds.md) | You want new mission ideas as rows for [`seeds.md`](../seeds.md) (tiers, places, gadgets) |
| [**qa-review-story.md**](qa-review-story.md) | You want a strict QA review of a draft |
| [**patch-instructions.md**](patch-instructions.md) | A generation failed and you want the smallest fix to `instructions.md` |

**Seed → PDF (automated):** [`scripts/README.md`](../scripts/README.md) — `npm run mission:pdf -- --seed "…"`.

**Printable + panels (manual):** Build `{slug}-bedtime.html` from [`printables/bolt-club-chapter-template.html`](../printables/bolt-club-chapter-template.html). Shared **picture style** for every seed is [`printables/panel-manifests/bolt-club-panel-defaults.json`](../printables/panel-manifests/bolt-club-panel-defaults.json) — see [`printables/README.md`](../printables/README.md).

**In the IDE:** open one of the `.md` files above. If you open the `prompts` folder itself, the editor cannot show it as a document — use the file tree or these links.
