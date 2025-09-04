// MUI Components
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';

// MUI Icons
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CropIcon from '@mui/icons-material/Crop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Types
import type { SelectChangeEvent } from '@mui/material/Select';
import type { CropArea } from './types';

// Constants
import { supportedFormats, sliderRanges } from './constants';

interface SettingsPanelProps {
  // Crop
  crop: CropArea;
  onApplyCrop: () => void;
  onResetCrop: () => void;
  
  // Dimensions
  width: string;
  height: string;
  maintainAspectRatio: boolean;
  onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAspectRatioToggle: () => void;
  
  // Output settings
  outputName: string;
  format: string;
  onOutputNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormatChange: (event: SelectChangeEvent) => void;
  
  // Quality and filters
  quality: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  rotate: number;
  flipH: boolean;
  flipV: boolean;
  grayscale: boolean;
  onQualityChange: (value: number) => void;
  onBlurChange: (value: number) => void;
  onBrightnessChange: (_: any, value: number | number[]) => void;
  onContrastChange: (_: any, value: number | number[]) => void;
  onSaturationChange: (_: any, value: number | number[]) => void;
  onRotateChange: (value: number) => void;
  onFlipHChange: () => void;
  onFlipVChange: () => void;
  onGrayscaleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Processing state
  isProcessing: boolean;
}

