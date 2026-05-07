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

declare const data: Hsk30ExportManifest;
export default data;
