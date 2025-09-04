// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

interface ProgressDisplayProps {
  isProcessing: boolean;
  progress: number;
  status: string | null;
  consoleLogs: string[];
}

export default function ProgressDisplay({
  isProcessing,
  progress,
  status,
  consoleLogs
}: ProgressDisplayProps) {
  if (!isProcessing) return null;

  return (
    <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
      <LinearProgress color="success" variant="determinate" value={progress} />
      <Typography variant="body2" my={1}>{`${status} (${progress.toFixed(1)}%)`}</Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
      </Typography>
    </Box>
  );
}
