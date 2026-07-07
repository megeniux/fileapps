"use client";

import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProcessingStatusProps {
  progress: number;
  status: string;
  message?: string;
  logs?: string[];
  items?: Array<{
    label: string;
    state: "pending" | "active" | "done";
  }>;
}

export function ProcessingStatus({ progress, status, message, logs, items }: ProcessingStatusProps) {
  // Treat 0 as indeterminate (engine loading / file reading stage)
  const isIndeterminate = progress <= 0;

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <h3 className="text-lg font-semibold">{status}</h3>

      <div className="w-full max-w-md space-y-2">
        {isIndeterminate ? (
          /* Animated indeterminate bar */
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/3 rounded-full bg-primary animate-[indeterminate_1.4s_ease-in-out_infinite]" />
          </div>
        ) : (
          <Progress value={progress} className="h-2" />
        )}
        <p className="text-sm text-muted-foreground text-center">
          {isIndeterminate ? "Please wait…" : `${progress}%`}
        </p>
      </div>

      {message && (
        <p className="text-xs text-muted-foreground text-center max-w-md font-mono">
          {message}
        </p>
      )}

      {items && items.length > 0 && (
        <div className="w-full max-w-md rounded border bg-muted/40 p-3">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 text-xs">
                <span className="truncate font-mono">{item.label}</span>
                <span className={cn(
                  item.state === "done"   ? "text-green-600 dark:text-green-400" :
                  item.state === "active" ? "text-primary" :
                  "text-muted-foreground"
                )}>
                  {item.state === "done" ? "Done" : item.state === "active" ? "Processing" : "Waiting"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {logs && logs.length > 0 && (
        <div className="w-full max-w-md max-h-32 overflow-y-auto rounded border bg-muted/50 p-2">
          {logs.map((line, i) => (
            <p key={i} className="text-[10px] font-mono text-muted-foreground leading-tight truncate">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
