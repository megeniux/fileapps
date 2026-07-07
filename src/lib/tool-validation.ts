import type {
  ToolControlDefinition,
  ToolError,
  ToolFileRequirement,
  ToolValidationRule,
} from "@/lib/tool-types";

export interface ToolValidationResult {
  errors: ToolError[];
  warnings: ToolValidationRule[];
}

export interface ToolValueValidationResult {
  errors: ToolError[];
}

function matchesAccept(file: File, accept: string): boolean {
  if (!accept || accept === "*/*") return true;

  const accepted = accept
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (!accepted.length) return true;

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return accepted.some((entry) => {
    if (entry.startsWith(".")) {
      return fileName.endsWith(entry);
    }

    if (entry.endsWith("/*")) {
      const prefix = entry.slice(0, -1);
      return fileType.startsWith(prefix);
    }

    return fileType === entry;
  });
}

export function validateFiles(
  files: File[],
  requirement?: ToolFileRequirement
): ToolValidationResult {
  const result: ToolValidationResult = {
    errors: [],
    warnings: [],
  };

  if (!requirement) {
    return result;
  }

  if (requirement.minCount && files.length < requirement.minCount) {
    result.errors.push({
      code: "invalid-input",
      message: `Select at least ${requirement.minCount} file${requirement.minCount > 1 ? "s" : ""} to continue.`,
      recoverySuggestion: "Add more files and try again.",
    });
  }

  if (requirement.maxCount && files.length > requirement.maxCount) {
    result.errors.push({
      code: "too-many-files",
      message: `You selected ${files.length} files, but this tool supports up to ${requirement.maxCount}.`,
      recoverySuggestion: "Remove a few files and try again.",
    });
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (
    requirement.maxTotalSizeBytes &&
    totalSize > requirement.maxTotalSizeBytes
  ) {
    result.errors.push({
      code: "memory-pressure",
      message: "The combined file size is too large for this browser workflow.",
      recoverySuggestion: "Use fewer files, smaller files, or process them in smaller batches.",
    });
  } else if (
    requirement.warningTotalSizeBytes &&
    totalSize > requirement.warningTotalSizeBytes
  ) {
    result.warnings.push({
      code: "warning:large-batch",
      message: "This batch is large and may be slow or memory-intensive on some devices.",
      level: "warning",
    });
  }

  if (
    typeof navigator !== "undefined" &&
    "deviceMemory" in navigator &&
    typeof navigator.deviceMemory === "number" &&
    navigator.deviceMemory <= 4 &&
    totalSize > 500 * 1024 * 1024
  ) {
    result.warnings.push({
      code: "warning:device-memory",
      message: "Your device may have limited memory for a job this large.",
      level: "warning",
    });
  }

  for (const file of files) {
    if (!matchesAccept(file, requirement.accept)) {
      result.errors.push({
        code: "unsupported-format",
        message: `${file.name} is not a supported file type for this tool.`,
        recoverySuggestion: `Use one of these supported formats: ${requirement.formats}.`,
      });
    }

    if (
      requirement.maxFileSizeBytes &&
      file.size > requirement.maxFileSizeBytes
    ) {
      result.errors.push({
        code: "file-too-large",
        message: `${file.name} is too large for browser processing in this tool.`,
        recoverySuggestion: "Try a smaller file or compress it before processing.",
      });
    } else if (
      requirement.warningFileSizeBytes &&
      file.size > requirement.warningFileSizeBytes
    ) {
      result.warnings.push({
        code: "warning:large-file",
        message: `${file.name} is large and may process slowly depending on your device.`,
        level: "warning",
      });
    }
  }

  return result;
}

export function validateToolValues(
  controls: ToolControlDefinition[],
  values: Record<string, string>
): ToolValueValidationResult {
  const errors: ToolError[] = [];

  for (const control of controls) {
    const isVisible =
      !control.visibility ||
      String(values[control.visibility.field] ?? "") ===
        String(control.visibility.equals);

    if (!isVisible) {
      continue;
    }

    const value = values[control.key] ?? control.defaultValue ?? "";

    if (control.required && value.trim() === "") {
      errors.push({
        code: "invalid-input",
        message: `${control.label} is required.`,
        recoverySuggestion: "Fill in the missing field and try again.",
      });
      continue;
    }

    if (
      (control.type === "number" || control.type === "range") &&
      value.trim() !== ""
    ) {
      const numericValue = Number(value);

      if (!Number.isFinite(numericValue)) {
        errors.push({
          code: "invalid-input",
          message: `${control.label} must be a valid number.`,
          recoverySuggestion: "Adjust the value and try again.",
        });
        continue;
      }

      if (control.min !== undefined && numericValue < control.min) {
        errors.push({
          code: "invalid-input",
          message: `${control.label} must be at least ${control.min}.`,
          recoverySuggestion: "Increase the value and try again.",
        });
      }

      if (control.max !== undefined && numericValue > control.max) {
        errors.push({
          code: "invalid-input",
          message: `${control.label} must be ${control.max} or less.`,
          recoverySuggestion: "Lower the value and try again.",
        });
      }
    }
  }

  return { errors };
}
