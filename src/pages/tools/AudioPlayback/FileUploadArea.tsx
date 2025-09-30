import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTheme } from '@mui/material/styles';
import { formatBytes } from '../../../helpers';

type Props = {
  file: File | null;
  previewUrl: string | null;
  isDragActive: boolean;
  isProcessing: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onInputChange: (f: File | null) => void;
  onRemoveFile: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
};

export default function FileUploadArea(props: Props) {
  const theme = useTheme();
  const { file, previewUrl, isDragActive, isProcessing, onDragOver, onDragLeave, onDrop, onInputChange, onRemoveFile, inputRef, audioRef } = props;

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
          <CloudUploadIcon sx={{ fontSize: '2.5rem', mb: 1 }} />
          <Typography variant="subtitle2" gutterBottom>
            Drag & drop an audio file here<br />or<br />Click to select
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Supported: MP3, WAV, AAC, FLAC, OGG, and more
          </Typography>
        </Box>
      ) : (
        <Box textAlign="center" width="100%">
          <audio ref={audioRef} src={previewUrl || undefined} controls style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1000 }} />
        </Box>
      )}

      <input
        ref={inputRef}
        accept="audio/*"
        style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }}
        id="audio-playback-file-input"
        type="file"
        onChange={(e) => onInputChange(e.target.files?.[0] ?? null)}
        tabIndex={-1}
      />

      {file && (
        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <Typography variant="body2" noWrap>
            {file.name} ({formatBytes(file.size)})
          </Typography>
          <IconButton onClick={onRemoveFile} size="small" color="error" sx={{ ml: 1 }} disabled={isProcessing}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
