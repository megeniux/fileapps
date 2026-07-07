"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { processBrowserImage, isBrowserFormat } from "@/lib/browser-image";
import { formatFileSize, toBlob, cn } from "@/lib/utils";
import { ArrowLeftRight, Download, RotateCcw, WandSparkles } from "lucide-react";

const OUTPUT_FORMATS = [
  { value: "webp", label: "WebP",  note: "Best for web — 25–35% smaller than JPEG" },
  { value: "jpg",  label: "JPEG",  note: "Universal compatibility, ideal for photos" },
  { value: "png",  label: "PNG",   note: "Lossless, supports transparency" },
  { value: "avif", label: "AVIF",  note: "Next-gen format — smallest file size" },
];

const QUALITY_PRESETS = [
  { value: "95", label: "Maximum (95)" },
  { value: "85", label: "High (85)" },
  { value: "75", label: "Balanced (75)" },
  { value: "60", label: "Smaller (60)" },
];

function ImageConvertDone({
  output, file, onReset, onDownload,
}: {
  output: OutputFile | null;
  file: File | null;
  onReset: () => void;
  onDownload: () => void;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const originalUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  const outputUrl = useMemo(
    () => (output ? URL.createObjectURL(toBlob(output.data, output.mime)) : ""),
    [output],
  );
  if (!output || !file) return null;

  const delta = output.data.length - file.size;
  const reduction = Math.round((Math.abs(delta) / file.size) * 100);
  const smaller = delta < 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
          ✓ Converted
        </Badge>
        <span className="text-xs text-muted-foreground font-mono truncate max-w-[220px]">{output.name}</span>
      </div>

      <div className="relative">
        <img
          src={showOriginal ? originalUrl : outputUrl}
          alt={showOriginal ? "Original" : "Converted"}
          className="max-w-full max-h-96 mx-auto rounded-lg border object-contain"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs">
            {showOriginal ? "Original" : "Converted"}
          </Badge>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={() => setShowOriginal((v) => !v)}>
        <ArrowLeftRight className="mr-2 h-4 w-4" />
        {showOriginal ? "Show Converted" : "Compare with Original"}
      </Button>

      <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/50 border p-4 text-sm text-center">
        <div>
          <p className="text-muted-foreground text-xs mb-1">Original</p>
          <p className="font-semibold">{formatFileSize(file.size)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Converted</p>
          <p className="font-semibold">{formatFileSize(output.data.length)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">{smaller ? "Saved" : "Larger"}</p>
          <p className={cn("font-semibold", smaller ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400")}>
            {smaller ? `-${reduction}%` : `+${reduction}%`}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onDownload} className="flex-1">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Convert Another
        </Button>
      </div>
    </div>
  );
}

function ImageConvertForm({
  file, setOutput, setError, startProcessing, setProcessingState,
}: {
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
  const [outputFormat, setOutputFormat] = useState("webp");
  const [quality, setQuality] = useState("85");
  const [processing, setProcessing] = useState(false);
  const formatInfo = OUTPUT_FORMATS.find((f) => f.value === outputFormat);

  const handleConvert = useCallback(async () => {
    const normFmt = outputFormat === "jpg" ? "jpeg" : outputFormat;
    if (!isBrowserFormat(normFmt)) {
      setError(`Format ${outputFormat} is not supported for browser-native conversion.`);
      return;
    }
    setProcessing(true);
    startProcessing({ status: "Converting image…" });
    try {
      const result = await processBrowserImage(
        file,
        { outputFormat, quality: parseInt(quality) },
        (pct) => setProcessingState({ progress: pct, status: "Converting image…" }),
      );
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setOutput({ name: `${baseName}.${result.ext}`, data: result.data, mime: result.mime });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setProcessing(false);
    }
  }, [outputFormat, quality, file, setOutput, setError, startProcessing, setProcessingState]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          {formatInfo && <p className="text-xs text-muted-foreground">{formatInfo.note}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Quality</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {QUALITY_PRESETS.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Higher quality = larger file size</p>
        </div>
      </div>

      <div className="rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-4 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
        <WandSparkles className="h-3.5 w-3.5 text-blue-500 shrink-0" />
        Processed entirely in your browser — no upload, instant results.
      </div>

      <Button onClick={handleConvert} disabled={processing} className="w-full" size="lg">
        <WandSparkles className="mr-2 h-4 w-4" />
        {processing ? "Converting…" : `Convert to ${outputFormat.toUpperCase()}`}
      </Button>
    </div>
  );
}

export function ImageConvertClient() {
  return (
    <ToolShell
      title="Image Converter"
      description="Convert images between formats instantly — no upload needed"
      action="convert"
      accept="image/*"
      formats="JPG, PNG, WebP, AVIF"
      engine="browser-image"
      renderDone={(props) => (
        <ImageConvertDone
          output={props.output}
          file={props.file}
          onReset={props.onReset}
          onDownload={props.onDownload}
        />
      )}
    >
      {(props) => <ImageConvertForm {...props} />}
    </ToolShell>
  );
}
