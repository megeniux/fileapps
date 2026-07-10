"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download, RotateCcw } from "lucide-react";
import { useFFmpegContext } from "@/contexts/ffmpeg-context";
import { formatFileSize } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { runSingleFFmpegJob } from "@/lib/ffmpeg-jobs";
import { getMediaPerformanceGuidance, getRuntimePerformanceProfile } from "@/lib/runtime-performance";

const OUTPUT_FORMATS = [
  { value: "mp4", label: "MP4", ext: "mp4", mime: "video/mp4" },
  { value: "webm", label: "WebM", ext: "webm", mime: "video/webm" },
];

export function VideoReverseClient() {
  const ffmpeg = useFFmpegContext();
  const runtimeProfile = useMemo(() => getRuntimePerformanceProfile(), []);
  const guidance = useMemo(() => getMediaPerformanceGuidance(runtimeProfile), [runtimeProfile]);
  const [file, setFile] = useState<File | null>(null);
  const [keepAudio, setKeepAudio] = useState(true);
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(nextFile: File) {
    setFile(nextFile);
    setResultUrl(null);
    setError(null);
    const ext = nextFile.name.split(".").pop()?.toLowerCase() ?? "mp4";
    if (ext === "webm") setOutputFormat("webm");
  }

  async function process() {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const inst = await ffmpeg.load();
      if (!inst) throw new Error("Media engine failed to load. Please refresh.");

      const fmt = OUTPUT_FORMATS.find((item) => item.value === outputFormat)!;
      const data = await runSingleFFmpegJob({
        ffmpeg,
        file,
        outputExt: fmt.ext,
        setProcessingState: () => {},
        buildArgs: (inputName, outputName) => {
          const args: string[] = ["-i", inputName];

          if (keepAudio) {
            args.push("-vf", "reverse", "-af", "areverse");
          } else {
            args.push("-vf", "reverse", "-an");
          }

          if (outputFormat === "mp4") {
            args.push("-c:v", "libx264", "-crf", "23", "-preset", "fast");
            if (keepAudio) args.push("-c:a", "aac", "-b:a", "192k");
          } else {
            args.push("-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0");
            if (keepAudio) args.push("-c:a", "libopus");
          }

          args.push(outputName);
          return args;
        },
      });

      const blob = new Blob([data as unknown as BlobPart], { type: fmt.mime });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Processing failed");
    } finally {
      setProcessing(false);
    }
  }

  function reset() { setFile(null); setResultUrl(null); setError(null); }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "reversed";
  const fmt = OUTPUT_FORMATS.find((item) => item.value === outputFormat)!;

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
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => { event.preventDefault(); const nextFile = event.dataTransfer.files[0]; if (nextFile?.type.startsWith("video/")) pickFile(nextFile); }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a video here</p>
          <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV, AVI supported</p>
          <input ref={inputRef} type="file" accept="video/*" className="hidden"
            onChange={(event) => { const nextFile = event.target.files?.[0]; if (nextFile) pickFile(nextFile); }} />
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

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium w-24">Output format</span>
              <div className="flex gap-2">
                {OUTPUT_FORMATS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setOutputFormat(item.value)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${outputFormat === item.value ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={keepAudio}
                onChange={(event) => setKeepAudio(event.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Reverse audio too (plays audio backwards)</span>
            </label>
          </div>

          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
            <strong>Note:</strong> Video reversal loads much more of the file into memory than simple trim or mute workflows.
          </div>

          {file.size >= guidance.reverseWarningThresholdBytes && (
            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              This file is large for browser-side reversal, especially on lower-end devices. If it stalls, use a shorter source clip first or convert to a lighter intermediate file before reversing.
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          {processing ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reversing video...</span>
                <span>{ffmpeg.progress}%</span>
              </div>
              <Progress value={ffmpeg.progress} />
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
