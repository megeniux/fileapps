import type {
  ToolError,
  ToolFileRequirement,
  ToolValidationRule,
} from "@/lib/tool-types";

export interface ToolValidationResult {
  errors: ToolError[];
  warnings: ToolValidationRule[];
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
