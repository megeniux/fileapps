import React from 'react';
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
import { useVideoTrimmer, FileUploadArea, TrimSettings, ProgressDisplay, formatFileSize } from './index';

const VideoTrim: React.FC = () => {
  const {
    // State
    file,
    previewUrl,
    isDragActive,
    duration,
    range,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    errorMsg,
    
    // Refs
    videoRef,
    
    // Actions
    handleFileSelect,
    handleFileRemove,
    handleReset,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleLoadedMetadata,
    handleRangeChange,
    handleTrim,
    handleStop,
    handleDownload,
    decreaseStartTime,
    increaseEndTime
  } = useVideoTrimmer();
  
  // Check if trim is possible
  const canTrim = file && !isProcessing && range[1] > range[0];
  
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Cut Video Online For Free | {APP_INFO.name}</title>
        <meta name="description" content="Trim and cut videos with frame-accurate precision. Remove unwanted parts locally — no watermark, private & fast." />
        <meta property="og:title" content={`Cut Video Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/video-trim-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/trim" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/video/trim" />
      </Helmet>
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>           
            {/* File Upload Area */}
            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              isDragActive={isDragActive}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              onLoadedMetadata={handleLoadedMetadata}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
            
            {/* Hidden video ref for metadata */}
            {previewUrl && (
              <video
                ref={videoRef}
                src={previewUrl}
                style={{ display: 'none' }}
                onLoadedMetadata={handleLoadedMetadata}
              />
            )}
            
            {/* Trim Settings */}
            <TrimSettings
              duration={duration}
              range={range}
              isProcessing={isProcessing}
              onRangeChange={handleRangeChange}
              onDecreaseStartTime={decreaseStartTime}
              onIncreaseEndTime={increaseEndTime}
            />
          </CardContent>
          
          {/* Action Buttons */}
          <CardActions 
            sx={{ 
              display: file ? 'flex' : 'none', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              pb: 0, 
              mt: 2, 
              gap: 1 
            }}
          >
            {/* Trim Button */}
            <Button 
              variant="contained" 
              onClick={handleTrim} 
              disabled={!canTrim}
            >
              {isProcessing ? 'Trimming...' : 'Trim Video'}
            </Button>
            
            {/* Reset Button - only when not processing */}
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            )}
            
            {/* Stop Button - only when processing */}
            {isProcessing && (
              <Button variant="contained" color="error" onClick={handleStop}>
                Stop
              </Button>
            )}
            
            {/* Download Button */}
            {downloadUrl && downloadSize !== null && (
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleDownload}
              >
                Download ({formatFileSize(downloadSize)})
              </Button>
            )}
          </CardActions>
          
          {/* Progress Display */}
          <ProgressDisplay
            isProcessing={isProcessing}
            progress={progress}
            status={status}
            consoleLogs={consoleLogs}
          />
        </Card>
        
        {/* Error Display */}
        {errorMsg && (
          <Alert severity="error" sx={{ my: 2 }}>
            {errorMsg}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default VideoTrim;