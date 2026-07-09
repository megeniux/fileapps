import type { BrowserImageOptions, BrowserImageResult } from "@/lib/browser-image";

type BrowserImageWorkerMessage =
  | { type: "progress"; progress: number }
  | { type: "done"; result: BrowserImageResult }
  | { type: "error"; message: string };

export async function runBrowserImageWorkerJob(
  file: File,
  options: BrowserImageOptions,
  onProgress?: (progress: number) => void,
): Promise<BrowserImageResult> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("../workers/browser-image.worker.ts", import.meta.url),
      { type: "module" },
    );

    worker.onmessage = (event: MessageEvent<BrowserImageWorkerMessage>) => {
      const payload = event.data;

      if (payload.type === "progress") {
        onProgress?.(payload.progress);
        return;
      }

      worker.terminate();

      if (payload.type === "done") {
        resolve(payload.result);
        return;
      }

      reject(new Error(payload.message));
    };

    worker.onerror = () => {
      worker.terminate();
      reject(new Error("Worker-based image processing failed to start."));
    };

    worker.postMessage({ file, options });
  });
}
