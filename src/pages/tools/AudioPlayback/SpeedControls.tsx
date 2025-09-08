import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
  speed: number;
  isReversed: boolean;
  isProcessing: boolean;
  onSpeedChange: (e: Event, v: number | number[]) => void;
  onReverseToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdjustSpeed: (delta: number) => void;
};

export default function SpeedControls(props: Props) {
  const { speed, isReversed, isProcessing, onSpeedChange, onReverseToggle, onAdjustSpeed } = props;

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Typography variant="subtitle2" gutterBottom>
        Playback Speed: {speed}x {isReversed ? '(Reversed)' : ''}
      </Typography>
      <Box display="flex" alignItems="center">
        <IconButton size="small" onClick={() => onAdjustSpeed(-0.1)} disabled={isProcessing}><RemoveIcon /></IconButton>
        <Slider
          value={speed}
          min={-5}
          max={5}
          step={0.1}
          onChange={onSpeedChange}
          valueLabelDisplay="auto"
          disabled={isProcessing}
          size="small"
          sx={{ mx: 1, flex: 1 }}
        />
        <IconButton size="small" onClick={() => onAdjustSpeed(0.1)} disabled={isProcessing}><AddIcon /></IconButton>
      </Box>
      <FormControlLabel
        control={<Checkbox checked={isReversed} onChange={onReverseToggle} size="small" disabled={isProcessing} />}
        label={<Typography variant="subtitle2">Reverse audio</Typography>}
        sx={{ mt: 1 }}
      />
    </Box>
  );
}
