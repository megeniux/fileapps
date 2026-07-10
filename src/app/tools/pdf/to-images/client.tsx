"use client";

import { useMemo, useRef, useState } from "react";
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
import { getRuntimePerformanceProfile } from "@/lib/runtime-performance";

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface PageResult {
  url: string;
  size: number;
  page: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadPdfJs(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (win.pdfjsLib) return win.pdfjsLib;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  win.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  return win.pdfjsLib;
}

export function PdfToImagesClient() {
  const runtimeProfile = useMemo(() => getRuntimePerformanceProfile(), []);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<PageResult[]>([]);
  const [format, setFormat] = useState("png");
  const [scale, setScale] = useState(String(runtimeProfile.defaultPdfScale));
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scaleOptions = useMemo(() => {
    const allOptions = [
      { value: "1", label: "1x - 72 dpi (screen)" },
      { value: "2", label: "2x - 144 dpi (recommended)" },
      { value: "3", label: "3x - 216 dpi (high-res)" },
      { value: "4", label: "4x - 288 dpi (print)" },
    ];

    return allOptions.filter((option) => parseInt(option.value, 10) <= runtimeProfile.maxRecommendedPdfScale);
  }, [runtimeProfile.maxRecommendedPdfScale]);

  function pickFile(nextFile: File) {
    setFile(nextFile);
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

      for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: parseFloat(scale) });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width as number;
        canvas.height = viewport.height as number;
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas rendering is not available in this browser.");
        }
        await page.render({ canvasContext: context, viewport }).promise;
        const blob = await new Promise<Blob>((resolve) => canvas.toBlob((value) => resolve(value!), mime, 0.92));
        pages.push({ url: URL.createObjectURL(blob), size: blob.size, page: pageNumber });
        setProgress({ current: pageNumber, total });
      }

      setResults(pages);
    } catch (nextError) {
      setError(String(nextError));
    } finally {
      setProcessing(false);
    }
  }

  async function downloadAll() {
    const jsZipSrc = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (!win.JSZip) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = jsZipSrc;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    const zip = new win.JSZip();
    const ext = format === "jpeg" ? "jpg" : "png";
    const baseName = file!.name.replace(/\.pdf$/i, "");
    for (const result of results) {
      const response = await fetch(result.url);
      const buffer = await response.arrayBuffer();
      zip.file(`${baseName}_page${String(result.page).padStart(2, "0")}.${ext}`, buffer);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `${baseName}_pages.zip`;
    anchor.click();
  }

  function reset() {
    setFile(null);
    setResults([]);
    setError(null);
  }

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
          {results.map((result) => (
            <div key={result.page} className="rounded-xl border bg-card overflow-hidden">
              <div className="bg-muted/30 flex items-center justify-center h-36 overflow-hidden">
                <img src={result.url} alt={`Page ${result.page}`} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Page {result.page}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(result.size)}</p>
                </div>
                <a href={result.url} download={`${baseName}_page${String(result.page).padStart(2, "0")}.${ext}`}>
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
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const droppedFile = event.dataTransfer.files[0];
            if (droppedFile?.type === "application/pdf" || droppedFile?.name.endsWith(".pdf")) pickFile(droppedFile);
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <FileImage className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a PDF file here</p>
          <p className="text-sm text-muted-foreground mt-1">PDF files only - processed entirely in your browser</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(event) => {
              const nextFile = event.target.files?.[0];
              if (nextFile) pickFile(nextFile);
            }}
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
                  {scaleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Resolution defaults adjust to your device so large PDFs are less likely to hit browser memory limits.
              </p>
            </div>
          </div>

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Rendering page {progress.current} of {progress.total}...
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
