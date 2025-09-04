import { useRef } from 'react';

// MUI Components
import Box from '@mui/material/Box';

// Types
import type { CropArea, ImageDimensions } from './types';

interface ImagePreviewProps {
  previewUrl: string | null;
  crop: CropArea;
  rotate: number;
  grayscale: boolean;
  blur: number;
  flipH: boolean;
  flipV: boolean;
  brightness: number;
  contrast: number;
  saturation: number;
  originalDimensions: ImageDimensions | null;
  isSelectingCrop: boolean;
  drawingCrop: CropArea | null;
  displaySize: ImageDimensions;
  onImageLoad: () => void;
  onCropMouseDown: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onCropMouseMove: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onCropMouseUp: () => void;
  onDisplaySizeChange: (size: ImageDimensions) => void;
}

export default function ImagePreview({
  previewUrl,
  crop,
  rotate,
  grayscale,
  blur,
  flipH,
  flipV,
  brightness,
  contrast,
  saturation,
  originalDimensions,
  isSelectingCrop,
  drawingCrop,
  displaySize,
  onImageLoad,
  onCropMouseDown,
  onCropMouseMove,
  onCropMouseUp,
  onDisplaySizeChange
}: ImagePreviewProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    onImageLoad();
    // Get displayed size for overlay scaling
    setTimeout(() => {
      if (imageRef.current) {
        onDisplaySizeChange({
          width: imageRef.current.width,
          height: imageRef.current.height
        });
      }
    }, 0);
  };

  if (!previewUrl) return null;

  return (
    <Box 
      flex={1} 
      minHeight={320} 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      position="relative" 
      bgcolor="action.hover" 
      borderRadius={1}
    >
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <img
          ref={imageRef}
          src={previewUrl}
          alt="Preview"
          onLoad={handleImageLoad}
          style={{
            maxWidth: '100%',
            maxHeight: 480,
            width: 'auto',
            height: 'auto',
            display: 'block',
            filter: `
              ${grayscale ? 'grayscale(1)' : ''}
              ${blur ? `blur(${blur}px)` : ''}
              brightness(${brightness}%)
              contrast(${contrast}%)
              saturate(${saturation}%)
            `,
            transform: `
              rotate(${rotate}deg)
              scaleX(${flipH ? -1 : 1})
              scaleY(${flipV ? -1 : 1})
            `
          } as React.CSSProperties}
        />
        
        {/* Crop selection overlay */}
        {originalDimensions && displaySize.width > 0 && displaySize.height > 0 && (
          <div
            style={{
              position: 'absolute',
              left: 0, 
              top: 0, 
              width: displaySize.width, 
              height: displaySize.height,
              pointerEvents: 'auto',
              cursor: 'crosshair',
              zIndex: 3,
              background: isSelectingCrop ? 'rgba(0,0,0,0.05)' : 'transparent'
            }}
            onMouseDown={onCropMouseDown}
            onTouchStart={onCropMouseDown}
            onMouseMove={isSelectingCrop ? onCropMouseMove : undefined}
            onTouchMove={isSelectingCrop ? onCropMouseMove : undefined}
            onMouseUp={onCropMouseUp}
            onTouchEnd={onCropMouseUp}
          >
            {(drawingCrop && drawingCrop.w > 0 && drawingCrop.h > 0)
              ? (
                <div
                  style={{
                    position: 'absolute',
                    left: `${(drawingCrop.x / originalDimensions.width) * displaySize.width}px`,
                    top: `${(drawingCrop.y / originalDimensions.height) * displaySize.height}px`,
                    width: `${(drawingCrop.w / originalDimensions.width) * displaySize.width}px`,
                    height: `${(drawingCrop.h / originalDimensions.height) * displaySize.height}px`,
                    border: '2px dashed #1976d2',
                    background: 'rgba(25, 118, 210, 0.1)',
                    pointerEvents: 'none'
                  }}
                />
              )
              : (crop.w > 0 && crop.h > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${(crop.x / originalDimensions.width) * displaySize.width}px`,
                    top: `${(crop.y / originalDimensions.height) * displaySize.height}px`,
                    width: `${(crop.w / originalDimensions.width) * displaySize.width}px`,
                    height: `${(crop.h / originalDimensions.height) * displaySize.height}px`,
                    border: '2px dashed #1976d2',
                    background: 'rgba(25, 118, 210, 0.1)',
                    pointerEvents: 'none'
                  }}
                />
              ))
            }
          </div>
        )}
      </Box>
    </Box>
  );
}
