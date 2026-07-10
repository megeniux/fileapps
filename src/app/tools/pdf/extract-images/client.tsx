"use client";

import { useRef, useState } from "react";
import { zipSync } from "fflate";
import { Archive, Download, FileImage, Loader2, RotateCcw, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils";
import { loadPdfJs } from "@/lib/pdf-browser";

interface ExtractedImage {
  name: string;
  url: string;
  size: number;
  page: number;
}

function dataViewToPng(data: Uint8ClampedArray, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas rendering is not available in this browser.");
  }
  context.putImageData(new ImageData(Uint8ClampedArray.from(data), width, height), 0, 0);
  return new Promise<Blob>((resolve) => canvas.toBlob((blob) => resolve(blob!), "image/png"));
}

async function objectToBlob(object: unknown): Promise<Blob | null> {
  if (!object || typeof object !== "object") return null;

  const imageCandidate = object as {
    width?: number;
    height?: number;
    data?: Uint8ClampedArray | Uint8Array;
    bitmap?: ImageBitmap;
  };

  if (imageCandidate.bitmap instanceof ImageBitmap) {
    const canvas = document.createElement("canvas");
    canvas.width = imageCandidate.bitmap.width;
    canvas.height = imageCandidate.bitmap.height;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas rendering is not available in this browser.");
    }
    context.drawImage(imageCandidate.bitmap, 0, 0);
    return new Promise<Blob>((resolve) => canvas.toBlob((blob) => resolve(blob!), "image/png"));
  }

  if (
    typeof imageCandidate.width === "number" &&
    typeof imageCandidate.height === "number" &&
    imageCandidate.data instanceof Uint8ClampedArray
  ) {
    return dataViewToPng(imageCandidate.data, imageCandidate.width, imageCandidate.height);
  }

  if (
    typeof imageCandidate.width === "number" &&
    typeof imageCandidate.height === "number" &&
    imageCandidate.data instanceof Uint8Array
  ) {
    return dataViewToPng(new Uint8ClampedArray(imageCandidate.data), imageCandidate.width, imageCandidate.height);
  }

  return null;
}

export function PdfExtractImagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<ExtractedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setProcessing(false);
    setProgress({ current: 0, total: 0 });
    setResults([]);
    setError(null);
  }

  async function extractImages() {
    if (!file) return;
    setProcessing(true);
    setResults([]);
    setError(null);

    try {
      const pdfjs = await loadPdfJs() as unknown as {
        OPS: Record<string, number>;
        getDocument: (options: { data: ArrayBuffer }) => { promise: Promise<{ numPages: number; getPage: (page: number) => Promise<any> }> };
      };

      const sourceDoc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
      const nextResults: ExtractedImage[] = [];
      const imageOps = new Set<number>([
        pdfjs.OPS.paintImageXObject,
        pdfjs.OPS.paintJpegXObject,
        pdfjs.OPS.paintInlineImageXObject,
      ]);

      setProgress({ current: 0, total: sourceDoc.numPages });

      for (let pageNumber = 1; pageNumber <= sourceDoc.numPages; pageNumber += 1) {
        const page = await sourceDoc.getPage(pageNumber);
        const operatorList = await page.getOperatorList();
        const seenNames = new Set<string>();

        for (let index = 0; index < operatorList.fnArray.length; index += 1) {
          if (!imageOps.has(operatorList.fnArray[index])) continue;

          const args = operatorList.argsArray[index];
          const objectName = typeof args?.[0] === "string" ? args[0] : null;
          const inlineObject = !objectName && args?.[0] && typeof args[0] === "object" ? args[0] : null;

          if (objectName && seenNames.has(`${pageNumber}-${objectName}`)) {
            continue;
          }

          let object: unknown = inlineObject;
          if (objectName) {
            seenNames.add(`${pageNumber}-${objectName}`);
            try {
              object = page.objs.get(objectName);
            } catch {
              try {
                object = page.commonObjs.get(objectName);
              } catch {
                object = null;
              }
            }
          }

          const blob = await objectToBlob(object);
          if (!blob) continue;

          const name = `page-${pageNumber}-image-${nextResults.length + 1}.png`;
          nextResults.push({
            name,
            url: URL.createObjectURL(blob),
            size: blob.size,
            page: pageNumber,
          });
        }

        setProgress({ current: pageNumber, total: sourceDoc.numPages });
      }

      if (nextResults.length === 0) {
        setError("No extractable raster images were found. Some PDFs only contain text, vectors, or page renderings rather than reusable embedded image objects.");
      }

      setResults(nextResults);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Image extraction failed.");
    } finally {
      setProcessing(false);
    }
  }

  async function downloadAll() {
    const files: Record<string, Uint8Array> = {};
    for (const result of results) {
      const response = await fetch(result.url);
      files[result.name] = new Uint8Array(await response.arrayBuffer());
    }
    const archive = zipSync(files, { level: 0 });
    const blob = new Blob([archive], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "pdf-extracted-images.zip";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (results.length > 0) {
    return (
      <div className="container max-w-3xl py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">{results.length} images extracted</h2>
            <p className="text-sm text-muted-foreground">Best-effort extraction of embedded raster images</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadAll}>
              <Archive className="mr-2 h-4 w-4" />
              Download ZIP
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New file
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <div key={result.name} className="rounded-xl border bg-card overflow-hidden">
              <div className="bg-muted/30 flex items-center justify-center h-44 overflow-hidden">
                <img src={result.url} alt={result.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{result.name}</p>
                  <p className="text-xs text-muted-foreground">Page {result.page} • {formatFileSize(result.size)}</p>
                </div>
                <a href={result.url} download={result.name}>
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
          <p className="text-sm text-muted-foreground mt-1">Find and export embedded raster images locally in your browser</p>
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

          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            This is a best-effort embedded-image extractor. It works for many raster-image PDFs, but documents made mostly of vectors, flattened page renderings, or unusual PDF internals may not yield reusable image files.
          </div>

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning page {progress.current} of {progress.total}...
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }} />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={extractImages}>
              <FileImage className="mr-2 h-4 w-4" />
              Extract Images
            </Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
