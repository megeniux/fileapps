import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { FFMPEG_CONFIG } from "@/lib/constants";

let ffmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;
let loadProgress = 0;

export type FFmpegStatus =
  | { type: "idle" }
  | { type: "loading"; progress: number }
  | { type: "ready" }
  | { type: "error"; message: string };

export type FFmpegProgressCallback = (progress: number) => void;
export type FFmpegLogCallback = (message: string) => void;

export function getFFmpegProgress(): number {
  return loadProgress;
}

export async function getFFmpegInstance(): Promise<FFmpeg> {
  if (ffmpeg?.loaded) return ffmpeg;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    ffmpeg = new FFmpeg();

    const base = FFMPEG_CONFIG.coreBase;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        loadProgress = 0;
        await ffmpeg.load({
          coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
        });
        return ffmpeg;
      } catch (err) {
        console.error(`FFmpeg load attempt ${attempt} failed:`, err);
        lastError = err instanceof Error ? err : new Error("Failed to load FFmpeg");
        if (attempt < 2) await new Promise((r) => setTimeout(r, 1000));
      }
    }

    throw lastError || new Error("Failed to load media engine");
  })();

  return loadPromise;
}

export function resetFFmpeg() {
  ffmpeg?.terminate();
  ffmpeg = null;
  loadPromise = null;
  loadProgress = 0;
}

export { fetchFile, toBlobURL };
export type { FFmpeg };
