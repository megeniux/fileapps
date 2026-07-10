"use client";

import { useMemo, useRef, useState } from "react";
import { Download, RotateCcw, ShieldCheck, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { runBrowserImageWorkerJob } from "@/lib/worker-jobs";
import { formatFileSize, toBlob } from "@/lib/utils";

const FORMAT_OPTIONS = [
  { value: "jpg", label: "JPEG", mime: "image/jpeg" },
  { value: "png", label: "PNG", mime: "image/png" },
  { value: "webp", label: "WebP", mime: "image/webp" },
];

export function ImageMetadataClient() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("jpg");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ name: string; data: Uint8Array; mime: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const outputUrl = useMemo(
    () => (result ? URL.createObjectURL(toBlob(result.data, result.mime)) : null),
    [result],
  );

  async function stripMetadata() {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const processed = await runBrowserImageWorkerJob(
        file,
        { outputFormat: format, quality: 92 },
        (pct) => setProgress(pct),
      );
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setResult({
        name: `${baseName}-clean.${processed.ext}`,
        data: processed.data,
        mime: processed.mime,
      });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Metadata removal failed.");
    } finally {
      setProcessing(false);
    }
  }

  function reset() {
    setFile(null);
    setProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
  }

  if (result && file && outputUrl) {
    return (
      <div className="container max-w-2xl py-10 space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center dark:bg-green-950 dark:text-green-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">{result.name}</p>
              <p className="text-sm text-muted-foreground">Export rebuilt without carrying over embedded metadata</p>
            </div>
          </div>
          <img src={outputUrl} alt="Metadata-clean result" className="max-h-96 max-w-full rounded-lg border object-contain mx-auto" />
          <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/40 p-4 text-center text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Original</p>
              <p className="font-semibold">{formatFileSize(file.size)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Clean export</p>
              <p className="font-semibold">{formatFileSize(result.data.length)}</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <a href={outputUrl} download={result.name}>
              <Button><Download className="mr-2 h-4 w-4" />Download</Button>
            </a>
            <Button variant="outline" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />New image</Button>
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
          <p className="text-sm text-muted-foreground mt-1">Remove hidden EXIF, GPS, and camera metadata before sharing</p>
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

          <div className="space-y-2">
            <Label>Output format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {FORMAT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            This works by rebuilding the image locally in your browser. That preserves the visible picture but drops hidden metadata such as EXIF, GPS coordinates, camera model data, and similar tags.
          </div>

          {processing ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Removing metadata... {progress}%</p>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={stripMetadata}>Remove Metadata</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
