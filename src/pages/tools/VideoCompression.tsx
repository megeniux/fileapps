import { useRef } from 'react';
import { formatBytes } from '../../helpers';
import { Helmet } from 'react-helmet-async';

// MUI Components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

// MUI Icons
import CompressIcon from '@mui/icons-material/Compress';

import { useVideoCompression } from './VideoCompression/useVideoCompression';
import FileUploadArea from './VideoCompression/FileUploadArea';
import CompressionSettings from './VideoCompression/CompressionSettings';
import ProgressDisplay from './VideoCompression/ProgressDisplay';

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
        <title>Video Compressor Online Free – Reduce File Size Without Quality Loss</title>
        <meta name="description" content="Reduce video file size without quality loss using local browser processing. Adjust CRF, bitrate & resolution — private, fast & watermark‑free." />
        <meta name="keywords" content="compress video online free, reduce video file size, video compressor online, compress mp4 online, shrink video file size, video compression tool, compress video without losing quality" />
        <meta property="og:title" content="Free Online Video Compressor – Fast, Private & No Watermark" />
        <meta property="og:description" content="Compress videos locally in your browser. Reduce file size while maintaining quality." />
        <meta property="og:image" content="/images/landing/video-compression-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/compress" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="https://fileapps.click/tools/video/compress" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
      {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
      <Card sx={{ p: 1.5 }}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <CompressIcon color="secondary" fontSize='small' sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>Video Compressor</Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
            Reduce video file size without quality loss using local browser processing. Adjust CRF, bitrate & resolution — no uploads, no signup required.
          </Typography>
          
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

        <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
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
    </Container>
    </>
  );
}

export default VideoCompression;
