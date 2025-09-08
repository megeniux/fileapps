import { Helmet } from 'react-helmet-async';
import { formatBytes } from '../../helpers';

// MUI
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// MUI Icons
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Global Components
import PerformanceInfoDialog from '../../components/PerformanceInfoDialog';

// Components and utilities from VideoConvert folder
import FileUploadArea from './VideoConvert/FileUploadArea';
import ConversionSettings from './VideoConvert/ConversionSettings';
import ProgressDisplay from './VideoConvert/ProgressDisplay';
import InfoPopovers from './VideoConvert/InfoPopovers';
import { useVideoConverter } from './VideoConvert/useVideoConverter';

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
    handlePerformanceDialogClose,
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
        <title>Video Converter Online Free – Convert MP4, MOV, MKV, AVI</title>
        <meta name="description" content="Free online video converter: convert MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta name="keywords" content="convert video online free, convert video to mp4, free online video converter, video format converter, change video resolution online, convert mov to mp4 free, convert mkv to mp4 online, video codec converter online" />
        <meta property="og:title" content="Free Online Video Converter – Fast, Private & No Watermark" />
        <meta property="og:description" content="Convert video formats (MP4, MOV, MKV, AVI, WebM) in your browser. Customize resolution, codec, bitrate & FPS." />
        <meta property="og:image" content="/images/landing/video-convert-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/convert" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/convert" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}

        <Card sx={{ p: 1.5 }}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <SwapHorizIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Video Converter
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Convert your videos to different formats with custom settings. All processing happens locally in your browser.
            </Typography>

            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              videoRef={videoRef}
              fileInputRef={fileInputRef}
              isDragActive={isDragActive}
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

          {isProcessing && (
            <ProgressDisplay
              progress={progress}
              status={status}
              consoleLogs={consoleLogs}
            />
          )}
        </Card>

        <InfoPopovers
          crfAnchor={crfAnchor}
          presetAnchor={presetAnchor}
          onCrfInfoClose={handleCrfInfoClose}
          onPresetInfoClose={handlePresetInfoClose}
        />

        <PerformanceInfoDialog
          open={false}
          onClose={handlePerformanceDialogClose}
        />
      </Container>
    </>
  );
}

export default VideoConvert;