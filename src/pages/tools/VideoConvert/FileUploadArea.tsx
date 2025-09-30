import React from 'react';
import { formatBytes } from '../../../helpers';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploadAreaProps {
  file: File | null;
  previewUrl: string | null;
  isDragActive: boolean;
  isProcessing: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onLoadedMetadata: () => void;
}

export default function FileUploadArea({
  file,
  previewUrl,
  isDragActive,
  isProcessing,
  onFileChange,
  onRemoveFile,
  onDragOver,
  onDragLeave,
  onDrop,
  videoRef,
  fileInputRef,
  onLoadedMetadata,
}: FileUploadAreaProps) {
  return (
    <>
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
        height={220}
        borderRadius={1}
        bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
        border={isDragActive ? theme => `2px dashed ${theme.palette.primary.main}` : theme => `2px dashed ${theme.palette.divider}`}
        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
      >
        {!file ? (
          <Box textAlign="center">
            <CloudUploadIcon sx={{ fontSize: '2.5rem', mb: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              Drag & drop a video or audio file here<br />or<br />Click to select
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Supported: MP4, MOV, AVI, MKV, MP3, WAV, and more
            </Typography>
          </Box>
        ) : (
          <Box textAlign="center" width="100%">
            {file.type.startsWith('video/') ? (
              <video
                ref={videoRef}
                src={previewUrl || undefined}
                controls
                style={{ maxWidth: '100%', maxHeight: 220, background: '#000', position: 'relative', zIndex: 10 }}
                onLoadedMetadata={onLoadedMetadata}
              />
            ) : (
              <audio
                src={previewUrl || undefined}
                controls
                style={{ width: '100%', maxWidth: 500 }}
              />
            )}
          </Box>
        )}
        <input
          ref={fileInputRef}
          accept="video/*,audio/*"
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
          id="video-file-input"
          type="file"
          onChange={onFileChange}
          tabIndex={-1}
        />
      </Box>
      {/* Filename and remove button */}
      {file && (
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="body2" noWrap>
            {file.name} ({formatBytes(file.size)})
          </Typography>
          <IconButton color='error' onClick={onRemoveFile} sx={{ ml: 1 }} disabled={isProcessing}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      )}
    </>
  );
}
