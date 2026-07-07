"use client";

import { useState, useRef } from "react";
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
import { UploadCloud, Download, RotateCcw, Loader2, Music } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

export function AudioEffectsClient() {
  const ffmpeg = useFFmpegContext();
  const [file, setFile] = useState<File | null>(null);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [normalize, setNormalize] = useState(false);
  const [outputFormat, setOutputFormat] = useState("mp3");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  function pickFile(f: File) {
    setFile(f);
    setResultUrl(null);
    setError(null);
    // Get duration
    const url = URL.createObjectURL(f);
    const a = new Audio(url);
    a.addEventListener("loadedmetadata", () => {
      setDuration(Math.round(a.duration));
      URL.revokeObjectURL(url);
    }, { once: true });
  }

  async function applyEffects() {
    if (!file) return;
    setProcessing(true);
    setProgress(0);
    setError(null);
    try {
      const inst = await ffmpeg.load();
      if (!inst) throw new Error("Media engine failed to load");
      inst.on("progress", ({ progress: p }: { progress: number }) => setProgress(Math.round(p * 100)));

      const inExt = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
      const outExt = outputFormat;
      const outMime = outputFormat === "mp3" ? "audio/mpeg" : outputFormat === "wav" ? "audio/wav" : "audio/ogg";
      const inputName = `input.${inExt}`;
      const outputName = `output.${outExt}`;

      await inst.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));

      // Build filter chain
      const filters: string[] = [];
      if (volume !== 1.0) filters.push(`volume=${volume.toFixed(2)}`);
      if (fadeIn > 0) filters.push(`afade=t=in:st=0:d=${fadeIn}`);
      if (fadeOut > 0 && duration > 0) filters.push(`afade=t=out:st=${Math.max(0, duration - fadeOut)}:d=${fadeOut}`);
      if (normalize) filters.push("loudnorm");

      // Speed via atempo (supports 0.5–2.0; chain for >2 or <0.5)
      if (speed !== 1.0) {
        let s = speed;
        const tempos: string[] = [];
        while (s > 2.0) { tempos.push("atempo=2.0"); s /= 2; }
        while (s < 0.5) { tempos.push("atempo=0.5"); s /= 0.5; }
        tempos.push(`atempo=${s.toFixed(3)}`);
        filters.push(...tempos);
      }

      const codecArgs = outputFormat === "mp3"
        ? ["-c:a", "libmp3lame", "-q:a", "2"]
        : outputFormat === "wav"
        ? ["-c:a", "pcm_s16le"]
        : ["-c:a", "libvorbis", "-q:a", "4"];

      const args = filters.length > 0
        ? ["-i", inputName, "-af", filters.join(","), ...codecArgs, outputName]
        : ["-i", inputName, ...codecArgs, outputName];

      await inst.exec(args);
      const data = await inst.readFile(outputName) as Uint8Array;
      const blob = new Blob([data as unknown as BlobPart], { type: outMime });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      await inst.deleteFile(inputName).catch(() => {});
      await inst.deleteFile(outputName).catch(() => {});
    } catch (err) {
      setError(String(err));
    } finally {
      setProcessing(false);
    }
  }

  function reset() { setFile(null); setResultUrl(null); setError(null); setProgress(0); }

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
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("audio/")) pickFile(f); }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop an audio file here</p>
          <p className="text-sm text-muted-foreground mt-1">MP3, WAV, OGG, AAC, FLAC supported</p>
          <input ref={inputRef} type="file" accept="audio/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}{duration > 0 ? ` · ${duration}s` : ""}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          {/* Speed */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Playback speed</Label>
              <span className="text-sm font-mono text-muted-foreground">{speed.toFixed(2)}×</span>
            </div>
            <input type="range" min={0.25} max={4} step={0.05} value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.25× (slow)</span><span>1× (normal)</span><span>4× (fast)</span>
            </div>
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Volume</Label>
              <span className="text-sm font-mono text-muted-foreground">{Math.round(volume * 100)}%</span>
            </div>
            <input type="range" min={0} max={3} step={0.05} value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0% (silent)</span><span>100% (original)</span><span>300% (boost)</span>
            </div>
          </div>

          {/* Fades */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Fade in</Label>
                <span className="text-sm font-mono text-muted-foreground">{fadeIn}s</span>
              </div>
              <input type="range" min={0} max={Math.min(10, duration)} step={0.5} value={fadeIn}
                onChange={(e) => setFadeIn(parseFloat(e.target.value))} className="w-full accent-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Fade out</Label>
                <span className="text-sm font-mono text-muted-foreground">{fadeOut}s</span>
              </div>
              <input type="range" min={0} max={Math.min(10, duration)} step={0.5} value={fadeOut}
                onChange={(e) => setFadeOut(parseFloat(e.target.value))} className="w-full accent-primary" />
            </div>
          </div>

          {/* Normalize */}
          <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div>
              <p className="text-sm font-medium">Normalize loudness</p>
              <p className="text-xs text-muted-foreground">Auto-adjust volume to broadcast standard</p>
            </div>
            <button
              onClick={() => setNormalize((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${normalize ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${normalize ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          {/* Output format */}
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

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Applying effects… {progress}%
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
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
