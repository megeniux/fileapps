"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchFile } from "@/lib/ffmpeg";
import { FileDown, TrendingDown } from "lucide-react";

const COMPRESSION_LEVELS = [
  { value: "192", label: "Low — Best Quality (192 kbps)" },
  { value: "128", label: "Medium — Balanced (128 kbps)" },
  { value: "96", label: "High — Smaller (96 kbps)" },
  { value: "64", label: "Extreme — Smallest (64 kbps)" },
];

const OUTPUT_FORMATS = [
  { value: "mp3", label: "MP3 (Most compatible)" },
  { value: "ogg", label: "OGG (Good compression)" },
  { value: "m4a", label: "M4A / AAC" },
  { value: "opus", label: "OPUS (Best compression)" },
];

const SAMPLE_RATES = [
  { value: "original", label: "Keep Original" },
  { value: "44100", label: "44.1 kHz (CD quality)" },
  { value: "32000", label: "32 kHz" },
  { value: "22050", label: "22.05 kHz" },
];

const CHANNELS = [
  { value: "original", label: "Keep Original" },
  { value: "2", label: "Stereo" },
  { value: "1", label: "Mono (smaller file)" },
];

function estimateReduction(bitrate: string, sampleRate: string, channels: string): string {
  const base: Record<string, number> = { "192": 40, "128": 60, "96": 75, "64": 85 };
  let total = base[bitrate] || 60;
  if (sampleRate !== "original" && parseInt(sampleRate) < 44100) total += 5;
  if (channels === "1") total += 10;
  total = Math.min(95, total);
  return `~${total - 5}-${total}%`;
}

function AudioCompressForm({
  file,
  ffmpeg,
  setOutput,
  setError,
  startProcessing,
  setProcessingState,
}: {
  file: File;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ffmpeg: any;
  setOutput: (o: { name: string; data: Uint8Array; mime: string }) => void;
  setError: (msg: string) => void;
  startProcessing: () => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
}) {
  const [bitrate, setBitrate] = useState("128");
  const [format, setFormat] = useState("mp3");
  const [sampleRate, setSampleRate] = useState("original");
  const [channels, setChannels] = useState("original");
  const [processing, setProcessing] = useState(false);

  const estimate = useMemo(() => estimateReduction(bitrate, sampleRate, channels), [bitrate, sampleRate, channels]);

  const handleProcess = useCallback(async () => {
    if (!ffmpeg.instance?.current?.loaded) { setError("Media engine not loaded. Please refresh."); return; }
    setProcessing(true);
    startProcessing();

    try {
      const inst = ffmpeg.instance.current;
      const inputExt = file.name.split(".").pop()?.toLowerCase() || "mp3";
      const inputName = `input.${inputExt}`;
      const outputName = `output.${format}`;

      setProcessingState({ status: "Reading file…" });
      await inst.writeFile(inputName, await fetchFile(file));

      const args: string[] = ["-i", inputName];

      if (sampleRate !== "original") args.push("-ar", sampleRate);
      if (channels !== "original") args.push("-ac", channels);

      if (format === "mp3") {
        args.push("-b:a", `${bitrate}k`);
      } else if (format === "ogg") {
        const q = Math.max(0, Math.min(10, Math.round((parseInt(bitrate) - 64) / 16)));
        args.push("-q:a", String(q));
      } else if (format === "m4a") {
        args.push("-c:a", "aac", "-b:a", `${bitrate}k`);
      } else if (format === "opus") {
        args.push("-c:a", "libopus", "-b:a", `${bitrate}k`);
      }

      args.push(outputName);
      setProcessingState({ status: "Processing…", message: "This may take a while for large files." });
      await inst.exec(args);

      setProcessingState({ status: "Writing output…", progress: 95 });
      const data = await inst.readFile(outputName) as Uint8Array;
      if (data.length < 500) throw new Error("Output too small — try a different format.");

      inst.deleteFile(inputName).catch(() => {});
      inst.deleteFile(outputName).catch(() => {});

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const mimeMap: Record<string, string> = { mp3: "audio/mpeg", ogg: "audio/ogg", m4a: "audio/mp4", opus: "audio/ogg" };
      setOutput({ name: `compressed_${baseName}.${format}`, data, mime: mimeMap[format] || `audio/${format}` });
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Compression failed";
      setError(msg.includes("codec") || msg.includes("Encoder")
        ? "Codec error — try MP3, OGG, or M4A format instead."
        : msg);
    } finally {
      setProcessing(false);
    }
  }, [bitrate, format, sampleRate, channels, file, ffmpeg, setOutput, setError, startProcessing]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Compression Level</Label>
          <Select value={bitrate} onValueChange={setBitrate}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COMPRESSION_LEVELS.map((l) => (
                <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
        </div>

        <div className="space-y-1.5">
          <Label>Sample Rate</Label>
          <Select value={sampleRate} onValueChange={setSampleRate}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SAMPLE_RATES.map((r) => (
                <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Channels</Label>
          <Select value={channels} onValueChange={setChannels}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CHANNELS.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-4 py-2 text-sm flex items-center gap-2">
        <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
        <span className="text-muted-foreground">Estimated size reduction:</span>
        <span className="font-semibold text-green-700 dark:text-green-400">{estimate}</span>
      </div>

      <Button onClick={handleProcess} disabled={processing} className="w-full" size="lg">
        <FileDown className="mr-2 h-4 w-4" />
        {processing ? "Compressing..." : "Compress Audio"}
      </Button>
    </div>
  );
}

export function AudioCompressClient() {
  return (
    <ToolShell
      title="Audio Compressor"
      description="Reduce audio file size by adjusting bitrate, sample rate, and channels"
      action="compress"
      accept="audio/*"
      formats="MP3, WAV, OGG, M4A, FLAC, AAC"
    >
      {(props) => <AudioCompressForm {...props} />}
    </ToolShell>
  );
}
