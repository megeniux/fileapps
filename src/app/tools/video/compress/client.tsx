"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { runSingleFFmpegJob } from "@/lib/ffmpeg-jobs";
import { FileDown, TrendingDown, MessageSquare, Mail, Globe, Archive, Settings } from "lucide-react";

const PRESETS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageSquare,
    description: "<=16 MB, 720p, optimized for mobile sharing",
    crf: "28",
    resolution: "1280x720",
    format: "mp4",
    videoCodec: "auto",
    fps: "original",
    audioCodec: "auto",
    audioBitrate: "128",
    badge: "Popular",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    description: "<=10 MB, 480p, smallest safe attachment size",
    crf: "33",
    resolution: "854x480",
    format: "mp4",
    videoCodec: "auto",
    fps: "original",
    audioCodec: "auto",
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
    videoCodec: "auto",
    fps: "original",
    audioCodec: "auto",
    audioBitrate: "192",
    badge: null,
  },
  {
    id: "twitter",
    label: "Twitter / X",
    icon: Globe,
    description: "<=512 MB, 1080p, H.264 export",
    crf: "25",
    resolution: "1920x1080",
    format: "mp4",
    videoCodec: "auto",
    fps: "original",
    audioCodec: "auto",
    audioBitrate: "128",
    badge: null,
  },
  {
    id: "archive",
    label: "Archive",
    icon: Archive,
    description: "Maximum quality, large file, better for preservation",
    crf: "18",
    resolution: "original",
    format: "mp4",
    videoCodec: "auto",
    fps: "original",
    audioCodec: "auto",
    audioBitrate: "192",
    badge: "High Quality",
  },
  {
    id: "custom",
    label: "Custom",
    icon: Settings,
    description: "Set your own CRF, resolution, and format",
    crf: "28",
    resolution: "original",
    format: "mp4",
    videoCodec: "auto",
    fps: "original",
    audioCodec: "auto",
    audioBitrate: "128",
    badge: null,
  },
];

const RESOLUTIONS = [
  { value: "original", label: "Keep Original" },
  { value: "1920x1080", label: "1080p (1920 x 1080)" },
  { value: "1280x720", label: "720p (1280 x 720)" },
  { value: "854x480", label: "480p (854 x 480)" },
  { value: "640x360", label: "360p (640 x 360)" },
];

const OUTPUT_FORMATS = [
  { value: "mp4", label: "MP4 (H.264 - Best compatibility)" },
  { value: "webm", label: "WebM (VP9 - Better compression)" },
  { value: "mkv", label: "MKV (Matroska)" },
];

const VIDEO_CODECS = [
  { value: "auto", label: "Auto (match output format)" },
  { value: "h264", label: "H.264 (best compatibility)" },
  { value: "vp9", label: "VP9 (smaller web delivery)" },
];

const FPS_OPTIONS = [
  { value: "original", label: "Keep Original FPS" },
  { value: "60", label: "60 fps" },
  { value: "30", label: "30 fps" },
  { value: "24", label: "24 fps" },
];

const AUDIO_CODECS = [
  { value: "auto", label: "Auto" },
  { value: "aac", label: "AAC" },
  { value: "mp3", label: "MP3" },
  { value: "opus", label: "Opus" },
  { value: "mute", label: "No audio" },
];

const BITRATE_MODES = [
  { value: "crf", label: "CRF (quality-based)" },
  { value: "bitrate", label: "Target bitrate" },
];

const VIDEO_BITRATES = [
  { value: "8000k", label: "8 Mbps (1080p high quality)" },
  { value: "5000k", label: "5 Mbps (1080p balanced)" },
  { value: "2500k", label: "2.5 Mbps (720p balanced)" },
  { value: "1200k", label: "1.2 Mbps (480p smaller)" },
  { value: "700k", label: "700 kbps (smallest)" },
];

