import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { formatBytes } from '../../../helpers';
import { FILE_CONFIG } from './constants';
import type { FileUploadAreaProps } from './types';

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  videoFile,
  previewUrl,
  isDragActive,
  onDragOver,
  onDragLeave,
  onDrop,
  onInputChange,
  onRemoveFile,
  inputRef,
  videoRef
}) => {
  const theme = useTheme();

  return (
    <>
      {/* Upload & Preview area */}
      <Box
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100%"
        height={FILE_CONFIG.MAX_HEIGHT}
        borderRadius={1}
        bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
        border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
      >
        {!videoFile ? (
          <Box textAlign="center">
            <CloudUploadIcon sx={{ fontSize: '2.5rem', mb: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              Drag & drop a video file here<br />or<br />Click to select
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Supported: MP4, MOV, AVI, MKV, and more
            </Typography>
          </Box>
        ) : (
          <Box textAlign="center" width="100%">
            <video
              ref={videoRef}
              src={previewUrl || undefined}
              controls
              style={{ 
                maxWidth: '100%', 
                maxHeight: FILE_CONFIG.MAX_HEIGHT, 
                background: '#000', 
                position: 'relative', 
                zIndex: 10 
              }}
            />
          </Box>
        )}
        <input
          ref={inputRef}
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
          id="video-playback-file-input"
          type="file"
          onChange={onInputChange}
          tabIndex={-1}
        />
      </Box>
      
      {/* Filename and remove button */}
      {videoFile && (
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="body2" noWrap>
            {videoFile.name} ({formatBytes(videoFile.size)})
          </Typography>
          <IconButton onClick={onRemoveFile} color="error" sx={{ ml: 1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default FileUploadArea;
