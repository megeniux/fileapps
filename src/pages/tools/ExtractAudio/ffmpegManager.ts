import { FFmpeg } from '@ffmpeg/ffmpeg';

class FFmpegManager {
  private static instance: FFmpegManager;
  private ffmpeg: FFmpeg;
  private isLoaded: boolean = false;
  private currentOperation: Promise<any> | null = null;

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
      try {
        await this.ffmpeg.load();
        this.isLoaded = true;
      } catch (error) {
        console.warn('FFmpeg.load() failed, recreating instance and retrying:', error);
        try {
          this.ffmpeg = new FFmpeg();
          await this.ffmpeg.load();
          this.isLoaded = true;
        } catch (retryError) {
          console.warn('Retry FFmpeg.load() failed:', retryError);
          throw retryError;
        }
      }
    }
  }

  public getFFmpeg(): FFmpeg {
    return this.ffmpeg;
  }

  public async terminate(): Promise<void> {
    try {
      try {
        await this.ffmpeg.terminate();
      } catch (err) {
        console.warn('FFmpeg.terminate() call resulted in error (ignored):', err);
      }
      this.currentOperation = null;
    } catch (error) {
      console.warn('Error terminating FFmpeg:', error);
    } finally {
      try {
        this.ffmpeg = new FFmpeg();
      } catch (recreateError) {
        console.warn('Failed to recreate FFmpeg instance after terminate():', recreateError);
      }
      this.isLoaded = false;
      this.currentOperation = null;
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
        if (file.name !== '.' && file.name !== '..') {
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
    onLog: (message: string) => void,
    totalDuration: number
  ): () => void {
    const logHandler = ({ message }: { message: string }) => {
      onLog(message);
      
      // Extract time information for progress calculation
      const timeMatch = message.match(/time=(\d+):(\d+):(\d+\.\d+)/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const seconds = parseFloat(timeMatch[3]);
        const currentTime = hours * 3600 + minutes * 60 + seconds;
        
        if (totalDuration > 0) {
          const progress = Math.min((currentTime / totalDuration) * 100, 99);
          onProgress(progress);
        }
      } else if (message.includes('size=')) {
        // Fallback progress indicator - increment by 2%
        const currentProgress = Math.min(85, 50); // Fallback to mid-range progress
        onProgress(currentProgress);
      }
    };

    this.ffmpeg.on('log', logHandler);

    // Return cleanup function
    return () => {
      this.ffmpeg.off('log', logHandler);
    };
  }

  public async reset(): Promise<void> {
    if (this.isLoaded) {
      await this.cleanup();
      await this.terminate();
      this.ffmpeg = new FFmpeg();
      this.isLoaded = false;
      this.currentOperation = null;
    }
  }
}

export default FFmpegManager;
