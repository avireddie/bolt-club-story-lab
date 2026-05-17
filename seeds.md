# Seeds — Bolt Club mission ideas

In this repo, **seeds** are **story prompts** (mystery + place + gadget), not database seed scripts.

Use them to kick off [`prompts/generate-story.md`](prompts/generate-story.md) or your Custom GPT.  
**Stakes tiers** match [`instructions.md` — Story stakes & scale](instructions.md#story-stakes-scale).

---

## Generate more seeds (agents)

To **auto-generate new rows** for **Your seed bank** below — without copying the starter list verbatim — run the Cursor agent or paste into chat:

- **[`prompts/generate-seeds.md`](prompts/generate-seeds.md)** — tells the model to read this file + `instructions.md`, vary tiers and settings, and output table rows you can append here.

Ask for a count (e.g. “generate 10 seeds”) and optional focus. Then paste the new rows into the **Your seed bank** table or let the agent edit `seeds.md` directly.

---

## Seed format (copy-paste)

```text
Mystery:
Place / setting:
Stakes tier: (everyday / medium / bigger special episode)
Gadget or build (Soham):
```

---

## Starter seeds (from the spec)

**Everyday mysteries**

- Missing teacher’s bag  
- Stolen telescope  
- Strange clue in the lift  
- Missing cricket bat  
- Classroom token vault  
- Missing trophy  
- Missing project model  

**Medium adventures**

- School trip mystery  
- Science-fair sabotage  
- Playground chase  
- Library secret room  
- Terrace clue trail  
- Bus clue trail  
- **Bus petrol thief** — someone’s draining the tank or siphoning fuel; the trip, match, or inter-school run is about to be cancelled; prove who before wheels roll.  

**Bigger special episodes**

- Zoo mystery  
- Missing elephant / tusker  
- School adventure trip  
- Thief or chase in the neighbourhood  
- Conservation-style animal rescue  

---

## Your seed bank

Add rows as you invent missions worth repeating.

| Name | Mystery | Place | Tier | Gadget / build | Used / date | Notes |
|------|---------|-------|------|----------------|-------------|-------|
| Example | Stolen telescope | School terrace | everyday | Magnet Grabber | | From [`instructions.md`](instructions.md) sample |
| Bus petrol thief | Fuel vanishing from the school bus / depot; wrong person blamed; trip or event on a timer | School bus bay, transport yard, or trip halt | medium | e.g. cycle stakeout + LED dazzle, hose-clamp string marker, or under-chassis string-and-mirror peek—pick from [`instructions.md` — Soham’s gadget idea bank](instructions.md#soham-gadget-idea-bank) | | Petrol theft as **crime beat**, not fuel-theft how-to |

---

## Notes

- Prefer **chapter-adventure** stakes—exploration, ticking clock, rivalry—not only “office puzzle” vibes ([`instructions.md` — Adventure serial DNA](instructions.md#adventure-serial-dna)).
- Prefer **named/sensory** settings over **paired color-coded** props as the whole hook ([`instructions.md` — Setting and props](instructions.md#setting-props-worksheet)).
- Prefer stakes **bigger than a tiny craft problem**; gadget is usually a **tool inside a bigger case** ([`instructions.md`](instructions.md)).
- If you have **no seed**, the GPT should propose three options (everyday, medium, big) per [`instructions.md` — Default behavior](instructions.md#default-behavior-example).
