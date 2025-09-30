import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';
import { styled } from '@mui/material/styles';

// MUI imports
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Component imports
import { useAudioPlayback } from './useAudioPlayback';
import FileUploadArea from './FileUploadArea';
import SpeedControls from './SpeedControls';
import ProgressDisplay from './ProgressDisplay';

function AudioPlayback() {
  const {
    file,
    previewUrl,
    speed,
    setSpeed,
    isReversed,
    setIsReversed,
    isProcessing,
    progress,
    status,
    errorMsg,
    downloadUrl,
    downloadSize,
    consoleLogs,
    isDragActive,
    fileInputRef,
    audioRef,
    onInputChange,
    onDragOver,
    onDragLeave,
    onDrop,
    removeFile,
    processSpeedAdjustment,
    stopSpeedAdjustment,
    downloadResult,
    canProcess,
    resetAll,
  } = useAudioPlayback();

  const handleRemoveFile = () => removeFile();
  const handleReset = () => resetAll(fileInputRef);

  const handleSpeedChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') setSpeed(value);
  };
  const handleReverseToggle = (e: React.ChangeEvent<HTMLInputElement>) => setIsReversed(e.target.checked);
  const handleAdjustSpeed = (delta: number) => setSpeed(prev => Number((prev + delta).toFixed(1)));

  return (
    <>
      <Helmet>
        <title>Change Audio Speed Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Adjust audio speed online. Speed up or slow down audio playback with pitch correction. Free, fast & secure."
        />
        <meta property="og:title" content={`Change Audio Speed Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://fileapps.click/tools/audio/playback`} />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Change Audio Speed Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Adjust audio speed online. Speed up or slow down audio playback with pitch correction. Free, fast & secure." />
        <meta name="twitter:image" content="/images/branding/logo-small.svg" />
        <link rel="canonical" href={`https://fileapps.click/tools/audio/playback`} />
      </Helmet>

      <Root maxWidth="lg">
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Change Audio Speed and Playback </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Adjust audio speed online. Speed up or slow down audio playback with pitch correction. Free, fast & secure. </Typography>
              </Grid>
              <Grid container size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <img src="/images/landing/audio-speed-editor-hero.jpg" alt="Audio Playback" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%', maxHeight: 300 }} />
              </Grid>
            </Grid>

            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              isDragActive={isDragActive}
              isProcessing={isProcessing}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={onInputChange}
              onRemoveFile={handleRemoveFile}
              inputRef={fileInputRef}
              audioRef={audioRef}
            />

            {file && (
              <SpeedControls
                speed={speed}
                isReversed={isReversed}
                isProcessing={isProcessing}
                onSpeedChange={handleSpeedChange}
                onReverseToggle={handleReverseToggle}
                onAdjustSpeed={handleAdjustSpeed}
              />
            )}
          </CardContent>

          <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={processSpeedAdjustment} disabled={!canProcess()}>
              {isProcessing ? 'Processing' : 'Process'}
            </Button>
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>Reset</Button>
            )}
            {isProcessing && (
              <Button color="error" variant='contained' onClick={stopSpeedAdjustment}>Stop</Button>
            )}
            {downloadUrl && downloadSize !== null && (
              <Button color="success" variant='contained' onClick={downloadResult}>Download ({formatBytes(downloadSize)})</Button>
            )}
          </CardActions>

          <ProgressDisplay
            processing={{ isProcessing, progress, status, errorMsg }}
            consoleLogs={consoleLogs}
          />
        </Card>
        {errorMsg && (
          <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>
        )}
      </Root>
    </>
  );
}

// Styled components
const Root = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

export default AudioPlayback;
