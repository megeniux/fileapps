"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, Download, RotateCcw } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

interface Filters {
  brightness: number;   // 0–200 (100 = normal)
  contrast: number;     // 0–200
  saturation: number;   // 0–200
  grayscale: number;    // 0–100
  sepia: number;        // 0–100
  invert: number;       // 0–100
  blur: number;         // 0–10px
}

const DEFAULT: Filters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  invert: 0,
  blur: 0,
};

const PRESETS: { label: string; filters: Filters }[] = [
  { label: "Original", filters: { ...DEFAULT } },
  { label: "Grayscale", filters: { ...DEFAULT, grayscale: 100, saturation: 0 } },
  { label: "Sepia", filters: { ...DEFAULT, sepia: 100 } },
  { label: "Vivid", filters: { ...DEFAULT, saturation: 180, contrast: 110 } },
  { label: "Cool", filters: { ...DEFAULT, brightness: 105, contrast: 95, saturation: 80 } },
  { label: "Fade", filters: { ...DEFAULT, brightness: 115, contrast: 85, saturation: 70 } },
  { label: "Dramatic", filters: { ...DEFAULT, contrast: 160, saturation: 120, brightness: 90 } },
  { label: "Invert", filters: { ...DEFAULT, invert: 100 } },
];

function filtersToCSS(f: Filters): string {
  return [
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `saturate(${f.saturation}%)`,
    `grayscale(${f.grayscale}%)`,
    `sepia(${f.sepia}%)`,
    `invert(${f.invert}%)`,
    `blur(${f.blur}px)`,
  ].join(" ");
}

export function ImageFiltersClient() {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT });
  const [outputFormat, setOutputFormat] = useState("png");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File) {
    setFile(f);
    setImgUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setFilters({ ...DEFAULT });
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "png";
    setOutputFormat(["jpg", "jpeg"].includes(ext) ? "jpeg" : "png");
  }

  function setFilter<K extends keyof Filters>(key: K, value: number) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setResultUrl(null);
  }

  function applyPreset(preset: Filters) {
    setFilters({ ...preset });
    setResultUrl(null);
  }

  function applyFilters() {
    const img = imgRef.current;
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = filtersToCSS(filters);
    ctx.drawImage(img, 0, 0);
    const mime = outputFormat === "jpeg" ? "image/jpeg" : "image/png";
    canvas.toBlob((blob) => {
      if (!blob) return;
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    }, mime, 0.92);
  }

  function reset() { setFile(null); setImgUrl(null); setResultUrl(null); setFilters({ ...DEFAULT }); }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "filtered";
  const cssFilter = filtersToCSS(filters);
  const isDefault = JSON.stringify(filters) === JSON.stringify(DEFAULT);

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Filtered image</h2>
          <img src={resultUrl} alt="Result" className="rounded-lg max-h-80 w-auto mx-auto border" />
          <p className="text-sm text-muted-foreground text-center">{formatFileSize(resultSize)}</p>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_filtered.${outputFormat}`}>
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
          <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP, GIF supported</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </div>
      ) : (
        <div className="space-y-5">
          {/* Preview */}
          <div className="relative rounded-xl overflow-hidden border bg-muted/20 flex items-center justify-center min-h-48">
            <img
              ref={imgRef}
              src={imgUrl}
              alt="Preview"
              className="max-h-72 max-w-full object-contain"
              style={{ filter: cssFilter }}
              draggable={false}
            />
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <Label>Presets</Label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p.filters)}
                  className="px-3 py-1.5 text-sm rounded-lg border hover:border-primary transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="rounded-xl border bg-card p-4 space-y-4">
            {(
              [
                { key: "brightness" as const, label: "Brightness", min: 0, max: 200, unit: "%" },
                { key: "contrast" as const,   label: "Contrast",   min: 0, max: 200, unit: "%" },
                { key: "saturation" as const, label: "Saturation", min: 0, max: 200, unit: "%" },
                { key: "grayscale" as const,  label: "Grayscale",  min: 0, max: 100, unit: "%" },
                { key: "sepia" as const,      label: "Sepia",      min: 0, max: 100, unit: "%" },
                { key: "invert" as const,     label: "Invert",     min: 0, max: 100, unit: "%" },
                { key: "blur" as const,       label: "Blur",       min: 0, max: 10,  unit: "px" },
              ] as const
            ).map(({ key, label, min, max, unit }) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{label}</span>
                  <span className="text-muted-foreground font-mono">{filters[key]}{unit}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={key === "blur" ? 0.5 : 1}
                  value={filters[key]}
                  onChange={(e) => setFilter(key, parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            ))}
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

          <div className="flex gap-3">
            <Button className="flex-1" onClick={applyFilters} disabled={isDefault}>
              Apply filters &amp; download
            </Button>
            <Button variant="outline" onClick={() => setFilters({ ...DEFAULT })}>Reset</Button>
          </div>
        </div>
      )}
    </div>
  );
}
