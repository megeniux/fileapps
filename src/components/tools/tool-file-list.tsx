"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils";

interface ToolFileListProps {
  files: File[];
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onRemove?: (index: number) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

export function ToolFileList({
  files,
  onMoveUp,
  onMoveDown,
  onRemove,
  onReorder,
}: ToolFileListProps) {
  const totalSize = files.reduce((sum, nextFile) => sum + nextFile.size, 0);

  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium">Selected files</p>
        <p className="text-xs text-muted-foreground">
          Total size: {formatFileSize(totalSize)}
        </p>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${file.size}-${index}`}
            draggable={Boolean(onReorder)}
            onDragStart={(event) => {
              event.dataTransfer.setData("text/plain", String(index));
              event.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(event) => {
              if (onReorder) {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }
            }}
            onDrop={(event) => {
              if (!onReorder) return;
              event.preventDefault();
              const fromIndex = Number(event.dataTransfer.getData("text/plain"));
              if (!Number.isNaN(fromIndex) && fromIndex !== index) {
                onReorder(fromIndex, index);
              }
            }}
            className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2 text-sm"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-xs">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>

            <div className="flex items-center gap-1">
              {onMoveUp && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  aria-label={`Move ${file.name} up`}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              )}

              {onMoveDown && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onMoveDown(index)}
                  disabled={index === files.length - 1}
                  aria-label={`Move ${file.name} down`}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              )}

              {onRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onRemove(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
