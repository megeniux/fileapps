import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { formatBytes } from '../../../helpers';

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
import IconButton from '@mui/material/IconButton';

// MUI Icons
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';

// Local hook & components
import { useAudioTrimmer } from './useAudioTrimmer';
import FileUploadArea from './FileUploadArea';
import ProgressDisplay from './ProgressDisplay';
import TrimSettings from './TrimSettings';

function AudioTrim() {
  const {
    file,
    previewUrl,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    isDragActive,
    fileInputRef,
    audioRef,
    handleFileChange,
    removeFile,
    onDragOver,
    onDragLeave,
    onDrop,
    handleTrim,
    handleStop,
    handleDownload,
    handleReset,
  } = useAudioTrimmer();

  const [duration, setDuration] = useState<number>(0);
  const [range, setRange] = useState<[number, number]>([0, 0]);

  // Local helpers that touch only presentation state (duration/range)
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      setDuration(dur);
      setRange([0, Math.floor(dur)]);
    }
  };





  return (
    <>
      <Helmet>
        <title>Audio Trimmer - Cut and Trim Audio Files Online Free</title>
        <meta name="description" content="Free online audio trimmer to cut and trim audio files with precision timing. Perfect for podcasts, music, and voiceovers. Local processing with no watermarks or uploads." />
        <meta name="keywords" content="audio trimmer, cut audio, trim audio, audio cutter, audio editor, clip audio, free audio tools, podcast editor" />
        <meta property="og:title" content="Audio Trimmer - Cut and Trim Audio Files Online Free" />
        <meta property="og:description" content="Free online audio trimmer to cut and trim audio files with precision timing. Perfect for podcasts, music, and voiceovers. Local processing with no watermarks or uploads." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/audio-trim" />
        <link rel="canonical" href="https://fileapps.click/tools/audio-trim" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
        <Card sx={{ p: 1.5 }} elevation={3}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <ContentCutIcon color="secondary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Audio Trimmer
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Trim and cut audio files with precision timing for podcasts, music, or voiceovers. Local processing — private & watermark-free.
            </Typography>
            {/* Upload & Preview area (preserve exact UX) */}
            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              isDragActive={isDragActive}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onInputChange={handleFileChange}
              inputRef={fileInputRef}
              audioRef={audioRef}
              onLoadedMetadata={handleLoadedMetadata}
            />
            {/* Filename and remove button */}
            {file && (
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="body2" noWrap>
                  {file.name} ({formatBytes(file.size)})
                </Typography>
                <IconButton onClick={removeFile} size="small" color="error" sx={{ ml: 1 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
            {/* Controls */}
            {file && (
              <TrimSettings
                duration={duration}
                range={range}
                isProcessing={isProcessing}
                onRangeChange={(r) => {
                  setRange(r);
                }}
                onDecreaseStartTime={() => setRange([Math.max(0, range[0] - 1), range[1]])}
                onIncreaseEndTime={() => setRange([range[0], Math.min(duration, range[1] + 1)])}
              />
            )}
          </CardContent>
          <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={() => handleTrim(range[0], range[1])} disabled={isProcessing || !file || duration === 0} size="small">
              {isProcessing ? 'Trimming' : 'Trim Audio'}
            </Button>
            {/* Reset button only visible when not processing */}
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset} size="small">
                Reset
              </Button>
            )}
            {/* Add Stop button */}
            {isProcessing && (
              <Button color="error" variant='contained' onClick={handleStop} disabled={!isProcessing} size="small">
                Stop
              </Button>
            )}
            {downloadUrl && downloadSize !== null && (
              <Button color="success" variant='contained' onClick={handleDownload} size="small">
                Download ({formatBytes(downloadSize)})
              </Button>
            )}
          </CardActions>
          <ProgressDisplay isProcessing={isProcessing} progress={progress} status={status} consoleLogs={consoleLogs} />
        </Card>
      </Container>
    </>
  );
}

export default AudioTrim;