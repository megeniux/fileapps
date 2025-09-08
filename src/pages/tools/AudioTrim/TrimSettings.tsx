import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
  duration: number;
  range: [number, number];
  isProcessing: boolean;
  onRangeChange: (r: [number, number]) => void;
  onDecreaseStartTime: () => void;
  onIncreaseEndTime: () => void;
};

const formatDurationDisplay = (r: [number, number]) => `${r[0].toFixed(1)}s - ${r[1].toFixed(1)}s`;

export default function TrimSettings({
  duration,
  range,
  isProcessing,
  onRangeChange,
  onDecreaseStartTime,
  onIncreaseEndTime
}: Props) {
  // Match VideoTrim behavior: hide when no duration or while processing
  if (duration <= 0 || isProcessing) {
    return null;
  }

  const [startTime, endTime] = range;
  const isValidRange = endTime > startTime;

  return (
    <Box mb={2}>
      <Typography
        variant="subtitle2"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
      >
        Select Duration:
        <Typography component="span" variant="caption" color="text.secondary">
          {formatDurationDisplay(range)} ({Math.max(0, endTime - startTime).toFixed(1)}s)
        </Typography>
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={onDecreaseStartTime}
          disabled={isProcessing || startTime <= 0}
          size="small"
          title="Decrease start time"
        >
          <RemoveIcon />
        </IconButton>

        <Slider
          min={0}
          max={Math.floor(duration)}
          step={0.1}
          value={range}
          onChange={(_e, newValue) => {
            if (Array.isArray(newValue)) {
              onRangeChange([Number(newValue[0]), Number(newValue[1])]);
            }
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${Number(value).toFixed(1)}s`}
          disableSwap
          disabled={isProcessing}
          sx={{
            flex: 1,
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'primary.main'
            }
          }}
          marks={[{ value: 0, label: '0s' }, { value: Math.floor(duration), label: `${Math.floor(duration)}s` }]}
        />

        <IconButton
          onClick={onIncreaseEndTime}
          disabled={isProcessing || endTime >= duration}
          size="small"
          title="Increase end time"
        >
          <AddIcon />
        </IconButton>
      </Box>

      {!isValidRange && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 0.5, display: 'block' }}>
          End time must be greater than start time
        </Typography>
      )}
    </Box>
  );
}