const AUDIO_BITRATES = [
  { value: "192", label: "192 kbps (High)" },
  { value: "128", label: "128 kbps (Medium)" },
  { value: "96", label: "96 kbps (Low)" },
  { value: "64", label: "64 kbps (Very Low)" },
];

function getReductionBounds(crf: string, resolution: string, audioBitrate: string) {
  const base: Record<string, number> = { "18": 10, "23": 30, "25": 40, "28": 50, "33": 65, "38": 75 };
  const resBonus: Record<string, number> = {
    "640x360": 20,
    "854x480": 15,
    "1280x720": 10,
    "1920x1080": 5,
    original: 0,
  };
  const audioBonus = parseInt(audioBitrate, 10) <= 96 ? 5 : parseInt(audioBitrate, 10) <= 128 ? 3 : 0;
  const total = Math.min(95, (base[crf] ?? 50) + (resBonus[resolution] ?? 0) + audioBonus);
  return {
    min: total,
    max: Math.min(98, total + 5),
  };
}

function estimateReduction(crf: string, resolution: string, audioBitrate: string): string {
  const bounds = getReductionBounds(crf, resolution, audioBitrate);
  return `~${bounds.min}-${bounds.max}%`;
}

function formatExpectedSize(fileSize: number, bounds: { min: number; max: number }) {
  const largerOutput = fileSize * ((100 - bounds.min) / 100);
  const smallerOutput = fileSize * ((100 - bounds.max) / 100);
  return `${(smallerOutput / (1024 * 1024)).toFixed(1)}-${(largerOutput / (1024 * 1024)).toFixed(1)} MB`;
}

