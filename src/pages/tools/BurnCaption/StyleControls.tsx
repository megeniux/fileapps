import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FONT_SETTINGS } from './constants';
import type { StyleOptions } from './types';

interface StyleControlsProps {
  styleOptions: StyleOptions;
  isProcessing: boolean;
  onFontSizeChange: (fontSize: number) => void;
  onFontColorChange: (fontColor: string) => void;
  onOutlineColorChange: (outlineColor: string) => void;
  onOutlineWidthChange: (outlineWidth: number) => void;
  onAdjustFontSize: (delta: number) => void;
  onAdjustOutlineWidth: (delta: number) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({
  styleOptions,
  isProcessing,
  onFontSizeChange,
  onFontColorChange,
  onOutlineColorChange,
  onOutlineWidthChange,
  onAdjustFontSize,
  onAdjustOutlineWidth
}) => {
  const handleFontSizeSliderChange = (_: Event, value: number | number[]) => {
    onFontSizeChange(value as number);
  };

  const handleOutlineWidthSliderChange = (_: Event, value: number | number[]) => {
    onOutlineWidthChange(value as number);
  };

  const handleFontColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFontColorChange(event.target.value);
  };

  const handleOutlineColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOutlineColorChange(event.target.value);
  };

  if (isProcessing) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Font Size Control */}
      <Grid size={{ xs: 9, sm: 4 }}>
        <Typography variant="subtitle2" gutterBottom>
          Font Size
          <small> ({styleOptions.fontSize}px)</small>
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            size="small" 
            onClick={() => onAdjustFontSize(-1)}
            disabled={styleOptions.fontSize <= FONT_SETTINGS.FONT_SIZE_MIN}
          >
            <RemoveIcon />
          </IconButton>
          <Slider
            value={styleOptions.fontSize}
            min={FONT_SETTINGS.FONT_SIZE_MIN}
            max={FONT_SETTINGS.FONT_SIZE_MAX}
            step={1}
            onChange={handleFontSizeSliderChange}
            valueLabelDisplay="auto"
            size="small"
            sx={{ mx: 1, flex: 1 }}
          />
          <IconButton 
            size="small" 
            onClick={() => onAdjustFontSize(1)}
            disabled={styleOptions.fontSize >= FONT_SETTINGS.FONT_SIZE_MAX}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Font Color Control */}
      <Grid size={{ xs: 3, sm: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Font Color
        </Typography>
        <input 
          type="color" 
          value={styleOptions.fontColor} 
          onChange={handleFontColorChange} 
          style={{ 
            width: 40, 
            height: 32, 
            border: 'none', 
            background: 'none',
            cursor: 'pointer'
          }} 
        />
      </Grid>

      {/* Outline Width Control */}
      <Grid size={{ xs: 3, sm: 4 }}>
        <Typography variant="subtitle2" gutterBottom>
          Outline Width
          <small> ({styleOptions.outlineWidth}px)</small>
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            size="small" 
            onClick={() => onAdjustOutlineWidth(-1)}
            disabled={styleOptions.outlineWidth <= FONT_SETTINGS.OUTLINE_WIDTH_MIN}
          >
            <RemoveIcon />
          </IconButton>
          <Slider
            value={styleOptions.outlineWidth}
            min={FONT_SETTINGS.OUTLINE_WIDTH_MIN}
            max={FONT_SETTINGS.OUTLINE_WIDTH_MAX}
            step={1}
            onChange={handleOutlineWidthSliderChange}
            valueLabelDisplay="auto"
            size="small"
            sx={{ mx: 1, flex: 1 }}
          />
          <IconButton 
            size="small" 
            onClick={() => onAdjustOutlineWidth(1)}
            disabled={styleOptions.outlineWidth >= FONT_SETTINGS.OUTLINE_WIDTH_MAX}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Outline Color Control */}
      <Grid size={{ xs: 9, sm: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Outline Color
        </Typography>
        <input 
          type="color" 
          value={styleOptions.outlineColor} 
          onChange={handleOutlineColorChange} 
          style={{ 
            width: 40, 
            height: 32, 
            border: 'none', 
            background: 'none',
            cursor: 'pointer'
          }} 
        />
      </Grid>
    </Grid>
  );
};

export default StyleControls;
