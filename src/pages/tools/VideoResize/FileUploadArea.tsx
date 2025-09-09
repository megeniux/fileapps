// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Types
import type { FileUploadAreaProps } from './types';

export default function FileUploadArea({
  file,
  previewUrl,
  videoRef,
  fileInputRef,
  isDragActive,
  width,
  height,
  resizeMode,
  onFileChange,
  onRemoveFile,
  onLoadedMetadata,
  onDragOver,
  onDragLeave,
  onDrop,
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
              src={previewUrl || undefined}
              controls
              style={{
                aspectRatio: `${width || 16} / ${height || 9}`,
                maxWidth: '100%',
                maxHeight: 220,
                background: '#000',
                objectFit: resizeMode === 'fit' ? 'contain'
                  : resizeMode === 'fill' ? 'cover'
                  : resizeMode === 'stretch' ? 'fill'
                  : 'contain'
              }}
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
            {file.name}
          </Typography>
          <IconButton color="error" onClick={onRemoveFile}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
}
