"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { AlertTriangle, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { zipSync } from "fflate";
import { ToolAuxiliaryInputs } from "@/components/tools/tool-auxiliary-inputs";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { ToolFileList } from "@/components/tools/tool-file-list";
import { ToolInspectionPanel } from "@/components/tools/tool-inspection-panel";
import { ProcessingStatus } from "@/components/tools/processing-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFFmpeg } from "@/hooks/use-ffmpeg";
import { inspectFile } from "@/lib/tool-inspection";
import type {
  ToolAction,
  ToolAuxiliaryInputDefinition,
  ToolFileInspection,
  ToolFileRequirement,
} from "@/lib/tool-types";
import { validateFiles } from "@/lib/tool-validation";
import { usePathname } from "next/navigation";
import { getRelatedTools, getToolByHref } from "@/lib/tools";
import { cn, formatFileSize, toBlob } from "@/lib/utils";

type ToolStep = "upload" | "inspect" | "configure" | "processing" | "result" | "error";

export interface OutputFile {
  name: string;
  data: Uint8Array;
  mime: string;
}

interface ToolProcessingState {
  progress?: number;
  status?: string;
  message?: string;
  items?: Array<{
    label: string;
    state: "pending" | "active" | "done";
  }>;
}

interface ToolShellChildrenProps {
  file: File;
  files: File[];
  previewUrl: string | null;
  auxiliaryFiles: Record<string, File | null>;
  inspections: ToolFileInspection[];
  ffmpeg: ReturnType<typeof useFFmpeg>;
  setOutput: (output: OutputFile) => void;
  setOutputs: (outputs: OutputFile[]) => void;
  setError: (error: string) => void;
  startProcessing: (state?: ToolProcessingState) => void;
  setProcessingState: (state: ToolProcessingState) => void;
}

interface RenderDoneProps {
  output: OutputFile | null;
  outputs: OutputFile[];
  file: File | null;
  files: File[];
  onReset: () => void;
  onDownload: () => void;
  onDownloadAll: () => void;
}

interface ToolShellProps {
  title: string;
  description: string;
  action: ToolAction;
  accept: string;
  formats: string;
  /** "browser-image" skips FFmpeg loading entirely for Canvas-based tools. */
  engine?: "ffmpeg" | "browser-image";
  initialFiles?: File[];
  fileRequirement?: ToolFileRequirement;
  auxiliaryInputs?: ToolAuxiliaryInputDefinition[];
  children: (props: ToolShellChildrenProps) => React.ReactNode;
  outputMime?: string;
  outputExtension?: string;
  renderDone?: (props: RenderDoneProps) => React.ReactNode;
}

function getEditorIntro(action: ToolAction) {
  switch (action) {
    case "convert":
      return {
        title: "Choose output settings",
        description: "Pick the format, quality, and export options you want before processing.",
      };
    case "compress":
    case "batch-compress":
      return {
        title: "Adjust compression settings",
        description: "Balance file size, quality, and output format before you start.",
      };
    case "trim":
      return {
        title: "Choose the part to keep",
        description: "Set the section you want to keep, then export the trimmed result.",
      };
    case "merge":
      return {
        title: "Arrange files and merge",
        description: "Add your files, set their order, and combine them into one output.",
      };
    case "effects":
      return {
        title: "Choose the effects to apply",
        description: "Preview your changes, tune the settings, and export the final version.",
      };
    case "burn-caption":
      return {
        title: "Set caption and export options",
        description: "Choose how captions should appear, then render them into the video.",
      };
    case "resize":
      return {
        title: "Set resize options",
        description: "Pick your target dimensions and export format before processing.",
      };
    default:
      return {
        title: "Set your processing options",
        description: "Review the file, adjust settings, and export the result.",
      };
  }
}

function useObjectUrl(source: Blob | File | null) {
  const url = useMemo(() => {
    if (!source) return null;
    return URL.createObjectURL(source);
  }, [source]);

  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  return url;
}

