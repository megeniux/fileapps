"use client";

import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn, formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FILE_SIZE_LIMITS } from "@/lib/constants";

interface FileDropzoneProps {
  accept: string;
  onFilesSelect: (files: File[]) => void;
  label: string;
  formats: string;
  maxSize?: number;
  multiple?: boolean;
}

export function FileDropzone({
  accept,
  onFilesSelect,
  label,
  formats,
  maxSize = FILE_SIZE_LIMITS.max,
  multiple = false,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File) => {
      setError(null);
      if (file.size > maxSize) {
        setError(`File too large (${formatFileSize(file.size)}). Maximum is ${formatFileSize(maxSize)}.`);
        return false;
      }
      return true;
    },
    [maxSize]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files).filter(validateFile);
      if (files.length > 0) onFilesSelect(multiple ? files : [files[0]]);
    },
    [multiple, onFilesSelect, validateFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []).filter(validateFile);
      if (files.length > 0) onFilesSelect(multiple ? files : [files[0]]);
    },
    [multiple, onFilesSelect, validateFile]
  );

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      aria-label={`Upload ${label}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <Upload className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-1">
        {isDragging ? "Drop it here" : `Drag & drop ${multiple ? `${label}s` : label}`}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
      <Button type="button" variant="secondary" className="pointer-events-none">
        Choose {multiple ? `${label}s` : label}
      </Button>
      <p className="text-xs text-muted-foreground mt-4">
        Supported: {formats}
      </p>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}
