# Patch instructions

Use this prompt when asking an assistant to implement a focused code change from a story or ticket.

## Instructions for the model

- Scope changes to what the request asks; avoid unrelated refactors.
- Match existing project style, patterns, and file layout.
- After edits, summarize what changed and where; note tests run or to run.

## User fill-in

```
Objective:
Files / areas to touch (if known):
Out of scope:
Tests to add or run:
```
