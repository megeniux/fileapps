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

// Local imports
import { useCaptionBurner } from './useCaptionBurner';
import FileUploadArea from './FileUploadArea';
import SubtitleUpload from './SubtitleUpload';
import StyleControls from './StyleControls';
import ProgressDisplay from './ProgressDisplay';
import { formatFileSize } from './utils';

function BurnCaption() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    state,
    removeVideoFile,
    removeSubtitleFile,
    onDragOver,
    onDragLeave,
    onDrop,
    onVideoInputChange,
    onSubtitleInputChange,
    updateFontSize,
    updateFontColor,
    updateOutlineColor,
    updateOutlineWidth,
    adjustFontSize,
    adjustOutlineWidth,
    burnCaptions,
    stopBurning,
    downloadBurnedVideo,
    canBurnCaptions,
    resetAll,
    clearError
  } = useCaptionBurner();

  const handleRemoveVideoFile = () => {
    removeVideoFile(fileInputRef);
  };

  const handleRemoveSubtitleFile = () => {
    removeSubtitleFile(subtitleInputRef);
  };

  const handleReset = () => {
    resetAll(fileInputRef, subtitleInputRef);
  };

  return (
    <>
      <Helmet>
        <title>Burn Captions Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Add subtitles to videos. Burn captions directly into the video. Supports SRT and VTT formats. Customize font, size, color, and position. No uploads required."
        />
        <meta property="og:title" content={`Burn Captions Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/burn-caption-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/burn-caption" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/burn-caption" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>
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

        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            {/* File Upload Area */}
            <FileUploadArea
              videoFile={state.videoFile}
              isDragActive={state.isDragActive}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={onVideoInputChange}
              onRemoveFile={handleRemoveVideoFile}
              inputRef={fileInputRef}
              videoRef={videoRef}
            />

            {/* Subtitle Upload */}
            <SubtitleUpload
              subtitleFile={state.subtitleFile}
              isProcessing={state.processing.isProcessing}
              hasVideoFile={!!state.videoFile}
              onInputChange={onSubtitleInputChange}
              onRemoveFile={handleRemoveSubtitleFile}
              inputRef={subtitleInputRef}
            />

            {/* Style Controls */}
            {state.videoFile && state.subtitleFile && (
              <StyleControls
                styleOptions={state.styleOptions}
                isProcessing={state.processing.isProcessing}
                onFontSizeChange={updateFontSize}
                onFontColorChange={updateFontColor}
                onOutlineColorChange={updateOutlineColor}
                onOutlineWidthChange={updateOutlineWidth}
                onAdjustFontSize={adjustFontSize}
                onAdjustOutlineWidth={adjustOutlineWidth}
              />
            )}
          </CardContent>

          {/* Action Buttons */}
          <CardActions sx={{
            display: state.videoFile && state.subtitleFile ? 'flex' : 'none',
            flexWrap: 'wrap',
            justifyContent: 'center',
            pb: 0,
            mt: 2,
            gap: 1
          }}>
            <Button
              variant="contained"
              onClick={burnCaptions}
              disabled={!canBurnCaptions()}
              size="small"
            >
              {state.processing.isProcessing ? 'Burning...' : 'Burn Caption'}
            </Button>

            {!state.processing.isProcessing && (
              <Button
                variant="outlined"
                onClick={handleReset}
                size="small"
              >
                Reset
              </Button>
            )}

            {state.processing.isProcessing && (
              <Button
                variant="contained"
                color="error"
                onClick={stopBurning}
                size="small"
              >
                Stop
              </Button>
            )}

            {state.download.url && state.download.size !== null && (
              <Button
                variant="contained"
                color="success"
                onClick={downloadBurnedVideo}
                size="small"
              >
                Download ({formatFileSize(state.download.size)})
              </Button>
            )}
          </CardActions>

          {/* Progress Display */}
          <ProgressDisplay
            processing={state.processing}
            consoleLogs={state.consoleLogs}
          />
        </Card>
      </Container>
    </>
  );
}

export default BurnCaption;
