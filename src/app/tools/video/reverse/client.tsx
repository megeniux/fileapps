"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download, RotateCcw } from "lucide-react";
import { useFFmpegContext } from "@/contexts/ffmpeg-context";
import { formatFileSize } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const OUTPUT_FORMATS = [
  { value: "mp4", label: "MP4", ext: "mp4", mime: "video/mp4" },
  { value: "webm", label: "WebM", ext: "webm", mime: "video/webm" },
];

export function VideoReverseClient() {
  const ffmpeg = useFFmpegContext();
  const [file, setFile] = useState<File | null>(null);
  const [keepAudio, setKeepAudio] = useState(true);
  const [outputFormat, setOutputFormat] = useState("mp4");
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
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "mp4";
    if (["webm"].includes(ext)) setOutputFormat("webm");
  }

  async function process() {
    if (!file) return;
    setProcessing(true);
    setProgress(0);
    setError(null);
    try {
      const inst = await ffmpeg.load();
      if (!inst) throw new Error("Media engine failed to load. Please refresh.");

      inst.on("progress", ({ progress: p }: { progress: number }) => setProgress(Math.round(p * 100)));

      const ext = file.name.split(".").pop() ?? "mp4";
      const input = `input.${ext}`;
      const fmt = OUTPUT_FORMATS.find((f) => f.value === outputFormat)!;
      const output = `output.${fmt.ext}`;

      const buf = await file.arrayBuffer();
      await inst.writeFile(input, new Uint8Array(buf));

      // Video reverse: load entire file into memory, then reverse
      const vfArg = "reverse";
      const afArg = "areverse";

      const args: string[] = ["-i", input];

      if (keepAudio) {
        args.push("-vf", vfArg, "-af", afArg);
      } else {
        args.push("-vf", vfArg, "-an");
      }

      if (outputFormat === "mp4") {
        args.push("-c:v", "libx264", "-crf", "23", "-preset", "fast");
        if (keepAudio) args.push("-c:a", "aac", "-b:a", "192k");
      } else {
        args.push("-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0");
        if (keepAudio) args.push("-c:a", "libopus");
      }

      args.push(output);
      await inst.exec(args);

      const data = await inst.readFile(output);
      const blob = new Blob([data as unknown as BlobPart], { type: fmt.mime });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);

      await inst.deleteFile(input).catch(() => {});
      await inst.deleteFile(output).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  }

  function reset() { setFile(null); setResultUrl(null); setError(null); }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "reversed";
  const fmt = OUTPUT_FORMATS.find((f) => f.value === outputFormat)!;

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Reversed video</h2>
          <video src={resultUrl} controls className="rounded-lg w-full max-h-64" />
          <p className="text-sm text-muted-foreground text-center">{formatFileSize(resultSize)}</p>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_reversed.${fmt.ext}`}>
              <Button><Download className="w-4 h-4 mr-2" />Download</Button>
            </a>
            <Button variant="outline" onClick={() => setResultUrl(null)}>Process another</Button>
            <Button variant="ghost" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />New file</Button>
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
          <p className="font-medium">Drop a video here</p>
          <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV, AVI supported</p>
          <input ref={inputRef} type="file" accept="video/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-4 h-4" /></Button>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium w-24">Output format</span>
              <div className="flex gap-2">
                {OUTPUT_FORMATS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setOutputFormat(f.value)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${outputFormat === f.value ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={keepAudio}
                onChange={(e) => setKeepAudio(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Reverse audio too (plays audio backwards)</span>
            </label>
          </div>

          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
            <strong>Note:</strong> Video reversal loads the entire file into memory. Large files (&gt;200 MB) may be slow or cause browser memory limits to be reached.
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {processing ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reversing video…</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          ) : (
            <Button className="w-full" onClick={process}>
              Reverse video
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
