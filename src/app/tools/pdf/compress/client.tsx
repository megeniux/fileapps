"use client";

import { useMemo, useRef, useState } from "react";
import { Download, FileDown, Loader2, RotateCcw, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatFileSize } from "@/lib/utils";
import { loadPdfJs, loadPdfLib } from "@/lib/pdf-browser";
import { getRuntimePerformanceProfile } from "@/lib/runtime-performance";

const PRESETS = [
  { value: "light", label: "Light compression", scale: 1.75, quality: 0.86 },
  { value: "balanced", label: "Balanced", scale: 1.35, quality: 0.76 },
  { value: "strong", label: "Strong compression", scale: 1, quality: 0.62 },
];

export function PdfCompressClient() {
  const runtimeProfile = useMemo(() => getRuntimePerformanceProfile(), []);
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState("balanced");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setProcessing(false);
    setProgress({ current: 0, total: 0 });
    setResultUrl(null);
    setResultSize(0);
    setError(null);
  }

  async function compressPdf() {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const selectedPreset = PRESETS.find((item) => item.value === preset) ?? PRESETS[1];
      const adjustedScale = Math.min(selectedPreset.scale, runtimeProfile.maxRecommendedPdfScale);
      const pdfjs = await loadPdfJs() as unknown as {
        getDocument: (options: { data: ArrayBuffer }) => { promise: Promise<{ numPages: number; getPage: (page: number) => Promise<any> }> };
      };
      const PDFLib = await loadPdfLib() as {
        PDFDocument: {
          create: () => Promise<{
            addPage: (size: [number, number]) => {
              drawImage: (image: { width: number; height: number }, options: { x: number; y: number; width: number; height: number }) => void;
            };
            embedJpg: (bytes: Uint8Array) => Promise<{ width: number; height: number }>;
            save: () => Promise<Uint8Array>;
          }>;
        };
      };

      const sourceBytes = await file.arrayBuffer();
      const sourceDoc = await pdfjs.getDocument({ data: sourceBytes }).promise;
      const outputDoc = await PDFLib.PDFDocument.create();
      setProgress({ current: 0, total: sourceDoc.numPages });

      for (let pageNumber = 1; pageNumber <= sourceDoc.numPages; pageNumber += 1) {
        const page = await sourceDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale: adjustedScale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width as number;
        canvas.height = viewport.height as number;
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas rendering is not available in this browser.");
        }

        await page.render({ canvasContext: context, viewport }).promise;
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((value) => resolve(value!), "image/jpeg", selectedPreset.quality),
        );
        const imageBytes = new Uint8Array(await blob.arrayBuffer());
        const image = await outputDoc.embedJpg(imageBytes);
        const nextPage = outputDoc.addPage([viewport.width as number, viewport.height as number]);
        nextPage.drawImage(image, {
          x: 0,
          y: 0,
          width: viewport.width as number,
          height: viewport.height as number,
        });
        setProgress({ current: pageNumber, total: sourceDoc.numPages });
      }

      const compressedBytes = await outputDoc.save();
      const blob = new Blob([Uint8Array.from(compressedBytes)], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "PDF compression failed.");
    } finally {
      setProcessing(false);
    }
  }

  if (resultUrl && file) {
    const baseName = file.name.replace(/\.pdf$/i, "");
    const delta = file.size - resultSize;
    const reduction = file.size > 0 ? Math.round((Math.abs(delta) / file.size) * 100) : 0;
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Compressed PDF ready</h2>
          <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/40 p-4 text-center text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Original</p>
              <p className="font-semibold">{formatFileSize(file.size)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Compressed</p>
              <p className="font-semibold">{formatFileSize(resultSize)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{delta >= 0 ? "Reduction" : "Increase"}</p>
              <p className="font-semibold">{delta >= 0 ? `-${reduction}%` : `+${reduction}%`}</p>
            </div>
          </div>
          <div className="rounded-lg border bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            This browser-only PDF compression rebuilds pages as lighter images, which is effective for scanned or image-heavy PDFs but can soften text and vector artwork.
          </div>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}-compressed.pdf`}>
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
              setFile(droppedFile);
              setError(null);
            }
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a PDF file here</p>
          <p className="text-sm text-muted-foreground mt-1">Reduce size locally for email or upload limits</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(event) => {
              const nextFile = event.target.files?.[0];
              if (nextFile) {
                setFile(nextFile);
                setError(null);
              }
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

          <div className="space-y-2">
            <Label>Compression preset</Label>
            <Select value={preset} onValueChange={setPreset}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PRESETS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Lower presets keep more detail. Stronger presets make smaller files, especially for scans and image-heavy PDFs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            This browser-only compressor is best for scanned, exported, or image-heavy PDFs. Because it rebuilds pages visually, it is not the right choice if you need perfectly sharp vector text.
          </div>

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Compressing page {progress.current} of {progress.total}...
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }} />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={compressPdf}>
              <FileDown className="mr-2 h-4 w-4" />
              Compress PDF
            </Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
