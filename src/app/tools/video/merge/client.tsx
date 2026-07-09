"use client";

import { useCallback, useState } from "react";
import { Film, Download } from "lucide-react";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { ToolFormRenderer } from "@/components/tools/tool-form-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  buildFFmpegProgressItems,
  cleanupFFmpegWorkspaceFiles,
  writeFFmpegWorkspaceFiles,
} from "@/lib/ffmpeg-jobs";
import { formatFileSize } from "@/lib/utils";
import type { ToolControlDefinition } from "@/lib/tool-types";
import { getToolById } from "@/lib/tools";

const controls: ToolControlDefinition[] = [
  {
    label: "Merge Method",
    key: "method",
    type: "select",
    options: [
      { value: "concat", label: "Concatenate (Fast, same-style clips)" },
      { value: "reencode", label: "Re-encode (More compatible)" },
    ],
    defaultValue: "reencode",
    helpText: "Use concatenate for similar source clips. Re-encode is safer for mixed inputs.",
  },
  {
    label: "Output Format",
    key: "format",
    type: "select",
    options: [
      { value: "mp4", label: "MP4" },
      { value: "webm", label: "WebM" },
    ],
    defaultValue: "mp4",
  },
  {
    label: "Custom File Name",
    key: "filenameStem",
    type: "text",
    defaultValue: "",
    placeholder: "merged-video",
    helpText: "Optional. Leave empty to use the default merged name.",
  },
];

function buildVideoConcatFilter(fileCount: number) {
  const inputs = Array.from({ length: fileCount }, (_, index) => `[${index}:v:0][${index}:a:0]`).join("");
  return `${inputs}concat=n=${fileCount}:v=1:a=1[outv][outa]`;
}

function VideoMergeDone({
  output,
  files,
  onReset,
  onDownload,
}: {
  output: OutputFile | null;
  files: File[];
  onReset: () => void;
  onDownload: () => void;
}) {
  if (!output) return null;

  const originalTotal = files.reduce((sum, file) => sum + file.size, 0);
  const reduction = originalTotal > 0
    ? Math.round(((originalTotal - output.data.length) / originalTotal) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
          {files.length} clips merged
        </Badge>
      </div>

      <div className="rounded-lg border bg-muted/40 p-4 text-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium">Merge summary</p>
          <p className="text-xs text-muted-foreground">Output: {formatFileSize(output.data.length)}</p>
        </div>
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-md border bg-background px-3 py-2">
              <span className="truncate pr-4 font-mono text-xs">{index + 1}. {file.name}</span>
              <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/30 p-4 text-center text-sm">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Source clips</p>
          <p className="font-semibold">{files.length}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Source total</p>
          <p className="font-semibold">{formatFileSize(originalTotal)}</p>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Size change</p>
          <p className="font-semibold">
            {reduction > 0 ? `-${reduction}%` : reduction < 0 ? `+${Math.abs(reduction)}%` : "0%"}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onDownload} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download Merged Video
        </Button>
        <Button variant="outline" onClick={onReset}>
          Merge Another Batch
        </Button>
      </div>
    </div>
  );
}

function VideoMergeForm({
  files,
  ffmpeg,
  setOutput,
  setError,
  startProcessing,
  setProcessingState,
}: {
  file: File;
  files: File[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ffmpeg: any;
  setOutput: (output: OutputFile) => void;
  setOutputs: (outputs: OutputFile[]) => void;
  setError: (error: string) => void;
  startProcessing: (state?: { progress?: number; status?: string; message?: string; items?: Array<{ label: string; state: "pending" | "active" | "done" }> }) => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string; items?: Array<{ label: string; state: "pending" | "active" | "done" }> }) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    method: "reencode",
    format: "mp4",
    filenameStem: "",
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
      status: `Preparing ${files.length} clips`,
      message: "Writing source clips into the processing workspace...",
      items: buildFFmpegProgressItems(files, 0, 0),
    });

    try {
      const inst = ffmpeg.instance.current;
      const outputExt = values.format || "mp4";
      const outputName = `output.${outputExt}`;
      const inputNames = await writeFFmpegWorkspaceFiles({
        ffmpeg,
        files,
        setProcessingState,
        getInputName: (currentFile, index) => {
          const inputExt = currentFile.name.split(".").pop()?.toLowerCase() || "mp4";
          return `input-${index}.${inputExt}`;
        },
        getStatus: (index, total) => `Loading clip ${index + 1} of ${total}`,
      });

      if (values.method === "concat") {
        setProcessingState({
          progress: 45,
          status: "Concatenating clips",
          message: "Using concat mode for faster merging.",
          items: buildFFmpegProgressItems(files, files.length - 1, 0),
        });
        const listContent = inputNames.map((name) => `file '${name}'`).join("\n");
        await inst.writeFile("concat-list.txt", new TextEncoder().encode(listContent));
        setProcessingState({ status: "Processing...", message: "This may take a while for large files." });
        await inst.exec([
          "-f", "concat",
          "-safe", "0",
          "-i", "concat-list.txt",
          "-c", "copy",
          outputName,
        ]);
      } else {
        setProcessingState({
          progress: 45,
          status: "Re-encoding merged video",
          message: "Building a compatibility-first merged export...",
          items: buildFFmpegProgressItems(files, files.length - 1, 0),
        });
        const args: string[] = [];
        inputNames.forEach((name) => {
          args.push("-i", name);
        });
        args.push(
          "-filter_complex",
          buildVideoConcatFilter(files.length),
          "-map", "[outv]",
          "-map", "[outa]"
        );

        if (outputExt === "webm") {
          args.push("-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32", "-c:a", "libopus");
        } else {
          args.push("-c:v", "libx264", "-preset", "medium", "-crf", "23", "-c:a", "aac", "-movflags", "+faststart");
        }

        args.push(outputName);
        setProcessingState({ status: "Processing...", message: "This may take a while for large files." });
        await inst.exec(args);
      }

      setProcessingState({ status: "Writing output...", progress: 95 });
      const data = await inst.readFile(outputName) as Uint8Array;
      setProcessingState({
        progress: 95,
        status: "Finalizing merged video",
        message: "Preparing your download...",
        items: buildFFmpegProgressItems(files, files.length - 1, files.length),
      });

      await cleanupFFmpegWorkspaceFiles(ffmpeg, [...inputNames, "concat-list.txt", outputName]);

      const customStem = values.filenameStem?.trim() || "merged-video";
      setOutput({
        name: `${customStem}.${outputExt}`,
        data,
        mime: outputExt === "webm" ? "video/webm" : "video/mp4",
      });
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Video merge failed");
    } finally {
      setProcessing(false);
    }
  }, [ffmpeg, files, setError, setOutput, setProcessingState, startProcessing, values]);

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
        <Film className="mr-2 h-4 w-4" />
        {processing ? `Merging ${files.length} videos...` : `Merge ${files.length} Videos`}
      </Button>
    </div>
  );
}

export function VideoMergeClient() {
  const tool = getToolById("video-merge");
  if (!tool) return null;

  return (
    <ToolShell
      title="Video Merger"
      description="Join multiple video files together in sequence with file reordering and merge mode controls."
      action="merge"
      accept={tool.runtime.input.accept}
      formats={tool.runtime.input.formats}
      fileRequirement={tool.runtime.input}
      renderDone={({ output, files, onReset, onDownload }) => (
        <VideoMergeDone
          output={output}
          files={files}
          onReset={onReset}
          onDownload={onDownload}
        />
      )}
    >
      {(props) => <VideoMergeForm {...props} />}
    </ToolShell>
  );
}
