"use client";

import { useMemo, useRef, useState } from "react";
import { zipSync } from "fflate";
import { Archive, Download, FileOutput, Loader2, RotateCcw, Scissors, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatFileSize } from "@/lib/utils";

const PDFLIB_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";

type SplitMode = "pages" | "ranges";

interface PdfSplitResult {
  name: string;
  data: Uint8Array;
  size: number;
  pageLabel: string;
}

async function loadPdfLib(): Promise<void> {
  const win = window as Window & { PDFLib?: unknown };
  if (win.PDFLib) return;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFLIB_CDN;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load pdf-lib."));
    document.head.appendChild(script);
  });
}

function parseRangeGroups(input: string, totalPages: number) {
  const tokens = input
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length === 0) {
    throw new Error("Enter at least one page range, for example 1-3, 4-6, 9.");
  }

  return tokens.map((token) => {
    const match = token.match(/^(\d+)(?:-(\d+))?$/);
    if (!match) {
      throw new Error(`"${token}" is not a valid page range.`);
    }

    const start = parseInt(match[1], 10);
    const end = parseInt(match[2] ?? match[1], 10);

    if (start < 1 || end < 1 || start > totalPages || end > totalPages) {
      throw new Error(`"${token}" is outside the page count for this PDF.`);
    }

    if (end < start) {
      throw new Error(`"${token}" must count upward, like 3-5.`);
    }

    return {
      label: start === end ? `page-${start}` : `pages-${start}-${end}`,
      pageIndices: Array.from({ length: end - start + 1 }, (_, index) => start - 1 + index),
      displayLabel: start === end ? `Page ${start}` : `Pages ${start}-${end}`,
    };
  });
}

