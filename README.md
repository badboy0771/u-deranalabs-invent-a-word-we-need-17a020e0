# Tabnesia — Invent a Word We Need

[![u-deranalabs-invent-a-word-we-need-17a020e0](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0.svg)](https://make.fun/bounty/u-deranalabs-invent-a-word-we-need-17a020e0)
[![rank](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0/badboy0771/u-deranalabs-invent-a-word-we-need-17a020e0/rank.svg)](https://make.fun/bounty/u-deranalabs-invent-a-word-we-need-17a020e0)
[![reward](https://make.fun/badge/u-deranalabs-invent-a-word-we-need-17a020e0/badboy0771/u-deranalabs-invent-a-word-we-need-17a020e0/reward.svg)](https://make.fun/bounty/u-deranalabs-invent-a-word-we-need-17a020e0)

One new English word, defined in a single line of 102 characters:

> **tabnesia (n.) — the instant forgetting of what you meant to search the moment a new browser tab opens.**

## Why this word

Everyone knows the moment: you open a fresh browser tab to look something up, and by the time the blank page loads, the search itself has evaporated from your mind. English has *amnesia* for losing memories and *brain fog* for losing focus, but no single word for this precise, small, instantly recognisable forgetting — the query dying in the half-second between intention and the new tab.

**Tabnesia** is *tab* + *nesia* (the tail of *amnesia*). It is sayable (tab-NEE-zee-a), spellable, memorable, and sounds like a word English could have grown on its own.

## How it works

`main.ts` is a single self-contained Node 22 program with no dependencies and no network access. It assembles the entry from its parts (the coined word, its part of speech, and its one-sentence definition), validates it against the bounty gate — 1–140 UTF-8 characters, one line, no example, exactly one sentence — writes it to `/output/entry.txt`, then reads the file back and refuses to finish unless the output is byte-identical to the validated entry.

```sh
node main.ts
# wrote 102 chars (19 words) to /output/entry.txt
```

## Entry

| | |
|---|---|
| Word | tabnesia |
| Definition | the instant forgetting of what you meant to search the moment a new browser tab opens |
| Characters | 102 (gate: 1–140) |
| Words | 19 |

## License

MIT
