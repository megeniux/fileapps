import React from 'react';

// MUI Components
import Box from '@mui/material/Box';

interface ThumbnailDisplayProps {
  mode: number
  thumbnailUrl: string | null
  thumbnails: string[]
}

export const ThumbnailDisplay: React.FC<ThumbnailDisplayProps> = ({
  mode,
  thumbnailUrl,
  thumbnails
}) => {
  return (
    <>
      {/* Single thumbnail or scrub display */}
      {(mode === 0 || mode === 1) && thumbnailUrl && (
        <Box display="flex" justifyContent="center" mb={2}>
          <img 
            src={thumbnailUrl} 
            alt={mode === 0 ? "Thumbnail" : "Scrub Strip"} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: 180, 
              borderRadius: 4, 
              border: '1px solid #ccc' 
            }} 
          />
        </Box>
      )}

      {/* Multiple thumbnails display */}
      {mode === 2 && thumbnails.length > 0 && (
        <Box display="flex" gap={1} mb={2} sx={{ overflowX: 'auto' }}>
          {thumbnails.map((url, idx) => (
            <img 
              key={idx} 
              src={url} 
              alt={`Thumbnail ${idx + 1}`} 
              style={{ 
                maxWidth: 120, 
                maxHeight: 90, 
                borderRadius: 4, 
                border: '1px solid #ccc' 
              }} 
            />
          ))}
        </Box>
      )}
    </>
  );
};
