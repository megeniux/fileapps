"use client";

/**
 * useFFmpeg — thin wrapper that reads from FFmpegContext when inside the provider,
 * and falls back to its own local state otherwise (for isolated use outside layouts).
 *
 * In practice all tool pages are inside RootLayout which wraps FFmpegProvider,
 * so the context path is always taken and FFmpeg is shared across navigations.
 */

import { useContext } from "react";
import { FFmpegContext, type ProcessingStage, STAGE_LABELS } from "@/contexts/ffmpeg-context";

export type { ProcessingStage };
export { STAGE_LABELS };

export function useFFmpeg() {
  const ctx = useContext(FFmpegContext);
  if (!ctx) {
    throw new Error(
      "useFFmpeg requires <FFmpegProvider> in the component tree. " +
      "Make sure FFmpegProvider wraps your layout."
    );
  }
  return ctx;
}
