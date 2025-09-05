import { useRef } from 'react';
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
import MusicNoteIcon from '@mui/icons-material/MusicNote';

// Local imports
import { useAudioExtractor } from './ExtractAudio/useAudioExtractor';
import FileUploadArea from './ExtractAudio/FileUploadArea';
import DurationSelector from './ExtractAudio/DurationSelector';
import ProgressDisplay from './ExtractAudio/ProgressDisplay';
import { formatFileSize } from './ExtractAudio/utils';

function ExtractAudio() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    state,
    removeFile,
    handleVideoMetadataLoad,
    onDragOver,
    onDragLeave,
    onDrop,
    onInputChange,
    updateRange,
    adjustStartTime,
    adjustEndTime,
    extractAudio,
    stopExtraction,
    downloadExtractedAudio,
    canExtract,
    clearError
  } = useAudioExtractor();

  const handleRemoveFile = () => {
    removeFile(fileInputRef);
  };

  return (
    <>
      <Helmet>
        <title>Extract Audio from Video - Free MP3 Audio Extractor Tool</title>
        <meta name="description" content="Free online tool to extract audio from video files. Convert video to MP3, WAV, AAC, or FLAC audio formats. High-quality audio extraction with no uploads or watermarks." />
        <meta name="keywords" content="extract audio, video to mp3, audio extractor, video to audio converter, mp3 extractor, free audio extraction, video audio ripper" />
        <meta property="og:title" content="Extract Audio from Video - Free MP3 Audio Extractor Tool" />
        <meta property="og:description" content="Free online tool to extract audio from video files. Convert video to MP3, WAV, AAC, or FLAC audio formats. High-quality audio extraction with no uploads or watermarks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/extract-audio" />
        <link rel="canonical" href="https://fileapps.click/tools/extract-audio" />
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        <Card sx={{ p: 1.5 }}>
          <CardContent sx={{ p: 0 }}>
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
            
            {/* Header */}
            <Box display="flex" alignItems="center">
              <MusicNoteIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight={600} mb={0.5}>
                Extract Audio from Video
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            
            {/* Description */}
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Extract high-quality audio from videos and save as MP3, WAV, AAC, or FLAC. Local processing — no uploads, no watermark, no signup.
            </Typography>
            
            {/* File Upload Area */}
            <FileUploadArea
              audioFile={state.audioFile}
              isDragActive={state.isDragActive}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={onInputChange}
              onRemoveFile={handleRemoveFile}
              onVideoMetadataLoad={handleVideoMetadataLoad}
              inputRef={fileInputRef}
              videoRef={videoRef}
            />
            
            {/* Duration Selector */}
            <DurationSelector
              audioFile={state.audioFile}
              range={state.range}
              isProcessing={state.processing.isProcessing}
              onRangeChange={updateRange}
              onAdjustStart={adjustStartTime}
              onAdjustEnd={adjustEndTime}
            />
          </CardContent>
          
          {/* Action Buttons */}
          <CardActions sx={{ 
            display: !!state.audioFile ? 'flex' : 'none', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            pb: 0, 
            mt: 2, 
            gap: 1 
          }}>
            <Button 
              variant="contained" 
              onClick={extractAudio} 
              disabled={!canExtract()} 
              size="small"
            >
              {state.processing.isProcessing ? 'Extracting' : 'Extract Audio'}
            </Button>
            
            {state.processing.isProcessing && (
              <Button 
                variant="contained" 
                color="error" 
                onClick={stopExtraction} 
                size="small"
              >
                Stop
              </Button>
            )}
            
            {state.download.url && state.download.size !== null && (
              <Button 
                variant="contained" 
                color="success" 
                onClick={downloadExtractedAudio} 
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

export default ExtractAudio;
