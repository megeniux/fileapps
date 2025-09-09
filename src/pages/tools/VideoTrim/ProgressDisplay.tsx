/**
 * Progress Display component for Video Trimmer
 * Following established patterns from VideoResize and VideoConvert
 */

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import type { ProgressDisplayProps } from './types';

/**
 * Progress display component for video processing
 */
export const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  isProcessing,
  progress,
  status,
  consoleLogs
}) => {
  // Don't render if not processing
  if (!isProcessing) {
    return null;
  }
  
  const latestLog = consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : '';
  
  return (
    <Box 
      textAlign="center" 
      bgcolor="action.hover" 
      p={2} 
      mt={2} 
      borderRadius={0.25} 
      overflow="hidden"
    >
      {/* Progress bar */}
      <LinearProgress color="success" variant="determinate" value={progress} />
      
      {/* Status and progress percentage */}
      <Typography variant="body2" my={1} fontWeight="medium">
        {status} ({progress.toFixed(1)}%)
      </Typography>
      
      {/* Latest console log */}
      {latestLog && (
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
          {latestLog}
        </Typography>
      )}
    </Box>
  );
};
