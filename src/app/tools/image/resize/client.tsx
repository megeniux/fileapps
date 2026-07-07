"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { processBrowserImage } from "@/lib/browser-image";
import { cn, formatFileSize, toBlob } from "@/lib/utils";
import { Maximize, Download, RotateCcw, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FORMAT_OPTIONS = [
  { value: "jpg",  label: "JPEG" },
  { value: "png",  label: "PNG"  },
  { value: "webp", label: "WebP" },
];

const QUALITY_OPTIONS = [
  { value: "95", label: "Maximum (95)" },
  { value: "85", label: "High (85)"    },
  { value: "75", label: "Balanced (75)"},
  { value: "60", label: "Smaller (60)" },
];

const QUICK_PRESETS = [
  { label: "Thumbnail",  width: 200,  height: 200  },
  { label: "Small",      width: 400,  height: 400  },
  { label: "Medium",     width: 800,  height: 600  },
  { label: "HD",         width: 1280, height: 720  },
  { label: "Full HD",    width: 1920, height: 1080 },
];

function ImageResizeDone({ output, file, onReset, onDownload }: {
  output: OutputFile | null; file: File | null; onReset: () => void; onDownload: () => void;
}) {
  const outputUrl = useMemo(
    () => (output ? URL.createObjectURL(toBlob(output.data, output.mime)) : ""),
    [output],
  );
  if (!output || !file) return null;

  return (
    <div className="space-y-6">
      <Badge variant="outline" className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
        ✓ Image resized
      </Badge>

      <img
        src={outputUrl}
        alt="Resized"
        className="max-w-full max-h-96 mx-auto rounded-lg border object-contain"
      />

      <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 border p-4 text-sm text-center">
        <div>
          <p className="text-muted-foreground text-xs mb-1">Original size</p>
          <p className="font-semibold">{formatFileSize(file.size)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">New size</p>
          <p className="font-semibold">{formatFileSize(output.data.length)}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onDownload} className="flex-1">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Resize Another
        </Button>
      </div>
    </div>
  );
}

function ImageResizeForm({ file, setOutput, setError, startProcessing, setProcessingState }: {
  file: File;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ffmpeg: any;
  setOutput: (o: OutputFile) => void;
  setError: (msg: string) => void;
  startProcessing: (state?: { status?: string }) => void;
  setProcessingState: (state: { progress?: number; status?: string }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const [width, setWidth]           = useState("1280");
  const [height, setHeight]         = useState("720");
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat]         = useState("jpg");
  const [quality, setQuality]       = useState("85");
  const [processing, setProcessing] = useState(false);

  // When width changes with aspect lock, auto-update height
  // (We store the natural aspect from the original file via inspection — but we don't have
  //  it here without reading the file. We'll just let the user manage it when unlocked.)

  const applyPreset = (w: number, h: number) => {
    setWidth(String(w));
    setHeight(String(h));
  };

  const handleResize = useCallback(async () => {
    const w = parseInt(width);
    const h = parseInt(height);
    if (!w || w < 1) { setError("Please enter a valid width."); return; }

    setProcessing(true);
    startProcessing({ status: "Resizing image…" });
    try {
      const result = await processBrowserImage(
        file,
        {
          outputFormat: format,
          quality: parseInt(quality),
          exactWidth: w,
          exactHeight: lockAspect ? undefined : (h || undefined),
          maintainAspect: lockAspect,
        },
        (pct) => setProcessingState({ progress: pct, status: "Resizing image…" }),
      );
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setOutput({ name: `resized_${baseName}.${result.ext}`, data: result.data, mime: result.mime });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Resize failed");
    } finally {
      setProcessing(false);
    }
  }, [width, height, lockAspect, format, quality, file, setOutput, setError, startProcessing, setProcessingState]);

  return (
    <div className="space-y-5">
      {/* Quick presets */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Quick presets</Label>
        <div className="flex flex-wrap gap-2">
          {QUICK_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p.width, p.height)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:border-primary hover:text-primary",
                width === String(p.width) && height === String(p.height)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              )}
            >
              {p.label} ({p.width}×{p.height})
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label>Dimensions</Label>
          <button
            type="button"
            onClick={() => setLockAspect((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {lockAspect
              ? <><Lock className="h-3.5 w-3.5" /> Aspect locked</>
              : <><Unlock className="h-3.5 w-3.5" /> Aspect unlocked</>}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <Label className="text-xs text-muted-foreground">Width (px)</Label>
            <Input type="number" min={1} max={10000} value={width}
              onChange={(e) => setWidth(e.target.value)} />
          </div>
          <span className="text-muted-foreground mt-5">×</span>
          <div className="flex-1 space-y-1">
            <Label className="text-xs text-muted-foreground">Height (px)</Label>
            <Input type="number" min={1} max={10000} value={height}
              onChange={(e) => setHeight(e.target.value)}
              disabled={lockAspect}
              className={lockAspect ? "opacity-50" : ""}
            />
          </div>
        </div>
        {lockAspect && (
          <p className="text-xs text-muted-foreground">
            Height is calculated automatically to preserve the original aspect ratio.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Output Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FORMAT_OPTIONS.map((f) => (
                <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Quality</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {QUALITY_OPTIONS.map((q) => (
                <SelectItem key={q.value} value={q.value}>{q.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleResize} disabled={processing} className="w-full" size="lg">
        <Maximize className="mr-2 h-4 w-4" />
        {processing ? "Resizing…" : "Resize Image"}
      </Button>
    </div>
  );
}

export function ImageResizeClient() {
  return (
    <ToolShell
      title="Image Resizer"
      description="Resize images to exact dimensions instantly — no upload needed"
      action="resize"
      accept="image/*"
      formats="JPG, PNG, WebP, AVIF"
      engine="browser-image"
      renderDone={(props) => <ImageResizeDone {...props} />}
    >
      {(props) => <ImageResizeForm {...props} />}
    </ToolShell>
  );
}
