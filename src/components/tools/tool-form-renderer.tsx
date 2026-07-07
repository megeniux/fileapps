"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