export function ToolShell({
  title,
  action,
  accept,
  formats,
  engine = "ffmpeg",
  initialFiles,
  fileRequirement,
  auxiliaryInputs,
  children,
  renderDone,
}: ToolShellProps) {
  const editorIntro = useMemo(() => getEditorIntro(action), [action]);
  const resolvedFileRequirement = useMemo<ToolFileRequirement>(
    () => fileRequirement ?? { accept, formats, minCount: 1, maxCount: 1 },
    [accept, fileRequirement, formats]
  );
  const initialSelectedFiles = useMemo(() => {
    if (!initialFiles || initialFiles.length === 0) {
      return [];
    }

    const validation = validateFiles(initialFiles, resolvedFileRequirement);
    return validation.errors.length === 0 ? initialFiles : [];
  }, [initialFiles, resolvedFileRequirement]);

  const ffmpeg = useFFmpeg();
  const pathname = usePathname();
  const currentTool = useMemo(() => getToolByHref(pathname), [pathname]);
  const relatedTools = useMemo(
    () => (currentTool ? getRelatedTools(currentTool.id, 4) : []),
    [currentTool]
  );
  const [step, setStep] = useState<ToolStep>(initialSelectedFiles.length > 0 ? "inspect" : "upload");
  const [files, setFiles] = useState<File[]>(initialSelectedFiles);
  const [auxiliaryFiles, setAuxiliaryFiles] = useState<Record<string, File | null>>({});
  const [inspections, setInspections] = useState<ToolFileInspection[]>([]);
  const [outputs, setOutputs] = useState<OutputFile[]>([]);
  const [processingState, setProcessingState] = useState<ToolProcessingState>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const processingActiveRef = useRef(false);
  const file = files[0] ?? null;
  const output = outputs[0] ?? null;
  const filePreviewUrl = useObjectUrl(file);
  const outputBlob = useMemo(
    () => (output ? toBlob(output.data, output.mime) : null),
    [output]
  );
  const outputPreviewUrl = useObjectUrl(outputBlob);

  // FFmpeg is loaded lazily on first Convert click — no eager pre-load.

  useEffect(() => {
    if (files.length === 0) {
      return;
    }

    let cancelled = false;

    void Promise.all(files.map((nextFile) => inspectFile(nextFile)))
      .then((nextInspections) => {
        if (!cancelled) {
          setInspections(nextInspections);
          setStep("configure");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInspections([]);
          setStep("configure");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [files]);

  const handleFilesSelect = useCallback((nextFiles: File[]) => {
    const validation = validateFiles(nextFiles, resolvedFileRequirement);

    if (validation.errors.length > 0) {
      toast.error(validation.errors[0].message);
      return;
    }

    validation.warnings.forEach((warning) => {
      toast.warning(warning.message);
    });

    setFiles(nextFiles);
    setInspections([]);
    setOutputs([]);
    setErrorMessage(null);
    setStep("inspect");
    // Pre-load FFmpeg in the background as soon as a file is selected.
    // By the time the user configures settings and clicks Convert it will be ready.
    // browser-image tools (Canvas-based) never need FFmpeg.
    if (engine !== "browser-image") {
      void ffmpeg.load();
    }
  }, [resolvedFileRequirement, engine, ffmpeg]);

  const handleSetOutput = useCallback((nextOutput: OutputFile) => {
    if (!processingActiveRef.current) return;
    setOutputs([nextOutput]);
    setErrorMessage(null);
    setStep("result");
    processingActiveRef.current = false;
  }, []);

  const handleSetOutputs = useCallback((nextOutputs: OutputFile[]) => {
    if (!processingActiveRef.current) return;
    setOutputs(nextOutputs);
    setErrorMessage(null);
    setStep("result");
    processingActiveRef.current = false;
  }, []);

  const handleSetError = useCallback((message: string) => {
    if (!processingActiveRef.current) return;
    toast.error(message);
    setErrorMessage(message);
    setStep("error");
    processingActiveRef.current = false;
  }, []);

  const handleStartProcessing = useCallback(async (state?: ToolProcessingState) => {
    processingActiveRef.current = true;
    setProcessingState(state ?? {});
    setStep("processing");

    // Lazy-load FFmpeg the first time the user clicks Convert.
    // Canvas-based browser-image tools never need it.
    if (engine !== "browser-image" && !ffmpeg.instance.current?.loaded) {
      const loaded = await ffmpeg.load();
      if (!loaded) {
        processingActiveRef.current = false;
        toast.error("Failed to load media engine. Check your connection and try again.");
        setErrorMessage("Failed to load media engine. Check your connection and try again.");
        setStep("configure");
      }
    }
  }, [engine, ffmpeg]);

  const handleCancelProcessing = useCallback(() => {
    processingActiveRef.current = false;
    ffmpeg.terminate();
    setProcessingState({});
    setErrorMessage("Processing was cancelled.");
    setStep(files.length > 0 ? "configure" : "upload");
  }, [ffmpeg, files.length]);

  const handleReset = useCallback(() => {
    processingActiveRef.current = false;
    setFiles([]);
    setAuxiliaryFiles({});
    setInspections([]);
    setOutputs([]);
    setProcessingState({});
    setErrorMessage(null);
    setStep("upload");
    ffmpeg.terminate();
  }, [ffmpeg]);

  const handleMoveFile = useCallback((fromIndex: number, toIndex: number) => {
    setFiles((currentFiles) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= currentFiles.length ||
        toIndex >= currentFiles.length
      ) {
        return currentFiles;
      }

      const nextFiles = [...currentFiles];
      const [movedFile] = nextFiles.splice(fromIndex, 1);
      nextFiles.splice(toIndex, 0, movedFile);
      return nextFiles;
    });
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((currentFiles) => {
      const nextFiles = currentFiles.filter((_, currentIndex) => currentIndex !== index);

      if (nextFiles.length === 0) {
        setInspections([]);
        setOutputs([]);
        setErrorMessage(null);
        setStep("upload");
      } else {
        setStep("inspect");
      }

      return nextFiles;
    });
  }, []);

  const handleAuxiliaryFileSelect = useCallback((
    key: string,
    nextFile: File | null,
    requirement: ToolFileRequirement
  ) => {
    if (!nextFile) {
      setAuxiliaryFiles((current) => ({ ...current, [key]: null }));
      return;
    }

    const validation = validateFiles([nextFile], requirement);
    if (validation.errors.length > 0) {
      toast.error(validation.errors[0].message);
      return;
    }

    validation.warnings.forEach((warning) => {
      toast.warning(warning.message);
    });

    setAuxiliaryFiles((current) => ({ ...current, [key]: nextFile }));
  }, []);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = toBlob(output.data, output.mime);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = output.name;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [output]);

  const handleDownloadAll = useCallback(() => {
    if (outputs.length === 0) return;

    if (outputs.length === 1) {
      const blob = toBlob(outputs[0].data, outputs[0].mime);
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url; a.download = outputs[0].name; a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const zipFiles: Record<string, Uint8Array> = {};
    const seen: Record<string, number> = {};
    for (const out of outputs) {
      let name = out.name;
      if (seen[name] !== undefined) {
        seen[name]++;
        const dot = name.lastIndexOf(".");
        name = dot >= 0
          ? `${name.slice(0, dot)}_${seen[name]}${name.slice(dot)}`
          : `${name}_${seen[name]}`;
      } else {
        seen[name] = 0;
      }
      zipFiles[name] = out.data;
    }
    const zipped = zipSync(zipFiles, { level: 0 });
    const blob   = new Blob([zipped], { type: "application/zip" });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement("a");
    a.href = url; a.download = "fileapps-output.zip"; a.click();
    URL.revokeObjectURL(url);
  }, [outputs]);

  const reduction =
    file && output
      ? Math.round(((file.size - output.data.length) / file.size) * 100)
      : 0;

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{editorIntro.title}</h2>
          <p className="text-muted-foreground">{editorIntro.description}</p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2">
          {(["upload", "inspect", "configure", "processing", "result"] as ToolStep[]).map((currentStep, index) => (
            <div key={currentStep} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  step === currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : (["processing", "result", "error"] as ToolStep[]).includes(step) && (["upload", "inspect", "configure"] as ToolStep[]).includes(currentStep)
                      ? "border-primary bg-primary/10 text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {(["processing", "result", "error"] as ToolStep[]).includes(step) && (["upload", "inspect", "configure"] as ToolStep[]).includes(currentStep)
                  ? "OK"
                  : index + 1}
              </div>
              {index < 4 && (
                <div
                  className={cn(
                    "h-0.5 w-8",
                    (["inspect", "configure", "processing", "result", "error"] as ToolStep[]).includes(step) && index === 0
                      ? "bg-primary"
                      : (["configure", "processing", "result", "error"] as ToolStep[]).includes(step) && index === 1
                      ? "bg-primary"
                      : (["processing", "result", "error"] as ToolStep[]).includes(step) && index === 2
                      ? "bg-primary"
                      : (["result"] as ToolStep[]).includes(step) && index === 3
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-6 md:p-8">
          {step === "upload" && (
            <FileDropzone
              accept={accept}
              label={title}
              formats={formats}
              multiple={(resolvedFileRequirement.maxCount ?? 1) > 1}
              onFilesSelect={handleFilesSelect}
            />
          )}

          {step === "inspect" && (
            <ProcessingStatus
              progress={0}
              status="Inspecting selected files"
              message="Reading lightweight file metadata before configuration."
              items={files.map((nextFile) => ({
                label: nextFile.name,
                state: "active",
              }))}
            />
          )}

          {step === "configure" && file && (
            <div className="flex gap-6">
              <div className="flex-1 min-w-0">
              <div className="space-y-6">
              {errorMessage && (
                <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
                  <div className="space-y-1">
                    <p className="font-medium text-destructive">Previous attempt failed</p>
                    <p className="text-muted-foreground">{errorMessage}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {files.length === 1 ? (
                    <>
                      <Badge
                        variant="secondary"
                        className="max-w-[200px] truncate font-mono text-xs"
                        title={file.name}
                      >
                        {file.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        ({formatFileSize(file.size)})
                      </span>
                    </>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      {files.length} files selected
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStep("upload");
                    setFiles([]);
                    setAuxiliaryFiles({});
                    setInspections([]);
                    setOutputs([]);
                    setErrorMessage(null);
                  }}
                >
                  Change {files.length > 1 ? "files" : "file"}
                </Button>
              </div>

              {files.length > 1 && (
                <ToolFileList
                  files={files}
                  onMoveUp={(index) => handleMoveFile(index, index - 1)}
                  onMoveDown={(index) => handleMoveFile(index, index + 1)}
                  onReorder={handleMoveFile}
                  onRemove={handleRemoveFile}
                />
              )}

              <ToolInspectionPanel inspections={inspections} />

              {files.length === 1 && file.type.startsWith("image/") && filePreviewUrl && (
                <div className="flex justify-center">
                  <img
                    src={filePreviewUrl}
                    alt="Preview"
                    className="max-h-64 rounded-lg border object-contain"
                  />
                </div>
              )}
              {files.length === 1 && file.type.startsWith("video/") && filePreviewUrl && (
                <div
                  className="relative w-full overflow-hidden rounded-lg border bg-black"
                  style={{ aspectRatio: "16/9", maxHeight: "16rem" }}
                >
                  <video
                    controls
                    preload="metadata"
                    className="h-full w-full object-contain"
                    src={filePreviewUrl}
                  />
                </div>
              )}
              {files.length === 1 && file.type.startsWith("audio/") && filePreviewUrl && (
                <audio controls preload="metadata" className="w-full" src={filePreviewUrl} />
              )}

              {auxiliaryInputs && auxiliaryInputs.length > 0 && (
                <ToolAuxiliaryInputs
                  inputs={auxiliaryInputs}
                  files={auxiliaryFiles}
                  onSelectFile={(key, nextFile) => {
                    const input = auxiliaryInputs.find((item) => item.key === key);
                    if (!input) return;
                    handleAuxiliaryFileSelect(key, nextFile, input.requirement);
                  }}
                />
              )}

              {children({
                file,
                files,
                previewUrl: filePreviewUrl,
                auxiliaryFiles,
                inspections,
                ffmpeg,
                setOutput: handleSetOutput,
                setOutputs: handleSetOutputs,
                setError: handleSetError,
                startProcessing: handleStartProcessing,
                setProcessingState,
              })}
              </div>
              </div>
              <div className="hidden md:block w-64 shrink-0">
                <div className="rounded-xl border bg-card p-4 space-y-3">
                  <p className="text-sm font-semibold">Related Tools</p>
                  {relatedTools.map(t => (
                    <a key={t.id} href={t.href} className="flex items-start gap-2 rounded-lg p-2 hover:bg-muted transition-colors text-sm">
                      <span className="font-medium">{t.title}</span>
                    </a>
                  ))}
                </div>
                <div className="rounded-xl border bg-card p-4 mt-4">
                  <p className="text-sm font-semibold mb-1">100% Private</p>
                  <p className="text-xs text-muted-foreground">Files never leave your device. All processing happens locally in your browser.</p>
                </div>
              </div>
            </div>
          )}

          {step === "processing" && (
            <ProcessingStatus
              progress={processingState.progress ?? ffmpeg.progress}
              status={processingState.status || "Processing your file"}
              message={
                processingState.message ||
                ffmpeg.logs?.[ffmpeg.logs.length - 1] ||
                "Media engine is working..."
              }
              items={processingState.items}
              logs={ffmpeg.logs}
              onCancel={handleCancelProcessing}
            />
          )}

          {step === "error" && (
            <div className="space-y-4">
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Processing failed</p>
                    <p className="text-sm text-muted-foreground">
                      {errorMessage ?? "Something went wrong while processing your file."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setStep("configure")} className="flex-1">
                  Try Again
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset Tool
                </Button>
              </div>
            </div>
          )}

          {step === "result" && outputs.length > 0 && (
            renderDone ? (
              renderDone({
                output,
                outputs,
                file,
                files,
                onReset: handleReset,
                onDownload: handleDownload,
                onDownloadAll: handleDownloadAll,
              })
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                  >
                    Done processing
                  </Badge>
                </div>

                {output.mime.startsWith("video/") && outputPreviewUrl && (
                  <div
                    className="relative w-full overflow-hidden rounded-lg border bg-black"
                    style={{ aspectRatio: "16/9", maxHeight: "16rem" }}
                  >
                    <video
                      controls
                      preload="metadata"
                      className="h-full w-full object-contain"
                      src={outputPreviewUrl}
                    />
                  </div>
                )}
                {output.mime.startsWith("audio/") && outputPreviewUrl && (
                  <audio controls preload="metadata" className="w-full" src={outputPreviewUrl} />
                )}
                {output.mime.startsWith("image/") && outputPreviewUrl && (
                  <img
                    alt="Output preview"
                    className="mx-auto max-h-96 max-w-full rounded-lg"
                    src={outputPreviewUrl}
                  />
                )}

                {file && outputs.length === 1 && (
                  <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/50 p-4 text-center text-sm">
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Original</p>
                      <p className="font-semibold">{formatFileSize(file.size)}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Output</p>
                      <p className="font-semibold">{formatFileSize(output.data.length)}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">
                        {reduction >= 0 ? "Reduction" : "Increase"}
                      </p>
                      <p
                        className={cn(
                          "font-semibold",
                          reduction > 0
                            ? "text-green-600 dark:text-green-400"
                            : reduction < 0
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-muted-foreground"
                        )}
                      >
                        {reduction > 0 ? `-${reduction}%` : reduction < 0 ? `+${Math.abs(reduction)}%` : "-"}
                      </p>
                    </div>
                  </div>
                )}

                {output && (
                  <div className="text-xs text-muted-foreground">
                    File: <span className="font-mono">{output.name}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Process Another
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
