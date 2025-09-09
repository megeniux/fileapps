import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
  file: File | null;
  previewUrl: string | null;
  isDragActive: boolean;
  fileInputRef: React.RefObject<HTMLInputElement> | null | undefined;
  audioRef?: React.RefObject<HTMLAudioElement> | null;
  onInputChange: (file: File | null) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLAudioElement>) => void;
}

export default function FileUploadArea({
  file,
  previewUrl,
  isDragActive,
  fileInputRef,
  audioRef,
  onInputChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onLoadedMetadata
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files?.[0] ?? null;
    onInputChange(f);
  };

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
        border={isDragActive ? (theme) => `2px dashed ${theme.palette.info.main}` : (theme) => `2px dashed ${theme.palette.divider}`}
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
            <audio
              ref={audioRef || null}
              src={previewUrl || undefined}
              controls
              style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1000 }}
              onLoadedMetadata={onLoadedMetadata}
            />
          </Box>
        )}

        <input
          ref={fileInputRef as any}
          accept="audio/*"
          style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }}
          type="file"
          onChange={handleChange}
          tabIndex={-1}
        />
      </Box>
    </>
  );
}
