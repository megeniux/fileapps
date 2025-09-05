import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UI_CONFIG } from './constants';
import type { SubtitleFile } from './types';

interface SubtitleUploadProps {
  subtitleFile: SubtitleFile | null;
  isProcessing: boolean;
  hasVideoFile: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SubtitleUpload: React.FC<SubtitleUploadProps> = ({
  subtitleFile,
  isProcessing,
  hasVideoFile,
  onInputChange,
  onRemoveFile,
  inputRef
}) => {
  return (
    <>
      {/* Subtitle Upload Section */}
      <Box 
        display={isProcessing ? "none" : "flex"} 
        alignItems="center" 
        justifyContent="center" 
        my={2}
      >
        <input
          ref={inputRef}
          accept=".srt,.vtt"
          style={{ display: 'none' }}
          id="burn-caption-subtitle-input"
          type="file"
          onChange={onInputChange}
        />
        <label htmlFor="burn-caption-subtitle-input">
          <Button 
            variant="contained" 
            component="span" 
            size="small" 
            disabled={isProcessing || !hasVideoFile}
          >
            {subtitleFile ? 'Replace Subtitle' : 'Upload Subtitle'}
          </Button>
        </label>
        
        {subtitleFile && (
          <>
            <Typography variant="body2" noWrap sx={{ ml: 2 }}>
              {subtitleFile.name}
            </Typography>
            <IconButton 
              size="small" 
              color="error" 
              onClick={onRemoveFile} 
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>

      {/* Font Info */}
      <Box 
        display={isProcessing ? "none" : "flex"} 
        alignItems="center" 
        justifyContent="center" 
        mb={2}
      >
        <Typography variant="caption" color="text.secondary">
          {UI_CONFIG.FONT_INFO_TEXT}
        </Typography>
      </Box>
    </>
  );
};

export default SubtitleUpload;
