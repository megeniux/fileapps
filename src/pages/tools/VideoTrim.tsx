/**
 * Video Trimmer Component - Modular Refactored Version
 * 
 * A comprehensive video trimming tool with frame-accurate precision.
 * Features:
 * - Drag & drop file upload
 * - Range selection with visual slider
 * - Real-time progress tracking
 * - Local processing (no server uploads)
 * - Multiple video format support
 * 
 * Following established patterns from VideoResize and VideoConvert
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

// MUI imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

// MUI Icons
import ContentCutIcon from '@mui/icons-material/ContentCut';

// Local imports
import { 
  useVideoTrimmer,
  FileUploadArea,
  TrimSettings,
  ProgressDisplay,
  formatFileSize
} from './VideoTrim/index';

/**
 * Main Video Trimmer Component
 */
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
        <title>Video Trimmer Online Free – Cut and Trim Videos Precisely</title>
        <meta name="description" content="Trim and cut videos with frame-accurate precision. Remove unwanted parts locally — no watermark, private & fast." />
        <meta name="keywords" content="trim video online free, cut video online, video trimmer tool, clip video online, remove parts from video, video editor online, trim mp4 online" />
        <meta property="og:title" content="Free Online Video Trimmer – Fast, Private & No Watermark" />
        <meta property="og:description" content="Trim and cut videos with precision in your browser. No uploads required." />
        <meta property="og:image" content="/images/landing/video-trim-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/trim" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="https://fileapps.click/tools/video/trim" />
      </Helmet>
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        <Card sx={{ p: 1.5 }}>
          <CardContent sx={{ p: 0 }}>
            {/* Header */}
            <Box display="flex" alignItems="center">
              <ContentCutIcon color="info" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Video Trimmer
              </Typography>
            </Box>
            
            <Divider sx={{ my: 0.5 }} />
            
            {/* Description */}
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Trim and cut videos with frame-accurate precision. Remove unwanted parts locally — no watermark, no signup, 100% browser-based.
            </Typography>
            
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
              display: !!file ? 'flex' : 'none', 
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
              startIcon={<ContentCutIcon />}
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