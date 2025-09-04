// MUI Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

// Types
import type { SelectChangeEvent } from '@mui/material/Select';

// Local constants
import { thumbnailSizeOptions, MAX_SAFE_WIDTH, MAX_SAFE_HEIGHT } from './constants';

interface SizeSelectorProps {
  width: number
  height: number
  sizePreset: string
  onWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSizePresetChange: (event: SelectChangeEvent) => void
  mode: number
}

export default function SizeSelector({
  width,
  height,
  sizePreset,
  onWidthChange,
  onHeightChange,
  onSizePresetChange,
}: SizeSelectorProps) {
  const isCustomSize = sizePreset === 'custom'

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
    </Box>
  );
}
