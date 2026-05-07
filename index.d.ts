export type Hsk30List = string[];

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
  words: Hsk30List;
  wordsLevel1: Hsk30List;
  wordsLevel2: Hsk30List;
  wordsLevel3: Hsk30List;
  wordsLevel4: Hsk30List;
  wordsLevel5: Hsk30List;
  wordsLevel6: Hsk30List;
  wordsLevel7to9: Hsk30List;
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
export declare const hsk30Words: Hsk30List;
export declare const hsk30WordsLevel1: Hsk30List;
export declare const hsk30WordsLevel2: Hsk30List;
export declare const hsk30WordsLevel3: Hsk30List;
export declare const hsk30WordsLevel4: Hsk30List;
export declare const hsk30WordsLevel5: Hsk30List;
export declare const hsk30WordsLevel6: Hsk30List;
export declare const hsk30WordsLevel7to9: Hsk30List;

declare const hsk30: Hsk30Dataset;
export default hsk30;
