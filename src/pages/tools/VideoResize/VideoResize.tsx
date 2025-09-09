import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';

// MUI
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';

// Local imports
import FileUploadArea from './FileUploadArea';
import ResizeSettings from './ResizeSettings';
import ProgressDisplay from './ProgressDisplay';
import { useVideoResizer } from './useVideoResizer';

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
        <title>Resize Video Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Resize videos to custom dimensions or aspect ratios (16:9, 4:3, 1:1) for social media. Change resolution privately in your browser."
        />
        <meta property="og:title" content={`Resize Video Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/video-resizer-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/resize" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/video/resize" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>

        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
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
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
      </Container>
    </>
  );
}

export default VideoResize;