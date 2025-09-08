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
import SpeedIcon from '@mui/icons-material/Speed';

// Local imports
import { useVideoPlayback } from './useVideoPlayback';
import FileUploadArea from './FileUploadArea';
import SpeedControls from './SpeedControls';
import ProgressDisplay from './ProgressDisplay';
import { formatFileSize } from './utils';


function VideoPlayback() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    state,
    onDragOver,
    onDragLeave,
    onDrop,
    onInputChange,
    removeVideoFile,
    updateSpeed,
    updateReverse,
    adjustSpeed,
    processSpeedAdjustment,
    stopSpeedAdjustment,
    downloadVideo,
    openPerformanceDialog,
    closePerformanceDialog,
    canProcess,
    resetAll,
    clearError
  } = useVideoPlayback();

  const handleRemoveFile = () => {
    removeVideoFile(fileInputRef);
  };

  const handleReset = () => {
    resetAll(fileInputRef);
  };

  return (
    <>
      <Helmet>
        <title>Video Playback Speed Editor - Change Video Speed Online Free</title>
        <meta name="description" content="Free online video playback speed editor. Change video speed from slow motion to time-lapse effects. Supports reverse playback and pitch correction. No watermarks, browser-based." />
        <meta name="keywords" content="video speed editor, playback speed, slow motion, time lapse, video speed changer, reverse video, pitch correction, free video tools" />
        <meta property="og:title" content="Video Playback Speed Editor - Change Video Speed Online Free" />
        <meta property="og:description" content="Free online video playback speed editor. Change video speed from slow motion to time-lapse effects. Supports reverse playback and pitch correction. No watermarks, browser-based." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video-playback" />
        <link rel="canonical" href="https://fileapps.click/tools/video-playback" />
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
              <SpeedIcon color="secondary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Video Playback Speed Editor
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            
            {/* Description */}
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Change video speed from -20x (reverse) to +20x with pitch correction. Slow motion & time-lapse effects — no watermark, browser-based.
            </Typography>
            
            {/* File Upload Area */}
            <FileUploadArea
              videoFile={state.videoFile}
              previewUrl={state.previewUrl}
              isDragActive={state.isDragActive}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={onInputChange}
              onRemoveFile={handleRemoveFile}
              inputRef={fileInputRef}
              videoRef={videoRef}
            />
            
            {/* Speed Controls */}
            {state.videoFile && (
              <SpeedControls
                speedOptions={state.speedOptions}
                isProcessing={state.processing.isProcessing}
                onSpeedChange={updateSpeed}
                onReverseToggle={updateReverse}
                onAdjustSpeed={adjustSpeed}
              />
            )}
          </CardContent>
          
          {/* Action Buttons */}
          <CardActions sx={{ 
            display: state.videoFile ? 'flex' : 'none', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            pb: 0, 
            mt: 2, 
            gap: 1 
          }}>
            <Button 
              variant="contained" 
              onClick={processSpeedAdjustment} 
              disabled={!canProcess()}
            >
              {state.processing.isProcessing ? 'Processing' : 'Process'}
            </Button>
            
            {!state.processing.isProcessing && (
              <Button 
                variant="outlined" 
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
            
            {state.processing.isProcessing && (
              <Button 
                color="error" 
                variant='contained' 
                onClick={stopSpeedAdjustment}
              >
                Stop
              </Button>
            )}
            
            {state.download.url && state.download.size !== null && (
              <Button 
                color="success" 
                variant='contained' 
                onClick={downloadVideo}
              >
                Download ({formatFileSize(state.download.size)})
              </Button>
            )}
          </CardActions>
          
          {/* Progress Display */}
          <ProgressDisplay 
            processing={state.processing}
            consoleLogs={state.consoleLogs}
            isPerformanceDialogOpen={state.isPerformanceDialogOpen}
            onPerformanceDialogOpen={openPerformanceDialog}
            onPerformanceDialogClose={closePerformanceDialog}
          />
        </Card>
      </Container>
    </>
  );
}

export default VideoPlayback;
