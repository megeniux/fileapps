/**
 * File Upload Area component for Video Merger
 * Following established patterns from VideoResize and VideoTrim
 */

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { UI_CONFIG } from './constants';
import type { FileUploadAreaProps } from './types';

/**
 * File upload area with drag & drop support for multiple files
 */
export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  files,
  isDragActive,
  isProcessing,
  onFilesAdd,
  onAddClick,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      onFilesAdd(selectedFiles);
    }
  };
  
  const handleAddMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the hidden input
    onAddClick();
  };
  
  return (
    <Box
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height={files.length === 0 ? UI_CONFIG.UPLOAD_AREA_HEIGHT_EMPTY : UI_CONFIG.UPLOAD_AREA_HEIGHT_WITH_FILES}
      borderRadius={1}
      bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
      border={isDragActive ? theme => `2px dashed ${theme.palette.primary.main}` : theme => `2px dashed ${theme.palette.divider}`}
      sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
    >
      {files.length === 0 ? (
        <Box textAlign="center">
          <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
          <Typography variant="subtitle2" gutterBottom>
            Drag & drop video files here<br />or<br />Click to add
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Supported: MP4, MOV, AVI, MKV, and more
          </Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddMoreClick}
          disabled={isProcessing}
          sx={{ mt: 1 }}
        >
          Add More Videos
        </Button>
      )}
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        multiple
        style={{ 
          width: '100%', 
          height: '100%', 
          top: 0, 
          opacity: 0, 
          position: 'absolute',
          cursor: 'pointer'
        }}
        onChange={handleFileChange}
        tabIndex={-1}
      />
    </Box>
  );
};
