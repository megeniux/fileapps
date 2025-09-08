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
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

// Components and utilities from VideoResize folder
import FileUploadArea from './VideoResize/FileUploadArea';
import ResizeSettings from './VideoResize/ResizeSettings';
import ProgressDisplay from './VideoResize/ProgressDisplay';
import { useVideoResizer } from './VideoResize/useVideoResizer';

function VideoResize() {
  const {
    // Refs
    videoRef,
    fileInputRef,
    
    // State
    file,
    previewUrl,
    width,
    height,
    resolutionRatio,
    resizeMode,
    fps,
    errorMsg,
    warningMsg,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    isDragActive,
    
    // Event handlers
    handleFileChange,
    handleRemoveFile,
    handleLoadedMetadata,
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleResizeModeChange,
    handleFpsChange,
    handleReset,
    handleDownload,
    
    // Drag handlers
    onDragOver,
    onDragLeave,
    onDrop,
    
    // Processing
    processVideo,
    stopProcessing,
  } = useVideoResizer();

  return (
    <>
      <Helmet>
        <title>Video Resizer Online Free – Change Resolution & Aspect Ratio</title>
        <meta name="description" content="Resize videos to custom dimensions or aspect ratios (16:9, 4:3, 1:1) for social media. Change resolution privately in your browser." />
        <meta name="keywords" content="resize video online free, change video resolution, video aspect ratio changer, resize mp4 online, video resizer tool, scale video online, resize video for social media" />
        <meta property="og:title" content="Free Online Video Resizer – Fast, Private & No Watermark" />
        <meta property="og:description" content="Resize videos to custom resolutions and aspect ratios in your browser." />
        <meta property="og:image" content="/images/landing/video-resizer-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/resize" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="https://fileapps.click/tools/video/resize" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}

        <Card sx={{ p: 1.5 }} elevation={3}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <AspectRatioIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Video Resizer
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Resize videos to custom dimensions or aspect ratios (16:9, 4:3, 1:1) for social media. Change resolution privately in your browser.
            </Typography>

            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              videoRef={videoRef}
              fileInputRef={fileInputRef}
              isDragActive={isDragActive}
              width={width}
              height={height}
              resizeMode={resizeMode}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
              onLoadedMetadata={handleLoadedMetadata}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            />

            {file && (
              <ResizeSettings
                width={width}
                height={height}
                resolutionRatio={resolutionRatio}
                resizeMode={resizeMode}
                fps={fps}
                onWidthChange={resolutionRatio === 'custom' ? (e) => handleWidthChange(e) : handleWidthChange}
                onHeightChange={resolutionRatio === 'custom' ? (e) => handleHeightChange(e) : handleHeightChange}
                onRatioChange={handleRatioChange}
                onResizeModeChange={handleResizeModeChange}
                onFpsChange={handleFpsChange}
                onReset={handleReset}
              />
            )}
          </CardContent>

          <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={processVideo} disabled={isProcessing || !file}>
              {isProcessing ? 'Resizing' : 'Resize'}
            </Button>
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            )}
            {isProcessing && (
              <Button color="error" variant="contained" onClick={stopProcessing}>
                Stop
              </Button>
            )}
            {downloadUrl && downloadSize !== null && (
              <Button color="success" variant="contained" onClick={handleDownload}>
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

          {warningMsg && (
            <Alert severity="warning" sx={{ mt: 2, fontSize: '0.875rem' }}>
              {warningMsg}
            </Alert>
          )}
        </Card>
      </Container>
    </>
  );
}

export default VideoResize;