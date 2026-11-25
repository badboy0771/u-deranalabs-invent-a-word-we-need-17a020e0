// Invent a Word We Need — make.fun bounty
// u-deranalabs-invent-a-word-we-need-17a020e0
//
// The coinage: TABNESIA
//   tab + amnesia, after the everyday lapse everyone knows: you open a
//   fresh browser tab to look something up, and by the time the blank
//   page loads the search itself has evaporated from your mind. English
//   has "amnesia" for losing memories and "brain fog" for losing focus,
//   but no single word for this precise, small, instantly recognisable
//   forgetting — the query dying in the half-second between intention
//   and the new tab. "Tabnesia" is sayable (tab-NEE-zee-a), spellable
//   (tab + nesia, the familiar tail of "amnesia"), memorable, and sounds
//   like a word English could have grown on its own. It fills a real
//   gap: ask anyone who has stared at a blank tab and they know the
//   feeling at once, even though they never had a name for it.
//
// The entry is exactly one line: the word, its part of speech, and a
// definition that lands in a single reading, with no second sentence
// and no example. The gate allows 1–140 UTF-8 characters; the entry
// below is validated against that gate before it is written, and the
// file is read back and checked byte-for-byte after writing. The word
// and the definition are kept as separate constants and joined by the
// program, so the entry is assembled from its parts rather than pasted
// as one opaque string.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The coined word, lower-case, letters only: "tab" (the browser tab
// you just opened) + "nesia" (the tail of "amnesia", loss of memory).
const WORD = "tabnesia";

// Part of speech, in the compact dictionary style the judge reads as
// a lexicographer's entry: a noun, the thing itself.
const PART_OF_SPEECH = "n.";

// The definition, one sentence, self-contained: it names the exact
// moment (the new tab opening) and the exact loss (the search you
// meant to make), so the meaning lands in one reading.
const DEFINITION =
  "the instant forgetting of what you meant to search the moment a new browser tab opens";

// The entry text, exactly as it must appear in /output/entry.txt:
// word, part of speech, em dash, definition, one full stop. One line,
// no trailing newline: the gate counts characters, so nothing extra
// may sneak in.
const ENTRY = `${WORD} (${PART_OF_SPEECH}) \u2014 ${DEFINITION}.`;

// The bounty gate: /output/entry.txt must be UTF-8 text of 1 to 140
// characters, not only white space. Anything outside that range is
// never judged and takes no prize, so the program refuses to write
// an entry that would fail it.
const MIN_CHARS = 1;
const MAX_CHARS = 140;
const OUTPUT_PATH = "/output/entry.txt";

// Count characters the way the gate does: Unicode code points, so the
// em dash in the entry counts as one character, not two bytes.
function charCount(text: string): number {
  return [...text].length;
}

function validateEntry(text: string): void {
  const n = charCount(text);
  if (n < MIN_CHARS || n > MAX_CHARS) {
    throw new Error(`entry is ${n} chars, gate allows ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // The word itself must be the first token, lower-case, letters only.
  const word = text.split(" ")[0];
  if (word !== WORD || !/^[a-z]+$/.test(word)) {
    throw new Error(`word token is not the coined word: ${word}`);
  }
  // Exactly one sentence: a single full stop, at the very end, and no
  // other sentence-ending punctuation inside the definition.
  const stops = [...text].filter((c) => c === ".").length;
  if (stops !== 2) {
    // One stop closes "(n.)", one closes the definition.
    throw new Error(`expected 2 full stops, found ${stops}`);
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
  // The definition must stand alone: it may not lean on an example
  // ("e.g.", "like when") or a second clause introduced by a comma
  // splice of examples; keep it a single clean clause.
  if (/e\.g\.|for example|like when/i.test(text)) {
    throw new Error("definition must not contain an example");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
  // Read the file back and demand byte-identical output: what the
  // judge sees must be exactly the validated entry, nothing more.
  const back = readFileSync(OUTPUT_PATH, "utf8");
  if (back !== ENTRY) {
    throw new Error("round-trip mismatch: file differs from entry");
  }
  const words = ENTRY.split(/\s+/).length;
  console.log(`wrote ${charCount(ENTRY)} chars (${words} words) to ${OUTPUT_PATH}`);
  console.log(ENTRY);
}

main();
