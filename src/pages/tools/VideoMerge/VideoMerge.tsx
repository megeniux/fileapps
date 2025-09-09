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

// MUI Icons
import MergeTypeIcon from '@mui/icons-material/MergeType';

// Local imports
import { useVideoMerger, FileUploadArea, VideoList, ProgressDisplay } from './index';
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
        <title>Merge Videos Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Join multiple video clips into one file while preserving quality. Combine videos locally in your browser — private & watermark-free."
        />
        <meta property="og:title" content={`Merge Videos Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/video-merge-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video-merge" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/video-merge" />
      </Helmet>
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>           
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
