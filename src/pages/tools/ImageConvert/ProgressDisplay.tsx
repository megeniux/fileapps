// MUI Components
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

interface ProgressDisplayProps {
  isProcessing: boolean;
  progress: number;
  status: string | null;
}

export default function ProgressDisplay({
  isProcessing,
  progress,
  status
}: ProgressDisplayProps) {
  if (!isProcessing) return null;

  return (
    <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
      <LinearProgress color='success' variant="determinate" value={progress} />
      <Typography variant="body2" my={1}>
        {`${status} ${progress.toFixed(1)}%`}
      </Typography>
    </Box>
  );
}
