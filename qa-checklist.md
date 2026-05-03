# Bolt Club — QA checklist (quick review)

Use **this file** when you want a **fast pass/fail** pass on a finished story.

**Full rules, examples, pedagogy, and GPT behavior** live in [`instructions.md`](instructions.md). Do not duplicate that doc here — if a checkbox fails, open the linked section and fix against the spec.

---

## Where to go for what

| You want… | Document |
|-----------|----------|
| Complete spec (characters, stakes, non-negotiables, mechanical logic, output order, debrief, bedtime, parent phrases) | [`instructions.md`](instructions.md) |
| **This page** — short checklist only | `qa-checklist.md` |
| Draft / structure for a new story | [`story-template.md`](story-template.md) |
| Log a bad generation | [`failed-examples.md`](failed-examples.md) |
| Log a test run | [`test-log.md`](test-log.md) |

---

## Review checklist

Tick when satisfied. Any fail → revise before sharing with Soham; details are always in [`instructions.md`](instructions.md).

### A. Core logic & reveal

*Refs: [Non-negotiable rules](instructions.md#non-negotiable-rules) — No hidden logic, Reveal must be simple*

- [ ] Mystery is clear; important clues exist in the text **before** they matter for the reveal.
- [ ] Reveal works in **2–3 steps** with no hidden assumptions.
- [ ] Child can answer: what happened, why, how they knew, **which line proves it**.

### B. Mechanical logic / no teleport

*Refs: [Mechanical logic / no teleport](instructions.md#mechanical-logic-no-teleport)*

- [ ] No physical beat works by “magic”; **Action → mechanism → result** each have a proof line (or fail).

### C. Soham’s gadget

*Refs: [Gadget must matter](instructions.md#gadget-must-matter)*

- [ ] Soham builds or upgrades something that **changes the plot** (not decoration).

### D. Comprehension & debrief

*Refs: [Reading skills](instructions.md#reading-skills-to-embed), [Mission Debrief](instructions.md#mission-debrief-page), [Variety](instructions.md#variety-antiformula)*

- [ ] Gist + recap + **reading razor** (Exact Words **or** equivalent per spec) + threading + inference are present and fair.
- [ ] Every debrief answer ties to an **exact proof line** from the story.

### E. Tone

*Refs: [Motivation & tone](instructions.md#motivation-tone)*

- [ ] Fun, cool, mischievous — **not** babyish, worksheet-like, or moral-science-like.

### F. Optional deep pass (editor failure modes)

*Refs: [Comprehension QA Editor](instructions.md#comprehension-qa-editor)*

- [ ] Skim the comprehension QA failure modes; if any apply, revise (#13–17 include quota, formula fatigue, dead pulse, color spine, gadget unreadability).

---

## Verdict

- [ ] **Pass** — ship / print
- [ ] **Fail** — revise before showing (see [`instructions.md`](instructions.md))
- [ ] **Fail** — note in [`failed-examples.md`](failed-examples.md) if you are tracking regressions
