import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';
import { styled } from '@mui/material/styles';

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

// Component imports
import { useAudioConverter } from './useAudioConverter';
import FileUploadArea from './FileUploadArea';
import FormatSelector from './FormatSelector';
import QualitySelector from './QualitySelector';
import ProgressDisplay from './ProgressDisplay';
import FileInfoDisplay from '../../../components/shared/FileInfoDisplay';

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
        <title>Convert Audio Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Convert to MP3, WAV, AAC, FLAC, OGG, M4A locally. Set bitrate or lossless — private, fast & watermark‑free."
        />
        <meta property="og:title" content={`Convert Audio Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/audio/convert" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Convert Audio Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Convert to MP3, WAV, AAC, FLAC, OGG, M4A locally. Set bitrate or lossless — private, fast & watermark‑free." />
        <meta name="twitter:image" content="/images/branding/logo-small.svg" />
        <link rel="canonical" href="https://fileapps.click/tools/audio/convert" />
      </Helmet>
      <Root maxWidth="lg">
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Convert Audio Online </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Convert to MP3, WAV, AAC, FLAC, OGG, M4A locally. Set bitrate or lossless — private, fast & watermark‑free. </Typography>
              </Grid>
              <Grid container size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <img src="/images/landing/audio-convert-hero.jpg" alt="Audio Convert" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%', maxHeight: 300 }} />
              </Grid>
            </Grid>
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
            {/* File information and remove button */}
            {file && <FileInfoDisplay file={file} onRemove={removeFile} isProcessing={isProcessing} />}
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
      </Root>
    </>
  );
}

// Styled components
const Root = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

export default AudioConvert;