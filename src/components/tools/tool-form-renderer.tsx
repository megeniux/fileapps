"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ToolControlDefinition } from "@/lib/tool-types";

interface ToolFormRendererProps {
  controls: ToolControlDefinition[];
  values: Record<string, string>;
  onValueChange: (key: string, value: string) => void;
}

function isVisible(
  control: ToolControlDefinition,
  values: Record<string, string>
): boolean {
  if (!control.visibility) {
    return true;
  }

  return String(values[control.visibility.field] ?? "") === String(control.visibility.equals);
}

export function ToolFormRenderer({
  controls,
  values,
  onValueChange,
}: ToolFormRendererProps) {
  const visibleControls = controls.filter((control) => isVisible(control, values));

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {visibleControls.map((control) => {
        const value = values[control.key] ?? control.defaultValue ?? "";

        return (
          <div
            key={control.key}
            className="w-full space-y-2 rounded-lg border bg-muted/30 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor={control.key}>{control.label}</Label>
              {control.type === "range" && (
                <span className="text-xs font-medium text-muted-foreground">
                  {value}
                </span>
              )}
            </div>

            {control.type === "select" && (
              <Select value={value} onValueChange={(next) => onValueChange(control.key, next)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {control.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {(control.type === "number" || control.type === "range") && (
              <Input
                id={control.key}
                type={control.type}
                min={control.min}
                max={control.max}
                step={control.step}
                value={value}
                placeholder={control.placeholder}
                onChange={(event) => onValueChange(control.key, event.target.value)}
              />
            )}

            {control.type === "toggle" && (
              <label
                htmlFor={control.key}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-md border bg-background px-3 py-2"
              >
                <span className="text-sm text-foreground">
                  {value === "true" ? "Enabled" : "Disabled"}
                </span>
                <input
                  id={control.key}
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={value === "true"}
                  onChange={(event) =>
                    onValueChange(control.key, event.target.checked ? "true" : "false")
                  }
                />
              </label>
            )}

            {(control.type === "text" || control.type === "color") && (
              <Input
                id={control.key}
                type={control.type}
                value={value}
                placeholder={control.placeholder}
                onChange={(event) => onValueChange(control.key, event.target.value)}
              />
            )}

            {control.type === "textarea" && (
              <textarea
                id={control.key}
                value={value}
                placeholder={control.placeholder}
                onChange={(event) => onValueChange(control.key, event.target.value)}
                className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
              />
            )}

            {(control.type === "file" || control.type === "file[]") && (
              <FileControl
                accept={control.accept}
                controlKey={control.key}
                multiple={control.type === "file[]"}
                value={value}
                onValueChange={onValueChange}
              />
            )}

            {control.type === "preset-group" && (
              <div className="flex flex-wrap gap-2">
                {(control.options ?? []).map((option) => {
                  const active = value === option.value;
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={active ? "default" : "outline"}
                      size="sm"
                      onClick={() => onValueChange(control.key, option.value)}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            )}

            {control.type === "sortable-list" && (
              <textarea
                id={control.key}
                value={value}
                placeholder={control.placeholder ?? "Enter one item per line"}
                onChange={(event) => onValueChange(control.key, event.target.value)}
                className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
              />
            )}

            {(control.type === "timeline" || control.type === "crop-box") && (
              <div className="rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
                {control.helpText ?? "This advanced control is configured by the tool workflow."}
              </div>
            )}

            {control.description && (
              <p className="text-xs text-muted-foreground">{control.description}</p>
            )}
            {control.helpText && (
              <p className="text-xs text-muted-foreground">{control.helpText}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FileControl({
  accept,
  controlKey,
  multiple,
  value,
  onValueChange,
}: {
  accept?: string;
  controlKey: string;
  multiple: boolean;
  value: string;
  onValueChange: (key: string, value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          const fileNames = Array.from(event.target.files ?? []).map((file) => file.name);
          onValueChange(controlKey, fileNames.join(", "));
        }}
      />
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
          Choose {multiple ? "Files" : "File"}
        </Button>
        <span className="truncate text-xs text-muted-foreground">
          {value || "No file selected"}
        </span>
      </div>
    </div>
  );
}
