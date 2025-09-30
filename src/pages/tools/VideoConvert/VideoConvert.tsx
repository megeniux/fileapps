import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';
import { styled } from '@mui/material/styles';

// MUI imports
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// Component imports
import { useVideoConverter } from './useVideoConverter';
import FileUploadArea from './FileUploadArea';
import ConversionSettings from './ConversionSettings';
import ProgressDisplay from './ProgressDisplay';
import InfoPopovers from './InfoPopovers';

function VideoConvert() {
  const {
    // State
    file,
    previewUrl,
    outputFormat,
    videoCodec,
    audioCodec,
    width,
    height,
    fps,
    crf,
    preset,
    audioBitrate,
    resolutionRatio,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    crfAnchor,
    presetAnchor,
    isDragActive,

    // Refs
    videoRef,
    fileInputRef,

    // Event handlers
    handleFileChange,
    handleRemoveFile,
    handleLoadedMetadata,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDownload,
    handleCrfInfoClick,
    handleCrfInfoClose,
    handlePresetInfoClick,
    handlePresetInfoClose,
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleFormatChange,
    handleReset,
    handleVideoCodecChange,
    handleAudioCodecChange,
    handleFpsChange,
    handleCrfChange,
    handlePresetChange,
    handleAudioBitrateChange,

    // Processing
    processVideo,
    stopProcessing,
  } = useVideoConverter();

  return (
    <>
      <Helmet>
        <title>Convert Video Online For Free | {APP_INFO.name}</title>
        <meta name="description" property="og:description" content="Convert Video to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta property="og:title" content={`Convert Video Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/convert" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Convert Video Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Convert Video to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta name="twitter:image" content="/images/branding/logo-small.svg" />
        <link rel="canonical" href="/tools/video/convert" />
      </Helmet>

      <Root maxWidth="lg">
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Convert Video Online For Free </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Easily convert your audio and video file to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free. </Typography>
              </Grid>
              <Grid container size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <img src="/images/landing/video-convert-hero.jpg" alt="Video Convert" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%', maxHeight: 300 }} />
              </Grid>
            </Grid>
            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              videoRef={videoRef}
              fileInputRef={fileInputRef}
              isDragActive={isDragActive}
              isProcessing={isProcessing}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
              onLoadedMetadata={handleLoadedMetadata}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            {file && (
              <ConversionSettings
                outputFormat={outputFormat}
                videoCodec={videoCodec}
                audioCodec={audioCodec}
                width={width}
                height={height}
                fps={fps}
                crf={crf}
                preset={preset}
                audioBitrate={audioBitrate}
                resolutionRatio={resolutionRatio}
                onFormatChange={handleFormatChange}
                onVideoCodecChange={handleVideoCodecChange}
                onAudioCodecChange={handleAudioCodecChange}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                onFpsChange={handleFpsChange}
                onCrfChange={handleCrfChange}
                onPresetChange={handlePresetChange}
                onAudioBitrateChange={handleAudioBitrateChange}
                onRatioChange={handleRatioChange}
                onCrfInfoClick={handleCrfInfoClick}
                onPresetInfoClick={handlePresetInfoClick}
              />
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

          {isProcessing && (<ProgressDisplay progress={progress} status={status} consoleLogs={consoleLogs} />)}
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Card>
        <InfoPopovers
          crfAnchor={crfAnchor}
          presetAnchor={presetAnchor}
          onCrfInfoClose={handleCrfInfoClose}
          onPresetInfoClose={handlePresetInfoClose}
        />
      </Root>
    </>
  );
}

// Styled components
const Root = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

export default VideoConvert;