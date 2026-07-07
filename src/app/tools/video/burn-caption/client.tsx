"use client";

import { useCallback, useEffect, useState } from "react";
import { Captions } from "lucide-react";
import { ToolShell, type OutputFile } from "@/components/tools/tool-shell";
import { ToolFormRenderer } from "@/components/tools/tool-form-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchFile } from "@/lib/ffmpeg";
import type { ToolControlDefinition } from "@/lib/tool-types";
import { getToolById } from "@/lib/tools";

const controls: ToolControlDefinition[] = [
  {
    label: "Caption Source",
    key: "mode",
    type: "select",
    options: [
      { value: "text", label: "Custom Text" },
      { value: "subtitle", label: "Subtitle File" },
    ],
    defaultValue: "text",
    helpText: "Use custom text or upload an SRT/VTT subtitle file.",
  },
  {
    label: "Caption Text",
    key: "text",
    type: "textarea",
    defaultValue: "Your caption here",
    placeholder: "Add the caption text you want burned into the video",
    helpText: "This version burns custom text directly into the video output.",
    visibility: { field: "mode", equals: "text" },
  },
  {
    label: "Position",
    key: "position",
    type: "select",
    options: [
      { value: "bottom", label: "Bottom" },
      { value: "center", label: "Center" },
      { value: "top", label: "Top" },
    ],
    defaultValue: "bottom",
    visibility: { field: "mode", equals: "text" },
  },
  {
    label: "Font Size",
    key: "fontSize",
    type: "range",
    min: 18,
    max: 48,
    step: 2,
    defaultValue: "28",
    helpText: "Adjust text size based on your video dimensions and style.",
    visibility: { field: "mode", equals: "text" },
  },
  {
    label: "Text Color",
    key: "fontColor",
    type: "color",
    defaultValue: "#ffffff",
    visibility: { field: "mode", equals: "text" },
  },
  {
    label: "Background Box",
    key: "box",
    type: "toggle",
    defaultValue: "true",
    helpText: "Enable a dark box behind the text to improve readability.",
    visibility: { field: "mode", equals: "text" },
  },
  {
    label: "Output File Name",
    key: "filenameStem",
    type: "text",
    defaultValue: "",
    placeholder: "captioned-video",
    helpText: "Optional. Leave empty to use the default captioned file name.",
  },
  {
    label: "Watermark Position",
    key: "watermarkPosition",
    type: "select",
    options: [
      { value: "top-left", label: "Top Left" },
      { value: "top-right", label: "Top Right" },
      { value: "bottom-left", label: "Bottom Left" },
      { value: "bottom-right", label: "Bottom Right" },
    ],
    defaultValue: "bottom-right",
  },
];

function escapeDrawtext(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/:/g, "\\:")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\n");
}

function hexToFfmpegColor(hex: string) {
  return hex.replace("#", "0x");
}

function getYExpression(position: string) {
  if (position === "top") return "40";
  if (position === "center") return "(h-text_h)/2";
  return "h-text_h-40";
}

function getOverlayPosition(position: string) {
  switch (position) {
    case "top-left":
      return "20:20";
    case "top-right":
      return "W-w-20:20";
    case "bottom-left":
      return "20:H-h-20";
    default:
      return "W-w-20:H-h-20";
  }
}

function parseSubtitlePreview(content: string) {
  const lines = content.split(/\r?\n/);
  const cueLines = lines.filter((line) => line.includes("-->"));
  const textLines = lines
    .filter((line) => line.trim() && !line.includes("-->") && !/^\d+$/.test(line.trim()))
    .slice(0, 2)
    .join(" ");

  return {
    cueCount: cueLines.length,
    firstCueText: textLines,
    hasTiming: cueLines.length > 0,
  };
}

