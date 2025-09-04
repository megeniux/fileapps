import React from 'react';

// MUI Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

// Types
import type { SelectChangeEvent } from '@mui/material/Select';

// Local constants
import { thumbnailSizeOptions, validateThumbnailSize, MAX_SAFE_WIDTH, MAX_SAFE_HEIGHT } from './constants';

interface SizeSelectorProps {
  width: number
  height: number
  sizePreset: string
  onWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSizePresetChange: (event: SelectChangeEvent) => void
  mode: number
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  width,
  height,
  sizePreset,
  onWidthChange,
  onHeightChange,
  onSizePresetChange,
  mode
}) => {
  const isCustomSize = sizePreset === 'custom'
  const isValidSize = validateThumbnailSize(width, height)
  const showSizeWarning = !isValidSize && (width > 0 || height > 0)

  return (
    <Box>
      {/* Thumbnail size preset selector */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Thumbnail Size</InputLabel>
        <Select
          value={sizePreset}
          label="Thumbnail Size"
          onChange={onSizePresetChange}
        >
          {thumbnailSizeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Custom size inputs */}
      {isCustomSize && (
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Width (px)"
            type="number"
            value={width || ''}
            onChange={onWidthChange}
            sx={{ flex: 1 }}
            inputProps={{ min: 1, max: MAX_SAFE_WIDTH }}
            helperText={`Max: ${MAX_SAFE_WIDTH}px`}
            error={width > 0 && (width > MAX_SAFE_WIDTH || width < 1)}
          />
          <TextField
            label="Height (px)"
            type="number"
            value={height || ''}
            onChange={onHeightChange}
            sx={{ flex: 1 }}
            inputProps={{ min: 1, max: MAX_SAFE_HEIGHT }}
            helperText={`Max: ${MAX_SAFE_HEIGHT}px`}
            error={height > 0 && (height > MAX_SAFE_HEIGHT || height < 1)}
          />
        </Box>
      )}

      {/* Selected size display for presets */}
      {!isCustomSize && (
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Selected size: {width} × {height} pixels
          </Typography>
        </Box>
      )}

      {/* Size warning alert */}
      {showSizeWarning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Size Warning:</strong> Large dimensions may cause memory errors. 
            Recommended maximum: {MAX_SAFE_WIDTH}×{MAX_SAFE_HEIGHT}px
          </Typography>
        </Alert>
      )}

      {/* Mode-specific information */}
      {mode === 1 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Scrub Mode:</strong> Individual frames will be resized to 240×135px for performance, 
            then combined into a strip.
          </Typography>
        </Alert>
      )}

      {mode === 2 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Frames Mode:</strong> Each frame will be resized to 480×270px for better performance 
            when extracting multiple frames.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};
