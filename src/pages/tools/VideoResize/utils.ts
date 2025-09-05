/**
 * Parse duration from FFmpeg log message
 * @param msg - FFmpeg log message
 * @returns Duration in seconds
 */
export const parseDuration = (msg: string): number => {
  const match = msg.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return 0;
};

/**
 * Parse current time from FFmpeg log message
 * @param msg - FFmpeg log message
 * @returns Current processing time in seconds or null
 */
export const parseCurrentTime = (msg: string): number | null => {
  const match = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return null;
};

/**
 * Format file size in bytes to human readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.23 MB")
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Calculate aspect ratio from width and height
 * @param width - Video width
 * @param height - Video height
 * @returns Aspect ratio as a number
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

/**
 * Find the closest ratio option for given aspect ratio
 * @param aspectRatio - Calculated aspect ratio
 * @param ratioOptions - Available ratio options
 * @returns Closest ratio option value
 */
export const findClosestRatio = (aspectRatio: number, ratioOptions: any[]): string => {
  let closest = 'custom';
  let minDiff = Infinity;
  
  ratioOptions.forEach(option => {
    if (option.ratio !== null) {
      const diff = Math.abs(aspectRatio - option.ratio);
      if (diff < minDiff) {
        minDiff = diff;
        closest = option.value;
      }
    }
  });
  
  return closest;
};

/**
 * Validate video dimensions
 * @param width - Video width
 * @param height - Video height
 * @returns Validation result
 */
export const validateDimensions = (width: string, height: string): { isValid: boolean; error?: string } => {
  const w = parseInt(width);
  const h = parseInt(height);
  
  if (isNaN(w) || isNaN(h)) {
    return { isValid: false, error: 'Width and height must be valid numbers' };
  }
  
  if (w <= 0 || h <= 0) {
    return { isValid: false, error: 'Width and height must be greater than 0' };
  }
  
  if (w > 7680 || h > 4320) {
    return { isValid: false, error: 'Maximum supported resolution is 8K (7680x4320)' };
  }
  
  if (w < 32 || h < 32) {
    return { isValid: false, error: 'Minimum supported resolution is 32x32' };
  }
  
  return { isValid: true };
};

/**
 * Generate output filename for resized video
 * @param originalName - Original file name
 * @param width - New width
 * @param height - New height
 * @returns Generated filename
 */
export const generateOutputFilename = (originalName: string, width: string, height: string): string => {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  return `resized_${nameWithoutExt}_${width}x${height}.mp4`;
};

/**
 * Check if the browser supports the required features
 * @returns Support status
 */
export const checkBrowserSupport = (): { isSupported: boolean; missingFeatures: string[] } => {
  const missingFeatures: string[] = [];
  
  if (!('SharedArrayBuffer' in window)) {
    missingFeatures.push('SharedArrayBuffer');
  }
  
  if (!('WebAssembly' in window)) {
    missingFeatures.push('WebAssembly');
  }
  
  return {
    isSupported: missingFeatures.length === 0,
    missingFeatures
  };
};
