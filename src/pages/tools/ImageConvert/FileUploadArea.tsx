// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// MUI Theme
import { useTheme } from '@mui/material/styles';

// MUI Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploadAreaProps {
  file: File | null;
  isDragActive: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function FileUploadArea({
  file,
  isDragActive,
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef
}: FileUploadAreaProps) {
  const theme = useTheme();

  // Only show drag area when no file is selected
  if (file) {
    return null;
  }

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
      <Box textAlign="center">
        <CloudUploadIcon sx={{ fontSize: '2.5rem', mb: 1 }} />
        <Typography variant="subtitle2" gutterBottom>
          Drag & drop an image here<br />or<br />Click to select
        </Typography>
        <Typography color="text.secondary" variant="caption">
          Supported: JPG, PNG, WebP, GIF, and more
        </Typography>
      </Box>
      {/* Overlay file input */}
      <input
        ref={fileInputRef}
        accept="image/*"
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
        id="image-file-input"
        type="file"
        onChange={onFileChange}
        tabIndex={-1}
      />
    </Box>
  );
}
