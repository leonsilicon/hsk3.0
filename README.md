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

## Parenthesised Entries

The syllabus uses fullwidth parentheses in a vocabulary entry for two unrelated reasons, and this
package resolves each in the published JSON so consumers never parse `（）` themselves.

**Optional segment** — both forms are accepted words, so the entry publishes as a tuple,
shortest first:

| Syllabus | Published | Level |
| --- | --- | --- |
| `有（一）些` | `["有些", "有一些"]` | 1 |
| `有（一）点儿` | `["有点儿", "有一点儿"]` | 2 |
| `差（一）点儿` | `["差点儿", "差一点儿"]` | 5 |
| `好（不）容易` | `["好容易", "好不容易"]` | 6 |
| `茅台（酒）` | `["茅台", "茅台酒"]` | 7–9 |

**Usage example** — the parentheses only show how a bound affix is used, so the entry publishes
as the bare stem and the example is dropped. `们（朋友们）` is the suffix 们 illustrated by 朋友们;
it publishes as `"们"`, never `"们朋友们"`. The 22 affected entries are 业、们、初、力、化、员、
品、头、子、家、小、度、性、感、族、率、界、第、老、者、长 and 非.

Nothing in an entry's text distinguishes the two cases, so the classification is hardcoded in
`scripts/build.ts`. An unclassified parenthesised entry fails the build rather than being
guessed at.

```js
const canonical = hsk30WordsLevel1.map((e) => (Array.isArray(e) ? e.at(-1) : e));
const allForms = hsk30WordsLevel1.flat();
```

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
