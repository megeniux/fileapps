import {
  processBrowserImageBlob,
  type BrowserImageOptions,
  type BrowserImageResult,
} from "@/lib/browser-image";

type BrowserImageWorkerRequest = {
  file: File;
  options: BrowserImageOptions;
};

type BrowserImageWorkerResponse =
  | { type: "progress"; progress: number }
  | { type: "done"; result: BrowserImageResult }
  | { type: "error"; message: string };

self.onmessage = async (event: MessageEvent<BrowserImageWorkerRequest>) => {
  try {
    const { file, options } = event.data;

    const result = await processBrowserImageBlob(file, file.size, options, (progress) => {
      const payload: BrowserImageWorkerResponse = { type: "progress", progress };
      self.postMessage(payload);
    });

    const payload: BrowserImageWorkerResponse = { type: "done", result };
    self.postMessage(payload);
  } catch (error) {
    const payload: BrowserImageWorkerResponse = {
      type: "error",
      message: error instanceof Error ? error.message : "Browser image processing failed.",
    };
    self.postMessage(payload);
  }
};
