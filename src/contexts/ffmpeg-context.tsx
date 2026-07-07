"use client";

import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { getFFmpegInstance, resetFFmpeg, type FFmpegStatus } from "@/lib/ffmpeg";

export type ProcessingStage =
  | "idle"
  | "loading-engine"
  | "reading-file"
  | "processing"
  | "writing-output"
  | "done";

export const STAGE_LABELS: Record<ProcessingStage, string> = {
  "idle":           "Idle",
  "loading-engine": "Loading media engine\u2026",
  "reading-file":   "Reading file\u2026",
  "processing":     "Processing\u2026",
  "writing-output": "Writing output\u2026",
  "done":           "Done",
};

interface FFmpegContextValue {
  status: FFmpegStatus;
  progress: number;
  stage: ProcessingStage;
  stageLabel: string;
  logs: string[];
  instance: React.MutableRefObject<FFmpeg | null>;
  load: () => Promise<FFmpeg | null>;
  markStage: (s: ProcessingStage) => void;
  markDone: () => void;
  retry: () => Promise<FFmpeg | null>;
  terminate: () => void;
}

export const FFmpegContext = createContext<FFmpegContextValue | null>(null);

export function FFmpegProvider({ children }: { children: ReactNode }) {
  const [status, setStatus]     = useState<FFmpegStatus>({ type: "idle" });
  const [progress, setProgress] = useState(0);
  const [stage, setStage]       = useState<ProcessingStage>("idle");
  const [logs, setLogs]         = useState<string[]>([]);
  const ffmpegRef               = useRef<FFmpeg | null>(null);
  const mountedRef              = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const load = useCallback(async (): Promise<FFmpeg | null> => {
    if (ffmpegRef.current?.loaded) {
      setStatus({ type: "ready" });
      return ffmpegRef.current;
    }
    if (!mountedRef.current) return null;

    setStatus({ type: "loading", progress: 0 });
    setStage("loading-engine");
    setProgress(0);

    try {
      const instance = await getFFmpegInstance();
      ffmpegRef.current = instance;

      instance.on("progress", ({ progress: p }) => {
        if (!mountedRef.current) return;
        setProgress(Math.min(99, Math.round(p * 100)));
      });

      instance.on("log", ({ message }) => {
        if (!mountedRef.current) return;
        setLogs((prev) => [...prev.slice(-20), message]);
      });

      if (mountedRef.current) {
        setStatus({ type: "ready" });
        setStage("idle");
        setProgress(0);
      }
      return instance;
    } catch (err) {
      console.error("FFmpeg load failed:", err);
      if (mountedRef.current) {
        setStatus({
          type: "error",
          message: err instanceof Error ? err.message : "Failed to load media engine",
        });
        setStage("idle");
      }
      return null;
    }
  }, []);

  const markStage = useCallback((s: ProcessingStage) => {
    if (mountedRef.current) setStage(s);
  }, []);

  const markDone = useCallback(() => {
    if (!mountedRef.current) return;
    setProgress(100);
    setStage("done");
  }, []);

  const retry = useCallback(async () => {
    resetFFmpeg();
    ffmpegRef.current = null;
    setProgress(0);
    setStage("idle");
    setLogs([]);
    return load();
  }, [load]);

  const terminate = useCallback(() => {
    setStatus({ type: "idle" });
    setProgress(0);
    setStage("idle");
  }, []);

  const value: FFmpegContextValue = {
    status, progress, stage, stageLabel: STAGE_LABELS[stage],
    logs, instance: ffmpegRef, load, markStage, markDone, retry, terminate,
  };

  return <FFmpegContext.Provider value={value}>{children}</FFmpegContext.Provider>;
}

export function useFFmpegContext(): FFmpegContextValue {
  const ctx = useContext(FFmpegContext);
  if (!ctx) throw new Error("useFFmpegContext must be used inside <FFmpegProvider>");
  return ctx;
}
