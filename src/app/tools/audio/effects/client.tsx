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
import { UploadCloud, Download, RotateCcw, Loader2, Music } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

export function AudioEffectsClient() {
  const ffmpeg = useFFmpegContext();
  const runtimeProfile = useMemo(() => getRuntimePerformanceProfile(), []);
  const guidance = useMemo(() => getMediaPerformanceGuidance(runtimeProfile), [runtimeProfile]);
  const [file, setFile] = useState<File | null>(null);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [loudnessPreset, setLoudnessPreset] = useState("off");
  const [outputFormat, setOutputFormat] = useState("mp3");
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const loudnessPresets = [
    { value: "off", label: "Off", help: "Keep the original loudness behavior.", filter: null },
    { value: "streaming", label: "Streaming", help: "Balanced loudness for general web playback.", filter: "loudnorm=I=-16:LRA=11:TP=-1.5" },
    { value: "podcast", label: "Podcast", help: "Tighter dynamics for spoken-word listening.", filter: "loudnorm=I=-16:LRA=7:TP=-1.5" },
    { value: "speech", label: "Speech boost", help: "A slightly calmer target for voice notes and interviews.", filter: "loudnorm=I=-19:LRA=7:TP=-2" },
    { value: "music", label: "Music", help: "A louder target that still leaves some headroom.", filter: "loudnorm=I=-14:LRA=11:TP=-1" },
  ];

  function pickFile(nextFile: File) {
    setFile(nextFile);
    setResultUrl(null);
    setError(null);
    const url = URL.createObjectURL(nextFile);
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(Math.round(audio.duration));
      URL.revokeObjectURL(url);
    }, { once: true });
  }

  async function applyEffects() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const inst = await ffmpeg.load();
      if (!inst) throw new Error("Media engine failed to load");

      const filters: string[] = [];
      if (volume !== 1.0) filters.push(`volume=${volume.toFixed(2)}`);
      if (fadeIn > 0) filters.push(`afade=t=in:st=0:d=${fadeIn}`);
      if (fadeOut > 0 && duration > 0) filters.push(`afade=t=out:st=${Math.max(0, duration - fadeOut)}:d=${fadeOut}`);
      const selectedLoudness = loudnessPresets.find((preset) => preset.value === loudnessPreset);
      if (selectedLoudness?.filter) filters.push(selectedLoudness.filter);

      if (speed !== 1.0) {
        let currentSpeed = speed;
        const tempos: string[] = [];
        while (currentSpeed > 2.0) { tempos.push("atempo=2.0"); currentSpeed /= 2; }
        while (currentSpeed < 0.5) { tempos.push("atempo=0.5"); currentSpeed /= 0.5; }
        tempos.push(`atempo=${currentSpeed.toFixed(3)}`);
        filters.push(...tempos);
      }

      const codecArgs = outputFormat === "mp3"
        ? ["-c:a", "libmp3lame", "-q:a", "2"]
        : outputFormat === "wav"
        ? ["-c:a", "pcm_s16le"]
        : ["-c:a", "libvorbis", "-q:a", "4"];

      const data = await runSingleFFmpegJob({
        ffmpeg,
        file,
        outputExt: outputFormat,
        setProcessingState: () => {},
        buildArgs: (inputName, outputName) => filters.length > 0
          ? ["-i", inputName, "-af", filters.join(","), ...codecArgs, outputName]
          : ["-i", inputName, ...codecArgs, outputName],
      });

      const outMime = outputFormat === "mp3" ? "audio/mpeg" : outputFormat === "wav" ? "audio/wav" : "audio/ogg";
      const blob = new Blob([data as unknown as BlobPart], { type: outMime });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (nextError) {
      setError(String(nextError));
    } finally {
      setProcessing(false);
    }
  }

  function reset() { setFile(null); setResultUrl(null); setError(null); }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "audio";

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{baseName}_processed.{outputFormat}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(resultSize)}</p>
            </div>
          </div>
          <audio ref={audioRef} controls src={resultUrl} className="w-full" />
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_processed.${outputFormat}`}>
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
          onDrop={(event) => { event.preventDefault(); const nextFile = event.dataTransfer.files[0]; if (nextFile?.type.startsWith("audio/")) pickFile(nextFile); }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop an audio file here</p>
          <p className="text-sm text-muted-foreground mt-1">MP3, WAV, OGG, AAC, FLAC supported</p>
          <input ref={inputRef} type="file" accept="audio/*" className="hidden"
            onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) pickFile(nextFile); }} />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}{duration > 0 ? ` • ${duration}s` : ""}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Playback speed</Label>
              <span className="text-sm font-mono text-muted-foreground">{speed.toFixed(2)}x</span>
            </div>
            <input type="range" min={0.25} max={4} step={0.05} value={speed}
              onChange={(event) => setSpeed(parseFloat(event.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.25x (slow)</span><span>1x (normal)</span><span>4x (fast)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Volume</Label>
              <span className="text-sm font-mono text-muted-foreground">{Math.round(volume * 100)}%</span>
            </div>
            <input type="range" min={0} max={3} step={0.05} value={volume}
              onChange={(event) => setVolume(parseFloat(event.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0% (silent)</span><span>100% (original)</span><span>300% (boost)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Fade in</Label>
                <span className="text-sm font-mono text-muted-foreground">{fadeIn}s</span>
              </div>
              <input type="range" min={0} max={Math.min(10, duration)} step={0.5} value={fadeIn}
                onChange={(event) => setFadeIn(parseFloat(event.target.value))} className="w-full accent-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Fade out</Label>
                <span className="text-sm font-mono text-muted-foreground">{fadeOut}s</span>
              </div>
              <input type="range" min={0} max={Math.min(10, duration)} step={0.5} value={fadeOut}
                onChange={(event) => setFadeOut(parseFloat(event.target.value))} className="w-full accent-primary" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Loudness target</Label>
            <Select value={loudnessPreset} onValueChange={setLoudnessPreset}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {loudnessPresets.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>{preset.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {loudnessPresets.find((preset) => preset.value === loudnessPreset)?.help}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label>Output format</Label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mp3">MP3</SelectItem>
                <SelectItem value="wav">WAV (lossless)</SelectItem>
                <SelectItem value="ogg">OGG Vorbis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {file.size >= guidance.largeFileWarningThresholdBytes && (
            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              Large audio effect chains can take longer when speed, fades, and loudness normalization are combined in one pass.
            </div>
          )}

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Applying effects... {ffmpeg.progress}%
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${ffmpeg.progress}%` }} />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={applyEffects}>Apply effects</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