export function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<SplitMode>("pages");
  const [ranges, setRanges] = useState("1-2, 3-4");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<PdfSplitResult[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setProcessing(false);
    setProgress({ current: 0, total: 0 });
    setResults([]);
    setPageCount(null);
    setError(null);
  }

  async function pickFile(nextFile: File) {
    setFile(nextFile);
    setResults([]);
    setError(null);

    try {
      await loadPdfLib();
      const win = window as unknown as Window & {
        PDFLib: { PDFDocument: { load: (buffer: ArrayBuffer) => Promise<{ getPageCount: () => number }> } };
      };
      const buffer = await nextFile.arrayBuffer();
      const document = await win.PDFLib.PDFDocument.load(buffer);
      setPageCount(document.getPageCount());
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Could not inspect PDF.");
    }
  }

  async function splitPdf() {
    if (!file) return;

    setProcessing(true);
    setError(null);
    setResults([]);

    try {
      await loadPdfLib();
      const win = window as unknown as Window & {
        PDFLib: {
          PDFDocument: {
            create: () => Promise<{
              copyPages: (source: unknown, indices: number[]) => Promise<unknown[]>;
              addPage: (page: unknown) => void;
              save: () => Promise<Uint8Array>;
            }>;
            load: (buffer: ArrayBuffer) => Promise<{
              getPageIndices: () => number[];
              getPageCount: () => number;
            }>;
          };
        };
      };

      const { PDFDocument } = win.PDFLib;
      const sourceBytes = await file.arrayBuffer();
      const sourceDocument = await PDFDocument.load(sourceBytes);
      const totalPages = sourceDocument.getPageCount();
      const groups = mode === "pages"
        ? sourceDocument.getPageIndices().map((pageIndex) => ({
            label: `page-${pageIndex + 1}`,
            pageIndices: [pageIndex],
            displayLabel: `Page ${pageIndex + 1}`,
          }))
        : parseRangeGroups(ranges, totalPages);

      setProgress({ current: 0, total: groups.length });

      const baseName = file.name.replace(/\.pdf$/i, "");
      const nextResults: PdfSplitResult[] = [];

      for (let index = 0; index < groups.length; index += 1) {
        const group = groups[index];
        const newDocument = await PDFDocument.create();
        const pages = await newDocument.copyPages(sourceDocument, group.pageIndices);
        pages.forEach((page) => newDocument.addPage(page));

        const bytes = await newDocument.save();
        nextResults.push({
          name: `${baseName}-${group.label}.pdf`,
          data: bytes,
          size: bytes.byteLength,
          pageLabel: group.displayLabel,
        });
        setProgress({ current: index + 1, total: groups.length });
      }

      setResults(nextResults);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "PDF split failed.");
    } finally {
      setProcessing(false);
    }
  }

  function downloadResult(result: PdfSplitResult) {
    const blob = new Blob([Uint8Array.from(result.data)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = result.name;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function downloadAll() {
    if (results.length === 0) return;

    const archive = zipSync(
      Object.fromEntries(results.map((result) => [result.name, result.data])),
      { level: 0 },
    );
    const blob = new Blob([archive], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "split-pdf-files.zip";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const totalOutputSize = useMemo(
    () => results.reduce((sum, result) => sum + result.size, 0),
    [results],
  );

  if (results.length > 0) {
    return (
      <div className="container max-w-3xl py-10 space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Split PDF ready</h2>
              <p className="text-sm text-muted-foreground">
                {results.length} file{results.length > 1 ? "s" : ""} generated • {formatFileSize(totalOutputSize)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadAll}>
                <Archive className="mr-2 h-4 w-4" />
                Download ZIP
              </Button>
              <Button variant="ghost" onClick={reset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                New PDF
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((result) => (
              <div key={result.name} className="flex items-center justify-between gap-3 rounded-lg border bg-background px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{result.pageLabel}</p>
                  <p className="truncate font-mono text-xs text-muted-foreground">{result.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{formatFileSize(result.size)}</span>
                  <Button size="sm" variant="outline" onClick={() => downloadResult(result)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10 space-y-6">
      {!file ? (
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const droppedFile = event.dataTransfer.files[0];
            if (droppedFile?.type === "application/pdf" || droppedFile?.name.endsWith(".pdf")) {
              void pickFile(droppedFile);
            }
          }}
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-colors hover:border-primary"
        >
          <UploadCloud className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">Drop a PDF file here</p>
          <p className="mt-1 text-sm text-muted-foreground">Split by page or export custom page ranges in your browser.</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(event) => {
              const nextFile = event.target.files?.[0];
              if (nextFile) {
                void pickFile(nextFile);
              }
            }}
          />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(file.size)}{pageCount ? ` • ${pageCount} pages` : ""}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("pages")}
              className={`rounded-lg border px-4 py-3 text-left transition-colors ${mode === "pages" ? "border-primary bg-primary/10" : "border-border"}`}
            >
              <p className="text-sm font-medium">Split every page</p>
              <p className="text-xs text-muted-foreground">One PDF per page</p>
            </button>
            <button
              type="button"
              onClick={() => setMode("ranges")}
              className={`rounded-lg border px-4 py-3 text-left transition-colors ${mode === "ranges" ? "border-primary bg-primary/10" : "border-border"}`}
            >
              <p className="text-sm font-medium">Custom page ranges</p>
              <p className="text-xs text-muted-foreground">Create grouped outputs</p>
            </button>
          </div>

          {mode === "ranges" && (
            <div className="space-y-2">
              <Label>Page ranges</Label>
              <Input value={ranges} onChange={(event) => setRanges(event.target.value)} placeholder="1-3, 4-6, 9" />
              <p className="text-xs text-muted-foreground">
                Use comma-separated ranges. Example: `1-3, 4-6, 9` creates three output PDFs.
              </p>
            </div>
          )}

          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            This split workflow keeps the document on your device and is ideal for separating reports, invoices, signed pages, or page packets without uploading the PDF to a server.
          </div>

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Splitting {progress.current} of {progress.total} outputs...
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={splitPdf}>
              <Scissors className="mr-2 h-4 w-4" />
              Split PDF
            </Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-100">
            <FileOutput className="mt-0.5 h-4 w-4 shrink-0" />
            Large PDFs may take longer because each split file is created locally in the browser.
          </div>
        </div>
      )}
    </div>
  );
}
