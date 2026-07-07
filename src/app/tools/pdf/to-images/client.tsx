"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud, Download, RotateCcw, Loader2, FileImage, Archive } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface PageResult { url: string; size: number; page: number; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadPdfJs(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.pdfjsLib) return w.pdfjsLib;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  w.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  return w.pdfjsLib;
}

export function PdfToImagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<PageResult[]>([]);
  const [format, setFormat] = useState("png");
  const [scale, setScale] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File) {
    setFile(f);
    setResults([]);
    setError(null);
  }

  async function convert() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResults([]);
    try {
      const pdfjs = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const total = pdf.numPages as number;
      setProgress({ current: 0, total });
      const pages: PageResult[] = [];
      const mime = format === "jpeg" ? "image/jpeg" : "image/png";
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: parseFloat(scale) });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width as number;
        canvas.height = viewport.height as number;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), mime, 0.92));
        pages.push({ url: URL.createObjectURL(blob), size: blob.size, page: i });
        setProgress({ current: i, total });
      }
      setResults(pages);
    } catch (err) {
      setError(String(err));
    } finally {
      setProcessing(false);
    }
  }

  async function downloadAll() {
    const JSZipSrc = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (!w.JSZip) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = JSZipSrc;
        s.onload = () => resolve();
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    const zip = new w.JSZip();
    const ext = format === "jpeg" ? "jpg" : "png";
    const baseName = file!.name.replace(/\.pdf$/i, "");
    for (const r of results) {
      const res = await fetch(r.url);
      const buf = await res.arrayBuffer();
      zip.file(`${baseName}_page${String(r.page).padStart(2, "0")}.${ext}`, buf);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${baseName}_pages.zip`;
    a.click();
  }

  function reset() { setFile(null); setResults([]); setError(null); }

  const baseName = file ? file.name.replace(/\.pdf$/i, "") : "page";
  const ext = format === "jpeg" ? "jpg" : "png";

  if (results.length > 0) {
    return (
      <div className="container max-w-3xl py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{results.length} page{results.length !== 1 ? "s" : ""} extracted</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadAll}>
              <Archive className="w-4 h-4 mr-2" />Download ZIP
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-1" />New file
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {results.map((r) => (
            <div key={r.page} className="rounded-xl border bg-card overflow-hidden">
              <div className="bg-muted/30 flex items-center justify-center h-36 overflow-hidden">
                <img src={r.url} alt={`Page ${r.page}`} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Page {r.page}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(r.size)}</p>
                </div>
                <a href={r.url} download={`${baseName}_page${String(r.page).padStart(2, "0")}.${ext}`}>
                  <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10 space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f?.type === "application/pdf" || f?.name.endsWith(".pdf")) pickFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <FileImage className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a PDF file here</p>
          <p className="text-sm text-muted-foreground mt-1">PDF files only — processed entirely in your browser</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }}
          />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Image format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (lossless)</SelectItem>
                  <SelectItem value="jpeg">JPG (smaller)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Resolution</Label>
              <Select value={scale} onValueChange={setScale}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1× — 72 dpi (screen)</SelectItem>
                  <SelectItem value="2">2× — 144 dpi (recommended)</SelectItem>
                  <SelectItem value="3">3× — 216 dpi (high-res)</SelectItem>
                  <SelectItem value="4">4× — 288 dpi (print)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Rendering page {progress.current} of {progress.total}…
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={convert}>Convert to images</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
