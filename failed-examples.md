# Failed examples — Bolt Club Story Lab

Capture **outputs that violated** [`instructions.md`](instructions.md) so you can tighten the spec and add regressions.  
Use when [`qa-checklist.md`](qa-checklist.md) or [`regression-tests.md`](regression-tests.md) fails.

**After a failure:** consider [`prompts/patch-instructions.md`](prompts/patch-instructions.md) for the smallest fix to `instructions.md`, then add a case to [`regression-tests.md`](regression-tests.md) if it should never return.

---

## Format

For each entry:

- **Date:**
- **Tool / model:** (Custom GPT, etc.)
- **Instructions version:**
- **Input / seed / prompt:** (paste or summarize)
- **Expected:** (per spec section)
- **Actual:** (what went wrong — quote lines if possible)
- **Failing rule:** (link or section name in `instructions.md`, e.g. Mechanical logic / no teleport)
- **Severity:** blocker / major / minor
- **Status:** open / fixed in instructions / wontfix
- **Follow-up:** regression ID from [`regression-tests.md`](regression-tests.md) if added

---

## Examples

_Add entries below._
