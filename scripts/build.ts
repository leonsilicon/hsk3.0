#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, relative, resolve } from "node:path";

const DATASET_NAME = "HSK3.0";
const INPUT_DIR = resolve("data", DATASET_NAME);
const OUTPUT_DIR = resolve(".");
const EXPORT_FILE_NAME = `${DATASET_NAME}_export.json`;

interface ExportFileSummary {
  name: string;
  size_bytes: number;
  sha256: string;
  content: {
    type: "text" | "json";
    line_count?: number;
    items?: (string | string[])[];
    value?: unknown;
  };
}

function toJsonFilename(fileName: string): string {
  const sourceExt = extname(fileName).toLowerCase();
  if (sourceExt === ".json") return fileName;
  return `${basename(fileName, sourceExt)}.json`;
}

/**
 * The syllabus writes fullwidth parentheses in a vocabulary entry for two unrelated reasons, and
 * they must not be handled the same way:
 *
 * - An OPTIONAL segment, where both forms are accepted words: `有（一）点儿` is "有点儿 or
 *   有一点儿". These publish as the tuple of their forms, shortest first.
 * - An EXAMPLE illustrating how a bound affix is used: `们（朋友们）` means the vocabulary item
 *   is the suffix 们, shown in the word 朋友们. The item is the stem alone, so these publish as
 *   just the stem — joining them would invent a non-word like "们朋友们".
 *
 * Nothing in the entry's own text distinguishes the two, so the classification is spelled out
 * here per entry rather than guessed. Every parenthesised entry in `data/` must appear below or
 * the build fails, so a syllabus revision cannot silently add one.
 */
const OPTIONAL_SEGMENT_ENTRIES = new Set([
  "好（不）容易",
  "差（一）点儿",
  "有（一）些",
  "有（一）点儿",
  "茅台（酒）",
]);

const EXAMPLE_ANNOTATION_ENTRIES = new Set([
  "业（服务业）",
  "们（朋友们）",
  "初（初一）",
  "力（影响力）",
  "化（现代化）",
  "员（服务员）",
  "品（工艺品）",
  "头（里头）",
  "子（桌子）",
  "家（科学家）",
  "小（小王）",
  "度（知名度）",
  "性（积极性）",
  "感（责任感）",
  "族（上班族）",
  "率（成功率）",
  "界（文艺界）",
  "第（第二）",
  "老（老王）",
  "者（志愿者）",
  "长（秘书长）",
  "非（非金属）",
]);

const OPTIONAL_SEGMENT = /\uff08[^\uff09]*\uff09/gu;

export type Hsk30Entry = string | string[];

export function expandEntry(entry: string): Hsk30Entry {
  if (entry.startsWith("#") || !OPTIONAL_SEGMENT.test(entry)) {
    OPTIONAL_SEGMENT.lastIndex = 0;
    return entry;
  }
  OPTIONAL_SEGMENT.lastIndex = 0;

  if (EXAMPLE_ANNOTATION_ENTRIES.has(entry)) {
    return entry.replaceAll(OPTIONAL_SEGMENT, "");
  }

  if (!OPTIONAL_SEGMENT_ENTRIES.has(entry)) {
    throw new Error(
      `Entry "${entry}" has fullwidth parentheses but is not classified. Add it to ` +
        "OPTIONAL_SEGMENT_ENTRIES (both forms are words) or EXAMPLE_ANNOTATION_ENTRIES " +
        "(the parentheses only illustrate the stem) in scripts/build.ts.",
    );
  }

  return [entry.replaceAll(OPTIONAL_SEGMENT, ""), entry.replaceAll("（", "").replaceAll("）", "")];
}

function parseTxt(content: string): Hsk30Entry[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => expandEntry(line));
}

/** Only the lists that actually hold an expanded entry widen to a possibly-tuple element type. */
function typeDefinitionForJson(fileName: string, data: unknown): string {
  if (fileName === EXPORT_FILE_NAME) {
    return `export interface Hsk30ExportFileSummary {
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

declare const data: Hsk30ExportManifest;
export default data;
`;
  }

  const hasExpandedEntry = Array.isArray(data) && data.some((entry) => Array.isArray(entry));

  return `declare const data: ${hasExpandedEntry ? "(string | string[])[]" : "string[]"};
export default data;
`;
}

async function buildFile(fileName: string): Promise<ExportFileSummary | undefined> {
  const sourcePath = resolve(INPUT_DIR, fileName);
  const sourceExt = extname(fileName).toLowerCase();

  if (sourceExt === ".pdf" || sourceExt === ".md") {
    return;
  }

  if (sourceExt !== ".txt" && sourceExt !== ".json") {
    console.warn(`Skipping unsupported file: ${fileName}`);
    return;
  }

  const outputPath = resolve(OUTPUT_DIR, toJsonFilename(fileName));
  const raw = await readFile(sourcePath, "utf8");

  let data: unknown;
  let content: ExportFileSummary["content"];
  if (sourceExt === ".txt") {
    const items = parseTxt(raw);
    data = items;
    content = {
      type: "text",
      line_count: items.length,
      items,
    };
  } else {
    data = JSON.parse(raw);
    content = {
      type: "json",
      value: data,
    };
  }

  const outputFileName = basename(outputPath);

  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await writeFile(`${outputPath}.d.ts`, typeDefinitionForJson(outputFileName, data), "utf8");
  console.log(`Wrote ${basename(outputPath)} from ${fileName}`);

  return {
    name: fileName,
    size_bytes: Buffer.byteLength(raw, "utf8"),
    sha256: createHash("sha256").update(raw).digest("hex"),
    content,
  };
}

async function writeExportManifest(files: ExportFileSummary[]): Promise<void> {
  const outputPath = resolve(OUTPUT_DIR, EXPORT_FILE_NAME);
  const manifest = {
    source_directory: relative(OUTPUT_DIR, INPUT_DIR),
    total_files: files.length,
    files,
  };

  await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await writeFile(`${outputPath}.d.ts`, typeDefinitionForJson(EXPORT_FILE_NAME, manifest), "utf8");
  console.log(`Wrote ${EXPORT_FILE_NAME}`);
}

async function main(): Promise<void> {
  const entries = await readdir(INPUT_DIR, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name).sort();
  const manifestFiles: ExportFileSummary[] = [];

  for (const fileName of files) {
    const summary = await buildFile(fileName);
    if (summary) {
      manifestFiles.push(summary);
    }
  }

  await writeExportManifest(manifestFiles);
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
  process.exit(1);
});
