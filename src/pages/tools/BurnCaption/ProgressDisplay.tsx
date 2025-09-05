import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import type { ProcessingState } from './types';

interface ProgressDisplayProps {
  processing: ProcessingState;
  consoleLogs: string[];
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  processing,
  consoleLogs
}) => {
  if (!processing.isProcessing) {
    return null;
  }

  const lastLog = consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : '';

  return (
    <Box 
      textAlign="center" 
      bgcolor="action.hover" 
      p={2} 
      mt={2} 
      borderRadius={0.25} 
      overflow="hidden"
    >
      <LinearProgress 
        color="success" 
        variant="determinate" 
        value={processing.progress} 
        sx={{ mb: 1 }}
      />
      
      <Typography variant="body2" my={1}>
        {processing.status} ({processing.progress.toFixed(1)}%)
      </Typography>
      
      {lastLog && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          noWrap
          sx={{ 
            display: 'block',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {lastLog}
        </Typography>
      )}
    </Box>
  );
};

export default ProgressDisplay;
