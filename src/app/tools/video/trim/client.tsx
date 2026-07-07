"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchFile } from "@/lib/ffmpeg";
import { formatDuration } from "@/lib/utils";
import { Scissors, Clock } from "lucide-react";

const OUTPUT_FORMATS = [
  { value: "mp4", label: "MP4 (Recommended)" },
  { value: "webm", label: "WebM (Slow)" },
  { value: "avi", label: "AVI" },
  { value: "mov", label: "MOV" },
];

const FILMSTRIP_FRAMES = 12;

async function generateFilmstrip(video: HTMLVideoElement, count: number): Promise<string[]> {
  const duration = video.duration;
  if (!duration || isNaN(duration) || duration === Infinity) return [];

  const canvas = document.createElement("canvas");
  canvas.width = 80;
  canvas.height = 45;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const thumbs: string[] = [];

  for (let i = 0; i < count; i++) {
    const t = count > 1 ? (i / (count - 1)) * duration : 0;
    await new Promise<void>((resolve) => {
      const onSeeked = () => {
        ctx.drawImage(video, 0, 0, 80, 45);
        thumbs.push(canvas.toDataURL("image/jpeg", 0.6));
        resolve();
      };
      video.addEventListener("seeked", onSeeked, { once: true });
      video.currentTime = t;
    });
  }

  return thumbs;
}

