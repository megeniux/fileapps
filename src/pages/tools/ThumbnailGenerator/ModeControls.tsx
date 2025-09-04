// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Types
import type { SelectChangeEvent } from '@mui/material/Select';

// Local Components
import SizeSelector from './SizeSelector';

interface ModeControlsProps {
  mode: number
  time: number
  startTime: number
  endTime: number
  width: number
  height: number
  sizePreset: string
  scrubInterval: number
  frameInterval: number
  duration: number
  isProcessing: boolean
  onTimeChange: (event: Event, newValue: number | number[]) => void
  onRangeChange: (event: Event, newValue: number | number[]) => void
  onWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSizePresetChange: (event: SelectChangeEvent) => void
  onScrubIntervalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFrameIntervalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setTime: React.Dispatch<React.SetStateAction<number>>
  setStartTime: React.Dispatch<React.SetStateAction<number>>
  setEndTime: React.Dispatch<React.SetStateAction<number>>
}

export default function ModeControls({
  mode,
  time,
  startTime,
  endTime,
  width,
  height,
  sizePreset,
  scrubInterval,
  frameInterval,
  duration,
  isProcessing,
  onTimeChange,
  onRangeChange,
  onWidthChange,
  onHeightChange,
  onSizePresetChange,
  onScrubIntervalChange,
  onFrameIntervalChange,
  setTime,
  setStartTime,
  setEndTime
}: ModeControlsProps) {
  return (
    <>
      {/* Start/End time slider for scrub and frames modes */}
      {mode !== 0 && (
        <Box mb={2}>
          <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Select Range: <small>{`${startTime.toFixed(1)}s - ${endTime.toFixed(1)}s`}</small>
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton 
              onClick={() => setStartTime(prev => Math.max(0, Number((prev - 1).toFixed(1))))} 
              disabled={isProcessing}
            >
              <RemoveIcon />
            </IconButton>
            <Slider
              min={0}
              max={Math.floor(duration)}
              step={0.1}
              value={[startTime, endTime]}
              onChange={onRangeChange}
              valueLabelDisplay="auto"
              disableSwap
              sx={{ mx: 1, flex: 1 }}
            />
            <IconButton 
              onClick={() => setEndTime(prev => Math.min(Math.floor(duration), Number((prev + 1).toFixed(1))))} 
              disabled={isProcessing}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Single frame mode controls */}
      {mode === 0 && (
        <Box mb={2}>
          <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Select Time: <small>{`${time.toFixed(1)}s`}</small>
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton 
              onClick={() => setTime(prev => Math.max(0, Number((prev - 0.5).toFixed(1))))} 
              disabled={isProcessing}
            >
              <RemoveIcon />
            </IconButton>
            <Slider
              min={0}
              max={Math.floor(duration)}
              step={0.1}
              value={time}
              onChange={onTimeChange}
              valueLabelDisplay="auto"
              sx={{ mx: 1, flex: 1 }}
            />
            <IconButton 
              onClick={() => setTime(prev => Math.min(Math.floor(duration), Number((prev + 0.5).toFixed(1))))} 
              disabled={isProcessing}
            >
              <AddIcon />
            </IconButton>
          </Box>
          
          <SizeSelector
            width={width}
            height={height}
            sizePreset={sizePreset}
            onWidthChange={onWidthChange}
            onHeightChange={onHeightChange}
            onSizePresetChange={onSizePresetChange}
            mode={mode}
          />
        </Box>
      )}

      {/* Scrub mode controls */}
      {mode === 1 && (
        <Box mb={2}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="Interval (s)"
              type="number"
              value={scrubInterval}
              onChange={onScrubIntervalChange}
              sx={{ flex: 1 }}
              inputProps={{ min: 0.1, step: 0.1 }}
              helperText="Time between frames"
            />
          </Box>
          
          <SizeSelector
            width={width}
            height={height}
            sizePreset={sizePreset}
            onWidthChange={onWidthChange}
            onHeightChange={onHeightChange}
            onSizePresetChange={onSizePresetChange}
            mode={mode}
          />
        </Box>
      )}

      {/* Frames mode controls */}
      {mode === 2 && (
        <Box mb={2}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="Frame Interval"
              type="number"
              value={frameInterval}
              onChange={onFrameIntervalChange}
              sx={{ flex: 1 }}
              inputProps={{ min: 1 }}
              helperText="Extract every Nth frame"
            />
          </Box>
          
          <SizeSelector
            width={width}
            height={height}
            sizePreset={sizePreset}
            onWidthChange={onWidthChange}
            onHeightChange={onHeightChange}
            onSizePresetChange={onSizePresetChange}
            mode={mode}
          />
        </Box>
      )}
    </>
  );
}
