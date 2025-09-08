import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type Props = {
  files: File[];
  isDragActive: boolean;
  isProcessing: boolean;
  onFilesAdd: (f: File[]) => void;
  onAddClick: () => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export default function FileUploadArea({ files, isDragActive, isProcessing, onFilesAdd, onAddClick, onDragEnter, onDragLeave, onDragOver, onDrop, fileInputRef }: Props) {
  return (
    <Box
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height={files.length === 0 ? 220 : 80}
      borderRadius={1}
      bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
      border={isDragActive ? (theme: any) => `2px dashed ${theme.palette.primary.main}` : (theme: any) => `2px dashed ${theme.palette.divider}`}
      sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
    >
      {files.length === 0 ? (
        <Box textAlign="center">
          <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
          <Typography variant="subtitle2" gutterBottom>
            Drag & drop audio files here<br />or<br />Click to add
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Supported: MP3, WAV, AAC, FLAC, OGG, and more
          </Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          disabled={isProcessing}
          sx={{ mt: 1 }}
        >
          Add More Audios
        </Button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        style={{ width: '100%', height: '100%', top: 0, opacity: 0, position: 'absolute' }}
        onChange={(e) => { if (e.target.files) onFilesAdd(Array.from(e.target.files)); }}
        tabIndex={-1}
      />
    </Box>
  );
}
