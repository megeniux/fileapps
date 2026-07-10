import { fetchFile } from "@/lib/ffmpeg";

export interface FFmpegJobAdapter {
  instance: {
    current: {
      loaded?: boolean;
      writeFile?: (path: string, data: Uint8Array) => Promise<unknown>;
      exec?: (args: string[]) => Promise<unknown>;
      readFile?: (path: string) => Promise<unknown>;
      deleteFile?: (path: string) => Promise<unknown>;
    } | null;
  };
  markStage?: (stage: "reading-file" | "processing" | "writing-output") => void;
  markDone?: () => void;
}

export interface RunSingleFFmpegJobOptions {
  ffmpeg: FFmpegJobAdapter;
  file: File;
  outputExt: string;
  buildArgs: (inputName: string, outputName: string) => string[];
  setProcessingState: (state: { progress?: number; status?: string; message?: string }) => void;
}

export interface FFmpegProgressItem {
  label: string;
  state: "pending" | "active" | "done";
}

export interface WriteFFmpegWorkspaceFilesOptions {
  ffmpeg: FFmpegJobAdapter;
  files: File[];
  setProcessingState: (state: {
    progress?: number;
    status?: string;
    message?: string;
    items?: FFmpegProgressItem[];
  }) => void;
  getInputName: (file: File, index: number) => string;
  getStatus?: (index: number, total: number) => string;
  progressCeiling?: number;
}

export function buildFFmpegProgressItems(
  files: File[],
  activeIndex: number,
  completedCount: number,
): FFmpegProgressItem[] {
  return files.map((file, index) => ({
    label: file.name,
    state:
      index < completedCount
        ? "done"
        : index === activeIndex
        ? "active"
        : "pending",
  }));
}

export async function writeFFmpegWorkspaceFiles({
  ffmpeg,
  files,
  setProcessingState,
  getInputName,
  getStatus,
  progressCeiling = 30,
}: WriteFFmpegWorkspaceFilesOptions): Promise<string[]> {
  const inst = ffmpeg.instance.current;
  if (!inst?.loaded || !inst.writeFile) {
    throw new Error("Media engine not loaded. Please refresh and try again.");
  }

  const inputNames: string[] = [];
  ffmpeg.markStage?.("reading-file");

  for (let index = 0; index < files.length; index += 1) {
    const currentFile = files[index];
    const inputName = getInputName(currentFile, index);
    inputNames.push(inputName);

    setProcessingState({
      progress: Math.round((index / Math.max(files.length, 1)) * progressCeiling),
      status: getStatus?.(index, files.length) ?? `Loading file ${index + 1} of ${files.length}`,
      message: currentFile.name,
      items: buildFFmpegProgressItems(files, index, index),
    });

    await inst.writeFile(inputName, await fetchFile(currentFile));
  }

  return inputNames;
}

export async function cleanupFFmpegWorkspaceFiles(
  ffmpeg: FFmpegJobAdapter,
  fileNames: string[],
): Promise<void> {
  const inst = ffmpeg.instance.current;
  if (!inst?.deleteFile) return;

  await Promise.all(fileNames.map((fileName) => inst.deleteFile?.(fileName).catch(() => {})));
}

export async function runSingleFFmpegJob({
  ffmpeg,
  file,
  outputExt,
  buildArgs,
  setProcessingState,
}: RunSingleFFmpegJobOptions): Promise<Uint8Array> {
  const inst = ffmpeg.instance.current;
  if (!inst?.loaded || !inst.writeFile || !inst.exec || !inst.readFile || !inst.deleteFile) {
    throw new Error("Media engine not loaded. Please refresh and try again.");
  }

  const inputExt = file.name.split(".").pop()?.toLowerCase() || "bin";
  const inputName = `input.${inputExt}`;
  const outputName = `output.${outputExt}`;

  try {
    ffmpeg.markStage?.("reading-file");
    setProcessingState({ status: "Reading file..." });
    await inst.writeFile(inputName, await fetchFile(file));

    ffmpeg.markStage?.("processing");
    setProcessingState({
      status: "Processing...",
      message: "This may take a while for large files.",
    });
    await inst.exec(buildArgs(inputName, outputName));

    ffmpeg.markStage?.("writing-output");
    setProcessingState({ status: "Writing output...", progress: 95 });
    const data = await inst.readFile(outputName) as Uint8Array;
    ffmpeg.markDone?.();
    return data;
  } finally {
    await inst.deleteFile(inputName).catch(() => {});
    await inst.deleteFile(outputName).catch(() => {});
  }
}
