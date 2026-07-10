"use client";

import { useMemo, useRef, useState } from "react";
import { useFFmpegContext } from "@/contexts/ffmpeg-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { runSingleFFmpegJob } from "@/lib/ffmpeg-jobs";
import { getMediaPerformanceGuidance, getRuntimePerformanceProfile } from "@/lib/runtime-performance";
import { UploadCloud, Download, RotateCcw, Loader2, AlertTriangle } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

const FPS_OPTIONS = ["5", "8", "10", "12", "15", "20"];
const WIDTH_OPTIONS = [
  { value: "240", label: "240px (small)" },
  { value: "360", label: "360px" },
  { value: "480", label: "480px (recommended)" },
  { value: "640", label: "640px (large)" },
  { value: "-1", label: "Original size" },
];

export function VideoGifClient() {
  const ffmpeg = useFFmpegContext();
  const runtimeProfile = useMemo(() => getRuntimePerformanceProfile(), []);
  const guidance = useMemo(() => getMediaPerformanceGuidance(runtimeProfile), [runtimeProfile]);
  const [file, setFile] = useState<File | null>(null);
  const [fps, setFps] = useState(guidance.recommendedGifFps);
  const [width, setWidth] = useState(guidance.recommendedGifWidth);
  const [startTime, setStartTime] = useState("0");
  const [duration, setDuration] = useState("10");
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(nextFile: File) {
    setFile(nextFile);
    setResultUrl(null);
    setError(null);
  }

  async function convert() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const inst = await ffmpeg.load();
      if (!inst) throw new Error("Media engine failed to load");
      const scaleFilter = width === "-1" ? `fps=${fps}` : `fps=${fps},scale=${width}:-1:flags=lanczos`;
      const data = await runSingleFFmpegJob({
        ffmpeg,
        file,
        outputExt: "gif",
        setProcessingState: () => {},
        buildArgs: (inputName, outputName) => [
          "-ss", startTime,
          "-t", duration,
          "-i", inputName,
          "-vf", `${scaleFilter},split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          "-loop", "0",
          outputName,
        ],
      });
      const blob = new Blob([data as unknown as BlobPart], { type: "image/gif" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (nextError) {
      setError(String(nextError));
    } finally {
      setProcessing(false);
    }
  }

  function reset() {
    setFile(null);
    setResultUrl(null);
    setError(null);
  }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "output";

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10 space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold text-lg">GIF ready</h2>
          <img src={resultUrl} alt="Output GIF" className="rounded-lg max-h-64 w-auto mx-auto border" />
          <p className="text-sm text-muted-foreground text-center">File size: {formatFileSize(resultSize)}</p>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}.gif`}>
              <Button><Download className="w-4 h-4 mr-2" />Download GIF</Button>
            </a>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" />Start over</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10 space-y-6">
      {!file ? (
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const droppedFile = event.dataTransfer.files[0];
            if (droppedFile?.type.startsWith("video/")) pickFile(droppedFile);
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a video file here</p>
          <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV, AVI supported</p>
          <input ref={inputRef} type="file" accept="video/*" className="hidden"
            onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) pickFile(nextFile); }} />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Frame rate (FPS)</Label>
              <Select value={fps} onValueChange={setFps}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FPS_OPTIONS.map((item) => (
                    <SelectItem key={item} value={item}>{item} FPS{item === guidance.recommendedGifFps ? " (recommended)" : ""}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Output width</Label>
              <Select value={width} onValueChange={setWidth}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {WIDTH_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}{item.value === guidance.recommendedGifWidth ? " (recommended)" : ""}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Start time (seconds)</Label>
              <input
                type="number" min="0" step="0.5" value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Duration (seconds)</Label>
              <input
                type="number" min="1" max="60" step="1" value={duration}
                onChange={(event) => setDuration(event.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 flex gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span className="text-amber-800 dark:text-amber-200">GIFs are larger than video. Keep clips short and lower FPS on weaker devices for better performance.</span>
          </div>

          {file.size >= guidance.largeFileWarningThresholdBytes && (
            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              This file is large for browser-side GIF conversion. Smaller width, lower FPS, and shorter duration will reduce memory pressure and speed up export.
            </div>
          )}

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Converting to GIF... {ffmpeg.progress}%
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${ffmpeg.progress}%` }} />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={convert}>Convert to GIF</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
