"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { runBrowserImageWorkerJob } from "@/lib/worker-jobs";
import { runSingleFFmpegJob } from "@/lib/ffmpeg-jobs";
import { cn, formatFileSize, toBlob } from "@/lib/utils";
import { FileDown, TrendingDown, Download, RotateCcw, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COMPRESSION_PRESETS = [
  { value: "low", label: "Low (90% - High Quality)", quality: 90 },
  { value: "medium", label: "Medium (75% - Balanced)", quality: 75 },
  { value: "high", label: "High (60% - Small Size)", quality: 60 },
  { value: "maximum", label: "Maximum (40% - Smallest)", quality: 40 },
  { value: "custom", label: "Custom Quality...", quality: 75 },
];

const OUTPUT_FORMATS = [
  { value: "webp", label: "WebP (25-35% smaller than JPEG)" },
  { value: "jpg", label: "JPEG (universal compatibility)" },
  { value: "png", label: "PNG (lossless)" },
  { value: "avif", label: "AVIF (next-gen, smallest)" },
  { value: "same", label: "Keep original format" },
];

const COMPRESSION_MODES = [
  { value: "lossy", label: "Lossy (smaller files)" },
  { value: "lossless", label: "Lossless (no visible data loss)" },
];

const METADATA_MODES = [
  { value: "strip", label: "Strip metadata (recommended for privacy)" },
  { value: "preserve", label: "Preserve metadata (slower, FFmpeg path)" },
];

function estimateReduction(preset: string, format: string, resize: boolean): string {
  const base: Record<string, string> = {
    low: "10-30%",
    medium: "40-60%",
    high: "60-75%",
    maximum: "75-85%",
    custom: "varies",
  };
  let note = base[preset] || "40-60%";
  if (format === "webp" || format === "avif") note += " + format bonus";
  if (resize) note += " + resize savings";
  return note;
}

function ImageCompareDone({
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
  const [sliderPct, setSliderPct] = useState(50);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const originalUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  const outputUrl = useMemo(
    () => (output ? URL.createObjectURL(toBlob(output.data, output.mime)) : ""),
    [output],
  );
  if (!output || !file) return null;

  const reduction = Math.round(((file.size - output.data.length) / file.size) * 100);
  const saved = file.size - output.data.length;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const move = (ev: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((ev.clientX - rect.left) / rect.width) * 100));
      setSliderPct(pct);
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const onTouchStart = () => {
    const move = (ev: TouchEvent) => {
      const el = wrapperRef.current;
      if (!el || !ev.touches[0]) return;
      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((ev.touches[0].clientX - rect.left) / rect.width) * 100));
      setSliderPct(pct);
    };
    const end = () => {
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", end);
    };
    document.addEventListener("touchmove", move, { passive: true });
    document.addEventListener("touchend", end);
  };

  return (
    <div className="space-y-6">
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
      >
        Image compressed
      </Badge>

      <div
        ref={wrapperRef}
        className="relative w-full cursor-ew-resize overflow-hidden rounded-lg border select-none"
        style={{ maxHeight: 400 }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <img
          src={outputUrl}
          alt="Compressed"
          className="block h-full w-full object-contain"
          draggable={false}
        />

        <img
          src={originalUrl}
          alt="Original"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_4px_rgba(0,0,0,0.6)]"
          style={{ left: `${sliderPct}%` }}
        />

        <div
          className="pointer-events-none absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg"
          style={{ left: `${sliderPct}%` }}
        >
          <ArrowLeftRight className="h-3.5 w-3.5 text-gray-600" />
        </div>

        <span className="pointer-events-none absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
          Original
        </span>
        <span className="pointer-events-none absolute right-2 top-2 rounded bg-primary/80 px-2 py-0.5 text-[10px] font-medium text-white">
          Compressed
        </span>
      </div>

      <p className="text-center text-xs text-muted-foreground">Drag to compare left and right</p>

      <div className="grid grid-cols-4 gap-3 rounded-lg border bg-muted/50 p-4 text-center text-sm">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Original</p>
          <p className="font-semibold">{formatFileSize(file.size)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Compressed</p>
          <p className="font-semibold">{formatFileSize(output.data.length)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Saved</p>
          <p className={cn("font-semibold", saved > 0 ? "text-green-600 dark:text-green-400" : "text-muted-foreground")}>
            {saved > 0 ? formatFileSize(saved) : "-"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Reduction</p>
          <p className={cn("font-semibold", reduction > 0 ? "text-green-600 dark:text-green-400" : "text-muted-foreground")}>
            {reduction > 0 ? `${reduction}%` : "-"}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onDownload} className="flex-1">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Compress Another
        </Button>
      </div>
    </div>
  );
}

function ImageCompressForm({
  file,
  ffmpeg,
  setOutput,
  setError,
  startProcessing,
  setProcessingState,
}: {
  file: File;
  ffmpeg: {
    instance: { current: { loaded?: boolean } | null };
    load: () => Promise<{ loaded?: boolean } | null>;
    markStage?: (stage: "reading-file" | "processing" | "writing-output") => void;
    markDone?: () => void;
  };
  setOutput: (o: OutputFile) => void;
  setError: (msg: string) => void;
  startProcessing: (state?: { progress?: number; status?: string; message?: string }) => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
  [key: string]: unknown;
}) {
  const [preset, setPreset] = useState("medium");
  const [customQuality, setCustomQuality] = useState("75");
  const [compressionMode, setCompressionMode] = useState("lossy");
  const [metadataMode, setMetadataMode] = useState("strip");
  const [outputFormat, setOutputFormat] = useState("webp");
  const [resizeBefore, setResizeBefore] = useState(false);
  const [maxWidth, setMaxWidth] = useState("1920");
  const [maxHeight, setMaxHeight] = useState("1080");
  const [processing, setProcessing] = useState(false);

  const estimate = useMemo(
    () => estimateReduction(preset, outputFormat, resizeBefore),
    [preset, outputFormat, resizeBefore],
  );

  const quality =
    preset === "custom"
      ? parseInt(customQuality) || 75
      : (COMPRESSION_PRESETS.find((p) => p.value === preset)?.quality ?? 75);

  const resolvedFormat = useMemo(() => {
    if (outputFormat !== "same") return outputFormat;
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    if (["jpg", "jpeg"].includes(ext)) return "jpg";
    if (ext === "png") return "png";
    if (ext === "webp") return "webp";
    if (ext === "avif") return "avif";
    return "jpg";
  }, [outputFormat, file]);

  const effectiveFormat = useMemo(() => {
    if (compressionMode === "lossless") {
      if (resolvedFormat === "jpg" || resolvedFormat === "avif") {
        return "png";
      }
    }
    return resolvedFormat;
  }, [compressionMode, resolvedFormat]);

  const handleCompress = useCallback(async () => {
    setProcessing(true);
    startProcessing({
      status: metadataMode === "preserve" ? "Preparing FFmpeg image compression..." : "Compressing image with worker",
    });
    try {
      if (metadataMode === "preserve") {
        const loaded = await ffmpeg.load();
        if (!loaded) {
          throw new Error("Media engine failed to load. Please try again.");
        }

        const result = await runSingleFFmpegJob({
          ffmpeg,
          file,
          outputExt: effectiveFormat,
          setProcessingState,
          buildArgs: (inputName, outputName) => {
            const args = ["-i", inputName];
            const filters: string[] = [];
            const normalizedQuality = compressionMode === "lossless" ? 100 : quality;

            if (resizeBefore) {
              filters.push(`scale='min(iw,${parseInt(maxWidth, 10) || 1920})':'min(ih,${parseInt(maxHeight, 10) || 1080})':force_original_aspect_ratio=decrease`);
            }
            if (filters.length > 0) {
              args.push("-vf", filters.join(","));
            }

            args.push("-map_metadata", "0");

            if (effectiveFormat === "webp") {
              args.push("-c:v", "libwebp");
              if (compressionMode === "lossless") {
                args.push("-lossless", "1");
              } else {
                args.push("-quality", String(normalizedQuality));
              }
            } else if (effectiveFormat === "png") {
              args.push("-c:v", "png", "-compression_level", String(Math.min(9, Math.max(0, Math.round((100 - normalizedQuality) / 10)))));
            } else if (effectiveFormat === "avif") {
              args.push("-c:v", "libaom-av1");
              args.push("-crf", String(Math.min(63, Math.max(0, 63 - Math.round((normalizedQuality / 100) * 40)))));
            } else {
              args.push("-q:v", String(Math.max(1, Math.round((100 - normalizedQuality) / 10))));
            }

            args.push(outputName);
            return args;
          },
        });

        const baseName = file.name.replace(/\.[^/.]+$/, "");
        const mimeMap: Record<string, string> = {
          jpg: "image/jpeg",
          png: "image/png",
          webp: "image/webp",
          avif: "image/avif",
        };
        setOutput({
          name: `compressed_${baseName}.${effectiveFormat}`,
          data: result,
          mime: mimeMap[effectiveFormat] ?? "image/jpeg",
        });
        return;
      }

      const result = await runBrowserImageWorkerJob(
        file,
        {
          outputFormat: effectiveFormat,
          quality: compressionMode === "lossless" ? 100 : quality,
          ...(resizeBefore
            ? {
                maxWidth: parseInt(maxWidth) || 1920,
                maxHeight: parseInt(maxHeight) || 1080,
              }
            : {}),
        },
        (pct) => setProcessingState({ progress: pct, status: "Compressing image with worker" }),
      );
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setOutput({
        name: `compressed_${baseName}.${result.ext}`,
        data: result.data,
        mime: result.mime,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compression failed");
    } finally {
      setProcessing(false);
    }
  }, [
    compressionMode,
    metadataMode,
    effectiveFormat,
    ffmpeg,
    quality,
    resizeBefore,
    maxWidth,
    maxHeight,
    file,
    setOutput,
    setError,
    startProcessing,
    setProcessingState,
  ]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Compression Mode</Label>
          <Select value={compressionMode} onValueChange={setCompressionMode}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COMPRESSION_MODES.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>{mode.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Lossy reduces file size more aggressively. Lossless keeps pixel data safer but usually saves less.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label>Compression Level</Label>
          <Select value={preset} onValueChange={setPreset}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COMPRESSION_PRESETS.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Output Format</Label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {OUTPUT_FORMATS.map((f) => (
                <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Metadata</Label>
          <Select value={metadataMode} onValueChange={setMetadataMode}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {METADATA_MODES.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>{mode.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {compressionMode === "lossy" && preset === "custom" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Custom Quality</Label>
            <span className="text-sm font-semibold text-primary">{customQuality}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={customQuality}
            onChange={(e) => setCustomQuality(e.target.value)}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Smallest</span>
            <span>Best Quality</span>
          </div>
        </div>
      )}

      {compressionMode === "lossless" && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-muted-foreground dark:border-emerald-800 dark:bg-emerald-950/30">
          Lossless mode keeps visual data intact. If you choose a lossy-only destination like JPEG, the export will fall back to PNG automatically.
        </div>
      )}

      <div className="rounded-md border bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground">
        {metadataMode === "preserve"
          ? "Metadata preserve mode uses the FFmpeg path instead of the faster browser worker so the output can keep embedded tags when the destination format supports them."
          : "Browser-based compression removes embedded metadata such as EXIF camera details, GPS information, and orientation tags from the exported image. That is useful for privacy, but it is not the right workflow if you need to preserve original metadata."}
      </div>

      <div className="space-y-3">
        <label className="flex cursor-pointer select-none items-center gap-2">
          <input
            type="checkbox"
            checked={resizeBefore}
            onChange={(e) => setResizeBefore(e.target.checked)}
            className="rounded accent-primary"
          />
          <span className="text-sm font-medium">Resize before compression</span>
        </label>
        {resizeBefore && (
          <div className="ml-6 grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Max Width (px)</Label>
              <Input type="number" min={100} max={5000} value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Max Height (px)</Label>
              <Input type="number" min={100} max={5000} value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} />
            </div>
            <p className="col-span-2 -mt-1 text-xs text-muted-foreground">
              Only resizes if larger than these dimensions and preserves aspect ratio.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm dark:border-green-800 dark:bg-green-950/30">
        <TrendingDown className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
        <span className="text-muted-foreground">Estimated reduction:</span>
        <span className="font-semibold text-green-700 dark:text-green-400">{estimate}</span>
      </div>

      <Button onClick={handleCompress} disabled={processing} className="w-full" size="lg">
        <FileDown className="mr-2 h-4 w-4" />
        {processing ? "Compressing..." : "Compress Image"}
      </Button>
    </div>
  );
}

export function ImageCompressClient() {
  return (
    <ToolShell
      title="Image Compressor"
      description="Compress images in your browser with worker-backed processing, advanced controls, and no uploads"
      action="compress"
      accept="image/*"
      formats="JPG, PNG, WebP, AVIF (max 50MB)"
      engine="browser-image"
      renderDone={(props) => <ImageCompareDone {...props} />}
    >
      {(props) => <ImageCompressForm {...props} />}
    </ToolShell>
  );
}
