/**
 * File Upload Area component for Video Trimmer
 * Following established patterns from VideoResize and VideoConvert
 */

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { UI_CONFIG } from './constants';
import type { FileUploadAreaProps } from './types';

/**
 * File upload area with drag & drop support
 */
export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  file,
  previewUrl,
  isDragActive,
  isProcessing,
  onFileSelect,
  onFileRemove,
  onLoadedMetadata,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      onFileSelect(event.target.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove();
  };
  
  return (
    <>
      {/* Upload Area */}
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
        height={UI_CONFIG.VIDEO_PREVIEW_HEIGHT}
        borderRadius={1}
        bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
        border={isDragActive ? theme => `2px dashed ${theme.palette.primary.main}` : theme => `2px dashed ${theme.palette.divider}`}
        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
      >
        {!file ? (
          <Box textAlign="center">
            <CloudUploadIcon sx={{ fontSize: '2.5rem', mb: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              Drag & drop a video file here<br/>or<br/>Click to select
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Supported: MP4, MOV, AVI, MKV, and more
            </Typography>
          </Box>
        ) : (
          <Box textAlign="center" width="100%">
            <video
              src={previewUrl || undefined}
              controls
              style={{ 
                maxWidth: '100%', 
                maxHeight: UI_CONFIG.VIDEO_PREVIEW_HEIGHT, 
                background: '#000', 
                position: 'relative', 
                zIndex: 10 
              }}
              onLoadedMetadata={onLoadedMetadata}
            />
          </Box>
        )}
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          accept="video/*"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            opacity: 0,
            cursor: 'pointer',
            zIndex: 2
          }}
          type="file"
          onChange={handleFileChange}
          tabIndex={-1}
        />
      </Box>
      
      {/* File name and remove button */}
      {file && (
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="body2" noWrap>
            {file.name}
          </Typography>
          <IconButton color="error" onClick={handleRemoveFile} sx={{ ml: 1 }} disabled={isProcessing}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};
