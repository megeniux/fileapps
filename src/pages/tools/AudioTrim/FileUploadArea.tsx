import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type Props = {
  file: File | null;
  previewUrl: string | null;
  isDragActive: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
  onLoadedMetadata?: () => void;
};

export default function FileUploadArea({ file, previewUrl, isDragActive, onDragOver, onDragLeave, onDrop, onInputChange, inputRef, audioRef, onLoadedMetadata }: Props) {
  const theme = useTheme();

  return (
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
      border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
      sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
    >
      {!file ? (
        <Box textAlign="center">
          <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
          <Typography variant="subtitle2" gutterBottom>
            Drag & drop an audio file here<br />or<br />Click to select
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Supported: MP3, WAV, AAC, FLAC, OGG, and more
          </Typography>
        </Box>
      ) : (
        <Box textAlign="center" width="100%">
          <audio ref={audioRef} src={previewUrl || undefined} controls onLoadedMetadata={onLoadedMetadata} style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1000 }} />
        </Box>
      )}
      <input
        ref={inputRef}
        accept="audio/*"
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
        id="audio-trim-file-input"
        type="file"
        onChange={onInputChange}
        tabIndex={-1}
      />
    </Box>
  );
}
