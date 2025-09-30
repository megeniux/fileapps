import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { styled } from '@mui/material/styles';

// MUI imports
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Component imports
import { useVideoPlayback } from './useVideoPlayback';
import FileUploadArea from './FileUploadArea';
import SpeedControls from './SpeedControls';
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
        <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video-playback" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Change Video Speed Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Free online video playback speed editor. Change video speed from slow motion to time-lapse effects. Supports reverse playback and pitch correction." />
        <meta name="twitter:image" content="/images/branding/logo-small.svg" />
        <link rel="canonical" href="https://fileapps.click/tools/video-playback" />
      </Helmet>

      <Root maxWidth="lg">
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
            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Change Video Speed and Playback </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Free online video playback speed editor. Change video speed from slow motion to time-lapse effects. Supports reverse playback and pitch correction. </Typography>
              </Grid>
              <Grid container size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <img src="/images/landing/video-playback-speed-hero.jpg" alt="Video Playback" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%', maxHeight: 300 }} />
              </Grid>
            </Grid>

            {/* File Upload Area */}
            <FileUploadArea
              videoFile={state.videoFile}
              previewUrl={state.previewUrl}
              isDragActive={state.isDragActive}
              isProcessing={state.processing.isProcessing}
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

          {/* Progress Display (inline) */}
          {state.processing.isProcessing && (
            <>
              <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
                <LinearProgress color='success' variant="determinate" value={state.processing.progress} />
                <Typography variant="body2" my={1}>
                  {`${state.processing.status} ${state.processing.progress.toFixed(1)}%`}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {state.consoleLogs.length > 0 ? state.consoleLogs[state.consoleLogs.length - 1] : ""}
                </Typography>
              </Box>
            </>
          )}
        </Card>
      </Root>
    </>
  );
}

// Styled components
const Root = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

export default VideoPlayback;
