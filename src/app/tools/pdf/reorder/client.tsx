"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, Download, GripVertical, Loader2, RotateCcw, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils";
import { loadPdfLib } from "@/lib/pdf-browser";

interface PageItem {
  originalIndex: number;
  label: string;
}

export function PdfReorderClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function pickFile(nextFile: File) {
    setFile(nextFile);
    setError(null);
    setResultUrl(null);

    try {
      const PDFLib = await loadPdfLib() as {
        PDFDocument: { load: (bytes: ArrayBuffer) => Promise<{ getPageCount: () => number }> };
      };
      const doc = await PDFLib.PDFDocument.load(await nextFile.arrayBuffer());
      const total = doc.getPageCount();
      setPageCount(total);
      setPages(Array.from({ length: total }, (_, index) => ({
        originalIndex: index,
        label: `Page ${index + 1}`,
      })));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Could not read PDF.");
    }
  }

  function movePage(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= pages.length) return;
    setPages((currentPages) => {
      const nextPages = [...currentPages];
      const [movedPage] = nextPages.splice(fromIndex, 1);
      nextPages.splice(toIndex, 0, movedPage);
      return nextPages;
    });
  }

  async function saveReorderedPdf() {
    if (!file || pages.length === 0) return;
    setProcessing(true);
    setError(null);

    try {
      const PDFLib = await loadPdfLib() as {
        PDFDocument: {
          create: () => Promise<{
            copyPages: (source: unknown, indices: number[]) => Promise<unknown[]>;
            addPage: (page: unknown) => void;
            save: () => Promise<Uint8Array>;
          }>;
          load: (bytes: ArrayBuffer) => Promise<unknown>;
        };
      };

      const sourceDoc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
      const outputDoc = await PDFLib.PDFDocument.create();
      const copiedPages = await outputDoc.copyPages(
        sourceDoc,
        pages.map((page) => page.originalIndex),
      );
      copiedPages.forEach((page) => outputDoc.addPage(page));

      const bytes = await outputDoc.save();
      const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Reordering failed.");
    } finally {
      setProcessing(false);
    }
  }

  function reset() {
    setFile(null);
    setPages([]);
    setPageCount(0);
    setProcessing(false);
    setResultUrl(null);
    setResultSize(0);
    setError(null);
  }

  if (resultUrl && file) {
    const baseName = file.name.replace(/\.pdf$/i, "");
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Reordered PDF ready</h2>
          <div className="rounded-lg border bg-muted/40 p-4 text-center">
            <p className="text-sm text-muted-foreground">{pageCount} pages saved in the new order</p>
            <p className="mt-1 font-semibold">{formatFileSize(resultSize)}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}-reordered.pdf`}>
              <Button><Download className="mr-2 h-4 w-4" />Download PDF</Button>
            </a>
            <Button variant="outline" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />New file</Button>
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
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a PDF file here</p>
          <p className="text-sm text-muted-foreground mt-1">Rearrange the page order locally in your browser</p>
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
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)} • {pageCount} pages</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            Move pages up or down to set the new reading order before saving the PDF.
          </div>

          <div className="space-y-2">
            {pages.map((page, index) => (
              <div key={`${page.originalIndex}-${index}`} className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2">
                <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{page.label}</p>
                  <p className="text-xs text-muted-foreground">Current position {index + 1}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" onClick={() => movePage(index, index - 1)} disabled={index === 0}>
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => movePage(index, index + 1)} disabled={index === pages.length - 1}>
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {processing ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving reordered PDF...
            </div>
          ) : (
            <Button className="w-full" onClick={saveReorderedPdf}>Save Reordered PDF</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
