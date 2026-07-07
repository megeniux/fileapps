"use client";

import { useCallback, useState } from "react";
import { Download, Images } from "lucide-react";
import { zipSync } from "fflate";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { ToolFormRenderer } from "@/components/tools/tool-form-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchFile } from "@/lib/ffmpeg";
import { formatFileSize, toBlob } from "@/lib/utils";
import type { ToolControlDefinition } from "@/lib/tool-types";
import { getToolById } from "@/lib/tools";

const controls: ToolControlDefinition[] = [
  {
    label: "Compression Level",
    key: "quality",
    type: "range",
    min: 40,
    max: 95,
    step: 5,
    defaultValue: "75",
    helpText: "Lower quality usually means smaller files across the full batch.",
  },
  {
    label: "Output Format",
    key: "format",
    type: "select",
    options: [
      { value: "jpg", label: "JPEG" },
      { value: "webp", label: "WebP" },
    ],
    defaultValue: "jpg",
  },
  {
    label: "Strip Metadata",
    key: "stripMetadata",
    type: "toggle",
    defaultValue: "true",
    helpText: "Remove embedded metadata from every exported image.",
  },
];

function getBatchMime(format: string) {
  return format === "webp" ? "image/webp" : "image/jpeg";
}

function getBaseName(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, "");
}

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

