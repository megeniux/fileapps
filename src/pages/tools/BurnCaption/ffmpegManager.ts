import { FFmpeg } from '@ffmpeg/ffmpeg';
import { FONT_SETTINGS } from './constants';

class FFmpegManager {
  private static instance: FFmpegManager;
  private ffmpeg: FFmpeg;
  private isLoaded: boolean = false;
  private currentOperation: Promise<any> | null = null;
  private fontLoaded: boolean = false;

  private constructor() {
    this.ffmpeg = new FFmpeg();
  }

  public static getInstance(): FFmpegManager {
    if (!FFmpegManager.instance) {
      FFmpegManager.instance = new FFmpegManager();
    }
    return FFmpegManager.instance;
  }

  public async ensureLoaded(): Promise<void> {
    if (!this.isLoaded) {
      await this.ffmpeg.load();
      this.isLoaded = true;
    }
  }

  public async loadFont(): Promise<void> {
    if (this.fontLoaded) return;

    try {
      const fontResponse = await fetch(FONT_SETTINGS.STATIC_FONT_URL);
      const fontBlob = await fontResponse.blob();
      const fontData = new Uint8Array(await fontBlob.arrayBuffer());
      
      await this.ffmpeg.writeFile(FONT_SETTINGS.STATIC_FONT_NAME, fontData);
      this.fontLoaded = true;
    } catch (error) {
      console.warn('Failed to load font:', error);
      throw new Error('Failed to load Arial font for captions');
    }
  }

  public getFFmpeg(): FFmpeg {
    return this.ffmpeg;
  }

  public async terminate(): Promise<void> {
    try {
      if (this.currentOperation) {
        await this.ffmpeg.terminate();
        this.currentOperation = null;
      }
    } catch (error) {
      console.warn('Error terminating FFmpeg:', error);
    }
  }

  public setCurrentOperation(operation: Promise<any>): void {
    this.currentOperation = operation;
  }

  public clearCurrentOperation(): void {
    this.currentOperation = null;
  }

  public isOperationRunning(): boolean {
    return this.currentOperation !== null;
  }

  public async cleanup(): Promise<void> {
    try {
      // Clean up any temporary files
      const files = await this.ffmpeg.listDir('.');
      for (const file of files) {
        if (file.name !== '.' && file.name !== '..' && file.name !== FONT_SETTINGS.STATIC_FONT_NAME) {
          try {
            await this.ffmpeg.deleteFile(file.name);
          } catch (error) {
            console.warn(`Failed to delete file ${file.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.warn('Error during FFmpeg cleanup:', error);
    }
  }

  public setupProgressTracking(
    onProgress: (progress: number) => void,
    onLog: (message: string) => void
  ): () => void {
    let durationParsed = false;
    let videoDuration = 0;

    const logHandler = ({ message }: { message: string }) => {
      onLog(message);
      
      // Parse video duration
      if (!durationParsed && message.includes('Duration:')) {
        const match = message.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
        if (match) {
          const [, h, m, s] = match;
          videoDuration = parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
          durationParsed = true;
        }
      }
      
      // Parse current processing time
      const timeMatch = message.match(/time=(\d+):(\d+):(\d+\.\d+)/);
      if (timeMatch && videoDuration > 0) {
        const [, h, m, s] = timeMatch;
        const currentTime = parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
        const progress = Math.min((currentTime / videoDuration) * 100, 99.5);
        onProgress(progress);
      } else if (message.includes('frame=')) {
        // Fallback progress indicator - use fixed progress
        const fallbackProgress = Math.min(85, 50); // Fallback progress value
        onProgress(fallbackProgress);
      }
    };

    this.ffmpeg.on('log', logHandler);

    // Return cleanup function
    return () => {
      this.ffmpeg.off('log', logHandler);
    };
  }

  public async deleteTemporaryFiles(filenames: string[]): Promise<void> {
    for (const filename of filenames) {
      try {
        await this.ffmpeg.deleteFile(filename);
      } catch (error) {
        console.warn(`Failed to delete ${filename}:`, error);
      }
    }
  }

  public async reset(): Promise<void> {
    if (this.isLoaded) {
      await this.cleanup();
      await this.terminate();
      this.ffmpeg = new FFmpeg();
      this.isLoaded = false;
      this.fontLoaded = false;
      this.currentOperation = null;
    }
  }

  public isFontLoaded(): boolean {
    return this.fontLoaded;
  }
}

export default FFmpegManager;
