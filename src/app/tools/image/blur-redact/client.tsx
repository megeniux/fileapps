"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, RotateCcw, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatFileSize } from "@/lib/utils";
import { canvasToBlob, loadImageElement } from "@/lib/image-canvas";

type Mode = "blur" | "redact";

interface Selection {
  x: number;
  y: number;
  width: number;
  height: number;
}

const FORMAT_OPTIONS = [
  { value: "jpg", label: "JPEG", mime: "image/jpeg", quality: 0.92 },
  { value: "png", label: "PNG", mime: "image/png", quality: undefined },
  { value: "webp", label: "WebP", mime: "image/webp", quality: 0.92 },
];

function normalizeSelection(selection: Selection): Selection {
  const x = selection.width < 0 ? selection.x + selection.width : selection.x;
  const y = selection.height < 0 ? selection.y + selection.height : selection.y;
  return {
    x,
    y,
    width: Math.abs(selection.width),
    height: Math.abs(selection.height),
  };
}

export function ImageBlurRedactClient() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("blur");
  const [format, setFormat] = useState("png");
  const [blurStrength, setBlurStrength] = useState("10");
  const [redactColor, setRedactColor] = useState("#111111");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [draftSelection, setDraftSelection] = useState<Selection | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeSelection = draftSelection ?? selection;

  useEffect(() => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const maxWidth = 720;
    const scale = Math.min(1, maxWidth / image.naturalWidth);
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    if (activeSelection) {
      const nextSelection = normalizeSelection(activeSelection);
      context.save();
      context.strokeStyle = "#2563eb";
      context.lineWidth = 2;
      context.setLineDash([6, 4]);
      context.strokeRect(nextSelection.x, nextSelection.y, nextSelection.width, nextSelection.height);
      context.restore();
    }
  }, [activeSelection, image]);

  const previewScale = useMemo(() => {
    if (!image || !canvasRef.current) return 1;
    return image.naturalWidth / canvasRef.current.width;
  }, [image]);

  function reset() {
    setFile(null);
    setImage(null);
    setSelection(null);
    setDraftSelection(null);
    setResultUrl(null);
    setResultSize(0);
    setError(null);
  }

  async function pickFile(nextFile: File) {
    setFile(nextFile);
    setError(null);
    setResultUrl(null);
    setSelection(null);
    setDraftSelection(null);
    try {
      const nextImage = await loadImageElement(nextFile);
      setImage(nextImage);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Could not load the image.");
    }
  }

  function handlePointerDown(event: React.MouseEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    dragStartRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    setDraftSelection({ x: dragStartRef.current.x, y: dragStartRef.current.y, width: 0, height: 0 });
  }

  function handlePointerMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!dragStartRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;
    setDraftSelection({
      x: dragStartRef.current.x,
      y: dragStartRef.current.y,
      width: currentX - dragStartRef.current.x,
      height: currentY - dragStartRef.current.y,
    });
  }

  function handlePointerUp() {
    if (!draftSelection) return;
    setSelection(normalizeSelection(draftSelection));
    setDraftSelection(null);
    dragStartRef.current = null;
  }

  async function applyEffect() {
    if (!file || !image || !selection) {
      setError("Draw a selection on the preview before exporting.");
      return;
    }

    const normalized = normalizeSelection(selection);
    const output = FORMAT_OPTIONS.find((option) => option.value === format) ?? FORMAT_OPTIONS[0];
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      setError("Canvas rendering is not available in this browser.");
      return;
    }

    context.drawImage(image, 0, 0);

    const scaledSelection = {
      x: normalized.x * previewScale,
      y: normalized.y * previewScale,
      width: normalized.width * previewScale,
      height: normalized.height * previewScale,
    };

    if (mode === "redact") {
      context.fillStyle = redactColor;
      context.fillRect(scaledSelection.x, scaledSelection.y, scaledSelection.width, scaledSelection.height);
    } else {
      context.save();
      context.beginPath();
      context.rect(scaledSelection.x, scaledSelection.y, scaledSelection.width, scaledSelection.height);
      context.clip();
      context.filter = `blur(${blurStrength}px)`;
      context.drawImage(image, 0, 0);
      context.restore();
    }

    const blob = await canvasToBlob(canvas, output.mime, output.quality);
    setResultUrl(URL.createObjectURL(blob));
    setResultSize(blob.size);
  }

  if (resultUrl && file) {
    const extension = format === "jpg" ? "jpg" : format;
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    return (
      <div className="container max-w-2xl py-10 space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Protected image ready</h2>
          <img src={resultUrl} alt="Blurred or redacted output" className="max-h-96 max-w-full rounded-lg border object-contain mx-auto" />
          <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/40 p-4 text-center text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Original</p>
              <p className="font-semibold">{formatFileSize(file.size)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Export</p>
              <p className="font-semibold">{formatFileSize(resultSize)}</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download={`${baseName}-${mode}.${extension}`}>
              <Button><Download className="mr-2 h-4 w-4" />Download</Button>
            </a>
            <Button variant="outline" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />New image</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      {!file ? (
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const nextFile = event.dataTransfer.files[0];
            if (nextFile?.type.startsWith("image/")) {
              void pickFile(nextFile);
            }
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Drop an image here</p>
          <p className="text-sm text-muted-foreground mt-1">Draw a region to blur or fully redact before exporting</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const nextFile = event.target.files?.[0];
              if (nextFile) {
                void pickFile(nextFile);
              }
            }}
          />
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Change</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select value={mode} onValueChange={(value) => setMode(value as Mode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="blur">Blur</SelectItem>
                  <SelectItem value="redact">Redact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Output format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FORMAT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {mode === "blur" ? (
              <div className="space-y-2">
                <Label>Blur strength</Label>
                <Input type="number" min={1} max={40} value={blurStrength} onChange={(event) => setBlurStrength(event.target.value)} />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Redaction color</Label>
                <Input type="color" value={redactColor} onChange={(event) => setRedactColor(event.target.value)} className="h-10" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Drag on the preview to choose the area you want to hide.</p>
            <div className="rounded-xl border bg-muted/20 p-3 overflow-auto">
              <canvas
                ref={canvasRef}
                className="max-w-full cursor-crosshair rounded-lg"
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSelection(null)}>Clear Selection</Button>
            <Button className="flex-1" onClick={applyEffect}>Apply and Export</Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    </div>
  );
}
