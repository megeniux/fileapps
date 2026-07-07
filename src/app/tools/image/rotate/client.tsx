"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UploadCloud, Download, RotateCcw, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

export function ImageRotateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0); // degrees: 0, 90, 180, 270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [outputFormat, setOutputFormat] = useState("png");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File) {
    setFile(f);
    setImgUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "png";
    setOutputFormat(["jpg", "jpeg"].includes(ext) ? "jpeg" : "png");
  }

  function applyTransform() {
    const img = imgRef.current;
    if (!img) return;
    const canvas = document.createElement("canvas");
    const rad = (rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rad));
    const sin = Math.abs(Math.sin(rad));
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = Math.round(w * cos + h * sin);
    canvas.height = Math.round(w * sin + h * cos);
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (flipH) ctx.scale(-1, 1);
    if (flipV) ctx.scale(1, -1);
    ctx.rotate(rad);
    ctx.drawImage(img, -w / 2, -h / 2);
    const mime = outputFormat === "jpeg" ? "image/jpeg" : "image/png";
    canvas.toBlob((blob) => {
      if (!blob) return;
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    }, mime, 0.92);
  }

  function reset() { setFile(null); setImgUrl(null); setResultUrl(null); }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "rotated";

  // Preview transform style
  const scaleX = flipH ? -1 : 1;
  const scaleY = flipV ? -1 : 1;
  const previewStyle = { transform: `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`, transition: "transform 0.25s ease" };

  if (resultUrl) {
    return (
      <div className="container max-w-xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Transformed image</h2>
          <img src={resultUrl} alt="Result" className="rounded-lg max-h-72 w-auto mx-auto border" />
          <p className="text-sm text-muted-foreground text-center">{formatFileSize(resultSize)}</p>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}_rotated.${outputFormat}`}>
              <Button><Download className="w-4 h-4 mr-2" />Download</Button>
            </a>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" />Start over</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-xl py-10 space-y-6">
      {!imgUrl ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("image/")) pickFile(f); }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop an image here</p>
          <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP, GIF, BMP supported</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-5">
          {/* Preview */}
          <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg overflow-hidden">
            <img
              ref={imgRef}
              src={imgUrl}
              alt="Preview"
              className="max-h-52 max-w-full object-contain"
              style={previewStyle}
              draggable={false}
            />
          </div>

          {/* Rotation buttons */}
          <div className="space-y-2">
            <Label>Rotate</Label>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setRotation((r) => (r - 90 + 360) % 360)}>
                <RotateCcw className="w-4 h-4 mr-1.5" />90° left
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setRotation((r) => (r + 90) % 360)}>
                <RotateCw className="w-4 h-4 mr-1.5" />90° right
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setRotation((r) => (r + 180) % 360)}>
                180°
              </Button>
            </div>
          </div>

          {/* Flip buttons */}
          <div className="space-y-2">
            <Label>Flip</Label>
            <div className="flex gap-2">
              <Button
                variant={flipH ? "default" : "outline"}
                className="flex-1"
                onClick={() => setFlipH((v) => !v)}
              >
                <FlipHorizontal className="w-4 h-4 mr-1.5" />Flip horizontal
              </Button>
              <Button
                variant={flipV ? "default" : "outline"}
                className="flex-1"
                onClick={() => setFlipV((v) => !v)}
              >
                <FlipVertical className="w-4 h-4 mr-1.5" />Flip vertical
              </Button>
            </div>
          </div>

          {/* Output format */}
          <div className="space-y-1.5">
            <Label>Save as</Label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG (lossless)</SelectItem>
                <SelectItem value="jpeg">JPG (smaller file)</SelectItem>
                <SelectItem value="webp">WebP (modern, small)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" onClick={applyTransform}>Apply &amp; download</Button>
            <Button variant="outline" onClick={reset}>Change image</Button>
          </div>
        </div>
      )}
    </div>
  );
}
