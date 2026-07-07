"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchFile } from "@/lib/ffmpeg";
import { formatDuration } from "@/lib/utils";
import { Scissors, Clock, Play, Pause } from "lucide-react";

const OUTPUT_FORMATS = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "ogg", label: "OGG" },
  { value: "m4a", label: "M4A (AAC)" },
  { value: "flac", label: "FLAC" },
];

async function drawWaveform(
  file: File,
  canvas: HTMLCanvasElement,
  isDark: boolean
): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new AudioContext();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  await audioCtx.close();

  const data = audioBuffer.getChannelData(0);
  const duration = audioBuffer.duration;
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = isDark ? "#1e1e2e" : "#f4f4f5";
  ctx.fillRect(0, 0, W, H);

  const samplesPerPx = Math.floor(data.length / W);
  const mid = H / 2;
  const primaryColor = isDark ? "#7c3aed" : "#7c3aed";

  ctx.fillStyle = primaryColor;
  for (let x = 0; x < W; x++) {
    let min = 0, max = 0;
    const start = x * samplesPerPx;
    for (let s = 0; s < samplesPerPx; s++) {
      const v = data[start + s] ?? 0;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    const yTop = mid - max * mid * 0.9;
    const yBot = mid - min * mid * 0.9;
    ctx.fillRect(x, yTop, 1, Math.max(1, yBot - yTop));
  }

  return duration;
}

