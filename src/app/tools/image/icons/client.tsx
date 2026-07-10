"use client";

import { useRef, useState } from "react";
import { zipSync } from "fflate";
import { Archive, Download, Loader2, RotateCcw, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils";
import { canvasToBlob, loadImageElement } from "@/lib/image-canvas";

const ICON_SIZES = [16, 32, 48, 64, 180, 192, 512];

interface IconResult {
  name: string;
  url: string;
  size: number;
}

export function ImageIconsClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<IconResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setProcessing(false);
    setResults([]);
    setError(null);
  }

  async function generateIcons() {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const image = await loadImageElement(file);
      const nextResults: IconResult[] = [];

      for (const size of ICON_SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas rendering is not available in this browser.");
        }

        const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
        const offsetX = (image.naturalWidth - sourceSize) / 2;
        const offsetY = (image.naturalHeight - sourceSize) / 2;
        context.drawImage(image, offsetX, offsetY, sourceSize, sourceSize, 0, 0, size, size);
        const blob = await canvasToBlob(canvas, "image/png");
        nextResults.push({
          name: `icon-${size}x${size}.png`,
          url: URL.createObjectURL(blob),
          size: blob.size,
        });
      }

      setResults(nextResults);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Icon generation failed.");
    } finally {
      setProcessing(false);
    }
  }

  async function downloadZip() {
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
    anchor.download = "favicon-app-icons.zip";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (results.length > 0) {
    return (
      <div className="container max-w-3xl py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Icon set ready</h2>
            <p className="text-sm text-muted-foreground">{results.length} PNG icons generated</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadZip}>
              <Archive className="mr-2 h-4 w-4" />
              Download ZIP
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New image
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((result) => (
            <div key={result.name} className="rounded-xl border bg-card p-4 text-center space-y-3">
              <div className="bg-muted/30 flex items-center justify-center rounded-lg p-4 min-h-28">
                <img src={result.url} alt={result.name} className="max-h-20 max-w-full object-contain" />
              </div>
              <div>
                <p className="text-xs font-medium">{result.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(result.size)}</p>
              </div>
              <a href={result.url} download={result.name}>
                <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" />Download</Button>
              </a>
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
            const nextFile = event.dataTransfer.files[0];
            if (nextFile?.type.startsWith("image/")) {
              setFile(nextFile);
              setError(null);
            }
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop an image here</p>
          <p className="text-sm text-muted-foreground mt-1">Generate practical favicon and app-icon PNG sizes from one source image</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
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
            The generator creates a centered square crop for common favicon, Apple touch, and PWA-style PNG sizes.
          </div>

          {processing ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating icon set...
            </div>
          ) : (
            <Button className="w-full" onClick={generateIcons}>Generate Icon Set</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
