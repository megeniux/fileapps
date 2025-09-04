// Predefined thumbnail size options
export const thumbnailSizeOptions = [
  { label: 'Custom', value: 'custom', width: null, height: null },
  { label: 'YouTube Thumbnail (1280×720)', value: '1280x720', width: 1280, height: 720 },
  { label: 'HD Ready (1366×768)', value: '1366x768', width: 1366, height: 768 },
  { label: 'Standard HD (1920×1080)', value: '1920x1080', width: 1920, height: 1080 },
  { label: 'Instagram Square (1080×1080)', value: '1080x1080', width: 1080, height: 1080 },
  { label: 'Instagram Story (1080×1920)', value: '1080x1920', width: 1080, height: 1920 },
  { label: 'Facebook Cover (1200×630)', value: '1200x630', width: 1200, height: 630 },
  { label: 'Twitter Header (1500×500)', value: '1500x500', width: 1500, height: 500 },
  { label: 'Small (640×360)', value: '640x360', width: 640, height: 360 },
  { label: 'Medium (854×480)', value: '854x480', width: 854, height: 480 },
  { label: 'Large (1280×720)', value: '1280x720_alt', width: 1280, height: 720 },
] as const

export type ThumbnailSizeOption = typeof thumbnailSizeOptions[number]

// Maximum safe dimensions to prevent memory issues
export const MAX_SAFE_WIDTH = 1920
export const MAX_SAFE_HEIGHT = 1080

// Safe size validation
export const validateThumbnailSize = (width: number, height: number): boolean => {
  return width > 0 && height > 0 && width <= MAX_SAFE_WIDTH && height <= MAX_SAFE_HEIGHT
}

// Get safe dimensions (clamp to max if exceeded)
export const getSafeDimensions = (width: number, height: number) => {
  const safeWidth = Math.min(Math.max(width, 1), MAX_SAFE_WIDTH)
  const safeHeight = Math.min(Math.max(height, 1), MAX_SAFE_HEIGHT)
  return { safeWidth, safeHeight }
}
