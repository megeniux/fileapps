import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';

// MUI Components
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Local Imports
import { useVideoCompression } from './useVideoCompression';
import FileUploadArea from './FileUploadArea';
import CompressionSettings from './CompressionSettings';
import ProgressDisplay from './ProgressDisplay';

function VideoCompression() {
  const {
    file,
    crf,
    preset,
    isProcessing,
    progress,
    status,
    downloadUrl,
    downloadSize,
    consoleLogs,
    errorMsg,
    previewUrl,
    isDragActive,
    totalDuration,
    fileInputRef,
    handleFileChange,
    handleLoadedMetadata,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveFile,
    handleCompress: handleProceed,
    handleStop,
    handleReset,
    handleDownload,
    handleCrfChange: setCrf,
    handlePresetChange: setPreset,
  } = useVideoCompression();

  const totalDurationRef = useRef<number>(totalDuration);

  return (
    <>
      <Helmet>
        <title>Compress Videos Online For Free | {APP_INFO.name}</title>
        <meta name="description"
          property='og:description'
          content="Reduce video file size without quality loss using local browser processing. Adjust CRF, bitrate & resolution — private, fast & watermark‑free."
        />
        <meta property="og:title" content={`Compress Videos Online For Free | ${APP_INFO.name}`} />
        <meta property="og:description" content="Compress videos locally in your browser. Reduce file size while maintaining quality." />
  <meta property="og:image" content="/images/branding/logo-small.svg" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/compress" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/video/compress" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Compress Videos Online </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Reduce video file size without quality loss using local browser processing. Adjust CRF, bitrate & resolution — private, fast & watermark‑free. </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }}>
                <img src="/images/landing/video-compression-hero.jpg" alt="Video Compression" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%' }} />
              </Grid>
            </Grid>

            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              isDragActive={isDragActive}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onLoadedMetadata={handleLoadedMetadata}
              fileInputRef={fileInputRef}
            />

            {/* Controls */}
            {file && !isProcessing && (
              <CompressionSettings
                crf={crf}
                preset={preset}
                totalDuration={totalDurationRef.current}
                isProcessing={isProcessing}
                onCrfChange={setCrf}
                onPresetChange={setPreset}
              />
            )}
          </CardContent>

          <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={handleProceed} disabled={!file || isProcessing}>
              {isProcessing ? 'Compressing' : 'Compress'}
            </Button>
            {/* Reset button only visible when not processing */}
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            )}
            {isProcessing && (
              <Button variant="contained" color="error" onClick={handleStop}>
                Stop
              </Button>
            )}
            {downloadUrl && downloadSize !== null && (
              <Button variant="contained" color="success" onClick={handleDownload}>
                Download ({formatBytes(downloadSize)})
              </Button>
            )}
          </CardActions>

          <ProgressDisplay
            isProcessing={isProcessing}
            progress={progress}
            status={status}
            consoleLogs={consoleLogs}
          />
        </Card>
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
      </Container>
    </>
  );
}

export default VideoCompression;
