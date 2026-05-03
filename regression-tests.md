# Regression tests — Bolt Club Story Lab

These are **repeatable QA cases** you run after you change [`instructions.md`](instructions.md), the Custom GPT, or your workflow — so old failure modes do not creep back.  
They are **not** automated software tests (there is no CI browser suite here).

**How to run:** Generate or inspect a mission, then verify each **must hold** statement. If one fails, log it in [`failed-examples.md`](failed-examples.md), patch instructions if needed, and optionally add a row below.

**Related:** [`qa-checklist.md`](qa-checklist.md) (human pass/fail), [`prompts/qa-review-story.md`](prompts/qa-review-story.md) (strict review prompt).

---

## Suite overview

| ID | Theme | What must hold | Spec anchor |
|----|--------|----------------|-------------|
| R1 | Hidden logic | No clue powers the reveal unless it already appeared in the story | [`instructions.md` — No hidden logic](instructions.md#non-negotiable-rules) |
| R2 | Child questions | Reader can answer what / why / how / proof line for the solve | [`instructions.md` — No hidden logic](instructions.md#non-negotiable-rules) |
| R3 | Mechanical / no teleport | Every physical result has Action → mechanism → result → proof line | [`instructions.md` — Mechanical logic](instructions.md#mechanical-logic-no-teleport) |
| R4 | Gadget payoff | Soham’s build is not decorative; plot changes if you remove it | [`instructions.md` — Gadget must matter](instructions.md#gadget-must-matter) |
| R5 | Reveal simplicity | Reveal explainable in 2–3 steps | [`instructions.md` — Reveal must be simple](instructions.md#reveal-must-be-simple) |
| R6 | Debrief evidence | Each debrief answer cites an exact story line | [`instructions.md` — Debrief must be evidence-based](instructions.md#debrief-must-be-evidence-based) |
| R7 | Comprehension kit | Gist, recap, threading, inference present; Exact Words trap **or** alternate reading razor with proof ([`instructions.md` — Mission Debrief](instructions.md#mission-debrief-page)) | [`instructions.md` — Mission Debrief](instructions.md#mission-debrief-page) |
| R8 | Tone | Fun / cool / mischievous; not babyish, worksheet, or moral-science | [`instructions.md` — Motivation & tone](instructions.md#motivation-tone) |
| R9 | Editor smoke | None of the [comprehension QA failure modes](instructions.md#comprehension-qa-editor) clearly fire | [`instructions.md` — Comprehension QA Editor](instructions.md#comprehension-qa-editor) |
| R10 | Stakes + variety | Not **only** “missing thing + crumbs + solely misread sign”; kid-scale stakes beyond object-loss; rotate shapes ([`instructions.md` — Variety](instructions.md#variety-antiformula)) | [`instructions.md` — Variety](instructions.md#variety-antiformula) |
| R11 | Adventure pulse | Reads like a **chapter adventure** (exploration / escalation / human pressure), not a procedural case checklist ([`instructions.md` — Adventure serial DNA](instructions.md#adventure-serial-dna)) | [`instructions.md`](instructions.md#adventure-serial-dna) |
| R12 | Place texture | Solve does not mainly ride on **paired color labels**; props feel **venue-specific** ([`instructions.md` — Setting and props](instructions.md#setting-props-worksheet)) | [`instructions.md`](instructions.md#setting-props-worksheet) |
| R13 | Art + readability | Story pages include **panel art briefs** if host is text-only; gadget chains and **tag quotes** stay traceable ([`instructions.md`](instructions.md#illustrations-custom-gpt), [Gadget prose](instructions.md#gadget-prose-clarity)) | [`instructions.md`](instructions.md#illustrations-custom-gpt) |

---

## Critical paths (always run)

1. **R1 + R2** — Trace the reveal to earlier sentences; no new facts at the end.
2. **R3** — Pick two physical beats (chase, gadget, door, hidden object) and confirm proof lines.
3. **R4** — One-sentence test: “If Soham’s gadget vanished, would the plot break?” → should be yes.
4. **R6** — For each debrief question, locate the proof line in the story pages.
5. **R10** — Stakes beyond object-loss; avoid default trail + lone misread sign only ([`instructions.md` — Variety](instructions.md#variety-antiformula)).
6. **R11** — Sniff-test: would a kid call this **boring admin**? If yes, fail—need adventure pulse ([`instructions.md` — Adventure serial DNA](instructions.md#adventure-serial-dna)).

---

## Edge cases (spot-check when editing instructions or after a fail)

1. **Gadget introduced too late** — gadget mechanics appear only after they are needed (fail R3/R4).
2. **Pronoun soup** — “he/it/they” unclear across a paragraph (Comprehension QA #5).
3. **Crowded scene** — too many named actors moving at once (Comprehension QA #9).
4. **Inference ladder** — reveal needs more than a few chained inferences (Comprehension QA #4).
5. **Mechanical fact after the fact** — wheel / gap / rope appears only when the trolley moves (fail R3).
6. **Formula fatigue** — same spine as trail + lone misread sign + thin stakes ([`instructions.md` — Variety](instructions.md#variety-antiformula); Comprehension QA #14).

---

## Environment log

Use this for **which GPT / model** you regression-checked, not a browser.

| Date | GPT / model | Instructions version | Result | Notes |
|------|-------------|----------------------|--------|-------|
| | | e.g. 0.5.0 | pass / fail | |
