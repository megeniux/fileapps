import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import type { ProgressDisplayProps } from './types';

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  processing,
  consoleLogs,
}) => {
  return (
    <>
      {processing.isProcessing && (
        <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
          <LinearProgress color='success' variant="determinate" value={processing.progress} />
          <Typography variant="body2" my={1}>
            {`${processing.status} ${processing.progress.toFixed(1)}%`}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ProgressDisplay;

