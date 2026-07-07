"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadCloud, Download, RotateCcw } from "lucide-react";
import { useFFmpegContext } from "@/contexts/ffmpeg-context";
import { formatFileSize } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

// Aspect ratio presets
const ASPECT_PRESETS = [
  { label: "Free", value: null },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
];

interface CropRect { x: number; y: number; w: number; h: number } // pixel values on original video

export function VideoCropClient() {
  const ffmpeg = useFFmpegContext();
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDims, setVideoDims] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragState = useRef<{ type: "move" | "corner"; startX: number; startY: number; initCrop: CropRect } | null>(null);
  const HANDLE = 10;

  function pickFile(f: File) {
    setFile(f);
    const url = URL.createObjectURL(f);
    setVideoUrl(url);
    setResultUrl(null);
    setError(null);
  }

  // Capture first frame to canvas once video loads
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !videoUrl) return;
    const onLoaded = () => {
      const vw = vid.videoWidth, vh = vid.videoHeight;
      setVideoDims({ w: vw, h: vh });
      // Default crop to full frame
      setCrop({ x: 0, y: 0, w: vw, h: vh });
      vid.currentTime = 0.5;
    };
    vid.addEventListener("loadedmetadata", onLoaded);
    return () => vid.removeEventListener("loadedmetadata", onLoaded);
  }, [videoUrl]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onSeeked = () => drawFrame();
    vid.addEventListener("seeked", onSeeked);
    return () => vid.removeEventListener("seeked", onSeeked);
  }, [crop, videoDims]);

  function drawFrame() {
    const canvas = canvasRef.current;
    const vid = videoRef.current;
    if (!canvas || !vid || !videoDims.w) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth * (videoDims.h / videoDims.w);
    const scaleX = canvas.width / videoDims.w;
    const scaleY = canvas.height / videoDims.h;
    ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
    // Draw crop overlay
    const cx = crop.x * scaleX, cy = crop.y * scaleY;
    const cw = crop.w * scaleX, ch = crop.h * scaleY;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, cy);
    ctx.fillRect(0, cy + ch, canvas.width, canvas.height - cy - ch);
    ctx.fillRect(0, cy, cx, ch);
    ctx.fillRect(cx + cw, cy, canvas.width - cx - cw, ch);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);
    // Corner handles
    ctx.fillStyle = "#fff";
    for (const [hx, hy] of [[cx, cy], [cx + cw, cy], [cx, cy + ch], [cx + cw, cy + ch]]) {
      ctx.fillRect(hx - HANDLE / 2, hy - HANDLE / 2, HANDLE, HANDLE);
    }
  }

  useEffect(() => { drawFrame(); }, [crop, videoDims]);

  function getCanvasPos(e: React.MouseEvent): { x: number; y: number } {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = videoDims.w / canvas.width;
    const scaleY = videoDims.h / canvas.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function onMouseDown(e: React.MouseEvent) {
    if (!videoDims.w) return;
    const { x, y } = getCanvasPos(e);
    const { x: cx, y: cy, w: cw, h: ch } = crop;
    const near = (px: number, py: number) => Math.abs(x - px) < HANDLE && Math.abs(y - py) < HANDLE;
    if (near(cx, cy) || near(cx + cw, cy) || near(cx, cy + ch) || near(cx + cw, cy + ch)) {
      dragState.current = { type: "corner", startX: x, startY: y, initCrop: { ...crop } };
    } else if (x >= cx && x <= cx + cw && y >= cy && y <= cy + ch) {
      dragState.current = { type: "move", startX: x, startY: y, initCrop: { ...crop } };
    }
  }

  function onMouseMove(e: React.MouseEvent) {
    const ds = dragState.current;
    if (!ds) return;
    const { x, y } = getCanvasPos(e);
    const dx = x - ds.startX, dy = y - ds.startY;
    const vw = videoDims.w, vh = videoDims.h;
    setCrop((prev) => {
      if (ds.type === "move") {
        const nx = Math.max(0, Math.min(vw - prev.w, ds.initCrop.x + dx));
        const ny = Math.max(0, Math.min(vh - prev.h, ds.initCrop.y + dy));
        return { ...prev, x: nx, y: ny };
      } else {
        // resize: pick closest corner
        const ic = ds.initCrop;
        let nx = ic.x, ny = ic.y, nw = ic.w, nh = ic.h;
        // Determine which corner is nearest
        const corners = [
          { hx: ic.x, hy: ic.y, id: "nw" },
          { hx: ic.x + ic.w, hy: ic.y, id: "ne" },
          { hx: ic.x, hy: ic.y + ic.h, id: "sw" },
          { hx: ic.x + ic.w, hy: ic.y + ic.h, id: "se" },
        ];
        const dist = corners.map((c) => Math.hypot(ds.startX - c.hx, ds.startY - c.hy));
        const closest = corners[dist.indexOf(Math.min(...dist))].id;
        if (closest === "nw") { nx = Math.max(0, ic.x + dx); ny = Math.max(0, ic.y + dy); nw = ic.w - dx; nh = ic.h - dy; }
        if (closest === "ne") { ny = Math.max(0, ic.y + dy); nw = ic.w + dx; nh = ic.h - dy; }
        if (closest === "sw") { nx = Math.max(0, ic.x + dx); nw = ic.w - dx; nh = ic.h + dy; }
        if (closest === "se") { nw = ic.w + dx; nh = ic.h + dy; }
        nw = Math.max(20, Math.min(vw - nx, nw));
        nh = Math.max(20, Math.min(vh - ny, nh));
        if (aspectRatio) nh = nw / aspectRatio;
        return { x: Math.max(0, nx), y: Math.max(0, ny), w: nw, h: nh };
      }
    });
  }

  function onMouseUp() { dragState.current = null; }

  async function processCrop() {
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
      const outExt = outputFormat === "webm" ? "webm" : "mp4";
      const output = `output.${outExt}`;

      const buf = await file.arrayBuffer();
      await inst.writeFile(input, new Uint8Array(buf));

      const { x, y, w, h } = crop;
      const cropFilter = `crop=${Math.round(w)}:${Math.round(h)}:${Math.round(x)}:${Math.round(y)}`;

      const args = ["-i", input, "-vf", cropFilter];
      if (outputFormat === "mp4") {
        args.push("-c:v", "libx264", "-crf", "23", "-preset", "fast", "-c:a", "copy");
      } else {
        args.push("-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0", "-c:a", "libopus");
      }
      args.push(output);

      await inst.exec(args);
      const data = await inst.readFile(output);
      const mime = outputFormat === "webm" ? "video/webm" : "video/mp4";
      const blob = new Blob([data as unknown as BlobPart], { type: mime });
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

  function reset() { setFile(null); setVideoUrl(null); setResultUrl(null); setError(null); setVideoDims({ w: 0, h: 0 }); }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "cropped";

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Cropped video</h2>
          <video src={resultUrl} controls className="rounded-lg w-full max-h-64" />
          <p className="text-sm text-muted-foreground text-center">{formatFileSize(resultSize)}</p>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_cropped.${outputFormat}`}>
              <Button><Download className="w-4 h-4 mr-2" />Download</Button>
            </a>
            <Button variant="outline" onClick={() => setResultUrl(null)}>Crop again</Button>
            <Button variant="ghost" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />New file</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("video/")) pickFile(f); }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop a video here</p>
          <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV supported</p>
          <input ref={inputRef} type="file" accept="video/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Hidden video for frame capture */}
          <video ref={videoRef} src={videoUrl!} className="hidden" crossOrigin="anonymous" preload="metadata" />

          {/* Interactive crop canvas */}
          <div className="rounded-xl overflow-hidden border bg-black">
            <canvas
              ref={canvasRef}
              className="w-full cursor-crosshair"
              style={{ display: videoDims.w ? "block" : "none" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            />
            {!videoDims.w && <div className="h-48 flex items-center justify-center text-muted-foreground">Loading video…</div>}
          </div>

          {/* Aspect ratio presets */}
          <div className="flex items-center gap-3 flex-wrap">
            <Label className="shrink-0">Aspect ratio</Label>
            {ASPECT_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setAspectRatio(p.value)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${aspectRatio === p.value ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Numeric crop inputs */}
          {videoDims.w > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {(["x", "y", "w", "h"] as const).map((key) => (
                <div key={key} className="space-y-1">
                  <Label className="text-xs">{key === "x" ? "Left" : key === "y" ? "Top" : key === "w" ? "Width" : "Height"}</Label>
                  <Input
                    type="number"
                    value={Math.round(crop[key])}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setCrop((prev) => {
                        const next = { ...prev, [key]: val };
                        if (aspectRatio && (key === "w")) next.h = val / aspectRatio;
                        if (aspectRatio && (key === "h")) next.w = val * aspectRatio;
                        return next;
                      });
                    }}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Output format */}
          <div className="flex items-center gap-3">
            <Label>Output format</Label>
            <div className="flex gap-2">
              {["mp4", "webm"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setOutputFormat(fmt)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${outputFormat === fmt ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={reset}>
              <RotateCcw className="w-3 h-3 mr-1" />New file
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {processing ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cropping video…</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          ) : (
            <Button className="w-full" onClick={processCrop} disabled={!videoDims.w || crop.w < 1 || crop.h < 1}>
              Crop video
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
