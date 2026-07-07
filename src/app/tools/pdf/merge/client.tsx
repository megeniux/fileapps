"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download, RotateCcw, Trash2, GripVertical } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

const PDFLIB_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";

async function loadPdfLib(): Promise<void> {
  const w = window as any;
  if (w.PDFLib) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFLIB_CDN;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load pdf-lib"));
    document.head.appendChild(script);
  });
}

export function PdfMergeClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [resultPages, setResultPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIdx = useRef<number | null>(null);

  function addFiles(newFiles: FileList | File[]) {
    const pdfs = Array.from(newFiles).filter((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      return [...prev, ...pdfs.filter((f) => !existing.has(f.name + f.size))];
    });
    setResultUrl(null);
    setError(null);
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function onDragStart(idx: number) { dragIdx.current = idx; }
  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    const from = dragIdx.current;
    if (from === null || from === idx) return;
    setFiles((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(idx, 0, item);
      dragIdx.current = idx;
      return arr;
    });
  }

  async function merge() {
    if (files.length < 2) return;
    setProcessing(true);
    setError(null);
    try {
      await loadPdfLib();
      const w = window as any;
      const { PDFDocument } = w.PDFLib;
      const merged = await PDFDocument.create();
      let totalPages = 0;

      for (const file of files) {
        const buf = await file.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p: any) => merged.addPage(p));
        totalPages += pages.length;
      }

      const bytes = await merged.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      setResultPages(totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Merge failed");
    } finally {
      setProcessing(false);
    }
  }

  function reset() { setFiles([]); setResultUrl(null); setError(null); }

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Merged PDF</h2>
          <div className="rounded-lg bg-muted/40 p-4 text-center space-y-1">
            <p className="text-2xl font-bold">{resultPages} pages</p>
            <p className="text-sm text-muted-foreground">{formatFileSize(resultSize)} · merged from {files.length} PDFs</p>
          </div>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download="merged.pdf">
              <Button><Download className="w-4 h-4 mr-2" />Download PDF</Button>
            </a>
            <Button variant="outline" onClick={() => setResultUrl(null)}>Merge again</Button>
            <Button variant="ghost" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Start over</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10 space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
        <p className="font-medium">Drop PDF files here</p>
        <p className="text-sm text-muted-foreground mt-1">Select multiple PDFs to merge</p>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple className="hidden"
          onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />
      </div>

      {files.length > 0 && (
        <div className="rounded-xl border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{files.length} PDF{files.length > 1 ? "s" : ""} · drag to reorder</p>
            <Button variant="ghost" size="sm" onClick={() => inputRef.current?.click()}>Add more</Button>
          </div>

          <div className="space-y-2">
            {files.map((f, i) => (
              <div
                key={`${f.name}-${f.size}-${i}`}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => onDragOver(e, i)}
                className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2 cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 truncate">{f.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">{formatFileSize(f.size)}</span>
                <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            className="w-full"
            onClick={merge}
            disabled={files.length < 2 || processing}
          >
            {processing ? "Merging…" : `Merge ${files.length} PDFs`}
          </Button>
          {files.length < 2 && (
            <p className="text-xs text-muted-foreground text-center">Add at least 2 PDF files to merge</p>
          )}
        </div>
      )}
    </div>
  );
}
