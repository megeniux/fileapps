/**
 * Video List component for Video Merger
 * Following established patterns from VideoResize and VideoTrim
 */

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { UI_CONFIG, TABLE_CONFIG } from './constants';
import type { VideoListProps } from './types';

/**
 * Video list component with reordering and management controls
 */
export const VideoList: React.FC<VideoListProps> = ({
  files,
  isProcessing,
  onRemove,
  onMoveUp,
  onMoveDown,
  onReplace
}) => {
  // Memoize video preview URLs to prevent recreation on every render
  const videoPreviewUrls = React.useMemo(() => {
    return files.map(file => URL.createObjectURL(file));
  }, [files]);
  
  // Cleanup URLs on unmount or file change
  React.useEffect(() => {
    return () => {
      videoPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [videoPreviewUrls]);
  
  if (files.length === 0) {
    return null;
  }
  
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{TABLE_CONFIG.COLUMNS.PREVIEW}</TableCell>
            <TableCell>{TABLE_CONFIG.COLUMNS.FILENAME}</TableCell>
            <TableCell align="center">{TABLE_CONFIG.COLUMNS.ACTIONS}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, idx) => (
            <TableRow key={`${file.name}-${idx}`}>
              <TableCell>
                <video
                  src={videoPreviewUrls[idx]}
                  style={{ 
                    width: UI_CONFIG.VIDEO_PREVIEW_WIDTH, 
                    height: UI_CONFIG.VIDEO_PREVIEW_HEIGHT, 
                    background: '#000' 
                  }}
                  controls={false}
                  muted
                  preload="metadata"
                />
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="caption">
                  {file.name}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                <IconButton 
                  color="primary" 
                  onClick={() => onMoveUp(idx)} 
                  title="Move up" 
                  disabled={idx === 0 || isProcessing}
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton 
                  color="secondary" 
                  onClick={() => onMoveDown(idx)} 
                  title="Move down" 
                  disabled={idx === files.length - 1 || isProcessing}
                >
                  <ArrowDownwardIcon />
                </IconButton>
                <IconButton 
                  color="warning" 
                  onClick={() => onReplace(idx)} 
                  title="Replace video" 
                  disabled={isProcessing}
                >
                  <SwapHorizIcon />
                </IconButton>
                <IconButton 
                  color="error" 
                  onClick={() => onRemove(idx)} 
                  title="Delete video" 
                  disabled={isProcessing}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {files.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body2" color="text.secondary">
                  {TABLE_CONFIG.EMPTY_MESSAGE}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
