// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// MUI Icons
import ReplayIcon from '@mui/icons-material/Replay';

// Constants and types
import { ratioOptions, resizeModes } from './constants';
import type { ResizeSettingsProps } from './types';

export default function ResizeSettings({
  width,
  height,
  resolutionRatio,
  resizeMode,
  fps,
  onWidthChange,
  onHeightChange,
  onRatioChange,
  onResizeModeChange,
  onFpsChange,
  onReset,
}: ResizeSettingsProps) {
  return (
    <Grid container spacing={1} mt={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle2">Resolution (px):</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            type="number"
            value={width}
            onChange={onWidthChange}
            placeholder="Width"
            sx={{ flex: 1 }}
          />
          <Typography color="text.secondary">x</Typography>
          <TextField
            type="number"
            value={height}
            onChange={onHeightChange}
            placeholder="Height"
            sx={{ flex: 1 }}
          />
          <Select
            value={resolutionRatio}
            onChange={onRatioChange}
            sx={{ minWidth: 100 }}
          >
            {ratioOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          <IconButton color="inherit" onClick={onReset} title="Reset to default">
            <ReplayIcon fontSize="small" />
          </IconButton>
        </Box>
        {resolutionRatio !== 'custom' && (
          <Typography variant="caption" color="text.secondary">
            Ratio locked: {ratioOptions.find(r => r.value === resolutionRatio)?.label}
          </Typography>
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2">Resize Mode:</Typography>
        <Select
          fullWidth
          value={resizeMode}
          onChange={onResizeModeChange}
        >
          {resizeModes.map(m => (
            <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="text.secondary">
          {resizeMode === 'fit' && 'Fit: Keeps aspect ratio, may add borders.'}
          {resizeMode === 'fill' && 'Fill: Crops to fill, keeps aspect ratio.'}
          {resizeMode === 'stretch' && 'Stretch: Ignores aspect ratio.'}
          {resizeMode === 'crop' && 'Crop: Manual crop (not implemented).'}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2">FPS (optional):</Typography>
        <TextField
          fullWidth
          type="number"
          value={fps}
          onChange={onFpsChange}
          placeholder="e.g. 30"
        />
      </Grid>
    </Grid>
  );
}
