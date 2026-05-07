#!/usr/bin/env bun

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const DEFAULT_INPUT = "data/SUBTLEX-CH-CHR";
const DEFAULT_OUTPUT = "SUBTLEX-CH-CHR.json";

type JsonValue = string | number | null;
type SubtlexRow = Record<string, JsonValue>;

function parseValue(value: string): JsonValue {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  const number = Number(trimmed);
  return Number.isNaN(number) ? trimmed : number;
}

function parseCount(line: string): number | null {
  const match = line.match(/([\d,]+)/);
  if (!match) return null;
  return Number(match[1].replace(/,/g, ""));
}

function decodeInput(buffer: Buffer): string {
  const utf8 = new TextDecoder("utf-8").decode(buffer);
  // SUBTLEX Chinese files are commonly distributed in GB18030/GBK.
  if (utf8.includes("\uFFFD")) {
    return new TextDecoder("gb18030").decode(buffer);
  }
  return utf8;
}

function parseSubtlex(text: string): {
  metadata: { totalCharacterCount: number | null; contextNumber: number | null };
  headers: string[];
  data: SubtlexRow[];
} {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length < 3) {
    throw new Error("Input file does not contain expected metadata/header rows.");
  }

  const [totalCharacterCountLine, contextNumberLine, headerLine, ...rows] = lines;
  const headers = headerLine.split("\t").map((header) => header.trim());

  const metadata = {
    totalCharacterCount: parseCount(totalCharacterCountLine),
    contextNumber: parseCount(contextNumberLine),
  };

  const data = rows.map((row, index) => {
    const values = row.split("\t");
    if (values.length !== headers.length) {
      throw new Error(
        `Row ${index + 4} has ${values.length} columns; expected ${headers.length}.`,
      );
    }

    return Object.fromEntries(headers.map((header, i) => [header, parseValue(values[i] ?? "")]));
  });

  return { metadata, headers, data };
}

async function main(): Promise<void> {
  const inputPath = resolve(process.argv[2] ?? DEFAULT_INPUT);
  const outputPath = resolve(process.argv[3] ?? DEFAULT_OUTPUT);

  const rawBuffer = await readFile(inputPath);
  const raw = decodeInput(rawBuffer);
  const parsed = parseSubtlex(raw);

  await writeFile(outputPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  console.log(`Wrote ${parsed.data.length} records to ${outputPath}`);
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
  process.exit(1);
});
