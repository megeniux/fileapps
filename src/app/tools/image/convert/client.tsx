"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { isBrowserFormat } from "@/lib/browser-image";
import { mapWithConcurrency } from "@/lib/async";
import { getRuntimePerformanceProfile } from "@/lib/runtime-performance";
import { formatFileSize, toBlob, cn } from "@/lib/utils";
import { runBrowserImageWorkerJob } from "@/lib/worker-jobs";
import { ArrowLeftRight, Download, RotateCcw, WandSparkles } from "lucide-react";

const OUTPUT_FORMATS = [
  { value: "webp", label: "WebP", note: "Best for web, usually smaller than JPEG." },
  { value: "jpg", label: "JPEG", note: "Universal compatibility and strong photo support." },
  { value: "png", label: "PNG", note: "Lossless output with transparency support." },
  { value: "avif", label: "AVIF", note: "Next-gen format that often produces the smallest files." },
];

const QUALITY_PRESETS = [
  { value: "95", label: "Maximum (95)" },
  { value: "85", label: "High (85)" },
  { value: "75", label: "Balanced (75)" },
  { value: "60", label: "Smaller (60)" },
];

function buildBatchItems(files: File[], activeIndex: number, completedCount: number) {
  return files.map((file, index) => ({
    label: file.name,
    state:
      index < completedCount
        ? "done"
        : index === activeIndex
          ? "active"
          : "pending",
  })) as Array<{ label: string; state: "pending" | "active" | "done" }>;
}

