"use client";

import { useRef } from "react";
import { Paperclip, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatFileSize } from "@/lib/utils";
import type { ToolAuxiliaryInputDefinition } from "@/lib/tool-types";

interface ToolAuxiliaryInputsProps {
  inputs: ToolAuxiliaryInputDefinition[];
  files: Record<string, File | null>;
  onSelectFile: (key: string, file: File | null) => void;
}

export function ToolAuxiliaryInputs({
  inputs,
  files,
  onSelectFile,
}: ToolAuxiliaryInputsProps) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  return (
    <div className="space-y-4">
      {inputs.map((input) => {
        const file = files[input.key];

        return (
          <div key={input.key} className="rounded-lg border bg-muted/20 p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{input.label}</p>
                <p className="text-xs text-muted-foreground">
                  {input.description || `Supported: ${input.requirement.formats}`}
                </p>
              </div>
              {input.optional && (
                <Badge variant="outline" className="text-xs">Optional</Badge>
              )}
            </div>

            <input
              ref={(element) => {
                inputRefs.current[input.key] = element;
              }}
              type="file"
              accept={input.requirement.accept}
              className="hidden"
              onChange={(event) => onSelectFile(input.key, event.target.files?.[0] ?? null)}
            />

            {file ? (
              <div className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => inputRefs.current[input.key]?.click()}
                  >
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onSelectFile(input.key, null)}
                    aria-label={`Remove ${input.label}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRefs.current[input.key]?.click()}
              >
                <Paperclip className="mr-2 h-4 w-4" />
                Add {input.label}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
