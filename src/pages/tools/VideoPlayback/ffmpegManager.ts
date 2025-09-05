import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { buildSpeedFilters, generateOutputFilename } from './utils';
import type { SpeedOptions } from './types';

/**
 * FFmpeg instance and loading state management
 */
class FFmpegManager {
  private static ffmpeg = new FFmpeg();
  private static isLoaded = false;

  /**
   * Get the FFmpeg instance
   */
  static getInstance(): FFmpeg {
    return this.ffmpeg;
  }

  /**
   * Load FFmpeg if not already loaded
   */
  static async ensureLoaded(): Promise<void> {
    if (!this.isLoaded) {
      await this.ffmpeg.load();
      this.isLoaded = true;
    }
  }

  /**
   * Terminate FFmpeg instance
   */
  static terminate(): void {
    this.ffmpeg.terminate?.();
  }

  /**
   * Process video with speed and reverse adjustments
   */
  static async processSpeedAdjustment(
    file: File,
    speedOptions: SpeedOptions,
    onProgress: (message: string) => void
  ): Promise<{ data: ArrayBuffer; size: number }> {
    await this.ensureLoaded();

    const inputFileName = file.name;
    const outputFileName = generateOutputFilename(inputFileName, speedOptions.speed, speedOptions.isReversed);

    try {
      // Write input file
      await this.ffmpeg.writeFile(inputFileName, await fetchFile(file));

      // Set up logging
      this.ffmpeg.on('log', ({ message }: { message: string }) => {
        onProgress(message);
      });

      // Build filters
      const { videoFilter, audioFilter } = buildSpeedFilters(speedOptions.speed, speedOptions.isReversed);

      // Build FFmpeg arguments
      const args = ['-i', inputFileName];
      
      if (videoFilter && audioFilter) {
        args.push('-vf', videoFilter);
        args.push('-af', audioFilter);
      } else if (videoFilter) {
        args.push('-vf', videoFilter);
      } else if (audioFilter) {
        args.push('-af', audioFilter);
      }
      
      args.push(outputFileName);

      // Execute FFmpeg
      await this.ffmpeg.exec(args);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFileName);
      const uint8Array = new Uint8Array(data as any);

      // Cleanup
      await this.cleanup([inputFileName, outputFileName]);

      return {
        data: uint8Array.buffer,
        size: uint8Array.length
      };
    } catch (error) {
      // Cleanup on error
      try {
        await this.cleanup([inputFileName, outputFileName]);
      } catch (cleanupError) {
        console.warn('Cleanup failed:', cleanupError);
      }
      throw error;
    }
  }

  /**
   * Clean up temporary files
   */
  private static async cleanup(filenames: string[]): Promise<void> {
    for (const filename of filenames) {
      try {
        await this.ffmpeg.deleteFile(filename);
      } catch (error) {
        // File might not exist, ignore error
        console.warn(`Failed to delete ${filename}:`, error);
      }
    }
  }

  /**
   * Remove log event listener
   */
  static removeLogListener(): void {
    // Note: FFmpeg.off requires handler function, so we'll handle this in the caller
  }
}

export default FFmpegManager;