function BatchDone({
  outputs,
  files,
  failedItems,
  onReset,
  onDownloadAll,
  onDownloadZip,
  onRetryFailed,
}: {
  outputs: OutputFile[];
  files: File[];
  failedItems: Array<{ file: File; message: string }>;
  onReset: () => void;
  onDownloadAll: () => void;
  onDownloadZip: () => void;
  onRetryFailed: () => void;
}) {
  const originalTotal = files.reduce((sum, file) => sum + file.size, 0);
  const outputTotal = outputs.reduce((sum, output) => sum + output.data.length, 0);
  const reduction = originalTotal > 0
    ? Math.round(((originalTotal - outputTotal) / originalTotal) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
          {outputs.length} files processed
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/40 p-4 text-center text-sm">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Original total</p>
          <p className="font-semibold">{formatFileSize(originalTotal)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Output total</p>
          <p className="font-semibold">{formatFileSize(outputTotal)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Reduction</p>
          <p className="font-semibold text-green-600 dark:text-green-400">
            {reduction > 0 ? `-${reduction}%` : reduction < 0 ? `+${Math.abs(reduction)}%` : "0%"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {outputs.map((output, index) => (
          <div
            key={output.name}
            className="flex items-center justify-between rounded-lg border bg-background px-3 py-3"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-xs">{output.name}</p>
              <p className="text-xs text-muted-foreground">
                From {files[index]?.name ?? "source"} - {formatFileSize(output.data.length)}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const blob = toBlob(output.data, output.mime);
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = output.name;
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

      {failedItems.length > 0 && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {failedItems.length} file{failedItems.length > 1 ? "s" : ""} failed
            </p>
            <Button variant="outline" size="sm" onClick={onRetryFailed}>
              Retry Failed Files
            </Button>
          </div>
          <div className="space-y-2">
            {failedItems.map((item) => (
              <div key={`${item.file.name}-${item.file.size}`} className="rounded-md border bg-background px-3 py-2">
                <p className="truncate font-mono text-xs">{item.file.name}</p>
                <p className="text-xs text-muted-foreground">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={onDownloadAll} className="flex-1">
          <Images className="mr-2 h-4 w-4" />
          Download All Individually
        </Button>
        <Button variant="outline" onClick={onDownloadZip}>
          <Download className="mr-2 h-4 w-4" />
          Download ZIP
        </Button>
        <Button variant="outline" onClick={onReset}>
          Process Another Batch
        </Button>
      </div>
    </div>
  );
}

function BatchCompressForm({
  files,
  ffmpeg,
  setOutputs,
  setError,
  startProcessing,
  setProcessingState,
  onBatchFailures,
}: {
  files: File[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ffmpeg: any;
  setOutputs: (outputs: OutputFile[]) => void;
  setError: (error: string) => void;
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
  onBatchFailures: (items: Array<{ file: File; message: string }>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    quality: "75",
    format: "jpg",
    stripMetadata: "true",
  });
  const [processing, setProcessing] = useState(false);

  const handleProcess = useCallback(async () => {
    if (!ffmpeg.instance?.current?.loaded) {
      setError("Media engine not loaded. Please refresh and try again.");
      return;
    }

    setProcessing(true);
    startProcessing({
      progress: 0,
      status: `Compressing 1 of ${files.length} images`,
      message: files[0]?.name ?? "Preparing batch...",
      items: buildBatchItems(files, 0, 0),
    });

    try {
      const inst = ffmpeg.instance.current;
      const outputExt = values.format;
      const batchOutputs: OutputFile[] = [];
      const failedItems: Array<{ file: File; message: string }> = [];

      for (let index = 0; index < files.length; index += 1) {
        const currentFile = files[index];
        const baseProgress = Math.round((index / files.length) * 100);
        setProcessingState({
          progress: baseProgress,
          status: `Compressing ${index + 1} of ${files.length} images`,
          message: currentFile.name,
          items: buildBatchItems(files, index, index),
        });
        const inputExt = currentFile.name.split(".").pop()?.toLowerCase() || "png";
        const inputName = `input-${index}.${inputExt}`;
        const outputName = `output-${index}.${outputExt}`;
        const quality = parseInt(values.quality, 10);

        try {
          await inst.writeFile(inputName, await fetchFile(currentFile));

          const args = ["-i", inputName];
          if (values.stripMetadata === "true") {
            args.push("-map_metadata", "-1");
          }
          if (outputExt === "webp") {
            args.push("-c:v", "libwebp", "-quality", String(quality));
          } else {
            args.push("-q:v", String(Math.max(1, Math.round((100 - quality) / 10))));
          }
          args.push(outputName);

          await inst.exec(args);

          const data = await inst.readFile(outputName) as Uint8Array;
          batchOutputs.push({
            name: `${getBaseName(currentFile.name)}-compressed.${outputExt}`,
            data,
            mime: getBatchMime(outputExt),
          });

          setProcessingState({
            progress: Math.round(((index + 1) / files.length) * 100),
            status: `Compressed ${index + 1} of ${files.length} images`,
            message: currentFile.name,
            items: buildBatchItems(files, Math.min(index + 1, files.length - 1), index + 1),
          });
        } catch (error) {
          failedItems.push({
            file: currentFile,
            message: error instanceof Error ? error.message : "Compression failed for this image.",
          });
        } finally {
          await inst.deleteFile(inputName).catch(() => {});
          await inst.deleteFile(outputName).catch(() => {});
        }
      }

      onBatchFailures(failedItems);
      if (batchOutputs.length === 0) {
        setError("All files in this batch failed. Retry the failed files or choose different settings.");
        return;
      }
      setOutputs(batchOutputs);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Batch compression failed");
    } finally {
      setProcessing(false);
    }
  }, [ffmpeg, files, onBatchFailures, setError, setOutputs, setProcessingState, startProcessing, values]);

  return (
    <div className="space-y-6">
      <ToolFormRenderer
        controls={controls}
        values={values}
        onValueChange={(key, value) => {
          setValues((prev) => ({ ...prev, [key]: value }));
        }}
      />

      <Button onClick={handleProcess} disabled={processing} className="w-full" size="lg">
        <Images className="mr-2 h-4 w-4" />
        {processing ? `Compressing ${files.length} images...` : `Compress ${files.length} Images`}
      </Button>
    </div>
  );
}

export function BatchCompressClient() {
  const tool = getToolById("image-batch-compress");
  const [failedItems, setFailedItems] = useState<Array<{ file: File; message: string }>>([]);
  const [retryFiles, setRetryFiles] = useState<File[]>([]);
  const [shellKey, setShellKey] = useState(0);

  if (!tool) return null;

  const handleDownloadZip = (outputs: OutputFile[]) => {
    const archive = zipSync(
      Object.fromEntries(
        outputs.map((output) => [output.name, output.data])
      ),
      { level: 6 }
    );
    const blob = new Blob([archive.buffer.slice(archive.byteOffset, archive.byteOffset + archive.byteLength)], {
      type: "application/zip",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "batch-image-compress.zip";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell
      key={shellKey}
      title="Batch Image Compress"
      description="Compress multiple images at once with consistent quality settings."
      action="batch-compress"
      accept={tool.runtime.input.accept}
      formats={tool.runtime.input.formats}
      initialFiles={retryFiles}
      fileRequirement={tool.runtime.input}
      renderDone={({ outputs, files, onReset, onDownloadAll }) => (
        <BatchDone
          outputs={outputs}
          files={files}
          failedItems={failedItems}
          onReset={() => {
            setFailedItems([]);
            setRetryFiles([]);
            onReset();
          }}
          onDownloadAll={onDownloadAll}
          onDownloadZip={() => handleDownloadZip(outputs)}
          onRetryFailed={() => {
            if (failedItems.length === 0) return;
            setRetryFiles(failedItems.map((item) => item.file));
            setShellKey((value) => value + 1);
          }}
        />
      )}
    >
      {(props) => (
        <BatchCompressForm
          {...props}
          onBatchFailures={(items) => {
            setFailedItems(items);
            setRetryFiles([]);
          }}
        />
      )}
    </ToolShell>
  );
}
