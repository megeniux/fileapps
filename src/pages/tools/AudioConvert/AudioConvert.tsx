import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';

// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Local Imports
import { useAudioConverter } from './useAudioConverter';
import FileUploadArea from './FileUploadArea';
import FormatSelector from './FormatSelector';
import QualitySelector from './QualitySelector';
import ProgressDisplay from './ProgressDisplay';

function AudioConvert() {
  const {
    // state
    file,
    previewUrl,
    outputFormat,
    outputQuality,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    isDragActive,
    // refs
    fileInputRef,
    audioRef,
    // handlers
    handleFileChange,
    removeFile,
    handleFormatChange,
    handleQualityChange,
    processVideo,
    stopProcessing,
    handleDownload,
    handleReset,
    onDragOver,
    onDragLeave,
    onDrop,
  } = useAudioConverter();

  return (
    <>
      <Helmet>
        <title>Convert Audio Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Convert to MP3, WAV, AAC, FLAC, OGG, M4A locally. Set bitrate or lossless — private, fast & watermark‑free."
        />
        <meta property="og:title" content={`Convert Audio Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/audio-convert-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/audio/convert" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/audio/convert" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 10 }}>
      <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <CardContent sx={{ p: 0 }}>
          {/* Upload area (preserves UI/UX) */}
          <FileUploadArea
            file={file}
            previewUrl={previewUrl}
            audioRef={audioRef}
            inputRef={fileInputRef}
            isDragActive={isDragActive}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onInputChange={handleFileChange}
          />
          {/* Filename and remove button */}
          {file && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="body2" noWrap>
                {file.name} ({formatBytes(file.size)})
              </Typography>
              <IconButton onClick={removeFile} color="error" sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {/* Controls */}
          {file && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormatSelector value={outputFormat} onChange={handleFormatChange} disabled={isProcessing} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <QualitySelector outputFormat={outputFormat} value={outputQuality} onChange={handleQualityChange} disabled={isProcessing} />
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={processVideo} disabled={isProcessing || !file}>
            {isProcessing ? 'Converting' : 'Convert'}
          </Button>
          {!isProcessing && (
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          )}
          {isProcessing && (
            <Button color="error" variant='contained' onClick={stopProcessing} disabled={!isProcessing}>
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button color="success" variant='contained' onClick={handleDownload}>
              Download ({formatBytes(downloadSize)})
            </Button>
          )}
        </CardActions>

        <ProgressDisplay isProcessing={isProcessing} progress={progress} status={status} consoleLogs={consoleLogs} />
      </Card>
      {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
    </Container>
    </>
  );
}

export default AudioConvert;