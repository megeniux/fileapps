import { Helmet } from 'react-helmet-async';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Local
import { formatBytes } from '../../../helpers';
import { useAudioConverter } from './useAudioConverter';
import FileUploadArea from './FileUploadArea';
import FormatSelector from './FormatSelector';
import QualitySelector from './QualitySelector';
import ProgressDisplay from './ProgressDisplay';
import Button from '@mui/material/Button';

function AudioConvert() {
  const {
    // state
    file,
    previewUrl,
    outputFormat,
    outputQuality,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    isDragActive,
    // refs
    fileInputRef,
    audioRef,
    // handlers
    handleFileChange,
    removeFile,
    handleFormatChange,
    handleQualityChange,
    processVideo,
    stopProcessing,
    handleDownload,
    handleReset,
    onDragOver,
    onDragLeave,
    onDrop,
  } = useAudioConverter();

  return (
    <>
      <Helmet>
        <title>Audio Converter Online Free – Convert MP3, WAV, AAC, FLAC</title>
        <meta name="description" content="Convert MP3, WAV, AAC, FLAC, OGG, M4A locally in your browser. Choose bitrate (128k–320k) or lossless — private, fast & watermark‑free." />
        <meta name="keywords" content="convert audio online free, convert mp3 to wav, convert wav to mp3, free online audio converter, convert flac to mp3, convert m4a to mp3, audio format converter, convert audio files online" />
        <meta property="og:title" content="Free Online Audio Converter – Fast, Private & No Watermark" />
        <meta property="og:description" content="Convert audio (MP3, WAV, AAC, FLAC, OGG, M4A) in your browser. Choose bitrate or lossless." />
        <meta property="og:image" content="/images/landing/audio-convert-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/audio/convert" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="https://fileapps.click/tools/audio/convert" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 10 }}>
      <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <SwapHorizIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>Audio Converter</Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
            Convert MP3, WAV, AAC, FLAC, OGG, M4A locally in your browser. Choose bitrate (128k–320k) or lossless — no uploads, no signup, no watermark.
          </Typography>
          {/* Upload area (preserves UI/UX) */}
          <FileUploadArea
            file={file}
            previewUrl={previewUrl}
            audioRef={audioRef}
            inputRef={fileInputRef}
            isDragActive={isDragActive}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onInputChange={handleFileChange}
          />
          {/* Filename and remove button */}
          {file && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="body2" noWrap>
                {file.name} ({formatBytes(file.size)})
              </Typography>
              <IconButton onClick={removeFile} color="error" sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {/* Controls */}
          {file && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormatSelector value={outputFormat} onChange={handleFormatChange} disabled={isProcessing} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <QualitySelector outputFormat={outputFormat} value={outputQuality} onChange={handleQualityChange} disabled={isProcessing} />
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={processVideo} disabled={isProcessing || !file}>
            {isProcessing ? 'Converting' : 'Convert'}
          </Button>
          {!isProcessing && (
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          )}
          {isProcessing && (
            <Button color="error" variant='contained' onClick={stopProcessing} disabled={!isProcessing}>
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button color="success" variant='contained' onClick={handleDownload}>
              Download ({formatBytes(downloadSize)})
            </Button>
          )}
        </CardActions>

        <ProgressDisplay isProcessing={isProcessing} progress={progress} status={status} consoleLogs={consoleLogs} />
      </Card>
      {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
    </Container>
    </>
  );
}

export default AudioConvert;