function getPresetGuidance(presetId: string) {
  const guidance: Record<string, { useCase: string; note: string }> = {
    whatsapp: {
      useCase: "Best for quick sharing in chat apps when compatibility matters more than perfect detail.",
      note: "If the result is still too large, try the Email preset or switch Custom mode to a lower resolution or target bitrate.",
    },
    email: {
      useCase: "Best for small attachments, approval clips, and situations where file size is the first priority.",
      note: "Expect softer detail on large screens. This is the safest preset when you need the smallest portable file.",
    },
    web: {
      useCase: "Best for websites, blog embeds, landing pages, and social uploads that still need decent visual quality.",
      note: "This preset keeps a stronger quality floor than chat-oriented presets, so the file may still be too large for strict upload caps.",
    },
    twitter: {
      useCase: "Best for social posts where H.264 MP4 compatibility matters and the source should stay reasonably sharp.",
      note: "If the original has very high frame rate or extreme bitrate, Custom mode gives you more control over size limits.",
    },
    archive: {
      useCase: "Best when you want a smaller file without pushing quality loss too hard.",
      note: "This is not true archival preservation. It still re-encodes the video, so keep the original if long-term master quality matters.",
    },
    custom: {
      useCase: "Best when you need tighter control over file size, playback compatibility, or delivery targets.",
      note: "Use CRF for easier quality-based compression or bitrate mode when you must stay near a specific upload ceiling.",
    },
  };
  return guidance[presetId] ?? guidance.custom;
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
  ffmpeg: {
    instance: { current: { loaded?: boolean } | null };
    markStage?: (stage: "reading-file" | "processing" | "writing-output") => void;
    markDone?: () => void;
  };
  setOutput: (o: { name: string; data: Uint8Array; mime: string }) => void;
  setError: (msg: string) => void;
  startProcessing: () => void;
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
}) {
  const [selectedPreset, setSelectedPreset] = useState("whatsapp");
  const [crf, setCrf] = useState("28");
  const [resolution, setResolution] = useState("1280x720");
  const [format, setFormat] = useState("mp4");
  const [videoCodec, setVideoCodec] = useState("auto");
  const [bitrateMode, setBitrateMode] = useState("crf");
  const [videoBitrate, setVideoBitrate] = useState("2500k");
  const [fps, setFps] = useState("original");
  const [audioCodec, setAudioCodec] = useState("auto");
  const [audioBitrate, setAudioBitrate] = useState("128");
  const [processing, setProcessing] = useState(false);

  const applyPreset = useCallback((presetId: string) => {
    setSelectedPreset(presetId);
    const preset = PRESETS.find((item) => item.id === presetId);
    if (!preset) return;
    setCrf(preset.crf);
    setResolution(preset.resolution);
    setFormat(preset.format);
    setVideoCodec(preset.videoCodec);
    setBitrateMode("crf");
    setVideoBitrate("2500k");
    setFps(preset.fps);
    setAudioCodec(preset.audioCodec);
    setAudioBitrate(preset.audioBitrate);
  }, []);

  const estimate = useMemo(
    () => estimateReduction(crf, resolution, audioBitrate),
    [crf, resolution, audioBitrate],
  );
  const reductionBounds = useMemo(
    () => getReductionBounds(crf, resolution, audioBitrate),
    [crf, resolution, audioBitrate],
  );
  const expectedSize = useMemo(
    () => formatExpectedSize(file.size, reductionBounds),
    [file.size, reductionBounds],
  );
  const presetGuidance = useMemo(
    () => getPresetGuidance(selectedPreset),
    [selectedPreset],
  );

  const handleProcess = useCallback(async () => {
    if (!ffmpeg.instance?.current?.loaded) {
      setError("Media engine not loaded. Please refresh.");
      return;
    }

    setProcessing(true);
    startProcessing();

    try {
      const data = await runSingleFFmpegJob({
        ffmpeg,
        file,
        outputExt: format,
        setProcessingState,
        buildArgs: (inputName, outputName) => {
          const args: string[] = ["-i", inputName];

          const resolvedVideoCodec =
            videoCodec === "auto"
              ? format === "webm"
                ? "libvpx-vp9"
                : "libx264"
              : videoCodec === "vp9"
                ? format === "webm" || format === "mkv"
                  ? "libvpx-vp9"
                  : "libx264"
                : "libx264";

          if (resolvedVideoCodec === "libvpx-vp9") {
            args.push("-c:v", "libvpx-vp9");
            if (bitrateMode === "bitrate") {
              args.push("-b:v", videoBitrate);
            } else {
              args.push("-b:v", "0", "-crf", crf);
            }
            args.push("-deadline", "good", "-cpu-used", "2");
          } else {
            args.push("-c:v", "libx264", "-preset", "medium");
            if (bitrateMode === "bitrate") {
              args.push("-b:v", videoBitrate);
            } else {
              args.push("-crf", crf);
            }
          }

          const videoFilters: string[] = [];
          if (resolution !== "original") {
            const [w, h] = resolution.split("x");
            videoFilters.push(`scale=${w}:${h}`);
          }
          if (fps !== "original") {
            videoFilters.push(`fps=${fps}`);
          }
          if (videoFilters.length > 0) {
            args.push("-vf", videoFilters.join(","));
          }

          if (audioCodec === "mute") {
            args.push("-an");
          } else {
            const resolvedAudioCodec =
              audioCodec === "auto"
                ? format === "webm"
                  ? "libopus"
                  : "aac"
                : audioCodec === "opus"
                  ? format === "webm"
                    ? "libopus"
                    : "aac"
                  : audioCodec === "mp3"
                    ? "libmp3lame"
                    : "aac";

            args.push("-c:a", resolvedAudioCodec);
            args.push("-b:a", `${audioBitrate}k`);
          }

          if (format === "mp4") {
            args.push("-movflags", "+faststart");
          }

          args.push(outputName);
          return args;
        },
      });

      if (data.length < 1000) {
        throw new Error("Output too small - try a different format or higher quality.");
      }

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const mime =
        format === "webm" ? "video/webm" : format === "mkv" ? "video/x-matroska" : "video/mp4";
      setOutput({ name: `compressed_${baseName}.${format}`, data, mime });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Compression failed");
    } finally {
      setProcessing(false);
    }
  }, [audioBitrate, audioCodec, bitrateMode, crf, ffmpeg, file, format, fps, resolution, setError, setOutput, setProcessingState, startProcessing, videoBitrate, videoCodec]);

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label>Compression Preset</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const active = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`relative flex flex-col gap-1 rounded-lg border p-3 text-left transition-all ${
                  active
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                {preset.badge && (
                  <span className="absolute right-1.5 top-1.5 rounded-full bg-primary/10 px-1.5 py-0 text-[10px] font-medium leading-5 text-primary">
                    {preset.badge}
                  </span>
                )}
                <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-semibold ${active ? "text-primary" : ""}`}>{preset.label}</span>
                <span className="text-[10px] leading-tight text-muted-foreground">{preset.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedPreset === "custom" && (
        <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>CRF Quality</Label>
            <Select value={crf} onValueChange={setCrf}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="18">CRF 18 - Near Lossless</SelectItem>
                <SelectItem value="23">CRF 23 - High Quality</SelectItem>
                <SelectItem value="28">CRF 28 - Balanced</SelectItem>
                <SelectItem value="33">CRF 33 - Smaller File</SelectItem>
                <SelectItem value="38">CRF 38 - Smallest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Resolution</Label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {RESOLUTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Output Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {OUTPUT_FORMATS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Video Codec</Label>
            <Select value={videoCodec} onValueChange={setVideoCodec}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {VIDEO_CODECS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Bitrate Mode</Label>
            <Select value={bitrateMode} onValueChange={setBitrateMode}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BITRATE_MODES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {bitrateMode === "bitrate" && (
            <div className="space-y-1.5">
              <Label>Target Video Bitrate</Label>
              <Select value={videoBitrate} onValueChange={setVideoBitrate}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {VIDEO_BITRATES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label>Frame Rate</Label>
            <Select value={fps} onValueChange={setFps}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {FPS_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Audio Codec</Label>
            <Select value={audioCodec} onValueChange={setAudioCodec}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {AUDIO_CODECS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Audio Quality</Label>
            <Select value={audioBitrate} onValueChange={setAudioBitrate}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {AUDIO_BITRATES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {selectedPreset !== "custom" && (
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">CRF {crf}</Badge>
          <Badge variant="secondary">{resolution === "original" ? "Original res." : resolution.replace("x", " x ")}</Badge>
          <Badge variant="secondary">{format.toUpperCase()}</Badge>
          <Badge variant="secondary">{videoCodec === "auto" ? "Auto codec" : videoCodec.toUpperCase()}</Badge>
          <Badge variant="secondary">{bitrateMode === "crf" ? `CRF ${crf}` : videoBitrate}</Badge>
          <Badge variant="secondary">{fps === "original" ? "Original FPS" : `${fps} fps`}</Badge>
          <Badge variant="secondary">{audioCodec === "auto" ? "Auto audio" : audioCodec === "mute" ? "Muted" : audioCodec.toUpperCase()}</Badge>
          <Badge variant="secondary">{audioBitrate} kbps audio</Badge>
        </div>
      )}

      <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm dark:border-green-800 dark:bg-green-950/30">
        <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
        <span className="text-muted-foreground">Estimated size reduction:</span>
        <span className="font-semibold text-green-700 dark:text-green-400">{estimate}</span>
      </div>

      <div className="rounded-md border bg-muted/40 px-4 py-3 text-sm">
        <p className="font-medium">Expected result</p>
        <p className="mt-1 text-muted-foreground">
          Typical output for this setup is around <span className="font-medium text-foreground">{expectedSize}</span> from your current file.
        </p>
        <p className="mt-2 text-muted-foreground">{presetGuidance.useCase}</p>
        <p className="mt-1 text-xs text-muted-foreground">{presetGuidance.note}</p>
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
      description="Reduce video file size with stronger presets, advanced controls, and a shared FFmpeg processing flow"
      action="compress"
      accept="video/*"
      formats="MP4, WebM, AVI, MOV, MKV, FLV"
    >
      {(props) => <VideoCompressForm {...props} />}
    </ToolShell>
  );
}
