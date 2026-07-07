"use client";

import type { ToolFileInspection } from "@/lib/tool-types";
import { formatFileSize } from "@/lib/utils";

function formatDuration(durationSeconds: number) {
  const totalSeconds = Math.max(0, Math.round(durationSeconds));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function ToolInspectionPanel({
  inspections,
}: {
  inspections: ToolFileInspection[];
}) {
  if (inspections.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <div className="mb-3">
        <p className="text-sm font-medium">Detected file details</p>
        <p className="text-xs text-muted-foreground">
          We read lightweight metadata in your browser before processing.
        </p>
      </div>

      <div className="space-y-2">
        {inspections.map((inspection) => (
          <div
            key={`${inspection.name}-${inspection.size}`}
            className="rounded-md border bg-background px-3 py-3 text-sm"
          >
            <p className="truncate font-mono text-xs">{inspection.name}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>{formatFileSize(inspection.size)}</span>
              <span>{inspection.type}</span>
              {inspection.image && (
                <span>
                  {inspection.image.width} x {inspection.image.height}
                </span>
              )}
              {inspection.media?.durationSeconds !== undefined && (
                <span>Duration {formatDuration(inspection.media.durationSeconds)}</span>
              )}
              {inspection.media?.width && inspection.media?.height && (
                <span>
                  {inspection.media.width} x {inspection.media.height}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
