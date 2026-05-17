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
| Seed → PDF pipeline (local scripts) | [`scripts/README.md`](scripts/README.md) |
| Log a bad generation | [`failed-examples.md`](failed-examples.md) |
| Log a test run | [`test-log.md`](test-log.md) |

---

## Review checklist

Tick when satisfied. Any fail → revise before sharing with Soham; details are always in [`instructions.md`](instructions.md).

### Workflow (matches [`instructions.md` — Workflow: two internal roles](instructions.md#workflow-two-internal-roles))

*Custom GPT / generator:* output must follow **Writer → QA Editor** internally; humans validating a packet use these as “did the process satisfy the spec?”*

- [ ] **Story Writer** pass (draft the full mission) completed **before** treating text as final.
- [ ] **Comprehension QA Editor** pass completed on that draft — including the **full** **[Non-negotiable rules](instructions.md#non-negotiable-rules)** gate **plus** the numbered QA failure modes ([Comprehension QA Editor](instructions.md#comprehension-qa-editor)); not optional, not “writer-only.”

### A. Non-negotiable rules & reveal

*Refs: entire **[Non-negotiable rules](instructions.md#non-negotiable-rules)** — hidden logic, gadget must matter, reveal, evidence-based debrief, bedtime light, mechanical logic*

- [ ] **No hidden logic:** important clues appear **before** they matter; child can answer what / why / how they knew / **which line proves it**.
- [ ] **Reveal** explainable in **2–3 steps** with no sneaked assumptions.
- [ ] **Gadget must matter** — not decorative ([Gadget must matter](instructions.md#gadget-must-matter)).
- [ ] **Debrief** answers each tie to an **exact proof line** from the story ([Debrief must be evidence-based](instructions.md#debrief-must-be-evidence-based)).
- [ ] **Bedtime** script stays parent-light ([Bedtime must stay light](instructions.md#bedtime-must-stay-light)).

### B. Mechanical logic / no teleport

*Refs: [Mechanical logic / no teleport](instructions.md#mechanical-logic-no-teleport)*

- [ ] No physical beat works by “magic”; **action → mechanism → result** each have a proof line (or intentional comic fail with proof).

### C. Adventure pulse & variety

*Refs: [Adventure serial DNA](instructions.md#adventure-serial-dna), [Variety — anti-formula](instructions.md#variety-antiformula)*

- [ ] Feels like a **chapter** (exploration / stakes / twist), not only a staff-meeting with clues — **dead pulse** fails ([Comprehension QA Editor](instructions.md#comprehension-qa-editor) #15).
- [ ] Not formula-rigid every time (breadcrumb + lone misread notice **only** if stakes earn it).

### D. Comprehension & debrief

*Refs: [Reading skills](instructions.md#reading-skills-to-embed), [Mission Debrief](instructions.md#mission-debrief-page)*

- [ ] Gist + recap + **reading razor** (Exact Words **or** equivalent per spec) + threading + inference are present and fair.
- [ ] Every debrief answer ties to an **exact proof line** (overlap with A — both must hold).

### E. Tone

*Refs: [Motivation & tone](instructions.md#motivation-tone)*

- [ ] Fun, cool, mischievous — **not** babyish, worksheet-like, or moral-science-like.

### F. Output shape (print-ready packet)

*Refs: [Output format](instructions.md#output-format), [Printable page layout](instructions.md#printable-page-layout-what-print-ready-means)*

- [ ] Logic Map + **five** print-ready story pages + Mission Debrief (**page 6** standard) + parent answer key + bedtime script + QA summary per packet rules.
- [ ] Each story page: **panel** then prose below (not summary-only); **Page 1:** **4–10** sentences + introduces **all five** Bolt Club kids (name + role); **Pages 2–5:** **6–10** sentences each.
- [ ] Each story page has a **panel art brief**; if using Custom GPT images, no vector/matplotlib placeholder “comics.”

### G. Comprehension QA Editor — failure modes (#1–18)

*Refs: [Comprehension QA Editor](instructions.md#comprehension-qa-editor)*

- [ ] Skim numbered checks **1–18** (hidden assumptions, clues-before-intro, gadget plot-use, inference hops, pronouns, gadget/tag readability, formula fatigue, **color spine**, **print layout / five story pages / Page 1 roster / sentence counts**, etc.). If any apply → revise.
- [ ] **[regression-tests.md](regression-tests.md) R14** — packet page count and sentence rules per page type.

---

## Verdict

- [ ] **Pass** — ship / print
- [ ] **Fail** — revise before showing (see [`instructions.md`](instructions.md))
- [ ] **Fail** — note in [`failed-examples.md`](failed-examples.md) if you are tracking regressions
