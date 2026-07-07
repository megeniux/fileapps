"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { fetchFile } from "@/lib/ffmpeg";
import { FileDown, TrendingDown, MessageSquare, Mail, Globe, Archive, Settings } from "lucide-react";

// ── Named presets ──────────────────────────────────────────────────────────────
const PRESETS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageSquare,
    description: "≤16 MB, 720p, optimized for mobile sharing",
    crf: "28",
    resolution: "1280x720",
    format: "mp4",
    audioBitrate: "128",
    badge: "Popular",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    description: "≤10 MB, 480p, smallest safe attachment size",
    crf: "33",
    resolution: "854x480",
    format: "mp4",
    audioBitrate: "96",
    badge: null,
  },
  {
    id: "web",
    label: "Web / Social",
    icon: Globe,
    description: "Balanced quality, 1080p, fast-start MP4",
    crf: "23",
    resolution: "1920x1080",
    format: "mp4",
    audioBitrate: "192",
    badge: null,
  },
  {
    id: "twitter",
    label: "Twitter / X",
    icon: Globe,
    description: "≤512 MB, 1080p, H.264 required by platform",
    crf: "25",
    resolution: "1920x1080",
    format: "mp4",
    audioBitrate: "128",
    badge: null,
  },
  {
    id: "archive",
    label: "Archive",
    icon: Archive,
    description: "Maximum quality, lossless-ish, large file",
    crf: "18",
    resolution: "original",
    format: "mp4",
    audioBitrate: "192",
    badge: "High Quality",
  },
  {
    id: "custom",
    label: "Custom",
    icon: Settings,
    description: "Set your own CRF, resolution and format",
    crf: "28",
    resolution: "original",
    format: "mp4",
    audioBitrate: "128",
    badge: null,
  },
];

const RESOLUTIONS = [
  { value: "original",  label: "Keep Original" },
  { value: "1920x1080", label: "1080p (1920×1080)" },
  { value: "1280x720",  label: "720p (1280×720)" },
  { value: "854x480",   label: "480p (854×480)" },
  { value: "640x360",   label: "360p (640×360)" },
];

const OUTPUT_FORMATS = [
  { value: "mp4",  label: "MP4 (H.264 — Best compatibility)" },
  { value: "webm", label: "WebM (VP9 — Better compression)" },
  { value: "mkv",  label: "MKV (Matroska)" },
];

const AUDIO_BITRATES = [
  { value: "192", label: "192 kbps (High)" },
  { value: "128", label: "128 kbps (Medium)" },
  { value: "96",  label: "96 kbps (Low)" },
  { value: "64",  label: "64 kbps (Very Low)" },
];

function estimateReduction(crf: string, resolution: string, audioBitrate: string): string {
  const base: Record<string, number> = { "18": 10, "23": 30, "25": 40, "28": 50, "33": 65, "38": 75 };
  const resBonus: Record<string, number> = { "640x360": 20, "854x480": 15, "1280x720": 10, "1920x1080": 5, original: 0 };
  const audioBonus = parseInt(audioBitrate) <= 96 ? 5 : parseInt(audioBitrate) <= 128 ? 3 : 0;
  const total = Math.min(95, (base[crf] ?? 50) + (resBonus[resolution] ?? 0) + audioBonus);
  return `~${total}–${Math.min(98, total + 5)}%`;
}

