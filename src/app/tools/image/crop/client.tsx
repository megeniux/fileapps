"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download, RotateCcw, CropIcon } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

const ASPECT_RATIOS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:4", value: 3 / 4 },
  { label: "9:16", value: 9 / 16 },
];

interface Crop { x: number; y: number; w: number; h: number }

export function ImageCropClient() {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState<Crop>({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [outputFormat, setOutputFormat] = useState("png");
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragState = useRef<{ type: "move" | "nw" | "ne" | "se" | "sw" | null; startX: number; startY: number; startCrop: Crop }>({ type: null, startX: 0, startY: 0, startCrop: crop });
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File) {
    const url = URL.createObjectURL(f);
    setFile(f);
    setImgUrl(url);
    setResultUrl(null);
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "png";
    setOutputFormat(["jpg", "jpeg"].includes(ext) ? "jpeg" : "png");
  }

  function onImgLoad() {
    const img = imgRef.current;
    if (!img) return;
    setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
    setDisplaySize({ w: img.clientWidth, h: img.clientHeight });
    // Default: center 80% crop respecting aspect ratio
    if (aspectRatio) {
      const natAR = img.naturalWidth / img.naturalHeight;
      let cw = 0.8, ch = 0.8;
      if (aspectRatio > natAR) { cw = 0.95; ch = cw * natAR / aspectRatio; }
      else { ch = 0.95; cw = ch * aspectRatio / natAR; }
      setCrop({ x: (1 - cw) / 2, y: (1 - ch) / 2, w: cw, h: ch });
    } else {
      setCrop({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
    }
  }

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (imgRef.current) setDisplaySize({ w: imgRef.current.clientWidth, h: imgRef.current.clientHeight });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [imgUrl]);

  function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }

  const onMouseDown = useCallback((type: "move" | "nw" | "ne" | "se" | "sw", e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragState.current = { type, startX: clientX, startY: clientY, startCrop: { ...crop } };

    function onMove(ev: MouseEvent | TouchEvent) {
      const cx = "touches" in ev ? ev.touches[0].clientX : ev.clientX;
      const cy = "touches" in ev ? ev.touches[0].clientY : ev.clientY;
      const dx = (cx - dragState.current.startX) / displaySize.w;
      const dy = (cy - dragState.current.startY) / displaySize.h;
      const sc = dragState.current.startCrop;
      setCrop((prev) => {
        let { x, y, w, h } = sc;
        const ar = aspectRatio;
        if (type === "move") {
          x = clamp(sc.x + dx, 0, 1 - sc.w);
          y = clamp(sc.y + dy, 0, 1 - sc.h);
        } else if (type === "se") {
          w = clamp(sc.w + dx, 0.05, 1 - sc.x);
          h = ar ? w * (imgNatural.w / imgNatural.h) / ar : clamp(sc.h + dy, 0.05, 1 - sc.y);
        } else if (type === "sw") {
          const newW = clamp(sc.w - dx, 0.05, sc.x + sc.w);
          w = newW; x = sc.x + sc.w - newW;
          h = ar ? w * (imgNatural.w / imgNatural.h) / ar : clamp(sc.h + dy, 0.05, 1 - sc.y);
        } else if (type === "ne") {
          w = clamp(sc.w + dx, 0.05, 1 - sc.x);
          const newH = ar ? w * (imgNatural.w / imgNatural.h) / ar : clamp(sc.h - dy, 0.05, sc.y + sc.h);
          h = newH; y = sc.y + sc.h - newH;
        } else if (type === "nw") {
          const newW = clamp(sc.w - dx, 0.05, sc.x + sc.w);
          w = newW; x = sc.x + sc.w - newW;
          const newH = ar ? w * (imgNatural.w / imgNatural.h) / ar : clamp(sc.h - dy, 0.05, sc.y + sc.h);
          h = newH; y = sc.y + sc.h - newH;
        }
        return { x: clamp(x, 0, 1 - w), y: clamp(y, 0, 1 - h), w: clamp(w, 0.01, 1), h: clamp(h, 0.01, 1) };
      });
    }

    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove as EventListener);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove as EventListener, { passive: false });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
  }, [crop, displaySize, aspectRatio, imgNatural]);

  function applyCrop() {
    if (!imgUrl || !imgNatural.w) return;
    const canvas = document.createElement("canvas");
    const px = Math.round(crop.x * imgNatural.w);
    const py = Math.round(crop.y * imgNatural.h);
    const pw = Math.round(crop.w * imgNatural.w);
    const ph = Math.round(crop.h * imgNatural.h);
    canvas.width = pw;
    canvas.height = ph;
    const ctx = canvas.getContext("2d")!;
    const img = imgRef.current!;
    ctx.drawImage(img, px, py, pw, ph, 0, 0, pw, ph);
    const mime = outputFormat === "jpeg" ? "image/jpeg" : "image/png";
    canvas.toBlob((blob) => {
      if (!blob) return;
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    }, mime, 0.92);
  }

  function reset() { setFile(null); setImgUrl(null); setResultUrl(null); }

  const cropW = Math.round(crop.w * imgNatural.w);
  const cropH = Math.round(crop.h * imgNatural.h);
  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "cropped";

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Cropped image ({cropW}×{cropH}px)</h2>
          <img src={resultUrl} alt="Cropped" className="rounded-lg max-h-80 w-auto mx-auto border" />
          <p className="text-sm text-muted-foreground text-center">{formatFileSize(resultSize)}</p>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_cropped.${outputFormat}`}>
              <Button><Download className="w-4 h-4 mr-2" />Download</Button>
            </a>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" />Start over</Button>
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
          <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP, GIF supported</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Aspect ratio */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium mr-1">Aspect ratio:</span>
            {ASPECT_RATIOS.map((ar) => (
              <button
                key={ar.label}
                onClick={() => setAspectRatio(ar.value)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${aspectRatio === ar.value ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
              >
                {ar.label}
              </button>
            ))}
            <span className="ml-auto text-sm text-muted-foreground">{cropW} × {cropH} px</span>
          </div>

          {/* Canvas area */}
          <div ref={containerRef} className="relative select-none overflow-hidden rounded-xl border bg-muted/30">
            <img
              ref={imgRef}
              src={imgUrl}
              alt="Source"
              className="block w-full max-h-[500px] object-contain"
              onLoad={onImgLoad}
              draggable={false}
            />
            {/* Dark overlay outside crop */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to right, rgba(0,0,0,0.5) ${crop.x * 100}%, transparent ${crop.x * 100}%)`,
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to left, rgba(0,0,0,0.5) ${(1 - crop.x - crop.w) * 100}%, transparent ${(1 - crop.x - crop.w) * 100}%)`,
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.5) ${crop.y * 100}%, transparent ${crop.y * 100}%)`,
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.5) ${(1 - crop.y - crop.h) * 100}%, transparent ${(1 - crop.y - crop.h) * 100}%)`,
            }} />

            {/* Crop box */}
            <div
              className="absolute border-2 border-white cursor-move"
              style={{
                left: `${crop.x * 100}%`,
                top: `${crop.y * 100}%`,
                width: `${crop.w * 100}%`,
                height: `${crop.h * 100}%`,
              }}
              onMouseDown={(e) => onMouseDown("move", e)}
              onTouchStart={(e) => onMouseDown("move", e)}
            >
              {/* Rule of thirds grid */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/60" />
                ))}
              </div>
              {/* Corner handles */}
              {(["nw","ne","se","sw"] as const).map((corner) => (
                <div
                  key={corner}
                  onMouseDown={(e) => onMouseDown(corner, e)}
                  onTouchStart={(e) => onMouseDown(corner, e)}
                  className="absolute w-4 h-4 bg-white rounded-sm border border-black/20 cursor-pointer z-10"
                  style={{
                    top: corner.startsWith("n") ? "-8px" : undefined,
                    bottom: corner.startsWith("s") ? "-8px" : undefined,
                    left: corner.endsWith("w") ? "-8px" : undefined,
                    right: corner.endsWith("e") ? "-8px" : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" onClick={applyCrop}>
              <CropIcon className="w-4 h-4 mr-2" />Crop image
            </Button>
            <Button variant="outline" onClick={reset}>Change image</Button>
          </div>
        </div>
      )}
    </div>
  );
}
