// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

// MUI Theme
import { useTheme } from '@mui/material/styles';

// Utils
import { formatBytes } from '../../../helpers';

interface FileDisplayProps {
  file: File;
  onRemoveFile: () => void;
}

export default function FileDisplay({ file, onRemoveFile }: FileDisplayProps) {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 2,
        p: 2,
        backgroundColor: theme.palette.grey[100],
        borderRadius: 1,
        border: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" color="text.primary" noWrap>
          {file.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatBytes(file.size)}
        </Typography>
      </Box>
      <IconButton 
        onClick={onRemoveFile} 
        color="error" 
        size="small"
        sx={{ ml: 1 }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