function VideoCompressForm({
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
  const [selectedPreset, setSelectedPreset] = useState("whatsapp");
  const [crf, setCrf]             = useState("28");
  const [resolution, setResolution] = useState("1280x720");
  const [format, setFormat]       = useState("mp4");
  const [audioBitrate, setAudioBitrate] = useState("128");
  const [processing, setProcessing] = useState(false);

  const applyPreset = useCallback((presetId: string) => {
    setSelectedPreset(presetId);
    const p = PRESETS.find((x) => x.id === presetId);
    if (!p) return;
    setCrf(p.crf);
    setResolution(p.resolution);
    setFormat(p.format);
    setAudioBitrate(p.audioBitrate);
  }, []);

  const estimate = useMemo(() => estimateReduction(crf, resolution, audioBitrate), [crf, resolution, audioBitrate]);

  const handleProcess = useCallback(async () => {
    if (!ffmpeg.instance?.current?.loaded) { setError("Media engine not loaded. Please refresh."); return; }
    setProcessing(true);
    startProcessing();

    try {
      const inst = ffmpeg.instance.current;
      const inputExt  = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const inputName  = `input.${inputExt}`;
      const outputName = `output.${format}`;

      setProcessingState({ status: "Reading file…" });
      await inst.writeFile(inputName, await fetchFile(file));

      const args: string[] = ["-i", inputName];

      if (format === "webm") {
        args.push("-c:v", "libvpx-vp9", "-b:v", "0", "-crf", crf, "-deadline", "good", "-cpu-used", "2");
      } else {
        args.push("-c:v", "libx264", "-preset", "medium", "-crf", crf);
      }

      if (resolution !== "original") {
        const [w, h] = resolution.split("x");
        args.push("-vf", `scale=${w}:${h}`);
      }

      args.push("-c:a", format === "webm" ? "libopus" : "aac");
      args.push("-b:a", `${audioBitrate}k`);

      if (format === "mp4") args.push("-movflags", "+faststart");

      args.push(outputName);

      setProcessingState({ status: "Processing…", message: "This may take a while for large files." });
      await inst.exec(args);

      setProcessingState({ status: "Writing output…", progress: 95 });
      const data = await inst.readFile(outputName) as Uint8Array;
      if (data.length < 1000) throw new Error("Output too small — try a different format or higher quality.");

      inst.deleteFile(inputName).catch(() => {});
      inst.deleteFile(outputName).catch(() => {});

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const mime = format === "webm" ? "video/webm" : format === "mkv" ? "video/x-matroska" : "video/mp4";
      setOutput({ name: `compressed_${baseName}.${format}`, data, mime });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Compression failed");
    } finally {
      setProcessing(false);
    }
  }, [crf, resolution, format, audioBitrate, file, ffmpeg, setOutput, setError, startProcessing, setProcessingState]);

  return (
    <div className="space-y-5">
      {/* Preset grid */}
      <div className="space-y-1.5">
        <Label>Compression Preset</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRESETS.map((p) => {
            const Icon = p.icon;
            const active = selectedPreset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className={`relative flex flex-col gap-1 rounded-lg border p-3 text-left transition-all ${
                  active
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                {p.badge && (
                  <span className="absolute top-1.5 right-1.5 rounded-full bg-primary/10 px-1.5 py-0 text-[10px] font-medium text-primary leading-5">
                    {p.badge}
                  </span>
                )}
                <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-semibold ${active ? "text-primary" : ""}`}>{p.label}</span>
                <span className="text-[10px] leading-tight text-muted-foreground">{p.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom settings — only shown when custom preset is selected */}
      {selectedPreset === "custom" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border bg-muted/30 p-4">
          <div className="space-y-1.5">
            <Label>CRF Quality</Label>
            <Select value={crf} onValueChange={setCrf}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="18">CRF 18 — Near Lossless</SelectItem>
                <SelectItem value="23">CRF 23 — High Quality</SelectItem>
                <SelectItem value="28">CRF 28 — Balanced</SelectItem>
                <SelectItem value="33">CRF 33 — Smaller File</SelectItem>
                <SelectItem value="38">CRF 38 — Smallest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Resolution</Label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {RESOLUTIONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
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
            <Label>Audio Quality</Label>
            <Select value={audioBitrate} onValueChange={setAudioBitrate}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {AUDIO_BITRATES.map((b) => (
                  <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Settings summary for non-custom presets */}
      {selectedPreset !== "custom" && (
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">CRF {crf}</Badge>
          <Badge variant="secondary">{resolution === "original" ? "Original res." : resolution.replace("x", " × ")}</Badge>
          <Badge variant="secondary">{format.toUpperCase()}</Badge>
          <Badge variant="secondary">{audioBitrate} kbps audio</Badge>
        </div>
      )}

      {/* Estimated reduction */}
      <div className="rounded-md bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-4 py-2 text-sm flex items-center gap-2">
        <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
        <span className="text-muted-foreground">Estimated size reduction:</span>
        <span className="font-semibold text-green-700 dark:text-green-400">{estimate}</span>
      </div>

      <Button onClick={handleProcess} disabled={processing} className="w-full" size="lg">
        <FileDown className="mr-2 h-4 w-4" />
        {processing ? "Compressing..." : "Compress Video"}
      </Button>
    </div>
  );
}

export function VideoCompressClient() {
  return (
    <ToolShell
      title="Video Compressor"
      description="Reduce video file size — choose a preset or customize your settings"
      action="compress"
      accept="video/*"
      formats="MP4, WebM, AVI, MOV, MKV, FLV"
    >
      {(props) => <VideoCompressForm {...props} />}
    </ToolShell>
  );
}
