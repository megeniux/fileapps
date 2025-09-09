/**
 * Video Merger Component - Modular Refactored Version
 * 
 * A comprehensive video merging tool for combining multiple videos.
 * Features:
 * - Drag & drop multiple file upload
 * - Video reordering and management
 * - Real-time progress tracking
 * - Local processing (no server uploads)
 * - Multiple video format support
 * 
 * Following established patterns from VideoResize and VideoTrim
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
import MergeTypeIcon from '@mui/icons-material/MergeType';

// Local imports
import { 
  useVideoMerger,
  FileUploadArea,
  VideoList,
  ProgressDisplay
} from './index';
import { formatFileSize } from './utils';
import { MIN_VIDEO_COUNT } from './constants';

/**
 * Main Video Merger Component
 */
const VideoMerge: React.FC = () => {
  const {
    // State
    files,
    isDragActive,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    errorMsg,
    
    // Refs
    fileInputRef,
    
    // Actions
    handleFilesAdd,
    handleFileRemove,
    handleMoveUp,
    handleMoveDown,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleMerge,
    handleStop,
    handleDownload,
    handleAddClick,
    createReplaceHandler
  } = useVideoMerger();
  
  // Check if merge is possible
  const canMerge = files.length >= MIN_VIDEO_COUNT && !isProcessing;
  
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Video Merger Tool - Combine Multiple Videos Online for Free</title>
        <meta name="description" content="Free online video merger tool to combine multiple video clips into one file. Merge videos in browser with no uploads, preserving quality. No watermarks, completely private." />
        <meta name="keywords" content="video merger, combine videos, merge video clips, video joiner, video concatenation, video editor, free video tools, online video merger" />
        <meta property="og:title" content="Video Merger Tool - Combine Multiple Videos Online for Free" />
        <meta property="og:description" content="Free online video merger tool to combine multiple video clips into one file. Merge videos in browser with no uploads, preserving quality. No watermarks, completely private." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video-merge" />
        <link rel="canonical" href="https://fileapps.click/tools/video-merge" />
      </Helmet>
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            {/* Header */}
            <Box display="flex" alignItems="center">
              <MergeTypeIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight={600} mb={0.5}>
                Video Merger
              </Typography>
            </Box>
            
            <Divider sx={{ my: 0.5 }} />
            
            {/* Description */}
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Merge multiple video clips into one file while preserving quality. Combine videos locally in your browser — private & watermark-free.
            </Typography>
            
            {/* File Upload Area */}
            <FileUploadArea
              files={files}
              isDragActive={isDragActive}
              isProcessing={isProcessing}
              onFilesAdd={handleFilesAdd}
              onAddClick={handleAddClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
            
            {/* Hidden file input for reference */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files) {
                  handleFilesAdd(Array.from(e.target.files));
                }
              }}
            />
            
            {/* Video List */}
            <VideoList
              files={files}
              isProcessing={isProcessing}
              onRemove={handleFileRemove}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onReplace={(index) => createReplaceHandler(index)()}
            />
          </CardContent>
          
          {/* Action Buttons */}
          <CardActions 
            sx={{ 
              display: files.length ? 'flex' : 'none', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              pb: 0, 
              mt: 2, 
              gap: 1 
            }}
          >
            {/* Merge Button */}
            <Button 
              variant="contained" 
              onClick={handleMerge} 
              disabled={!canMerge}
              startIcon={<MergeTypeIcon />}
            >
              {isProcessing ? 'Merging...' : 'Merge'}
            </Button>
            
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

export default VideoMerge;
