import { useRef } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

// MUI Theme
import { useTheme } from '@mui/material/styles';

// Utils
import { formatBytes } from '../../../helpers';

interface FileUploadAreaProps {
  file: File | null;
  previewUrl: string | null;
  isDragActive: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onLoadedMetadata: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function FileUploadArea({
  file,
  previewUrl,
  isDragActive,
  onFileChange,
  onRemoveFile,
  onDragOver,
  onDragLeave,
  onDrop,
  onLoadedMetadata,
  fileInputRef
}: FileUploadAreaProps) {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

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
        border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
      >
        {!file ? (
          <Box textAlign="center">
            <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
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
              style={{ maxWidth: '100%', maxHeight: 220, background: '#000', position: 'relative', zIndex: 10 }}
              onLoadedMetadata={onLoadedMetadata}
            />
          </Box>
        )}
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
          <IconButton color='error' onClick={onRemoveFile} sx={{ ml: 1 }}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      )}
    </>
  );
}
