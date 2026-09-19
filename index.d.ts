/**
 * A single list entry: usually the word or character itself, but the tuple of accepted forms
 * where the syllabus marks part of a word optional — `有（一）点儿` publishes as
 * `["有点儿", "有一点儿"]`, shortest first.
 *
 * Parentheses that merely ILLUSTRATE a bound affix (`们（朋友们）`) are not expansions: those
 * entries publish as the bare stem (`们`), since the example is not itself a vocabulary item.
 */
export type Hsk30Entry = string | string[];

/** A list with no optional-segment entries — every item is a plain string. */
export type Hsk30List = string[];

/** A list that may contain expanded entries: `words` and levels 1, 2, 5, 6 and 7–9. */
export type Hsk30EntryList = Hsk30Entry[];

export interface Hsk30ExportFileSummary {
  name: string;
  size_bytes: number;
  sha256: string;
  content: unknown;
}

export interface Hsk30ExportManifest {
  source_directory: string;
  total_files: number;
  files: Hsk30ExportFileSummary[];
}

export interface Hsk30Dataset {
  export: Hsk30ExportManifest;
  chars: Hsk30List;
  charsLevel1: Hsk30List;
  charsLevel2: Hsk30List;
  charsLevel3: Hsk30List;
  charsLevel4: Hsk30List;
  charsLevel5: Hsk30List;
  charsLevel6: Hsk30List;
  charsLevel7to9: Hsk30List;
  charsLevel7to9NotUsedInWords: Hsk30List;
  fourCharPhrases: Hsk30List;
  chengyu: Hsk30List;
  notChengyu: Hsk30List;
  words: Hsk30EntryList;
  wordsLevel1: Hsk30EntryList;
  wordsLevel2: Hsk30EntryList;
  wordsLevel3: Hsk30List;
  wordsLevel4: Hsk30List;
  wordsLevel5: Hsk30EntryList;
  wordsLevel6: Hsk30EntryList;
  wordsLevel7to9: Hsk30EntryList;
}

export declare const hsk30Export: Hsk30ExportManifest;
export declare const hsk30Chars: Hsk30List;
export declare const hsk30CharsLevel1: Hsk30List;
export declare const hsk30CharsLevel2: Hsk30List;
export declare const hsk30CharsLevel3: Hsk30List;
export declare const hsk30CharsLevel4: Hsk30List;
export declare const hsk30CharsLevel5: Hsk30List;
export declare const hsk30CharsLevel6: Hsk30List;
export declare const hsk30CharsLevel7to9: Hsk30List;
export declare const hsk30CharsLevel7to9NotUsedInWords: Hsk30List;
export declare const hsk304CharPhrases: Hsk30List;
export declare const hsk30Chengyu: Hsk30List;
export declare const hsk30NotChengyu: Hsk30List;
export declare const hsk30Words: Hsk30EntryList;
export declare const hsk30WordsLevel1: Hsk30EntryList;
export declare const hsk30WordsLevel2: Hsk30EntryList;
export declare const hsk30WordsLevel3: Hsk30List;
export declare const hsk30WordsLevel4: Hsk30List;
export declare const hsk30WordsLevel5: Hsk30EntryList;
export declare const hsk30WordsLevel6: Hsk30EntryList;
export declare const hsk30WordsLevel7to9: Hsk30EntryList;

declare const hsk30: Hsk30Dataset;
export default hsk30;
