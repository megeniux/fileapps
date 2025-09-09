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
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Local imports
import { useAudioExtractor } from './useAudioExtractor';
import FileUploadArea from './FileUploadArea';
import DurationSelector from './DurationSelector';
import { formatFileSize } from './utils';

function ExtractAudio() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    state,
    removeFile,
    handleVideoMetadataLoad,
    onDragOver,
    onDragLeave,
    onDrop,
    onInputChange,
    updateRange,
    adjustStartTime,
    adjustEndTime,
    extractAudio,
    stopExtraction,
    downloadExtractedAudio,
    canExtract,
    clearError
  } = useAudioExtractor();

  const handleRemoveFile = () => {
    removeFile(fileInputRef);
  };

  return (
    <>
      <Helmet>
        <title>Extract Audio from Video Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Extract audio from video files. Convert video to MP3, WAV, AAC, or FLAC audio formats. High-quality audio extraction."
        />
        <meta property="og:title" content={`Extract Audio from Video Online For Free | ${APP_INFO.name}`} />
    <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/extract-audio" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/extract-audio" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>

            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Extract Audio from Video Online </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Extract audio from video files. Convert video to MP3, WAV, AAC, or FLAC audio formats. High-quality audio extraction. </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }}>
                <img src="/images/landing/audio-extract-hero.jpg" alt="Extract Audio" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%' }} />
              </Grid>
            </Grid>

            {/* File Upload Area */}
            <FileUploadArea
              audioFile={state.audioFile}
              isDragActive={state.isDragActive}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={onInputChange}
              onRemoveFile={handleRemoveFile}
              onVideoMetadataLoad={handleVideoMetadataLoad}
              inputRef={fileInputRef}
              videoRef={videoRef}
            />

            {/* Duration Selector */}
            <DurationSelector
              audioFile={state.audioFile}
              range={state.range}
              isProcessing={state.processing.isProcessing}
              onRangeChange={updateRange}
              onAdjustStart={adjustStartTime}
              onAdjustEnd={adjustEndTime}
            />
          </CardContent>

          {/* Action Buttons */}
          <CardActions sx={{
            display: state.audioFile ? 'flex' : 'none',
            flexWrap: 'wrap',
            justifyContent: 'center',
            pb: 0,
            mt: 2,
            gap: 1
          }}>
            <Button
              variant="contained"
              onClick={extractAudio}
              disabled={!canExtract()}
              size="small"
            >
              {state.processing.isProcessing ? 'Extracting' : 'Extract Audio'}
            </Button>

            {state.processing.isProcessing && (
              <Button
                variant="contained"
                color="error"
                onClick={stopExtraction}
                size="small"
              >
                Stop
              </Button>
            )}

            {state.download.url && state.download.size !== null && (
              <Button
                variant="contained"
                color="success"
                onClick={downloadExtractedAudio}
                size="small"
              >
                Download ({formatFileSize(state.download.size)})
              </Button>
            )}
          </CardActions>

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
        </Card>
      </Container>
    </>
  );
}

export default ExtractAudio;
