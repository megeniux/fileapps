/**
 * Trim Settings component for Video Trimmer
 * Following established patterns from VideoResize and VideoConvert
 */

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatDurationDisplay } from './utils';
import type { TrimSettingsProps } from './types';

/**
 * Trim settings component with range slider and controls
 */
export const TrimSettings: React.FC<TrimSettingsProps> = ({
  duration,
  range,
  isProcessing,
  onRangeChange,
  onDecreaseStartTime,
  onIncreaseEndTime
}) => {
  // Don't render if no duration or processing
  if (duration <= 0 || isProcessing) {
    return null;
  }
  
  const [startTime, endTime] = range;
  const isValidRange = endTime > startTime;
  
  return (
    <Box mb={2}>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1
        }}
      >
        Select Duration: 
        <Typography component="span" variant="caption" color="text.secondary">
          {formatDurationDisplay(range)} ({Math.max(0, endTime - startTime).toFixed(1)}s)
        </Typography>
      </Typography>
      
      <Box display="flex" alignItems="center" gap={1}>
        {/* Decrease start time button */}
        <IconButton 
          onClick={onDecreaseStartTime} 
          disabled={isProcessing || startTime <= 0}
          size="small"
          title="Decrease start time"
        >
          <RemoveIcon />
        </IconButton>
        
        {/* Range slider */}
        <Slider
          min={0}
          max={Math.floor(duration)}
          step={0.1}
          value={range}
          onChange={onRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value.toFixed(1)}s`}
          disableSwap
          disabled={isProcessing}
          sx={{ 
            flex: 1,
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'primary.main'
            }
          }}
          marks={[
            { value: 0, label: '0s' },
            { value: Math.floor(duration), label: `${Math.floor(duration)}s` }
          ]}
        />
        
        {/* Increase end time button */}
        <IconButton 
          onClick={onIncreaseEndTime} 
          disabled={isProcessing || endTime >= duration}
          size="small"
          title="Increase end time"
        >
          <AddIcon />
        </IconButton>
      </Box>
      
      {/* Range validation warning */}
      {!isValidRange && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 0.5, display: 'block' }}>
          End time must be greater than start time
        </Typography>
      )}
    </Box>
  );
};
