import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import type { VideoFile } from './types';

interface FileUploadAreaProps {
  videoFile: VideoFile | null;
  isDragActive: boolean;
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  videoFile,
  isDragActive,
  onDragOver,
  onDragLeave,
  onDrop,
  onInputChange,
  onRemoveFile,
  inputRef,
  videoRef
}) => {
  return (
    <>
      {/* Main Upload/Preview Area */}
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
        height={300}
        borderRadius={1}
        bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
        border={isDragActive ? theme => `2px dashed ${theme.palette.primary.main}` : theme => `2px dashed ${theme.palette.divider}`}
        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
      >
        {!videoFile ? (
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
              ref={videoRef}
              src={videoFile.previewUrl}
              controls
              style={{ 
                maxWidth: '100%', 
                maxHeight: 220, 
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
          id="burn-caption-video-input"
          type="file"
          onChange={onInputChange}
          tabIndex={-1}
        />
      </Box>

      {/* Filename and remove button */}
      {videoFile && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="body2" noWrap>
            {videoFile.file.name}
          </Typography>
          <IconButton size="small" color="error" onClick={onRemoveFile} sx={{ ml: 1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default FileUploadArea;
