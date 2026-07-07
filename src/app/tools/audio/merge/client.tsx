"use client";

import { useCallback, useState } from "react";
import { Download, Music4 } from "lucide-react";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { ToolFormRenderer } from "@/components/tools/tool-form-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchFile } from "@/lib/ffmpeg";
import { formatFileSize } from "@/lib/utils";
import type { ToolControlDefinition } from "@/lib/tool-types";
import { getToolById } from "@/lib/tools";

const controls: ToolControlDefinition[] = [
  {
    label: "Merge Method",
    key: "method",
    type: "select",
    options: [
      { value: "concat", label: "Concatenate (Play one after another)" },
      { value: "mix", label: "Mix/Overlay (Play together)" },
    ],
    defaultValue: "concat",
  },
  {
    label: "Output Format",
    key: "format",
    type: "select",
    options: [
      { value: "mp3", label: "MP3" },
      { value: "wav", label: "WAV" },
      { value: "ogg", label: "OGG" },
    ],
    defaultValue: "mp3",
  },
  {
    label: "Audio Bitrate",
    key: "bitrate",
    type: "select",
    options: [
      { value: "320", label: "320 kbps" },
      { value: "192", label: "192 kbps" },
      { value: "128", label: "128 kbps" },
      { value: "96", label: "96 kbps" },
    ],
    defaultValue: "192",
    visibility: { field: "format", equals: "mp3" },
  },
  {
    label: "Custom File Name",
    key: "filenameStem",
    type: "text",
    defaultValue: "",
    placeholder: "merged-audio",
    helpText: "Optional. Leave empty to use the default merged file name.",
  },
];

function buildAudioConcatFilter(fileCount: number) {
  const inputs = Array.from({ length: fileCount }, (_, index) => `[${index}:a:0]`).join("");
  return `${inputs}concat=n=${fileCount}:v=0:a=1[outa]`;
}

function buildAudioMixFilter(fileCount: number) {
  const inputs = Array.from({ length: fileCount }, (_, index) => `[${index}:a:0]`).join("");
  return `${inputs}amix=inputs=${fileCount}:duration=longest:normalize=0[outa]`;
}

function buildMergeItems(files: File[], activeIndex: number, completedCount: number) {
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

function AudioMergeDone({
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
          {files.length} tracks merged
        </Badge>
      </div>

      <div className="rounded-lg border bg-muted/40 p-4 text-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium">Track order</p>
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

      <div className="flex gap-3">
        <Button onClick={onDownload} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download Merged Audio
        </Button>
        <Button variant="outline" onClick={onReset}>
          Merge Another Batch
        </Button>
      </div>
    </div>
  );
}

function AudioMergeForm({
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
    method: "concat",
    format: "mp3",
    bitrate: "192",
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
      status: `Preparing ${files.length} tracks`,
      message: "Writing source audio files into the processing workspace...",
      items: buildMergeItems(files, 0, 0),
    });

    try {
      const inst = ffmpeg.instance.current;
      const outputExt = values.format || "mp3";
      const outputName = `output.${outputExt}`;
      const inputNames: string[] = [];

      for (let index = 0; index < files.length; index += 1) {
        const currentFile = files[index];
        setProcessingState({
          progress: Math.round((index / Math.max(files.length, 1)) * 30),
          status: `Loading track ${index + 1} of ${files.length}`,
          message: currentFile.name,
          items: buildMergeItems(files, index, index),
        });
        const inputExt = currentFile.name.split(".").pop()?.toLowerCase() || "mp3";
        const inputName = `input-${index}.${inputExt}`;
        inputNames.push(inputName);
        setProcessingState({ status: "Reading file…" });
      await inst.writeFile(inputName, await fetchFile(currentFile));
      }

      const args: string[] = [];
      inputNames.forEach((name) => {
        args.push("-i", name);
      });

      args.push(
        "-filter_complex",
        values.method === "mix"
          ? buildAudioMixFilter(files.length)
          : buildAudioConcatFilter(files.length),
        "-map", "[outa]"
      );

      setProcessingState({
        progress: 50,
        status: values.method === "mix" ? "Mixing tracks together" : "Concatenating tracks",
        message: values.method === "mix" ? "Overlaying all selected audio tracks..." : "Joining tracks in the selected order...",
        items: buildMergeItems(files, files.length - 1, 0),
      });

      if (outputExt === "wav") {
        args.push("-c:a", "pcm_s16le");
      } else if (outputExt === "ogg") {
        args.push("-c:a", "libvorbis", "-b:a", `${values.bitrate}k`);
      } else {
        args.push("-c:a", "libmp3lame", "-b:a", `${values.bitrate}k`);
      }

      args.push(outputName);
      setProcessingState({ status: "Processing…", message: "This may take a while for large files." });
      await inst.exec(args);

      setProcessingState({ status: "Writing output…", progress: 95 });
      const data = await inst.readFile(outputName) as Uint8Array;
      setProcessingState({
        progress: 95,
        status: "Finalizing merged audio",
        message: "Preparing your download...",
        items: buildMergeItems(files, files.length - 1, files.length),
      });

      await Promise.all(
        inputNames.map((name) => inst.deleteFile(name).catch(() => {}))
      );
      await inst.deleteFile(outputName).catch(() => {});

      const customStem = values.filenameStem?.trim() || "merged-audio";
      const mime =
        outputExt === "wav" ? "audio/wav" :
        outputExt === "ogg" ? "audio/ogg" :
        "audio/mpeg";

      setOutput({
        name: `${customStem}.${outputExt}`,
        data,
        mime,
      });
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Audio merge failed");
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
        <Music4 className="mr-2 h-4 w-4" />
        {processing ? `Merging ${files.length} tracks...` : `Merge ${files.length} Tracks`}
      </Button>
    </div>
  );
}

export function AudioMergeClient() {
  const tool = getToolById("audio-merge");
  if (!tool) return null;

  return (
    <ToolShell
      title="Audio Merger"
      description="Join multiple audio files in sequence or mix them together with shared output controls."
      action="merge"
      accept={tool.runtime.input.accept}
      formats={tool.runtime.input.formats}
      fileRequirement={tool.runtime.input}
      renderDone={({ output, files, onReset, onDownload }) => (
        <AudioMergeDone
          output={output}
          files={files}
          onReset={onReset}
          onDownload={onDownload}
        />
      )}
    >
      {(props) => <AudioMergeForm {...props} />}
    </ToolShell>
  );
}
