import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

// MUI imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

// MUI Icons
import SubtitlesIcon from '@mui/icons-material/Subtitles';

// Local imports
import { useCaptionBurner } from './useCaptionBurner';
import FileUploadArea from './FileUploadArea';
import SubtitleUpload from './SubtitleUpload';
import StyleControls from './StyleControls';
import ProgressDisplay from './ProgressDisplay';
import { formatFileSize } from './utils';

function BurnCaption() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    state,
    removeVideoFile,
    removeSubtitleFile,
    onDragOver,
    onDragLeave,
    onDrop,
    onVideoInputChange,
    onSubtitleInputChange,
    updateFontSize,
    updateFontColor,
    updateOutlineColor,
    updateOutlineWidth,
    adjustFontSize,
    adjustOutlineWidth,
    burnCaptions,
    stopBurning,
    downloadBurnedVideo,
    canBurnCaptions,
    resetAll,
    clearError
  } = useCaptionBurner();

  const handleRemoveVideoFile = () => {
    removeVideoFile(fileInputRef);
  };

  const handleRemoveSubtitleFile = () => {
    removeSubtitleFile(subtitleInputRef);
  };

  const handleReset = () => {
    resetAll(fileInputRef, subtitleInputRef);
  };

  return (
    <>
      <Helmet>
        <title>Burn Captions into Video - Add Permanent Subtitles Online Free</title>
        <meta name="description" content="Free online tool to burn captions and subtitles permanently into video files. Supports SRT and VTT formats. Customize font, size, color, and position. No uploads required." />
        <meta name="keywords" content="burn captions, burn subtitles, add subtitles to video, hardcode subtitles, embed captions, subtitle editor, free video tools, SRT VTT" />
        <meta property="og:title" content="Burn Captions into Video - Add Permanent Subtitles Online Free" />
        <meta property="og:description" content="Free online tool to burn captions and subtitles permanently into video files. Supports SRT and VTT formats. Customize font, size, color, and position. No uploads required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/burn-caption" />
        <link rel="canonical" href="https://fileapps.click/tools/burn-caption" />
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {/* Error Alert */}
        {state.processing.errorMsg && (
          <Alert 
            severity="error" 
            sx={{ my: 2 }}
            onClose={clearError}
          >
            {state.processing.errorMsg}
          </Alert>
        )}
        
        <Card sx={{ p: 1.5 }} elevation={3}>
          <CardContent sx={{ p: 0 }}>
            {/* Header */}
            <Box display="flex" alignItems="center">
              <SubtitlesIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Burn Captions into Video
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            
            {/* Description */}
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Embed SRT/VTT subtitles permanently into video files. Customize font, size, color & position — private browser-based processing.
            </Typography>
            
            {/* File Upload Area */}
            <FileUploadArea
              videoFile={state.videoFile}
              isDragActive={state.isDragActive}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={onVideoInputChange}
              onRemoveFile={handleRemoveVideoFile}
              inputRef={fileInputRef}
              videoRef={videoRef}
            />
            
            {/* Subtitle Upload */}
            <SubtitleUpload
              subtitleFile={state.subtitleFile}
              isProcessing={state.processing.isProcessing}
              hasVideoFile={!!state.videoFile}
              onInputChange={onSubtitleInputChange}
              onRemoveFile={handleRemoveSubtitleFile}
              inputRef={subtitleInputRef}
            />
            
            {/* Style Controls */}
            {state.videoFile && state.subtitleFile && (
              <StyleControls
                styleOptions={state.styleOptions}
                isProcessing={state.processing.isProcessing}
                onFontSizeChange={updateFontSize}
                onFontColorChange={updateFontColor}
                onOutlineColorChange={updateOutlineColor}
                onOutlineWidthChange={updateOutlineWidth}
                onAdjustFontSize={adjustFontSize}
                onAdjustOutlineWidth={adjustOutlineWidth}
              />
            )}
          </CardContent>
          
          {/* Action Buttons */}
          <CardActions sx={{ 
            display: state.videoFile && state.subtitleFile ? 'flex' : 'none', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            pb: 0, 
            mt: 2, 
            gap: 1 
          }}>
            <Button 
              variant="contained" 
              onClick={burnCaptions} 
              disabled={!canBurnCaptions()} 
              size="small"
            >
              {state.processing.isProcessing ? 'Burning...' : 'Burn Caption'}
            </Button>
            
            {!state.processing.isProcessing && (
              <Button 
                variant="outlined" 
                onClick={handleReset} 
                size="small"
              >
                Reset
              </Button>
            )}
            
            {state.processing.isProcessing && (
              <Button 
                variant="contained" 
                color="error" 
                onClick={stopBurning} 
                size="small"
              >
                Stop
              </Button>
            )}
            
            {state.download.url && state.download.size !== null && (
              <Button 
                variant="contained" 
                color="success" 
                onClick={downloadBurnedVideo} 
                size="small"
              >
                Download ({formatFileSize(state.download.size)})
              </Button>
            )}
          </CardActions>
          
          {/* Progress Display */}
          <ProgressDisplay 
            processing={state.processing}
            consoleLogs={state.consoleLogs}
          />
        </Card>
      </Container>
    </>
  );
}

export default BurnCaption;
