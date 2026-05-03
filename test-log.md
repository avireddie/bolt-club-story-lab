# Test log — Bolt Club generations

Log **mission-generation runs** (Custom GPT, Cursor agent, etc.), not unit tests.

**Related:** [`qa-checklist.md`](qa-checklist.md) for pass/fail criteria, [`regression-tests.md`](regression-tests.md) for repeatable cases, [`failed-examples.md`](failed-examples.md) for bad outputs worth fixing in the spec.

---

## How to use

Append a new **entry** under **Entries** each time you run a full generation or a serious regression check. Keep one line in **Environment** current if you like.

---

## Environment

- **Default GPT / model:**
- **Instructions version:** (match [`instructions.md`](instructions.md) header, e.g. 0.3.0)
- **Last run date:**

---

## Entries

### Template (copy below the line)

#### YYYY-MM-DD — short label

- **Tool:** Custom GPT / Cursor / other:
- **Model (if known):**
- **Instructions version:**
- **Seed / link:** (or “none — model proposed seeds”)
- **Checklist:** Pass / Fail — [`qa-checklist.md`](qa-checklist.md) sections A–E (F: optional)
- **Regression spot-check:** e.g. R1–R4 from [`regression-tests.md`](regression-tests.md) — pass / fail
- **Artifacts:** link to export, PDF, or chat transcript if any
- **Notes:**

---
