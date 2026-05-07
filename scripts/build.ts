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
    items?: string[];
    value?: unknown;
  };
}

function toJsonFilename(fileName: string): string {
  const sourceExt = extname(fileName).toLowerCase();
  if (sourceExt === ".json") return fileName;
  return `${basename(fileName, sourceExt)}.json`;
}

function parseTxt(content: string): string[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function typeDefinitionForJson(fileName: string): string {
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

  return `declare const data: string[];
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
  await writeFile(`${outputPath}.d.ts`, typeDefinitionForJson(outputFileName), "utf8");
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
  await writeFile(`${outputPath}.d.ts`, typeDefinitionForJson(EXPORT_FILE_NAME), "utf8");
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
