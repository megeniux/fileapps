import React from 'react';
import { Helmet } from 'react-helmet-async';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

// Icons
import SpeedIcon from '@mui/icons-material/Speed';

import { useAudioPlayback } from './AudioPlayback/useAudioPlayback';
import FileUploadArea from './AudioPlayback/FileUploadArea';
import SpeedControls from './AudioPlayback/SpeedControls';
import ProgressDisplay from './AudioPlayback/ProgressDisplay';
import PerformanceInfoDialog from '../../components/PerformanceInfoDialog';
import { formatBytes } from '../../helpers';

function AudioPlayback() {
  const {
    file,
    previewUrl,
    speed,
    setSpeed,
    isReversed,
    setIsReversed,
    isProcessing,
    progress,
    status,
    errorMsg,
    downloadUrl,
    downloadSize,
    consoleLogs,
    isDragActive,
    fileInputRef,
    audioRef,
    isPerformanceDialogOpen,
    onInputChange,
    onDragOver,
    onDragLeave,
    onDrop,
    removeFile,
    processSpeedAdjustment,
    stopSpeedAdjustment,
    downloadResult,
    openPerformanceDialog,
    closePerformanceDialog,
    canProcess,
    resetAll,
  } = useAudioPlayback();

  const handleRemoveFile = () => removeFile();
  const handleReset = () => resetAll(fileInputRef);

  const handleSpeedChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') setSpeed(value);
  };
  const handleReverseToggle = (e: React.ChangeEvent<HTMLInputElement>) => setIsReversed(e.target.checked);
  const handleAdjustSpeed = (delta: number) => setSpeed(prev => Number((prev + delta).toFixed(1)));

  return (
    <>
      <Helmet>
        <title>Audio Playback Speed Editor - Change Audio Speed Online Free</title>
        <meta name="description" content="Free online audio playback speed editor to change audio speed with pitch correction or reverse tracks completely. Export processed audio with no watermarks, 100% browser-based." />
        <link rel="canonical" href="https://fileapps.click/tools/audio-playback" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {errorMsg && (
          <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>
        )}

        <Card sx={{ p: 1.5 }} elevation={3}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <SpeedIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Audio Playback Speed Editor
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />

            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Change audio speed with pitch correction or reverse tracks completely. Export processed audio with no watermark — 100% browser-based.
            </Typography>

            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              isDragActive={isDragActive}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={onInputChange}
              onRemoveFile={handleRemoveFile}
              inputRef={fileInputRef}
              audioRef={audioRef}
            />

            {file && (
              <SpeedControls
                speed={speed}
                isReversed={isReversed}
                isProcessing={isProcessing}
                onSpeedChange={handleSpeedChange}
                onReverseToggle={handleReverseToggle}
                onAdjustSpeed={handleAdjustSpeed}
              />
            )}
          </CardContent>

          <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={processSpeedAdjustment} disabled={!canProcess()}>
              {isProcessing ? 'Processing' : 'Process'}
            </Button>
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>Reset</Button>
            )}
            {isProcessing && (
              <Button color="error" variant='contained' onClick={stopSpeedAdjustment}>Stop</Button>
            )}
            {downloadUrl && downloadSize !== null && (
              <Button color="success" variant='contained' onClick={downloadResult}>Download ({formatBytes(downloadSize)})</Button>
            )}
          </CardActions>

          <ProgressDisplay
            processing={{ isProcessing, progress, status, errorMsg }}
            consoleLogs={consoleLogs}
            isPerformanceDialogOpen={isPerformanceDialogOpen}
            onPerformanceDialogOpen={openPerformanceDialog}
            onPerformanceDialogClose={closePerformanceDialog}
          />
        </Card>

        <PerformanceInfoDialog open={isPerformanceDialogOpen} onClose={closePerformanceDialog} />
      </Container>
    </>
  );
}

export default AudioPlayback;
