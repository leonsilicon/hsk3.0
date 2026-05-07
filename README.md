# hsk3.0

Publishes the 2021 HSK 3.0 vocabulary, character, and phrase lists from
`data/HSK3.0` as JSON files.

The source data follows the official HSK 3.0 standard. See
`data/HSK3.0/readme.md` for source notes, level counts, and data caveats.

## What This Package Contains

- `HSK3.0_words.json`: all vocabulary items
- `HSK3.0_words_level*.json`: vocabulary split by level
- `HSK3.0_chars.json`: all characters
- `HSK3.0_chars_level*.json`: characters split by level
- `HSK3.0_chars_level7-9_not_used_in_words.json`: HSK 7-9 characters that do not appear in the word lists
- `HSK3.0_4char_phrases.json`: four-character phrases
- `HSK3.0_chengyu.json`: chengyu
- `HSK3.0_not_chengyu.json`: four-character phrases that are not chengyu
- `HSK3.0_export.json`: manifest with source file metadata and hashes

## Install

```bash
npm install @leonsilicon/hsk3.0
```

## Usage

```js
import hsk30, { hsk30WordsLevel1, hsk30Chars } from "@leonsilicon/hsk3.0";

console.log(hsk30.words.length);
console.log(hsk30WordsLevel1[0]);
console.log(hsk30Chars.includes("学"));
```

Each JSON file is also available as a subpath export:

```js
import wordsLevel1 from "@leonsilicon/hsk3.0/HSK3.0_words_level1.json" with { type: "json" };
import charsLevel7to9 from "@leonsilicon/hsk3.0/HSK3.0_chars_level7-9.json" with { type: "json" };
```

## Exports

The package root default export groups all lists under friendly property names:

- `words`, `wordsLevel1`, `wordsLevel2`, `wordsLevel3`, `wordsLevel4`, `wordsLevel5`, `wordsLevel6`, `wordsLevel7to9`
- `chars`, `charsLevel1`, `charsLevel2`, `charsLevel3`, `charsLevel4`, `charsLevel5`, `charsLevel6`, `charsLevel7to9`, `charsLevel7to9NotUsedInWords`
- `fourCharPhrases`, `chengyu`, `notChengyu`, `export`

Named exports are also available for the same JSON payloads, using names such as
`hsk30Words`, `hsk30WordsLevel1`, `hsk30Chars`, and `hsk30Export`.

## Regenerating The JSON

The source files live in `data/HSK3.0`. To regenerate the published root JSON
files:

```bash
bun run build
```

## Repository

- Source: [github.com/leonsilicon/hsk3.0](https://github.com/leonsilicon/hsk3.0)
