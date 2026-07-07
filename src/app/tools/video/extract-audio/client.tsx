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

const FORMAT_OPTIONS = [
  { value: "mp3", label: "MP3", codec: "libmp3lame", mime: "audio/mpeg", ext: "mp3", qualityArg: ["-q:a", "2"] },
  { value: "aac", label: "AAC (M4A)", codec: "aac", mime: "audio/mp4", ext: "m4a", qualityArg: ["-b:a", "192k"] },
  { value: "wav", label: "WAV (lossless)", codec: "pcm_s16le", mime: "audio/wav", ext: "wav", qualityArg: [] },
  { value: "ogg", label: "OGG Vorbis", codec: "libvorbis", mime: "audio/ogg", ext: "ogg", qualityArg: ["-q:a", "4"] },
  { value: "flac", label: "FLAC (lossless)", codec: "flac", mime: "audio/flac", ext: "flac", qualityArg: [] },
];

export function VideoExtractAudioClient() {
  const ffmpeg = useFFmpegContext();
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("mp3");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File) {
    setFile(f);
    setResultUrl(null);
    setError(null);
  }

  async function extract() {
    if (!file) return;
    const fmt = FORMAT_OPTIONS.find((f) => f.value === format)!;
    setProcessing(true);
    setProgress(0);
    setError(null);
    try {
      const inst = await ffmpeg.load();
      if (!inst) throw new Error("Media engine failed to load");
      inst.on("progress", ({ progress: p }: { progress: number }) => setProgress(Math.round(p * 100)));
      const inputName = "input" + file.name.slice(file.name.lastIndexOf("."));
      const outputName = `output.${fmt.ext}`;
      await inst.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));
      const args = ["-i", inputName, "-vn", "-c:a", fmt.codec, ...fmt.qualityArg, outputName];
      await inst.exec(args);
      const data = await inst.readFile(outputName) as Uint8Array;
      const blob = new Blob([data as unknown as BlobPart], { type: fmt.mime });
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

  function reset() {
    setFile(null);
    setResultUrl(null);
    setError(null);
    setProgress(0);
  }

  const fmt = FORMAT_OPTIONS.find((f) => f.value === format)!;
  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "audio";

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10 space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{baseName}.{fmt.ext}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(resultSize)}</p>
            </div>
          </div>
          <audio controls src={resultUrl} className="w-full" />
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}.${fmt.ext}`}>
              <Button><Download className="w-4 h-4 mr-2" />Download audio</Button>
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
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("video/")) pickFile(f); }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a video file here</p>
          <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV, AVI, MKV supported</p>
          <input ref={inputRef} type="file" accept="video/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
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

          <div className="space-y-1.5">
            <Label>Output audio format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {FORMAT_OPTIONS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {format === "mp3" && "Best compatibility — works everywhere"}
              {format === "aac" && "Great quality, small file — ideal for Apple devices"}
              {format === "wav" && "Uncompressed lossless — large file"}
              {format === "ogg" && "Open format — good for web and gaming"}
              {format === "flac" && "Lossless compressed — audiophile quality"}
            </p>
          </div>

          {processing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Extracting audio… {progress}%
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={extract}>Extract audio</Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