function FilmstripTimeline({
  duration,
  startTime,
  endTime,
  thumbs,
  generating,
  onStartChange,
  onEndChange,
}: {
  duration: number;
  startTime: number;
  endTime: number;
  thumbs: string[];
  generating: boolean;
  onStartChange: (t: number) => void;
  onEndChange: (t: number) => void;
}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<"start" | "end" | null>(null);

  const getTimeFromX = useCallback((clientX: number): number => {
    const el = timelineRef.current;
    if (!el || !duration) return 0;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * duration;
  }, [duration]);

  const onMouseDown = useCallback((handle: "start" | "end") => (e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = handle;

    const onMove = (ev: MouseEvent) => {
      const t = getTimeFromX(ev.clientX);
      if (draggingRef.current === "start") {
        onStartChange(Math.min(t, endTime - 0.5));
      } else {
        onEndChange(Math.max(t, startTime + 0.5));
      }
    };

    const onUp = () => {
      draggingRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [getTimeFromX, startTime, endTime, onStartChange, onEndChange]);

  const onTouchStart = useCallback((handle: "start" | "end") => (e: React.TouchEvent) => {
    e.preventDefault();
    draggingRef.current = handle;

    const onMove = (ev: TouchEvent) => {
      if (!ev.touches[0]) return;
      const t = getTimeFromX(ev.touches[0].clientX);
      if (draggingRef.current === "start") {
        onStartChange(Math.min(t, endTime - 0.5));
      } else {
        onEndChange(Math.max(t, startTime + 0.5));
      }
    };

    const onEnd = () => {
      draggingRef.current = null;
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
  }, [getTimeFromX, startTime, endTime, onStartChange, onEndChange]);

  const startPct = duration > 0 ? (startTime / duration) * 100 : 0;
  const endPct   = duration > 0 ? (endTime   / duration) * 100 : 100;

  return (
    <div className="space-y-2">
      <div
        ref={timelineRef}
        className="relative rounded overflow-hidden border select-none"
        style={{ height: 56 }}
      >
        {/* Filmstrip thumbnails */}
        {thumbs.length > 0 ? (
          <div className="absolute inset-0 flex">
            {thumbs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="flex-1 object-cover"
                style={{ minWidth: 0 }}
                draggable={false}
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center text-xs text-muted-foreground">
            {generating ? "Generating preview…" : "Loading video…"}
          </div>
        )}

        {/* Dark overlay: before selection */}
        <div
          className="absolute inset-y-0 left-0 bg-black/55 pointer-events-none"
          style={{ width: `${startPct}%` }}
        />

        {/* Dark overlay: after selection */}
        <div
          className="absolute inset-y-0 right-0 bg-black/55 pointer-events-none"
          style={{ width: `${100 - endPct}%` }}
        />

        {/* Selection border */}
        <div
          className="absolute inset-y-0 border-2 border-primary pointer-events-none"
          style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
        />

        {/* Start handle */}
        <div
          className="absolute inset-y-0 flex items-center cursor-ew-resize z-10"
          style={{ left: `${startPct}%`, transform: "translateX(-50%)" }}
          onMouseDown={onMouseDown("start")}
          onTouchStart={onTouchStart("start")}
        >
          <div className="w-3 h-full bg-primary rounded-sm flex items-center justify-center shadow-md">
            <div className="flex flex-col gap-0.5">
              <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
              <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
            </div>
          </div>
        </div>

        {/* End handle */}
        <div
          className="absolute inset-y-0 flex items-center cursor-ew-resize z-10"
          style={{ left: `${endPct}%`, transform: "translateX(-50%)" }}
          onMouseDown={onMouseDown("end")}
          onTouchStart={onTouchStart("end")}
        >
          <div className="w-3 h-full bg-primary rounded-sm flex items-center justify-center shadow-md">
            <div className="flex flex-col gap-0.5">
              <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
              <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Time labels */}
      {duration > 0 && (
        <div className="flex justify-between text-xs text-muted-foreground px-0.5">
          <span className="font-mono tabular-nums text-primary font-medium">
            {formatDuration(startTime)}
          </span>
          <span className="text-center">
            {formatDuration(endTime - startTime)} selected
          </span>
          <span className="font-mono tabular-nums text-primary font-medium">
            {formatDuration(endTime)}
          </span>
        </div>
      )}
    </div>
  );
}

function VideoTrimForm({
  file,
  previewUrl,
  ffmpeg,
  setOutput,
  setError,
  startProcessing,
  setProcessingState,
}: {
  file: File;
  previewUrl: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ffmpeg: any;
  setOutput: (o: { name: string; data: Uint8Array; mime: string }) => void;
  setError: (msg: string) => void;
  startProcessing: () => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
}) {
  const [startTime, setStartTime] = useState(0);
  const [endTime,   setEndTime]   = useState(0);
  const [format, setFormat]       = useState("mp4");
  const [duration, setDuration]   = useState(0);
  const [processing, setProcessing] = useState(false);
  const [thumbs, setThumbs]         = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const resolvedPreviewUrl = useMemo(() => previewUrl ?? URL.createObjectURL(file), [file, previewUrl]);

  useEffect(() => {
    if (previewUrl) return;
    return () => URL.revokeObjectURL(resolvedPreviewUrl);
  }, [previewUrl, resolvedPreviewUrl]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    let cancelled = false;

    const setup = async () => {
      const dur = vid.duration;
      if (!dur || isNaN(dur) || dur === Infinity || cancelled) return;
      setDuration(dur);
      setEndTime(dur);

      setGenerating(true);
      const frames = await generateFilmstrip(vid, FILMSTRIP_FRAMES);
      if (!cancelled) {
        setThumbs(frames);
        setGenerating(false);
      }
    };

    if (vid.readyState >= 1 && vid.duration && !isNaN(vid.duration)) {
      void setup();
    } else {
      vid.addEventListener("loadedmetadata", () => {
        void setup();
      }, { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, [resolvedPreviewUrl]);

  const applyPreset = useCallback((preset: string) => {
    switch (preset) {
      case "first-10": setStartTime(0); setEndTime(Math.min(10, duration)); break;
      case "first-30": setStartTime(0); setEndTime(Math.min(30, duration)); break;
      case "first-60": setStartTime(0); setEndTime(Math.min(60, duration)); break;
      case "last-30":  setStartTime(Math.max(0, duration - 30)); setEndTime(duration); break;
    }
  }, [duration]);

  const setCurrentStart = useCallback(() => {
    const t = videoRef.current?.currentTime ?? 0;
    setStartTime(Math.min(t, endTime - 0.5));
  }, [endTime]);

  const setCurrentEnd = useCallback(() => {
    const t = videoRef.current?.currentTime ?? duration;
    setEndTime(Math.max(t, startTime + 0.5));
  }, [startTime, duration]);

  const handleProcess = useCallback(async () => {
    const start = startTime;
    const end   = endTime || duration;

    if (start >= end) { setError("End time must be after start time."); return; }
    if (!ffmpeg.instance?.current?.loaded) { setError("Media engine not loaded. Please refresh."); return; }

    setProcessing(true);
    startProcessing();

    try {
      const inst = ffmpeg.instance.current;
      const inputExt  = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const inputName  = `input.${inputExt}`;
      const outputName = `output.${format}`;
      const dur = end - start;
      const sameFormat = inputExt === format;

      setProcessingState({ status: "Reading file…" });
      await inst.writeFile(inputName, await fetchFile(file));

      setProcessingState({ status: "Processing…", message: "This may take a while for large files." });

      if (sameFormat) {
        await inst.exec(["-ss", String(start), "-i", inputName, "-t", String(dur), "-c", "copy", "-avoid_negative_ts", "1", outputName]);
      } else if (format === "webm") {
        await inst.exec(["-ss", String(start), "-i", inputName, "-t", String(dur), "-c:v", "libvpx", "-b:v", "1M", "-crf", "10", "-deadline", "realtime", "-cpu-used", "5", "-c:a", "libvorbis", "-b:a", "128k", outputName]);
      } else {
        await inst.exec(["-ss", String(start), "-i", inputName, "-t", String(dur), "-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", outputName]);
      }

      setProcessingState({ status: "Writing output…", progress: 95 });
      const data = await inst.readFile(outputName) as Uint8Array;
      if (data.length < 1000) throw new Error("Output too small — trim may have failed. Try MP4.");

      inst.deleteFile(inputName).catch(() => {});
      inst.deleteFile(outputName).catch(() => {});

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setOutput({ name: `trimmed_${baseName}.${format}`, data, mime: `video/${format}` });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Trim failed");
    } finally {
      setProcessing(false);
    }
  }, [startTime, endTime, format, duration, file, ffmpeg, setOutput, setError, startProcessing, setProcessingState]);

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label>Preview and Position Playhead</Label>
        <div className="relative w-full overflow-hidden rounded-lg border bg-black" style={{ aspectRatio: "16/9", maxHeight: "16rem" }}>
          <video
            ref={videoRef}
            controls
            preload="metadata"
            className="h-full w-full object-contain"
            src={resolvedPreviewUrl}
          />
        </div>
      </div>

      {/* Visual filmstrip timeline */}
      <div className="space-y-1.5">
        <Label>Trim Range</Label>
        <FilmstripTimeline
          duration={duration}
          startTime={startTime}
          endTime={endTime}
          thumbs={thumbs}
          generating={generating}
          onStartChange={setStartTime}
          onEndChange={setEndTime}
        />
      </div>

      {/* Set-to-current-position buttons */}
      {duration > 0 && (
        <div className="flex gap-2 text-xs">
          <Button type="button" variant="outline" size="sm" onClick={setCurrentStart} className="flex-1 gap-1.5">
            <Clock className="h-3 w-3" /> Set Start to Playhead
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={setCurrentEnd} className="flex-1 gap-1.5">
            <Clock className="h-3 w-3" /> Set End to Playhead
          </Button>
        </div>
      )}

      {/* Output format */}
      <div className="space-y-1.5">
        <Label>Output Format</Label>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {OUTPUT_FORMATS.map((f) => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {format === (file.name.split(".").pop()?.toLowerCase() || "")
            ? "✓ Same as input — fast stream copy (no re-encoding)"
            : format === "webm"
            ? "⚠ WebM requires full re-encoding (slowest)"
            : "Re-encoding required (slower than stream copy)"}
        </p>
      </div>

      {/* Quick presets */}
      {duration > 0 && (
        <div className="space-y-1.5">
          <Label>Quick Presets</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "first-10", label: "First 10s" },
              { key: "first-30", label: "First 30s" },
              { key: "first-60", label: "First 60s" },
              { key: "last-30",  label: "Last 30s"  },
            ].map((p) => (
              <Button key={p.key} variant="outline" size="sm" type="button" onClick={() => applyPreset(p.key)}>
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="rounded-md bg-muted/50 border px-4 py-2 text-sm flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Trimmed duration:</span>
        <span className="font-semibold">{formatDuration(Math.max(0, endTime - startTime))}</span>
        {duration > 0 && (
          <span className="text-xs text-muted-foreground ml-auto">of {formatDuration(duration)} total</span>
        )}
      </div>

      <Button onClick={handleProcess} disabled={processing} className="w-full" size="lg">
        <Scissors className="mr-2 h-4 w-4" />
        {processing ? "Trimming..." : "Trim Video"}
      </Button>
    </div>
  );
}

export function VideoTrimClient() {
  return (
    <ToolShell
      title="Video Trimmer"
      description="Cut and trim video segments — drag the handles on the timeline to select your range"
      action="trim"
      accept="video/*"
      formats="MP4, WebM, AVI, MOV, MKV, FLV"
    >
      {(props) => <VideoTrimForm {...props} />}
    </ToolShell>
  );
}
