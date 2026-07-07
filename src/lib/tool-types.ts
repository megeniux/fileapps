export type ToolCategory = "video" | "audio" | "image" | "pdf";

export type ToolId =
  | "video-convert"
  | "video-compress"
  | "video-trim"
  | "video-merge"
  | "video-effects"
  | "video-burn-caption"
  | "audio-convert"
  | "audio-compress"
  | "audio-trim"
  | "audio-merge"
  | "audio-effects"
  | "image-convert"
  | "image-compress"
  | "image-resize"
  | "image-batch-compress"
  | "video-gif"
  | "video-extract-audio"
  | "video-mute"
  | "image-crop"
  | "image-rotate"
  | "pdf-to-images"
  | "video-speed"
  | "pdf-from-images"
  | "image-filters"
  | "image-watermark"
  | "video-reverse"
  | "pdf-merge"
  | "video-crop";

export type ToolAction =
  | "convert"
  | "compress"
  | "trim"
  | "merge"
  | "effects"
  | "burn-caption"
  | "resize"
  | "batch-compress"
  | "gif"
  | "extract-audio"
  | "mute"
  | "crop"
  | "rotate"
  | "pdf-to-images"
  | "audio-effects"
  | "video-speed"
  | "pdf-from-images"
  | "image-filters"
  | "image-watermark"
  | "video-reverse"
  | "pdf-merge"
  | "video-crop";

export type ToolEngine = "ffmpeg" | "browser-image" | "document";

export type ToolControlType =
  | "select"
  | "number"
  | "range"
  | "toggle"
  | "text"
  | "textarea"
  | "color"
  | "file"
  | "file[]"
  | "sortable-list"
  | "preset-group"
  | "timeline"
  | "crop-box";

export type ToolProgressStage =
  | "idle"
  | "preparing-engine"
  | "reading-files"
  | "analyzing-input"
  | "processing"
  | "finalizing-output"
  | "completed"
  | "error";

export type ToolErrorCode =
  | "invalid-input"
  | "unsupported-format"
  | "file-too-large"
  | "too-many-files"
  | "browser-limitation"
  | "memory-pressure"
  | "engine-load-failed"
  | "processing-failed";

export interface ToolControlOption {
  value: string;
  label: string;
  description?: string;
}

export interface ToolControlVisibility {
  field: string;
  equals: string | boolean | number;
}

export interface ToolValidationRule {
  code: ToolErrorCode | `warning:${string}`;
  message: string;
  level?: "warning" | "error";
}

interface ToolControlBase {
  label: string;
  key: string;
  type: ToolControlType;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
  visibility?: ToolControlVisibility;
  validationRules?: ToolValidationRule[];
  presetTag?: string;
}

export interface SelectToolControlDefinition extends ToolControlBase {
  type: "select";
  options: ToolControlOption[];
}

export interface NumberToolControlDefinition extends ToolControlBase {
  type: "number" | "range";
}

export interface ToggleToolControlDefinition extends ToolControlBase {
  type: "toggle";
}

export interface TextToolControlDefinition extends ToolControlBase {
  type: "text" | "textarea" | "color";
}

export interface FileToolControlDefinition extends ToolControlBase {
  type: "file" | "file[]";
  accept?: string;
}

export interface AdvancedToolControlDefinition extends ToolControlBase {
  type: "sortable-list" | "preset-group" | "timeline" | "crop-box";
  options?: ToolControlOption[];
}

export type ToolControlDefinition =
  | SelectToolControlDefinition
  | NumberToolControlDefinition
  | ToggleToolControlDefinition
  | TextToolControlDefinition
  | FileToolControlDefinition
  | AdvancedToolControlDefinition;

export interface ToolFileRequirement {
  accept: string;
  formats: string;
  minCount?: number;
  maxCount?: number;
  maxFileSizeBytes?: number;
  warningFileSizeBytes?: number;
}

export interface ToolAuxiliaryInputDefinition {
  key: string;
  label: string;
  description?: string;
  requirement: ToolFileRequirement;
  optional?: boolean;
}

export interface ToolProgress {
  stage: ToolProgressStage;
  percent?: number;
  message?: string;
}

export interface ToolFileInspection {
  name: string;
  size: number;
  type: string;
  extension: string;
  image?: {
    width: number;
    height: number;
  };
  media?: {
    durationSeconds: number;
    width?: number;
    height?: number;
  };
}

export interface ToolResult {
  name: string;
  data: Uint8Array;
  mime: string;
}

export interface ToolError {
  code: ToolErrorCode;
  message: string;
  recoverySuggestion?: string;
}

export interface ToolJobContext {
  files: File[];
  values: Record<string, string>;
  engine: ToolEngine;
}

export interface ToolCapabilityFlags {
  multiFile?: boolean;
  browserNativePreferred?: boolean;
  metadataInspection?: boolean;
  outputPreview?: boolean;
  outputDownload?: boolean;
}

export interface ToolSeoContent {
  features: string[];
  howItWorks: string[];
}

export interface ToolMarketingDefinition {
  id: ToolId;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string;
  href: string;
  formats: string[];
}

export interface ToolRuntimeDefinition {
  action: ToolAction;
  engines: ToolEngine[];
  input: ToolFileRequirement;
  auxiliaryInputs?: ToolAuxiliaryInputDefinition[];
  capabilities?: ToolCapabilityFlags;
}

export interface ToolDefinition
  extends ToolMarketingDefinition,
    ToolSeoContent {
  runtime: ToolRuntimeDefinition;
}

export interface ToolCategoryDefinition {
  id: ToolCategory;
  label: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface ToolPageConfig {
  id?: ToolId;
  title: string;
  description: string;
  action: ToolAction;
  accept: string;
  formats: string;
  outputExtension?: string;
  outputMime?: string;
  engine?: ToolEngine;
  fileRequirement?: ToolFileRequirement;
  auxiliaryInputs?: ToolAuxiliaryInputDefinition[];
  sections: ToolControlDefinition[];
  buildArgs: (
    file: File,
    values: Record<string, string>,
    outputExt: string
  ) => string[];
  outputName: (values: Record<string, string>, ext: string) => string;
}
