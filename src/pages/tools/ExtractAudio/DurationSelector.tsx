import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatTime } from './utils';
import type { DurationRange, AudioFile } from './types';

interface DurationSelectorProps {
  audioFile: AudioFile | null;
  range: DurationRange;
  isProcessing: boolean;
  onRangeChange: (newRange: DurationRange) => void;
  onAdjustStart: (delta: number) => void;
  onAdjustEnd: (delta: number) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  audioFile,
  range,
  isProcessing,
  onRangeChange,
  onAdjustStart,
  onAdjustEnd
}) => {
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onRangeChange({
        start: Math.floor(newValue[0]),
        end: Math.ceil(newValue[1])
      });
    }
  };

  if (!audioFile || audioFile.duration <= 0 || isProcessing) {
    return null;
  }

  return (
    <Box mb={2}>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        Select Duration: 
      </Typography>
      
      <Box display="flex" alignItems="center">
        <IconButton 
          size="small" 
          onClick={() => onAdjustStart(-1)} 
          disabled={isProcessing || range.start <= 0}
          title="Decrease start time by 1 second"
        >
          <RemoveIcon />
        </IconButton>
        
        <Slider
          min={0}
          max={Math.floor(audioFile.duration)}
          step={0.1}
          value={[range.start, range.end]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          valueLabelFormat={formatTime}
          disableSwap
          size="small"
          sx={{ mx: 1, flex: 1 }}
          disabled={isProcessing}
        />
        
        <IconButton 
          size="small" 
          onClick={() => onAdjustEnd(1)} 
          disabled={isProcessing || range.end >= Math.floor(audioFile.duration)}
          title="Increase end time by 1 second"
        >
          <AddIcon />
        </IconButton>
      </Box>
      
      {/* Duration info */}
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography variant="caption" color="text.secondary">
          Start: {formatTime(range.start)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Duration: {formatTime(range.end - range.start)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          End: {formatTime(range.end)}
        </Typography>
      </Box>
    </Box>
  );
};

export default DurationSelector;
