import { formatBytes } from '../../helpers';

// MUI imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

interface FileInfoDisplayProps {
  file: File;
  onRemove: () => void;
  additionalInfo?: React.ReactNode;
  size?: 'small' | 'medium';
  isProcessing?: boolean;
}

function FileInfoDisplay({ file, onRemove, additionalInfo, size = 'small', isProcessing = false }: FileInfoDisplayProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
      <Typography variant="body2" noWrap>
        {file.name} ({formatBytes(file.size)})
      </Typography>
      {additionalInfo && (
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {additionalInfo}
        </Typography>
      )}
      <IconButton onClick={onRemove} size={size} color="error" sx={{ ml: 1 }} disabled={isProcessing}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default FileInfoDisplay;
