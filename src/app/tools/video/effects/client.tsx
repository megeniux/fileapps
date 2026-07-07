"use client";

import { ToolPageGenerator } from "@/components/tools/tool-page-generator";
import type { ToolPageConfig } from "@/lib/tool-types";
import { FILE_SIZE_LIMITS } from "@/lib/constants";

export function VideoEffectsClient() {
  const config: ToolPageConfig = {
    id: "video-effects",
    title: "Video Effects",
    description: "Apply speed changes, reverse, rotation, flip, and color filters to your videos.",
    action: "effects",
    engine: "ffmpeg",
    accept: "video/*",
    formats: "MP4, WebM, MOV",
    outputExtension: "mp4",
    fileRequirement: {
      accept: "video/*",
      formats: "MP4, WebM, MOV",
      minCount: 1,
      maxCount: 1,
      warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
      maxFileSizeBytes: FILE_SIZE_LIMITS.max,
    },
    sections: [
      {
        label: "Playback Speed",
        key: "speed",
        type: "range",
        min: 0.5,
        max: 2,
        step: 0.25,
        defaultValue: "1",
        helpText: "Use lower values to slow down the video or higher values to speed it up.",
      },
      {
        label: "Color Effect",
        key: "effect",
        type: "select",
        options: [
          { value: "none", label: "No Filter" },
          { value: "grayscale", label: "Grayscale" },
          { value: "sepia", label: "Sepia" },
          { value: "negative", label: "Negative" },
          { value: "hue", label: "Hue Rotate" },
        ],
        defaultValue: "none",
      },
      {
        label: "Transform",
        key: "direction",
        type: "select",
        options: [
          { value: "normal", label: "Normal" },
          { value: "rotate90", label: "Rotate 90deg" },
          { value: "rotate180", label: "Rotate 180deg" },
          { value: "hflip", label: "Horizontal Flip" },
        ],
        defaultValue: "normal",
      },
      {
        label: "Reverse Video",
        key: "reverse",
        type: "toggle",
        defaultValue: "false",
        helpText: "Reverse the video and audio playback.",
      },
      {
        label: "Mute Audio",
        key: "mute",
        type: "toggle",
        defaultValue: "false",
        helpText: "Disable audio in the exported video.",
      },
      {
        label: "Custom File Name",
        key: "filenameStem",
        type: "text",
        defaultValue: "",
        placeholder: "video-effects",
        helpText: "Optional. Leave empty to use the default exported name.",
      },
    ],
    buildArgs(_file, values, outputExt) {
      const args = ["-i", "input"];
      const filters: string[] = [];
      const speed = parseFloat(values.speed || "1");

      if (speed !== 1) {
        const pts = 1 / speed;
        filters.push(`setpts=${pts}*PTS`);
      }

      const effectFilters: Record<string, string> = {
        grayscale: "hue=s=0",
        sepia: "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",
        negative: "negate",
        hue: "hue=H=90",
      };

      if (values.effect !== "none" && effectFilters[values.effect]) {
        filters.push(effectFilters[values.effect]);
      }

      if (values.direction === "rotate90") {
        filters.push("transpose=1");
      } else if (values.direction === "rotate180") {
        filters.push("transpose=2,transpose=2");
      } else if (values.direction === "hflip") {
        filters.push("hflip");
      }

      if (values.reverse === "true") {
        filters.push("reverse");
      }

      if (filters.length > 0) args.push("-vf", filters.join(","));

      if (values.mute === "true") {
        args.push("-an");
      } else {
        const audioFilters: string[] = [];
        if (speed !== 1) {
          audioFilters.push(`atempo=${speed}`);
        }
        if (values.reverse === "true") {
          audioFilters.push("areverse");
        }
        if (audioFilters.length > 0) {
          args.push("-af", audioFilters.join(","));
        }
        args.push("-c:a", "aac");
      }

      args.push(`output.${outputExt}`);
      return args;
    },
    outputName(values) {
      const customStem = values.filenameStem?.trim();
      return `${customStem || "effects"}.mp4`;
    },
  };
  return <ToolPageGenerator config={config} />;
}
