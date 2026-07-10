"use client";

import { useMemo, useRef, useState } from "react";
import { useFFmpegContext } from "@/contexts/ffmpeg-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { runSingleFFmpegJob } from "@/lib/ffmpeg-jobs";
import { getMediaPerformanceGuidance, getRuntimePerformanceProfile } from "@/lib/runtime-performance";
import { UploadCloud, Download, RotateCcw, Loader2, Gauge } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

const SPEED_PRESETS = [
  { label: "0.25x", value: 0.25 },
  { label: "0.5x", value: 0.5 },
  { label: "0.75x", value: 0.75 },
  { label: "1x", value: 1.0 },
  { label: "1.25x", value: 1.25 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2.0 },
  { label: "4x", value: 4.0 },
];

export function VideoSpeedClient() {
  const ffmpeg = useFFmpegContext();
  const runtimeProfile = useMemo(() => getRuntimePerformanceProfile(), []);
  const guidance = useMemo(() => getMediaPerformanceGuidance(runtimeProfile), [runtimeProfile]);
  const [file, setFile] = useState<File | null>(null);
  const [speed, setSpeed] = useState(1.5);
  const [keepAudio, setKeepAudio] = useState(true);
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

  async function process() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const inst = await ffmpeg.load();
      if (!inst) throw new Error("Media engine failed to load");

      const ptsSpeed = (1 / speed).toFixed(4);
      const vf = `setpts=${ptsSpeed}*PTS`;

      let audioFilters: string[] = [];
      if (keepAudio) {
        let currentSpeed = speed;
        const tempos: string[] = [];
        while (currentSpeed > 2.0) { tempos.push("atempo=2.0"); currentSpeed /= 2; }
        while (currentSpeed < 0.5) { tempos.push("atempo=0.5"); currentSpeed *= 2; }
        tempos.push(`atempo=${currentSpeed.toFixed(3)}`);
        audioFilters = tempos;
      }

      const data = await runSingleFFmpegJob({
        ffmpeg,
        file,
        outputExt: "mp4",
        setProcessingState: () => {},
        buildArgs: (inputName, outputName) => keepAudio
          ? [
              "-i", inputName,
              "-vf", vf,
              "-af", audioFilters.join(","),
              "-c:v", "libx264",
              "-preset", "fast",
              "-crf", "23",
              "-c:a", "aac",
              "-b:a", "128k",
              "-movflags", "+faststart",
              outputName,
            ]
          : [
              "-i", inputName,
              "-vf", vf,
              "-an",
              "-c:v", "libx264",
              "-preset", "fast",
              "-crf", "23",
              "-movflags", "+faststart",
              outputName,
            ],
      });

      const blob = new Blob([data as unknown as BlobPart], { type: "video/mp4" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (nextError) {
      setError(String(nextError));
    } finally {
      setProcessing(false);
    }
  }

  function reset() { setFile(null); setResultUrl(null); setError(null); }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "video";
  const speedLabel = speed === 1 ? "1x" : `${speed}x`;

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{baseName}_{speedLabel}.mp4</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(resultSize)}</p>
            </div>
          </div>
          <video controls src={resultUrl} className="w-full rounded-lg" />
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_${speedLabel}.mp4`}>
              <Button><Download className="w-4 h-4 mr-2" />Download</Button>
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
          onDrop={(event) => { event.preventDefault(); const nextFile = event.dataTransfer.files[0]; if (nextFile?.type.startsWith("video/")) pickFile(nextFile); }}
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
        <div className="rounded-xl border bg-card p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          <div className="space-y-3">
            <Label>Speed</Label>
            <div className="flex flex-wrap gap-2">
              {SPEED_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setSpeed(preset.value)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${speed === preset.value ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {speed < 1 ? `Slow motion - ${speed}x speed (${(1 / speed).toFixed(1)}x longer duration)` :
               speed === 1 ? "Original speed - no change" :
               `Fast forward - ${speed}x speed (${(1 / speed * 100).toFixed(0)}% of original duration)`}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div>
              <p className="text-sm font-medium">Keep audio</p>
              <p className="text-xs text-muted-foreground">
                {keepAudio ? "Audio pitch is corrected to match new speed" : "Audio will be removed from output"}
              </p>
            </div>
            <button
              onClick={() => setKeepAudio((value) => !value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${keepAudio ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${keepAudio ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          {file.size >= guidance.largeFileWarningThresholdBytes && (
            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              Large speed-change jobs can take longer to re-encode. Keeping the output short and avoiding unnecessary audio processing helps on lower-end devices.
            </div>
          )}

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Changing speed... {ffmpeg.progress}%
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${ffmpeg.progress}%` }} />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={process} disabled={speed === 1}>
              {speed === 1 ? "Select a different speed" : `Apply ${speedLabel} speed`}
            </Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