function WaveformTimeline({
  file,
  duration,
  startTime,
  endTime,
  playing,
  playhead,
  onStartChange,
  onEndChange,
  onSeek,
}: {
  file: File;
  duration: number;
  startTime: number;
  endTime: number;
  playing: boolean;
  playhead: number;
  onStartChange: (t: number) => void;
  onEndChange: (t: number) => void;
  onSeek: (t: number) => void;
}) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<"start" | "end" | "seek" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    canvas.style.width  = canvas.offsetWidth  + "px";
    canvas.style.height = canvas.offsetHeight + "px";

    const isDark = document.documentElement.classList.contains("dark");
    drawWaveform(file, canvas, isDark).then(() => setReady(true)).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const getTimeFromX = useCallback((clientX: number): number => {
    const el = wrapperRef.current;
    if (!el || !duration) return 0;
    const rect = el.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * duration;
  }, [duration]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const t = getTimeFromX(e.clientX);
    // If near start handle: drag start; near end handle: drag end; else: seek
    const startPx = (startTime / duration) * (wrapperRef.current?.offsetWidth ?? 1);
    const endPx   = (endTime   / duration) * (wrapperRef.current?.offsetWidth ?? 1);
    const rect    = wrapperRef.current!.getBoundingClientRect();
    const mouseX  = e.clientX - rect.left;

    if (Math.abs(mouseX - startPx) < 12) {
      draggingRef.current = "start";
    } else if (Math.abs(mouseX - endPx) < 12) {
      draggingRef.current = "end";
    } else {
      draggingRef.current = "seek";
      onSeek(t);
    }

    const onMove = (ev: MouseEvent) => {
      const tt = getTimeFromX(ev.clientX);
      if (draggingRef.current === "start") onStartChange(Math.min(tt, endTime - 0.5));
      else if (draggingRef.current === "end") onEndChange(Math.max(tt, startTime + 0.5));
      else onSeek(tt);
    };
    const onUp = () => {
      draggingRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [getTimeFromX, duration, startTime, endTime, onStartChange, onEndChange, onSeek]);

  const startPct   = duration > 0 ? (startTime  / duration) * 100 : 0;
  const endPct     = duration > 0 ? (endTime     / duration) * 100 : 100;
  const playheadPct = duration > 0 ? (playhead   / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      className="relative rounded overflow-hidden border cursor-pointer select-none"
      style={{ height: 72 }}
      onMouseDown={onMouseDown}
    >
      {/* Waveform canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: ready ? 1 : 0.3, transition: "opacity 0.3s" }}
      />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground bg-muted">
          Analyzing waveform…
        </div>
      )}

      {/* Dark overlay outside selection */}
      <div className="absolute inset-y-0 left-0 bg-black/50 pointer-events-none" style={{ width: `${startPct}%` }} />
      <div className="absolute inset-y-0 right-0 bg-black/50 pointer-events-none" style={{ width: `${100 - endPct}%` }} />

      {/* Selection border */}
      <div
        className="absolute inset-y-0 border-2 border-primary pointer-events-none"
        style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
      />

      {/* Start handle */}
      <div
        className="absolute inset-y-0 flex items-center z-10 cursor-ew-resize"
        style={{ left: `${startPct}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-3 h-full bg-primary flex items-center justify-center shadow-md rounded-sm">
          <div className="flex flex-col gap-0.5">
            <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
            <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
          </div>
        </div>
      </div>

      {/* End handle */}
      <div
        className="absolute inset-y-0 flex items-center z-10 cursor-ew-resize"
        style={{ left: `${endPct}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-3 h-full bg-primary flex items-center justify-center shadow-md rounded-sm">
          <div className="flex flex-col gap-0.5">
            <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
            <div className="w-0.5 h-2 bg-primary-foreground/70 rounded-full" />
          </div>
        </div>
      </div>

      {/* Playhead */}
      {duration > 0 && (
        <div
          className="absolute inset-y-0 w-0.5 bg-white/80 pointer-events-none z-20"
          style={{ left: `${playheadPct}%` }}
        />
      )}
    </div>
  );
}

function AudioTrimForm({
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
  const [duration,  setDuration]  = useState(0);
  const [format, setFormat]       = useState("mp3");
  const [processing, setProcessing] = useState(false);
  const [playing, setPlaying]       = useState(false);
  const [playhead, setPlayhead]     = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef   = useRef<number>(0);
  const resolvedPreviewUrl = useMemo(() => previewUrl ?? URL.createObjectURL(file), [file, previewUrl]);

  useEffect(() => {
    if (previewUrl) return;
    return () => URL.revokeObjectURL(resolvedPreviewUrl);
  }, [previewUrl, resolvedPreviewUrl]);

  useEffect(() => {
    const aud = audioRef.current;
    if (!aud) return;

    const onMeta = () => {
      const dur = aud.duration;
      if (dur && !isNaN(dur) && dur !== Infinity) {
        setDuration(dur);
        setEndTime(dur);
      }
    };

    if (aud.readyState >= 1 && aud.duration) onMeta();
    else aud.addEventListener("loadedmetadata", onMeta, { once: true });
  }, [resolvedPreviewUrl]);

  // Playhead animation
  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    const tick = () => {
      if (audioRef.current) setPlayhead(audioRef.current.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const togglePlay = useCallback(() => {
    const aud = audioRef.current;
    if (!aud) return;
    if (aud.paused) {
      if (aud.currentTime < startTime || aud.currentTime >= endTime) {
        aud.currentTime = startTime;
      }
      void aud.play();
      setPlaying(true);
    } else {
      aud.pause();
      setPlaying(false);
    }
  }, [startTime, endTime]);

  const handleSeek = useCallback((t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
    setPlayhead(t);
  }, []);

  const setCurrentPos = useCallback((which: "start" | "end") => {
    const t = audioRef.current?.currentTime ?? 0;
    if (which === "start") setStartTime(Math.min(t, endTime - 0.5));
    else setEndTime(Math.max(t, startTime + 0.5));
  }, [startTime, endTime]);

  const applyPreset = useCallback((preset: string) => {
    switch (preset) {
      case "first-30": setStartTime(0); setEndTime(Math.min(30, duration)); break;
      case "first-60": setStartTime(0); setEndTime(Math.min(60, duration)); break;
      case "last-30":  setStartTime(Math.max(0, duration - 30)); setEndTime(duration); break;
    }
  }, [duration]);

  const handleProcess = useCallback(async () => {
    if (startTime >= endTime) { setError("End time must be after start time."); return; }
    if (!ffmpeg.instance?.current?.loaded) { setError("Media engine not loaded. Please refresh."); return; }

    setProcessing(true);
    startProcessing();

    try {
      const inst = ffmpeg.instance.current;
      const inputExt  = file.name.split(".").pop()?.toLowerCase() || "mp3";
      const inputName  = `input.${inputExt}`;
      const outputName = `output.${format}`;
      const dur = endTime - startTime;
      const sameFormat = inputExt === format;

      setProcessingState({ status: "Reading file…" });
      await inst.writeFile(inputName, await fetchFile(file));

      setProcessingState({ status: "Processing…", message: "This may take a while for large files." });

      if (sameFormat) {
        await inst.exec(["-ss", String(startTime), "-i", inputName, "-t", String(dur), "-c", "copy", outputName]);
      } else {
        const codecMap: Record<string, string[]> = {
          mp3:  ["-c:a", "libmp3lame"],
          ogg:  ["-c:a", "libvorbis"],
          m4a:  ["-c:a", "aac"],
          flac: ["-c:a", "flac"],
          wav:  ["-c:a", "pcm_s16le"],
        };
        await inst.exec(["-ss", String(startTime), "-i", inputName, "-t", String(dur), ...(codecMap[format] || []), "-b:a", "192k", outputName]);
      }

      setProcessingState({ status: "Writing output…", progress: 95 });
      const data = await inst.readFile(outputName) as Uint8Array;
      if (data.length < 500) throw new Error("Output too small — trim may have failed.");

      inst.deleteFile(inputName).catch(() => {});
      inst.deleteFile(outputName).catch(() => {});

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const mime = format === "m4a" ? "audio/mp4" : format === "ogg" ? "audio/ogg" : `audio/${format}`;
      setOutput({ name: `trimmed_${baseName}.${format}`, data, mime });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Trim failed");
    } finally {
      setProcessing(false);
    }
  }, [startTime, endTime, format, file, ffmpeg, setOutput, setError, startProcessing, setProcessingState]);

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label>Preview and Position Playhead</Label>
        <audio
          ref={audioRef}
          controls
          preload="metadata"
          className="w-full"
          src={resolvedPreviewUrl}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setPlayhead(audioRef.current.currentTime);
            }
          }}
        />
      </div>

      {/* Waveform timeline */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label>Trim Range</Label>
          {duration > 0 && (
            <Button type="button" variant="ghost" size="sm" onClick={togglePlay} className="gap-1.5 h-7 px-2 text-xs">
              {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {playing ? "Pause" : "Preview"}
            </Button>
          )}
        </div>
        <WaveformTimeline
          file={file}
          duration={duration}
          startTime={startTime}
          endTime={endTime}
          playing={playing}
          playhead={playhead}
          onStartChange={setStartTime}
          onEndChange={setEndTime}
          onSeek={handleSeek}
        />
        {duration > 0 && (
          <div className="flex justify-between text-xs text-muted-foreground px-0.5">
            <span className="font-mono tabular-nums text-primary font-medium">{formatDuration(startTime)}</span>
            <span>{formatDuration(endTime - startTime)} selected</span>
            <span className="font-mono tabular-nums text-primary font-medium">{formatDuration(endTime)}</span>
          </div>
        )}
      </div>

      {/* Set-to-playhead buttons */}
      {duration > 0 && (
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setCurrentPos("start")} className="flex-1 gap-1.5 text-xs">
            <Clock className="h-3 w-3" /> Set Start to Playhead
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setCurrentPos("end")} className="flex-1 gap-1.5 text-xs">
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
            ? "✓ Same as input — fast stream copy"
            : "Re-encoding to new format"}
        </p>
      </div>

      {/* Quick presets */}
      {duration > 0 && (
        <div className="space-y-1.5">
          <Label>Quick Presets</Label>
          <div className="flex flex-wrap gap-2">
            {[
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
        {processing ? "Trimming..." : "Trim Audio"}
      </Button>
    </div>
  );
}

export function AudioTrimClient() {
  return (
    <ToolShell
      title="Audio Trimmer"
      description="Cut and trim audio segments — drag the handles on the waveform to select your range"
      action="trim"
      accept="audio/*"
      formats="MP3, WAV, OGG, M4A, FLAC, AAC"
    >
      {(props) => <AudioTrimForm {...props} />}
    </ToolShell>
  );
}
