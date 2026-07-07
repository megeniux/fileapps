"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadCloud, Download, RotateCcw } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

type Position =
  | "top-left" | "top-center" | "top-right"
  | "middle-left" | "center" | "middle-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

const POSITIONS: Position[] = [
  "top-left", "top-center", "top-right",
  "middle-left", "center", "middle-right",
  "bottom-left", "bottom-center", "bottom-right",
];

function posLabel(p: Position) {
  return p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function posEmoji(p: Position) {
  const map: Record<Position, string> = {
    "top-left": "↖", "top-center": "↑", "top-right": "↗",
    "middle-left": "←", "center": "⊕", "middle-right": "→",
    "bottom-left": "↙", "bottom-center": "↓", "bottom-right": "↘",
  };
  return map[p];
}

export function ImageWatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [text, setText] = useState("© Your Name");
  const [fontSize, setFontSize] = useState(40);
  const [opacity, setOpacity] = useState(60);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<Position>("bottom-right");
  const [padding, setPadding] = useState(20);
  const [outputFormat, setOutputFormat] = useState("png");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pickFile(f: File) {
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgUrl(url);
    setResultUrl(null);
    setPreviewUrl(null);
    const img = new Image();
    img.onload = () => { imgRef.current = img; renderPreview(img); };
    img.src = url;
  }

  const renderPreview = useCallback((img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 600 / Math.max(img.width, img.height));
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawWatermark(ctx, canvas.width, canvas.height, scale);
    setPreviewUrl(canvas.toDataURL("image/png"));
  }, [text, fontSize, opacity, color, position, padding]);

  function drawWatermark(ctx: CanvasRenderingContext2D, w: number, h: number, scale = 1) {
    const scaledFont = Math.round(fontSize * scale);
    ctx.save();
    ctx.font = `bold ${scaledFont}px sans-serif`;
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(text);
    const tw = metrics.width;
    const th = scaledFont;
    const pad = padding * scale;

    let x = 0, y = 0;
    if (position.includes("left")) x = pad + tw / 2;
    else if (position.includes("right")) x = w - pad - tw / 2;
    else x = w / 2;

    if (position.startsWith("top")) y = pad + th / 2;
    else if (position.startsWith("bottom")) y = h - pad - th / 2;
    else y = h / 2;

    ctx.textAlign = "center";
    // Subtle text shadow for visibility
    ctx.shadowColor = color === "#ffffff" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
    ctx.shadowBlur = 4;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  useEffect(() => {
    if (!imgRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => renderPreview(imgRef.current!), 120);
  }, [text, fontSize, opacity, color, position, padding, renderPreview]);

  function applyWatermark() {
    const img = imgRef.current;
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    drawWatermark(ctx, img.width, img.height, 1);
    const mime = outputFormat === "jpeg" ? "image/jpeg" : outputFormat === "webp" ? "image/webp" : "image/png";
    canvas.toBlob((blob) => {
      if (!blob) return;
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    }, mime, 0.92);
  }

  function reset() { setFile(null); setImgUrl(null); setResultUrl(null); setPreviewUrl(null); imgRef.current = null; }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "watermarked";

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Watermarked image</h2>
          <img src={resultUrl} alt="Result" className="rounded-lg max-h-80 w-auto mx-auto border" />
          <p className="text-sm text-muted-foreground text-center">{formatFileSize(resultSize)}</p>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_watermarked.${outputFormat}`}>
              <Button><Download className="w-4 h-4 mr-2" />Download</Button>
            </a>
            <Button variant="outline" onClick={() => setResultUrl(null)}>Edit more</Button>
            <Button variant="ghost" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />New image</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      {!imgUrl ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("image/")) pickFile(f); }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop an image here</p>
          <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP supported</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </div>
      ) : (
        <div className="space-y-5">
          {/* Live preview */}
          <div className="rounded-xl overflow-hidden border bg-muted/20 flex items-center justify-center min-h-48">
            <img
              src={previewUrl ?? imgUrl}
              alt="Preview"
              className="max-h-72 max-w-full object-contain"
            />
          </div>

          {/* Watermark text */}
          <div className="rounded-xl border bg-card p-4 space-y-4">
            <div className="space-y-1">
              <Label>Watermark text</Label>
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="© Your Name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm"><span className="font-medium">Font size</span><span className="text-muted-foreground font-mono">{fontSize}px</span></div>
                <input type="range" min={10} max={120} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full accent-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm"><span className="font-medium">Opacity</span><span className="text-muted-foreground font-mono">{opacity}%</span></div>
                <input type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-full accent-primary" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Color</Label>
                <div className="flex gap-2">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-14 rounded border cursor-pointer p-0.5" />
                  <Input value={color} onChange={(e) => setColor(e.target.value)} className="font-mono" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm"><span className="font-medium">Padding</span><span className="text-muted-foreground font-mono">{padding}px</span></div>
                <input type="range" min={0} max={80} value={padding} onChange={(e) => setPadding(+e.target.value)} className="w-full accent-primary" />
              </div>
            </div>
          </div>

          {/* Position grid */}
          <div className="space-y-2">
            <Label>Position</Label>
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              {POSITIONS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  title={posLabel(p)}
                  className={`py-2 text-lg rounded-lg border transition-colors ${position === p ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary"}`}
                >
                  {posEmoji(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Output format */}
          <div className="flex items-center gap-3">
            <Label>Save as</Label>
            <div className="flex gap-2">
              {["png", "jpeg", "webp"].map((fmt) => (
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
              <RotateCcw className="w-3 h-3 mr-1" />New image
            </Button>
          </div>

          <Button className="w-full" onClick={applyWatermark} disabled={!text.trim()}>
            Apply watermark &amp; download
          </Button>
        </div>
      )}
    </div>
  );
}
