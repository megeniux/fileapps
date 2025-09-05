import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SPEED_CONFIG } from './constants';
import type { SpeedControlsProps } from './types';

const SpeedControls: React.FC<SpeedControlsProps> = ({
  speedOptions,
  isProcessing,
  onSpeedChange,
  onReverseToggle,
  onAdjustSpeed
}) => {
  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      onSpeedChange(value);
    }
  };

  const handleDecrease = () => {
    onAdjustSpeed(-SPEED_CONFIG.STEP);
  };

  const handleIncrease = () => {
    onAdjustSpeed(SPEED_CONFIG.STEP);
  };

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Typography variant="subtitle2" gutterBottom>
        Playback Speed: {speedOptions.speed}x {speedOptions.isReversed ? '(Reversed)' : ''}
      </Typography>
      
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton 
          onClick={handleDecrease} 
          disabled={isProcessing || speedOptions.speed <= SPEED_CONFIG.MIN}
        >
          <RemoveIcon />
        </IconButton>
        
        <Slider
          value={speedOptions.speed}
          min={SPEED_CONFIG.SLIDER_MIN}
          max={SPEED_CONFIG.SLIDER_MAX}
          step={SPEED_CONFIG.STEP}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          disabled={isProcessing}
          sx={{ mx: 1, flex: 1 }}
        />
        
        <IconButton 
          onClick={handleIncrease} 
          disabled={isProcessing || speedOptions.speed >= SPEED_CONFIG.MAX}
        >
          <AddIcon />
        </IconButton>
      </Box>
      
      <FormControlLabel
        control={
          <Checkbox
            checked={speedOptions.isReversed}
            onChange={(e) => onReverseToggle(e.target.checked)}
            disabled={isProcessing}
            size="small"
          />
        }
        label={<Typography variant="subtitle2">Reverse video</Typography>}
        title="Use the checkbox to reverse video and audio. Speed adjustment applies to both normal and reversed video. 1x is normal speed."
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default SpeedControls;
