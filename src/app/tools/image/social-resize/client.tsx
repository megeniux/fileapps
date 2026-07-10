"use client";

import { useRef, useState } from "react";
import { zipSync } from "fflate";
import { Archive, Download, Loader2, RotateCcw, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatFileSize } from "@/lib/utils";
import { canvasToBlob, loadImageElement } from "@/lib/image-canvas";

const PRESET_GROUPS = {
  instagram: [
    { name: "instagram-square", width: 1080, height: 1080 },
    { name: "instagram-portrait", width: 1080, height: 1350 },
    { name: "instagram-story", width: 1080, height: 1920 },
  ],
  x: [
    { name: "x-post", width: 1600, height: 900 },
    { name: "x-header", width: 1500, height: 500 },
  ],
  facebook: [
    { name: "facebook-post", width: 1200, height: 630 },
    { name: "facebook-story", width: 1080, height: 1920 },
  ],
  linkedin: [
    { name: "linkedin-post", width: 1200, height: 627 },
    { name: "linkedin-banner", width: 1584, height: 396 },
  ],
  web: [
    { name: "open-graph", width: 1200, height: 630 },
    { name: "blog-hero", width: 1280, height: 720 },
    { name: "article-thumb", width: 800, height: 450 },
  ],
} as const;

const FORMAT_OPTIONS = [
  { value: "jpg", label: "JPEG", mime: "image/jpeg", quality: 0.9 },
  { value: "png", label: "PNG", mime: "image/png", quality: undefined },
  { value: "webp", label: "WebP", mime: "image/webp", quality: 0.9 },
];

interface SocialResult {
  name: string;
  url: string;
  size: number;
}

export function ImageSocialResizeClient() {
  const [file, setFile] = useState<File | null>(null);
  const [group, setGroup] = useState<keyof typeof PRESET_GROUPS>("instagram");
  const [format, setFormat] = useState("jpg");
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<SocialResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setResults([]);
    setProcessing(false);
    setError(null);
  }

  async function generateSocialSizes() {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const image = await loadImageElement(file);
      const selectedFormat = FORMAT_OPTIONS.find((option) => option.value === format) ?? FORMAT_OPTIONS[0];
      const nextResults: SocialResult[] = [];

      for (const preset of PRESET_GROUPS[group]) {
        const canvas = document.createElement("canvas");
        canvas.width = preset.width;
        canvas.height = preset.height;
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas rendering is not available in this browser.");
        }

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
        const drawWidth = image.naturalWidth * scale;
        const drawHeight = image.naturalHeight * scale;
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        const blob = await canvasToBlob(canvas, selectedFormat.mime, selectedFormat.quality);
        nextResults.push({
          name: `${preset.name}.${selectedFormat.value === "jpg" ? "jpg" : selectedFormat.value}`,
          url: URL.createObjectURL(blob),
          size: blob.size,
        });
      }

      setResults(nextResults);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Social resize failed.");
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
    anchor.download = `social-${group}-resizes.zip`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (results.length > 0) {
    return (
      <div className="container max-w-4xl py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Social sizes ready</h2>
            <p className="text-sm text-muted-foreground">{results.length} exports generated for the {group} set</p>
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <div key={result.name} className="rounded-xl border bg-card overflow-hidden">
              <div className="bg-muted/30 flex items-center justify-center min-h-36 p-4">
                <img src={result.url} alt={result.name} className="max-h-28 max-w-full object-contain" />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium">{result.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(result.size)}</p>
                </div>
                <a href={result.url} download={result.name}>
                  <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" />Download</Button>
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
          <p className="text-sm text-muted-foreground mt-1">Generate common platform-ready sizes for social and web placements</p>
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Preset group</Label>
              <Select value={group} onValueChange={(value) => setGroup(value as keyof typeof PRESET_GROUPS)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="x">X / Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="web">Web / Open Graph</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            The exports keep the image’s aspect ratio and place it inside the requested canvas size, which is safer than stretching the picture to fit.
          </div>

          {processing ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating social sizes...
            </div>
          ) : (
            <Button className="w-full" onClick={generateSocialSizes}>Generate Sizes</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
