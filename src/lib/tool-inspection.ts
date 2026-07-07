import type { ToolFileInspection } from "@/lib/tool-types";

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function formatDurationSeconds(durationSeconds: number) {
  if (!Number.isFinite(durationSeconds) || durationSeconds < 0) {
    return 0;
  }

  return Math.round(durationSeconds * 10) / 10;
}

function readImageMetadata(file: File): Promise<ToolFileInspection["image"]> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
      URL.revokeObjectURL(url);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image dimensions."));
    };

    image.src = url;
  });
}

function readMediaMetadata(file: File, kind: "audio" | "video"): Promise<ToolFileInspection["media"]> {
  return new Promise((resolve, reject) => {
    const element = document.createElement(kind);
    const url = URL.createObjectURL(file);

    const cleanup = () => {
      element.removeAttribute("src");
      element.load();
      URL.revokeObjectURL(url);
    };

    element.preload = "metadata";
    element.onloadedmetadata = () => {
      const isVideo = kind === "video";
      resolve({
        durationSeconds: formatDurationSeconds(element.duration),
        width: isVideo ? (element as HTMLVideoElement).videoWidth : undefined,
        height: isVideo ? (element as HTMLVideoElement).videoHeight : undefined,
      });
      cleanup();
    };

    element.onerror = () => {
      cleanup();
      reject(new Error(`Could not read ${kind} metadata.`));
    };

    element.src = url;
  });
}

export async function inspectFile(file: File): Promise<ToolFileInspection> {
  const inspection: ToolFileInspection = {
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    extension: getExtension(file.name),
  };

  try {
    if (file.type.startsWith("image/")) {
      inspection.image = await readImageMetadata(file);
    } else if (file.type.startsWith("video/")) {
      inspection.media = await readMediaMetadata(file, "video");
    } else if (file.type.startsWith("audio/")) {
      inspection.media = await readMediaMetadata(file, "audio");
    }
  } catch {
    return inspection;
  }

  return inspection;
}
