import hsk30Export from "./HSK3.0_export.json" with { type: "json" };
import hsk30Chars from "./HSK3.0_chars.json" with { type: "json" };
import hsk30CharsLevel1 from "./HSK3.0_chars_level1.json" with { type: "json" };
import hsk30CharsLevel2 from "./HSK3.0_chars_level2.json" with { type: "json" };
import hsk30CharsLevel3 from "./HSK3.0_chars_level3.json" with { type: "json" };
import hsk30CharsLevel4 from "./HSK3.0_chars_level4.json" with { type: "json" };
import hsk30CharsLevel5 from "./HSK3.0_chars_level5.json" with { type: "json" };
import hsk30CharsLevel6 from "./HSK3.0_chars_level6.json" with { type: "json" };
import hsk30CharsLevel7to9 from "./HSK3.0_chars_level7-9.json" with { type: "json" };
import hsk30CharsLevel7to9NotUsedInWords from "./HSK3.0_chars_level7-9_not_used_in_words.json" with { type: "json" };
import hsk304CharPhrases from "./HSK3.0_4char_phrases.json" with { type: "json" };
import hsk30Chengyu from "./HSK3.0_chengyu.json" with { type: "json" };
import hsk30NotChengyu from "./HSK3.0_not_chengyu.json" with { type: "json" };
import hsk30Words from "./HSK3.0_words.json" with { type: "json" };
import hsk30WordsLevel1 from "./HSK3.0_words_level1.json" with { type: "json" };
import hsk30WordsLevel2 from "./HSK3.0_words_level2.json" with { type: "json" };
import hsk30WordsLevel3 from "./HSK3.0_words_level3.json" with { type: "json" };
import hsk30WordsLevel4 from "./HSK3.0_words_level4.json" with { type: "json" };
import hsk30WordsLevel5 from "./HSK3.0_words_level5.json" with { type: "json" };
import hsk30WordsLevel6 from "./HSK3.0_words_level6.json" with { type: "json" };
import hsk30WordsLevel7to9 from "./HSK3.0_words_level7-9.json" with { type: "json" };

export {
  hsk30Export,
  hsk30Chars,
  hsk30CharsLevel1,
  hsk30CharsLevel2,
  hsk30CharsLevel3,
  hsk30CharsLevel4,
  hsk30CharsLevel5,
  hsk30CharsLevel6,
  hsk30CharsLevel7to9,
  hsk30CharsLevel7to9NotUsedInWords,
  hsk304CharPhrases,
  hsk30Chengyu,
  hsk30NotChengyu,
  hsk30Words,
  hsk30WordsLevel1,
  hsk30WordsLevel2,
  hsk30WordsLevel3,
  hsk30WordsLevel4,
  hsk30WordsLevel5,
  hsk30WordsLevel6,
  hsk30WordsLevel7to9,
};

const hsk30 = {
  export: hsk30Export,
  chars: hsk30Chars,
  charsLevel1: hsk30CharsLevel1,
  charsLevel2: hsk30CharsLevel2,
  charsLevel3: hsk30CharsLevel3,
  charsLevel4: hsk30CharsLevel4,
  charsLevel5: hsk30CharsLevel5,
  charsLevel6: hsk30CharsLevel6,
  charsLevel7to9: hsk30CharsLevel7to9,
  charsLevel7to9NotUsedInWords: hsk30CharsLevel7to9NotUsedInWords,
  fourCharPhrases: hsk304CharPhrases,
  chengyu: hsk30Chengyu,
  notChengyu: hsk30NotChengyu,
  words: hsk30Words,
  wordsLevel1: hsk30WordsLevel1,
  wordsLevel2: hsk30WordsLevel2,
  wordsLevel3: hsk30WordsLevel3,
  wordsLevel4: hsk30WordsLevel4,
  wordsLevel5: hsk30WordsLevel5,
  wordsLevel6: hsk30WordsLevel6,
  wordsLevel7to9: hsk30WordsLevel7to9,
};

export default hsk30;
