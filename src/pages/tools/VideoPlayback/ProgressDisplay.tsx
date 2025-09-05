import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import PerformanceInfoDialog from '../../../components/PerformanceInfoDialog';
import type { ProgressDisplayProps } from './types';

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  processing,
  consoleLogs,
  isPerformanceDialogOpen,
  onPerformanceDialogOpen,
  onPerformanceDialogClose
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

      {processing.isProcessing && (
        <Alert severity="info" sx={{ alignItems: 'center', mt: 2, py: 0 }}>
          <Typography variant='body2' component="p">
            <strong>Feels Slow?</strong> - Be on this same tab! processing depends on your system performance. 
            <Link color="info" sx={{ cursor: 'pointer' }} onClick={onPerformanceDialogOpen}>
              Learn more
            </Link>
          </Typography>
        </Alert>
      )}

      <PerformanceInfoDialog
        open={isPerformanceDialogOpen}
        onClose={onPerformanceDialogClose}
      />
    </>
  );
};

export default ProgressDisplay;