function BurnCaptionForm({
  file,
  auxiliaryFiles,
  ffmpeg,
  setOutput,
  setError,
  startProcessing,
  setProcessingState,
}: {
  file: File;
  files: File[];
  auxiliaryFiles: Record<string, File | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ffmpeg: any;
  setOutput: (output: OutputFile) => void;
  setOutputs: (outputs: OutputFile[]) => void;
  setError: (error: string) => void;
  startProcessing: (state?: { progress?: number; status?: string; message?: string }) => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    mode: "text",
    text: "Your caption here",
    position: "bottom",
    fontSize: "28",
    fontColor: "#ffffff",
    box: "true",
    filenameStem: "",
  });
  const [processing, setProcessing] = useState(false);
  const [subtitlePreview, setSubtitlePreview] = useState<{
    cueCount: number;
    firstCueText: string;
    hasTiming: boolean;
    error?: string;
  } | null>(null);
  const subtitleFile = auxiliaryFiles.subtitleFile;
  const visibleSubtitlePreview = subtitleFile ? subtitlePreview : null;

  useEffect(() => {
    if (!subtitleFile) {
      return;
    }

    subtitleFile.text()
      .then((content) => {
        const parsed = parseSubtitlePreview(content);
        if (!parsed.hasTiming) {
          setSubtitlePreview({
            ...parsed,
            error: "No valid subtitle timing lines were detected in this file.",
          });
          return;
        }
        setSubtitlePreview(parsed);
      })
      .catch(() => {
        setSubtitlePreview({
          cueCount: 0,
          firstCueText: "",
          hasTiming: false,
          error: "Could not read the subtitle file for preview.",
        });
      });
  }, [subtitleFile]);

  const handleProcess = useCallback(async () => {
    const useSubtitleFile = values.mode === "subtitle";
    const subtitleFile = auxiliaryFiles.subtitleFile;
    const watermarkImage = auxiliaryFiles.watermarkImage;
    const captionText = values.text?.trim();

    if (useSubtitleFile && !subtitleFile) {
      setError("Upload an SRT or VTT subtitle file before processing.");
      return;
    }

    if (useSubtitleFile && visibleSubtitlePreview?.error) {
      setError(visibleSubtitlePreview.error);
      return;
    }

    if (!useSubtitleFile && !captionText) {
      setError("Add some caption text before processing.");
      return;
    }

    if (!ffmpeg.instance?.current?.loaded) {
      setError("Media engine not loaded. Please refresh and try again.");
      return;
    }

    setProcessing(true);
    startProcessing({
      progress: 5,
      status: "Preparing caption export",
      message: "Loading video and generating caption overlay...",
    });

    try {
      const inst = ffmpeg.instance.current;
      const inputExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const inputName = `input.${inputExt}`;
      const outputName = "output.mp4";

      setProcessingState({ status: "Reading files…" });
      await inst.writeFile(inputName, await fetchFile(file));
      const inputs = ["-i", inputName];
      let baseVideoFilter = "";

      if (useSubtitleFile && subtitleFile) {
        const subtitleExt = subtitleFile.name.split(".").pop()?.toLowerCase() || "srt";
        const subtitleName = `caption.${subtitleExt}`;
        setProcessingState({ status: "Reading file…" });
      await inst.writeFile(subtitleName, await fetchFile(subtitleFile));
        baseVideoFilter = `subtitles=${subtitleName}`;
      } else {
        const drawtext = [
          `text='${escapeDrawtext(captionText)}'`,
          "x=(w-text_w)/2",
          `y=${getYExpression(values.position)}`,
          `fontsize=${values.fontSize}`,
          `fontcolor=${hexToFfmpegColor(values.fontColor || "#ffffff")}`,
          "shadowx=2",
          "shadowy=2",
          "shadowcolor=black@0.75",
          `box=${values.box === "true" ? 1 : 0}`,
          "boxcolor=black@0.45",
          "boxborderw=12",
          "line_spacing=6",
        ].join(":");
        baseVideoFilter = `drawtext=${drawtext}`;
      }

      if (watermarkImage) {
        const watermarkExt = watermarkImage.name.split(".").pop()?.toLowerCase() || "png";
        const watermarkName = `watermark.${watermarkExt}`;
        setProcessingState({ status: "Reading file…" });
      await inst.writeFile(watermarkName, await fetchFile(watermarkImage));
        inputs.push("-i", watermarkName);
      }

      startProcessing({
        progress: 25,
        status: useSubtitleFile ? "Burning subtitle file into video" : "Burning custom captions into video",
        message: useSubtitleFile ? "Applying subtitle overlay and encoding output..." : "Applying drawtext filter and encoding output...",
      });

      setProcessingState({ status: "Processing…", message: "This may take a while for large files." });
      await inst.exec([
        ...inputs,
        ...(watermarkImage
          ? [
              "-filter_complex",
              `[0:v]${baseVideoFilter}[base];[1:v]scale=180:-1[wm];[base][wm]overlay=${getOverlayPosition(values.watermarkPosition || "bottom-right")}[vout]`,
              "-map", "[vout]",
              "-map", "0:a?",
            ]
          : ["-vf", baseVideoFilter]),
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        "-c:a", "aac",
        "-movflags", "+faststart",
        outputName,
      ]);

      startProcessing({
        progress: 90,
        status: "Finalizing captioned video",
        message: "Preparing your download...",
      });

      setProcessingState({ status: "Writing output…", progress: 95 });
      const data = await inst.readFile(outputName) as Uint8Array;
      await inst.deleteFile(inputName).catch(() => {});
      if (subtitleFile) {
        const subtitleExt = subtitleFile.name.split(".").pop()?.toLowerCase() || "srt";
        await inst.deleteFile(`caption.${subtitleExt}`).catch(() => {});
      }
      if (watermarkImage) {
        const watermarkExt = watermarkImage.name.split(".").pop()?.toLowerCase() || "png";
        await inst.deleteFile(`watermark.${watermarkExt}`).catch(() => {});
      }
      await inst.deleteFile(outputName).catch(() => {});

      const customStem = values.filenameStem?.trim() || "captioned";
      setOutput({
        name: `${customStem}.mp4`,
        data,
        mime: "video/mp4",
      });
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Caption burn failed");
    } finally {
      setProcessing(false);
    }
  }, [auxiliaryFiles, ffmpeg, file, setError, setOutput, startProcessing, setProcessingState, values, visibleSubtitlePreview]);

  return (
    <div className="space-y-6">
      {values.mode === "subtitle" && visibleSubtitlePreview && (
        <div className="rounded-lg border bg-muted/20 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant={visibleSubtitlePreview.error ? "destructive" : "outline"}>
              {visibleSubtitlePreview.error ? "Subtitle issue" : `${visibleSubtitlePreview.cueCount} cues detected`}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {visibleSubtitlePreview.error || visibleSubtitlePreview.firstCueText || "Subtitle timing detected. Ready to burn."}
          </p>
        </div>
      )}

      <ToolFormRenderer
        controls={controls}
        values={values}
        onValueChange={(key, value) => {
          setValues((prev) => ({ ...prev, [key]: value }));
        }}
      />

      <Button onClick={handleProcess} disabled={processing} className="w-full" size="lg">
        <Captions className="mr-2 h-4 w-4" />
        {processing ? "Burning Captions..." : "Burn Captions"}
      </Button>
    </div>
  );
}

export function BurnCaptionClient() {
  const tool = getToolById("video-burn-caption");
  if (!tool) return null;

  return (
    <ToolShell
      title="Burn Captions"
      description="Burn custom text captions permanently into your video with positioning and style controls."
      action="burn-caption"
      accept={tool.runtime.input.accept}
      formats={tool.runtime.input.formats}
      fileRequirement={tool.runtime.input}
      auxiliaryInputs={tool.runtime.auxiliaryInputs}
    >
      {(props) => <BurnCaptionForm {...props} />}
    </ToolShell>
  );
}
