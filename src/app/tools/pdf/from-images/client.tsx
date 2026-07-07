"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud, Download, RotateCcw, X, GripVertical, FileText } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

const JSPDF_CDN = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
const PAGE_SIZES = [
  { value: "a4",     label: "A4 (210×297mm)",  w: 210, h: 297 },
  { value: "letter", label: "Letter (8.5×11in)", w: 215.9, h: 279.4 },
  { value: "a3",     label: "A3 (297×420mm)",  w: 297, h: 420 },
  { value: "fit",    label: "Fit to image size", w: 0,   h: 0   },
];

interface ImageItem { id: string; file: File; url: string; }

async function loadJsPdf() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.jspdf) return w.jspdf;
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = JSPDF_CDN;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return w.jspdf;
}

export function PdfFromImagesClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [margin, setMargin] = useState("10");
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIndex = useRef<number | null>(null);

  function addFiles(files: FileList | File[]) {
    const newItems: ImageItem[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ id: Math.random().toString(36).slice(2), file: f, url: URL.createObjectURL(f) }));
    setImages((prev) => [...prev, ...newItems]);
    setResultUrl(null);
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  // Simple drag-to-reorder
  function onDragStart(i: number) { dragIndex.current = i; }
  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === i) return;
    setImages((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(dragIndex.current!, 1);
      arr.splice(i, 0, item);
      dragIndex.current = i;
      return arr;
    });
  }

  async function generate() {
    if (images.length === 0) return;
    setGenerating(true);
    try {
      const jspdfModule = await loadJsPdf();
      const { jsPDF } = jspdfModule;
      const ps = PAGE_SIZES.find((p) => p.value === pageSize)!;
      const m = parseInt(margin);

      const doc = new jsPDF({ orientation, unit: "mm", format: ps.value === "fit" ? "a4" : [ps.w, ps.h] });
      let firstPage = true;

      for (const img of images) {
        // Load image to get dimensions
        const bitmap = await createImageBitmap(img.file);
        const imgW = bitmap.width;
        const imgH = bitmap.height;

        // Draw to canvas to get data URL
        const canvas = document.createElement("canvas");
        canvas.width = imgW;
        canvas.height = imgH;
        canvas.getContext("2d")!.drawImage(bitmap, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

        let docW: number, docH: number;
        if (ps.value === "fit") {
          // pt at 72dpi: 1px = 0.353mm
          docW = imgW * 0.264583;
          docH = imgH * 0.264583;
          if (!firstPage) doc.addPage([docW, docH], imgW > imgH ? "landscape" : "portrait");
          else { doc.internal.pageSize.width = docW; doc.internal.pageSize.height = docH; }
        } else {
          docW = orientation === "portrait" ? ps.w : ps.h;
          docH = orientation === "portrait" ? ps.h : ps.w;
          if (!firstPage) doc.addPage();
        }

        // Scale image to fit within page minus margin
        const availW = docW - m * 2;
        const availH = docH - m * 2;
        const ratio = Math.min(availW / imgW, availH / imgH);
        const drawW = imgW * ratio;
        const drawH = imgH * ratio;
        const x = m + (availW - drawW) / 2;
        const y = m + (availH - drawH) / 2;

        doc.addImage(dataUrl, "JPEG", x, y, drawW, drawH);
        firstPage = false;
      }

      const blob = doc.output("blob") as Blob;
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }

  function reset() { setImages([]); setResultUrl(null); }

  if (resultUrl) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">images.pdf ({images.length} page{images.length !== 1 ? "s" : ""})</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(resultSize)}</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <a href={resultUrl} download="images.pdf">
              <Button><Download className="w-4 h-4 mr-2" />Download PDF</Button>
            </a>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" />Start over</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
        <p className="font-medium">Drop images here to add</p>
        <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP — drag to reorder after adding</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />
      </div>

      {images.length > 0 && (
        <>
          {/* Image list */}
          <div className="space-y-2">
            <Label>{images.length} image{images.length !== 1 ? "s" : ""} — drag to reorder</Label>
            <div className="space-y-2">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  draggable
                  onDragStart={() => onDragStart(i)}
                  onDragOver={(e) => onDragOver(e, i)}
                  className="flex items-center gap-3 rounded-lg border bg-card p-2 cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                  <img src={img.url} alt={img.file.name} className="w-12 h-12 object-cover rounded-md border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{img.file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(img.file.size)}</p>
                  </div>
                  <span className="text-xs text-muted-foreground w-6 text-center">{i + 1}</span>
                  <button onClick={() => removeImage(img.id)} className="p-1 rounded hover:bg-muted">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <h3 className="font-medium text-sm">PDF settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Page size</Label>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Orientation</Label>
                <Select value={orientation} onValueChange={(v) => setOrientation(v as "portrait" | "landscape")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Margin (mm)</Label>
                <Select value={margin} onValueChange={setMargin}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No margin</SelectItem>
                    <SelectItem value="5">5mm (small)</SelectItem>
                    <SelectItem value="10">10mm (standard)</SelectItem>
                    <SelectItem value="20">20mm (wide)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={generate} disabled={generating}>
            {generating ? (
              <><RotateCcw className="w-4 h-4 mr-2 animate-spin" />Generating PDF…</>
            ) : (
              <>Generate PDF ({images.length} page{images.length !== 1 ? "s" : ""})</>
            )}
          </Button>
        </>
      )}
    </div>
  );
}