export default function SettingsPanel({
  crop,
  onApplyCrop,
  onResetCrop,
  width,
  height,
  maintainAspectRatio,
  onWidthChange,
  onHeightChange,
  onAspectRatioToggle,
  outputName,
  format,
  onOutputNameChange,
  onFormatChange,
  quality,
  blur,
  brightness,
  contrast,
  saturation,
  rotate,
  flipH,
  flipV,
  grayscale,
  onQualityChange,
  onBlurChange,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
  onRotateChange,
  onFlipHChange,
  onFlipVChange,
  onGrayscaleChange,
  isProcessing
}: SettingsPanelProps) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Crop Apply/Reset */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }} display="flex" alignItems="center" gap={1}>
        <Button
          variant="contained"
          onClick={onApplyCrop}
          disabled={isProcessing || !(crop.w > 0 && crop.h > 0)}
          sx={{ mr: 1 }}
          fullWidth
          startIcon={<CropIcon />}
        >
          Crop
        </Button>
        <Button
          variant='outlined'
          onClick={onResetCrop}
          sx={{ whiteSpace: 'nowrap' }}
          disabled={isProcessing}
          fullWidth
          startIcon={<RestartAltIcon />}
        >
          Reset
        </Button>
      </Grid>

      {/* Width & Height inputs + aspect ratio lock */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }} position="relative">
        <Box display="flex" alignItems="center">
          <TextField
            label="Width (px)"
            value={width}
            onChange={onWidthChange}
            disabled={isProcessing}
          />
          {/* Aspect ratio lock */}
          <Tooltip title={maintainAspectRatio ? 'Lock aspect ratio' : 'Unlock aspect ratio'}>
            <span>
              <IconButton
                onClick={onAspectRatioToggle}
                disabled={isProcessing}
                color={maintainAspectRatio ? 'primary' : 'default'}
                aria-label={maintainAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
              >
                {maintainAspectRatio ? <LinkIcon fontSize="small" /> : <LinkOffIcon fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>
          <TextField
            label="Height (px)"
            value={height}
            onChange={onHeightChange}
            disabled={isProcessing}
          />
        </Box>
      </Grid>

      {/* Output Filename */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <TextField
          label="Output Filename (optional)"
          fullWidth
          value={outputName}
          onChange={onOutputNameChange}
          disabled={isProcessing}
        />
      </Grid>

      {/* Output Format */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Output Format</InputLabel>
          <Select
            value={format}
            onChange={onFormatChange}
            label="Output Format"
            disabled={isProcessing}
          >
            {supportedFormats.map((fmt) => (
              <MenuItem key={fmt.value} value={fmt.value}>
                {fmt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Quality */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <Typography variant="body2">Quality: {quality}%</Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            onClick={() => onQualityChange(Math.max(sliderRanges.quality.min, quality - 1))} 
            disabled={isProcessing}
          >
            <RemoveIcon />
          </IconButton>
          <Slider
            value={quality}
            onChange={(_, value) => onQualityChange(value as number)}
            min={sliderRanges.quality.min}
            max={sliderRanges.quality.max}
            step={1}
            disabled={isProcessing}
            valueLabelDisplay="auto"
            sx={{ mx: 1, flex: 1 }}
          />
          <IconButton 
            onClick={() => onQualityChange(Math.min(sliderRanges.quality.max, quality + 1))} 
            disabled={isProcessing}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Blur */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <Typography variant="body2">Blur: {blur}</Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            onClick={() => onBlurChange(Math.max(sliderRanges.blur.min, blur - 1))} 
            disabled={isProcessing}
          >
            <RemoveIcon />
          </IconButton>
          <Slider
            value={blur}
            min={sliderRanges.blur.min}
            max={sliderRanges.blur.max}
            step={1}
            onChange={(_, v) => onBlurChange(v as number)}
            disabled={isProcessing}
            valueLabelDisplay="auto"
            sx={{ mx: 1, flex: 1 }}
          />
          <IconButton 
            onClick={() => onBlurChange(Math.min(sliderRanges.blur.max, blur + 1))} 
            disabled={isProcessing}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Brightness */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <Typography variant="body2">Brightness: {brightness}%</Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            onClick={() => onBrightnessChange(null, Math.max(sliderRanges.brightness.min, brightness - 1))} 
            disabled={isProcessing}
          >
            <RemoveIcon />
          </IconButton>
          <Slider 
            value={brightness} 
            onChange={onBrightnessChange} 
            min={sliderRanges.brightness.min} 
            max={sliderRanges.brightness.max} 
            step={1} 
            disabled={isProcessing} 
            valueLabelDisplay="auto" 
            sx={{ mx: 1, flex: 1 }} 
          />
          <IconButton 
            onClick={() => onBrightnessChange(null, Math.min(sliderRanges.brightness.max, brightness + 1))} 
            disabled={isProcessing}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Contrast */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <Typography variant="body2">Contrast: {contrast}%</Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            onClick={() => onContrastChange(null, Math.max(sliderRanges.contrast.min, contrast - 1))} 
            disabled={isProcessing}
          >
            <RemoveIcon />
          </IconButton>
          <Slider 
            value={contrast} 
            onChange={onContrastChange} 
            min={sliderRanges.contrast.min} 
            max={sliderRanges.contrast.max} 
            step={1} 
            disabled={isProcessing} 
            valueLabelDisplay="auto" 
            sx={{ mx: 1, flex: 1 }} 
          />
          <IconButton 
            onClick={() => onContrastChange(null, Math.min(sliderRanges.contrast.max, contrast + 1))} 
            disabled={isProcessing}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Saturation */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <Typography variant="body2">Saturation: {saturation}%</Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            onClick={() => onSaturationChange(null, Math.max(sliderRanges.saturation.min, saturation - 1))} 
            disabled={isProcessing}
          >
            <RemoveIcon />
          </IconButton>
          <Slider 
            value={saturation} 
            onChange={onSaturationChange} 
            min={sliderRanges.saturation.min} 
            max={sliderRanges.saturation.max} 
            step={1} 
            disabled={isProcessing} 
            valueLabelDisplay="auto" 
            sx={{ mx: 1, flex: 1 }} 
          />
          <IconButton 
            onClick={() => onSaturationChange(null, Math.min(sliderRanges.saturation.max, saturation + 1))} 
            disabled={isProcessing}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Rotate */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <Typography variant="body2" noWrap>Rotate: {rotate}°</Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            onClick={() => onRotateChange(Math.max(sliderRanges.rotate.min, rotate - 1))} 
            disabled={isProcessing}
          >
            <RemoveIcon />
          </IconButton>
          <Slider
            value={rotate}
            min={sliderRanges.rotate.min}
            max={sliderRanges.rotate.max}
            step={1}
            onChange={(_, v) => onRotateChange(v as number)}
            disabled={isProcessing}
            valueLabelDisplay="auto"
            sx={{ mx: 1, flex: 1 }}
          />
          <IconButton 
            onClick={() => onRotateChange(Math.min(sliderRanges.rotate.max, rotate + 1))} 
            disabled={isProcessing}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Flip Horizontal */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <FormControlLabel
          control={<Switch checked={flipH} onChange={onFlipHChange} disabled={isProcessing} />}
          label={<Typography variant="body2">Flip Horizontal</Typography>}
        />
      </Grid>

      {/* Flip Vertical */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <FormControlLabel
          control={<Switch checked={flipV} onChange={onFlipVChange} disabled={isProcessing} />}
          label={<Typography variant="body2">Flip Vertical</Typography>}
        />
      </Grid>

      {/* Grayscale */}
      <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={grayscale}
              onChange={onGrayscaleChange}
              disabled={isProcessing}
            />
          }
          label={<Typography variant="body2">Grayscale</Typography>}
        />
      </Grid>
    </Grid>
  );
}
