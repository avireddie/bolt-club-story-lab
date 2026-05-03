# Generate new mission seeds (for agents / chat)

Use with **Cursor agent**, **ChatGPT**, or your **Custom GPT** (with [`instructions.md`](../instructions.md) in context).  
Goal: invent **new** Bolt Club story seeds that match tone and stakes, then add them to [`seeds.md`](../seeds.md) in the **Your seed bank** table.

## Context the model must follow

1. Read [`instructions.md`](../instructions.md) — **Story stakes & scale**, **Motivation & tone**, **The Bolt Club (characters)**. Seeds should support a mystery **bigger than a tiny craft problem**; Soham’s gadget is usually a **tool inside a bigger case**.
2. Read [`seeds.md`](../seeds.md) — **Seed format**, **Starter seeds** (do not copy verbatim; vary place, mystery angle, and gadget), and **Your seed bank** (do not duplicate existing rows).
3. Mix **tiers** across the batch: some **everyday**, some **medium**, some **bigger special episode** (see `instructions.md` for examples of each tier).

## User request (fill in, then run)

- **How many new seeds:** (e.g. 5, 10, 15)
- **Optional focus:** (e.g. “only school,” “include one chase-heavy,” “favour medium tier”)
- **Optional avoid:** (e.g. “no zoo this batch”)

## What to output

For **each** new seed, provide:

1. **Name** — short label (2–4 words) for the table, unique in the bank.  
2. **Mystery** — one line: what is wrong / missing / strange.  
3. **Place / setting** — specific, often Indian-familiar + imaginative (corridor, bus, fair, camp, market, etc.).  
4. **Tier** — `everyday` | `medium` | `bigger special episode`.  
5. **Gadget or build (Soham)** — one line; must be plausibly **plot-useful** (not a random prop).  
6. **Notes** (optional) — e.g. which reading skill to stress, or a non-negotiable to watch (mechanical logic, etc.).

Then output a **markdown table block** with one row per seed, **columns exactly:**

```text
| Name | Mystery | Place | Tier | Gadget / build | Used / date | Notes |
```

- **Used / date** — leave empty `| |` for the user to fill.  
- **Append** these rows under **Your seed bank** in `seeds.md` (or hand the table to the user to paste).

## Quality bar

- **Fun, cool, mischievous** — not babyish, worksheet, or moral-science tone.  
- **Variety** — not all “missing object”; mix **mystery shapes** (timetable tension, swapped labels, rumor vs fact, conflicting accounts—not only chalk trails + misread notices per [`instructions.md` — Variety](../instructions.md#variety-antiformula)).  
- **Kid-scale stakes** — time pressure, unfair blame, rumor, dignity, rivalry—not only recovering a prop.  
- **Place texture** — seed **named/sensory** locations and gear (not only “the red X and the blue Y”) per [`instructions.md` — Setting and props](../instructions.md#setting-props-worksheet).  
- **Bolt Club** — seeds should allow Kabir/Rohan/Tara/Meera beats without naming every seed (the story prompt will).  
- **No duplicates** of starter-list mysteries unless **place + gadget + twist** are clearly different.

## Do not

- Repeat starter seeds from `seeds.md` with only a synonym changed.  
- Propose realistic harm, weapons, or dangerous step-by-step traps.  
- Output rough drafts of full stories — **only seed rows**.
