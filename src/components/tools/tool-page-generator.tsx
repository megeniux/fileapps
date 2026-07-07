"use client";

import { useState, useCallback } from "react";
import {
  Combine,
  FileDown,
  Files,
  Maximize,
  Scissors,
  Sparkles,
  Subtitles,
  WandSparkles,
} from "lucide-react";
import { ToolShell } from "@/components/tools/tool-shell";
import { ToolFormRenderer } from "@/components/tools/tool-form-renderer";
import { Button } from "@/components/ui/button";
import { fetchFile } from "@/lib/ffmpeg";
import type { ToolPageConfig } from "@/lib/tool-types";

function getMimeForExt(ext: string, action: string) {
  const videoExt = ["mp4", "webm", "avi", "mkv", "mov", "flv", "wmv", "m4v"];
  const audioExt = ["mp3", "wav", "aac", "ogg", "flac", "m4a", "wma"];
  const imageExt = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff", "tif", "avif"];

  if (videoExt.includes(ext)) return `video/${ext === "mkv" ? "x-matroska" : ext}`;
  if (audioExt.includes(ext)) return `audio/${ext === "m4a" ? "mp4" : ext}`;
  if (imageExt.includes(ext)) return `image/${ext === "jpg" ? "jpeg" : ext}`;

  if (["convert", "compress", "trim", "merge", "effects", "burn-caption"].includes(action)) {
    return `video/${ext}`;
  }
  if (action === "resize" || action === "batch-compress") {
    return `image/${ext}`;
  }

  return "application/octet-stream";
}

const iconMap: Record<string, React.ElementType> = {
  convert: WandSparkles,
  compress: FileDown,
  trim: Scissors,
  merge: Combine,
  effects: Sparkles,
  "burn-caption": Subtitles,
  resize: Maximize,
  "batch-compress": Files,
};

function ConfigStepForm({
  config,
  file,
  ffmpeg,
  setOutput,
  setError,
  startProcessing,
  setProcessingState,
}: {
  config: ToolPageConfig;
  file: File;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ffmpeg: any;
  setOutput: (output: { name: string; data: Uint8Array; mime: string }) => void;
  setError: (error: string) => void;
  startProcessing: () => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    config.sections.forEach((section) => {
      initial[section.key] = section.defaultValue ?? "";
    });
    return initial;
  });
  const [processing, setProcessing] = useState(false);

  const handleProcess = useCallback(async () => {
    if (!ffmpeg.instance?.current?.loaded) {
      setError("Media engine not loaded. Please refresh and try again.");
      return;
    }

    setProcessing(true);
    startProcessing();

    try {
      const inst = ffmpeg.instance.current;
      const ext = file.name.split(".").pop() || "file";
      const inputName = `input.${ext}`;
      const outputExt = config.outputExtension || values.format || ext;
      const outputName = `output.${outputExt}`;

      setProcessingState({ status: "Reading file…" });
      await inst.writeFile(inputName, await fetchFile(file));
      const args = config
        .buildArgs(file, values, outputExt)
        .map((arg) => (arg === "input" ? inputName : arg));

      setProcessingState({ status: "Processing…", message: "This may take a while for large files." });
      await inst.exec(args);

      setProcessingState({ status: "Writing output…", progress: 95 });
      const data = await inst.readFile(outputName);
      await inst.deleteFile(inputName).catch(() => {});
      await inst.deleteFile(outputName).catch(() => {});

      setOutput({
        name: config.outputName(values, outputExt),
        data,
        mime: config.outputMime || getMimeForExt(outputExt, config.action),
      });
    } catch (error) {
      console.error("Processing failed:", error);
      setError(error instanceof Error ? error.message : "Processing failed");
    } finally {
      setProcessing(false);
    }
  }, [config, ffmpeg, file, setError, setOutput, startProcessing, setProcessingState, values]);

  const ActionIcon = iconMap[config.action] || WandSparkles;

  return (
    <div className="space-y-6">
      <ToolFormRenderer
        controls={config.sections}
        values={values}
        onValueChange={(key, value) => {
          setValues((prev) => ({ ...prev, [key]: value }));
        }}
      />

      <Button onClick={handleProcess} disabled={processing} className="w-full" size="lg">
        <ActionIcon className="mr-2 h-4 w-4" />
        {processing ? "Processing..." : `Process ${config.title}`}
      </Button>
    </div>
  );
}

export function ToolPageGenerator({ config }: { config: ToolPageConfig }) {
  return (
    <ToolShell
      title={config.title}
      description={config.description}
      action={config.action}
      accept={config.accept}
      formats={config.formats}
      fileRequirement={config.fileRequirement}
      auxiliaryInputs={config.auxiliaryInputs}
      outputExtension={config.sections.find((section) => section.key === "format")?.defaultValue || config.outputExtension}
    >
      {(props) => <ConfigStepForm config={config} {...props} />}
    </ToolShell>
  );
}

export type { ToolPageConfig };
