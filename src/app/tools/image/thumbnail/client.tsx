"use client";

import { useCallback, useMemo, useState } from "react";
import { Download, Images, Lock, RotateCcw, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { runBrowserImageWorkerJob } from "@/lib/worker-jobs";
import { cn, formatFileSize, toBlob } from "@/lib/utils";

const PRESETS = [
  { value: "youtube", label: "YouTube Thumbnail", width: 1280, height: 720 },
  { value: "open-graph", label: "Open Graph Card", width: 1200, height: 630 },
  { value: "blog", label: "Blog Thumbnail", width: 800, height: 450 },
  { value: "store", label: "Product Card", width: 600, height: 600 },
  { value: "small", label: "Compact Preview", width: 320, height: 180 },
  { value: "custom", label: "Custom Size", width: 640, height: 360 },
] as const;

const FORMAT_OPTIONS = [
  { value: "jpg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

const QUALITY_OPTIONS = [
  { value: "92", label: "Maximum (92)" },
  { value: "85", label: "High (85)" },
  { value: "75", label: "Balanced (75)" },
  { value: "65", label: "Smaller (65)" },
];

function ThumbnailDone({
  output,
  file,
  onReset,
  onDownload,
}: {
  output: OutputFile | null;
  file: File | null;
  onReset: () => void;
  onDownload: () => void;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const outputUrl = useMemo(
    () => (output ? URL.createObjectURL(toBlob(output.data, output.mime)) : ""),
    [output],
  );
  const originalUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  if (!output || !file) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
        >
          Thumbnail ready
        </Badge>
        <span className="font-mono text-xs text-muted-foreground">{output.name}</span>
      </div>

      <img
        src={showOriginal ? originalUrl : outputUrl}
        alt={showOriginal ? "Original" : "Thumbnail"}
        className="mx-auto max-h-96 max-w-full rounded-lg border object-contain"
      />

      <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/40 p-4 text-center text-sm">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Original</p>
          <p className="font-semibold">{formatFileSize(file.size)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Thumbnail</p>
          <p className="font-semibold">{formatFileSize(output.data.length)}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => setShowOriginal((value) => !value)}>
          <Images className="mr-2 h-4 w-4" />
          {showOriginal ? "Show Thumbnail" : "Compare with Original"}
        </Button>
        <Button onClick={onDownload} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          New Image
        </Button>
      </div>
    </div>
  );
}

function ImageThumbnailForm({
  file,
  setOutput,
  setError,
  startProcessing,
  setProcessingState,
}: {
  file: File;
  ffmpeg: unknown;
  setOutput: (output: OutputFile) => void;
  setOutputs: (outputs: OutputFile[]) => void;
  setError: (error: string) => void;
  startProcessing: (state?: { progress?: number; status?: string; message?: string }) => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
  [key: string]: unknown;
}) {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]["value"]>("youtube");
  const [width, setWidth] = useState("1280");
  const [height, setHeight] = useState("720");
  const [keepAspect, setKeepAspect] = useState(true);
  const [format, setFormat] = useState("jpg");
  const [quality, setQuality] = useState("85");
  const [processing, setProcessing] = useState(false);

  const activePreset = PRESETS.find((item) => item.value === preset) ?? PRESETS[0];

  const applyPreset = useCallback((value: (typeof PRESETS)[number]["value"]) => {
    const nextPreset = PRESETS.find((item) => item.value === value) ?? PRESETS[0];
    setPreset(value);
    setWidth(String(nextPreset.width));
    setHeight(String(nextPreset.height));
  }, []);

  const handleGenerate = useCallback(async () => {
    const parsedWidth = parseInt(width, 10);
    const parsedHeight = parseInt(height, 10);

    if (!parsedWidth || parsedWidth < 1 || !parsedHeight || parsedHeight < 1) {
      setError("Enter a valid thumbnail width and height.");
      return;
    }

    setProcessing(true);
    startProcessing({ status: "Generating thumbnail...", message: file.name });

    try {
      const result = await runBrowserImageWorkerJob(
        file,
        {
          outputFormat: format,
          quality: parseInt(quality, 10),
          exactWidth: keepAspect ? undefined : parsedWidth,
          exactHeight: keepAspect ? undefined : parsedHeight,
          maxWidth: keepAspect ? parsedWidth : undefined,
          maxHeight: keepAspect ? parsedHeight : undefined,
          maintainAspect: keepAspect,
        },
        (progress) => setProcessingState({ progress, status: "Generating thumbnail...", message: file.name }),
      );

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setOutput({
        name: `${baseName}-thumbnail.${result.ext}`,
        data: result.data,
        mime: result.mime,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Thumbnail generation failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, format, height, keepAspect, quality, setError, setOutput, setProcessingState, startProcessing, width]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Preset</Label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => applyPreset(item.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary",
                preset === item.value ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {activePreset.label} targets {activePreset.width} x {activePreset.height}.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Dimensions</Label>
          <button
            type="button"
            onClick={() => setKeepAspect((value) => !value)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {keepAspect ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {keepAspect ? "Keep aspect ratio" : "Force exact size"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Width (px)</Label>
            <Input type="number" min={1} value={width} onChange={(event) => setWidth(event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Height (px)</Label>
            <Input type="number" min={1} value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {keepAspect
            ? "The tool fits the image inside the target box without stretching it."
            : "Exact mode forces the output to match your requested width and height."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Output Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FORMAT_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Quality</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {QUALITY_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs text-muted-foreground dark:border-blue-800 dark:bg-blue-950/30">
        Thumbnails are generated locally with browser-native resizing, which keeps small and medium image jobs fast.
      </div>

      <Button onClick={handleGenerate} disabled={processing} className="w-full" size="lg">
        {processing ? "Generating..." : "Generate Thumbnail"}
      </Button>
    </div>
  );
}

export function ImageThumbnailClient() {
  return (
    <ToolShell
      title="Thumbnail Generator"
      description="Generate image thumbnails in your browser with preset sizes for cards, previews, and social use."
      action="image-thumbnail"
      accept="image/*"
      formats="JPG, PNG, WebP, AVIF"
      engine="browser-image"
      renderDone={(props) => (
        <ThumbnailDone
          output={props.output}
          file={props.file}
          onReset={props.onReset}
          onDownload={props.onDownload}
        />
      )}
    >
      {(props) => <ImageThumbnailForm {...props} />}
    </ToolShell>
  );
}