function ImageConvertDone({
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
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
        >
          Converted
        </Badge>
        <span className="max-w-[220px] truncate font-mono text-xs text-muted-foreground">{output.name}</span>
      </div>

      <div className="relative">
        <img
          src={showOriginal ? originalUrl : outputUrl}
          alt={showOriginal ? "Original" : "Converted"}
          className="mx-auto max-h-96 max-w-full rounded-lg border object-contain"
        />
        <div className="absolute left-2 top-2">
          <Badge variant="secondary" className="text-xs">
            {showOriginal ? "Original" : "Converted"}
          </Badge>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={() => setShowOriginal((value) => !value)}>
        <ArrowLeftRight className="mr-2 h-4 w-4" />
        {showOriginal ? "Show Converted" : "Compare with Original"}
      </Button>

      <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/50 p-4 text-center text-sm">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Original</p>
          <p className="font-semibold">{formatFileSize(file.size)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Converted</p>
          <p className="font-semibold">{formatFileSize(output.data.length)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">{smaller ? "Saved" : "Larger"}</p>
          <p
            className={cn(
              "font-semibold",
              smaller ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400",
            )}
          >
            {smaller ? `-${reduction}%` : `+${reduction}%`}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onDownload} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Convert Another
        </Button>
      </div>
    </div>
  );
}

function BatchConvertDone({
  outputs,
  files,
  onReset,
  onDownloadAll,
}: {
  outputs: OutputFile[];
  files: File[];
  onReset: () => void;
  onDownloadAll: () => void;
}) {
  const originalTotal = files.reduce((sum, file) => sum + file.size, 0);
  const outputTotal = outputs.reduce((sum, output) => sum + output.data.length, 0);
  const reduction = originalTotal > 0
    ? Math.round(((originalTotal - outputTotal) / originalTotal) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
        >
          {outputs.length} images converted
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/50 p-4 text-center text-sm">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Original total</p>
          <p className="font-semibold">{formatFileSize(originalTotal)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Converted total</p>
          <p className="font-semibold">{formatFileSize(outputTotal)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">{reduction >= 0 ? "Reduction" : "Increase"}</p>
          <p
            className={cn(
              "font-semibold",
              reduction >= 0 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400",
            )}
          >
            {reduction >= 0 ? `-${reduction}%` : `+${Math.abs(reduction)}%`}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {outputs.map((nextOutput, index) => (
          <div
            key={nextOutput.name}
            className="flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-3"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-xs">{nextOutput.name}</p>
              <p className="text-xs text-muted-foreground">
                From {files[index]?.name ?? "source"} - {formatFileSize(nextOutput.data.length)}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const blob = toBlob(nextOutput.data, nextOutput.mime);
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = nextOutput.name;
                anchor.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onDownloadAll} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download All
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Convert Another Batch
        </Button>
      </div>
    </div>
  );
}

function ImageConvertForm({
  file,
  files,
  setOutput,
  setOutputs,
  setError,
  startProcessing,
  setProcessingState,
}: {
  file: File;
  files: File[];
  ffmpeg: unknown;
  setOutput: (output: OutputFile) => void;
  setOutputs: (outputs: OutputFile[]) => void;
  setError: (msg: string) => void;
  startProcessing: (state?: {
    progress?: number;
    status?: string;
    message?: string;
    items?: Array<{ label: string; state: "pending" | "active" | "done" }>;
  }) => void;
  setProcessingState: (state: {
    progress?: number;
    status?: string;
    message?: string;
    items?: Array<{ label: string; state: "pending" | "active" | "done" }>;
  }) => void;
  [key: string]: unknown;
}) {
  const [outputFormat, setOutputFormat] = useState("webp");
  const [quality, setQuality] = useState("85");
  const [processing, setProcessing] = useState(false);
  const runtimeProfile = useMemo(() => getRuntimePerformanceProfile(), []);
  const formatInfo = OUTPUT_FORMATS.find((item) => item.value === outputFormat);

  const handleConvert = useCallback(async () => {
    const normFmt = outputFormat === "jpg" ? "jpeg" : outputFormat;
    if (!isBrowserFormat(normFmt)) {
      setError(`Format ${outputFormat} is not supported for browser-native conversion.`);
      return;
    }

    setProcessing(true);
    startProcessing({
      status: files.length > 1 ? `Converting 1 of ${files.length} images` : "Converting image...",
      message: files[0]?.name,
      items: files.length > 1 ? buildBatchItems(files, 0, 0) : undefined,
    });

    try {
      if (files.length === 1) {
        const result = await runBrowserImageWorkerJob(
          file,
          { outputFormat, quality: parseInt(quality, 10) },
          (pct) => setProcessingState({ progress: pct, status: "Converting image..." }),
        );
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        setOutput({ name: `${baseName}.${result.ext}`, data: result.data, mime: result.mime });
        return;
      }

      const batchOutputs: OutputFile[] = [];
      const itemProgress = new Array(files.length).fill(0);
      const activeItems = new Set<number>();
      const completedItems = new Set<number>();
      const buildItems = () => files.map((currentFile, currentIndex) => ({
        label: currentFile.name,
        state: completedItems.has(currentIndex)
          ? "done"
          : activeItems.has(currentIndex)
            ? "active"
            : "pending",
      })) as Array<{ label: string; state: "pending" | "active" | "done" }>;

      const outputs = await mapWithConcurrency(files, runtimeProfile.batchConcurrency, async (currentFile, index) => {
        activeItems.add(index);
        setProcessingState({
          progress: Math.round(itemProgress.reduce((sum, value) => sum + value, 0) / files.length),
          status: `Converting ${Math.max(1, completedItems.size + 1)} of ${files.length} images`,
          message: currentFile.name,
          items: buildItems(),
        });

        const result = await runBrowserImageWorkerJob(
          currentFile,
          { outputFormat, quality: parseInt(quality, 10) },
          (pct) => {
            itemProgress[index] = pct;
            setProcessingState({
              progress: Math.round(itemProgress.reduce((sum, value) => sum + value, 0) / files.length),
              status: `Converting ${Math.max(1, completedItems.size + 1)} of ${files.length} images`,
              message: currentFile.name,
              items: buildItems(),
            });
          },
        );

        activeItems.delete(index);
        completedItems.add(index);
        itemProgress[index] = 100;

        setProcessingState({
          progress: Math.round(itemProgress.reduce((sum, value) => sum + value, 0) / files.length),
          status: `Converted ${completedItems.size} of ${files.length} images`,
          message: currentFile.name,
          items: buildItems(),
        });

        const baseName = currentFile.name.replace(/\.[^/.]+$/, "");
        return {
          name: `${baseName}.${result.ext}`,
          data: result.data,
          mime: result.mime,
        };
      });

      batchOutputs.push(...outputs);

      setOutputs(batchOutputs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setProcessing(false);
    }
  }, [outputFormat, quality, file, files, runtimeProfile.batchConcurrency, setOutput, setOutputs, setError, startProcessing, setProcessingState]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Output Format</Label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {OUTPUT_FORMATS.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
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
              {QUALITY_PRESETS.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Higher quality usually means larger output files.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs text-muted-foreground dark:border-blue-800 dark:bg-blue-950/30">
        <WandSparkles className="h-3.5 w-3.5 shrink-0 text-blue-500" />
        {files.length > 1
          ? `Batch conversion runs entirely in your browser and adapts to your device with up to ${runtimeProfile.batchConcurrency} image${runtimeProfile.batchConcurrency > 1 ? "s" : ""} at a time.`
          : "Processed entirely in your browser with no uploads."}
      </div>

      <Button onClick={handleConvert} disabled={processing} className="w-full" size="lg">
        <WandSparkles className="mr-2 h-4 w-4" />
        {processing
          ? files.length > 1
            ? `Converting ${files.length} Images...`
            : "Converting..."
          : files.length > 1
            ? `Convert ${files.length} Images to ${outputFormat.toUpperCase()}`
            : `Convert to ${outputFormat.toUpperCase()}`}
      </Button>
    </div>
  );
}

export function ImageConvertClient() {
  return (
    <ToolShell
      title="Image Converter"
      description="Convert images between formats instantly with no upload needed."
      action="convert"
      accept="image/*"
      formats="JPG, PNG, WebP, AVIF"
      engine="browser-image"
      fileRequirement={{
        accept: "image/*",
        formats: "JPG, PNG, WebP, AVIF",
        minCount: 1,
        maxCount: 20,
      }}
      renderDone={(props) => props.outputs.length > 1 ? (
        <BatchConvertDone
          outputs={props.outputs}
          files={props.files}
          onReset={props.onReset}
          onDownloadAll={props.onDownloadAll}
        />
      ) : (
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
