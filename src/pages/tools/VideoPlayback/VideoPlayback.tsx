import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';

// MUI imports
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

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
        <title>Change Video Speed Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Free online video playback speed editor. Change video speed from slow motion to time-lapse effects. Supports reverse playback and pitch correction."
        />
        <meta property="og:title" content={`Change Video Speed Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/video-playback-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video-playback" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/video-playback" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>
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

        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
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
