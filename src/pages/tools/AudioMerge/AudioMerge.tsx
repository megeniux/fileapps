import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';

// MUI
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


// Components and hooks from AudioMerge folder
import { FileUploadArea, AudioList, ProgressDisplay, useAudioMerger, MIN_AUDIO_COUNT } from './index';
import { formatBytes } from '../../../helpers';

const AudioMerge: React.FC = () => {
  const {
    files,
    isDragActive,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    errorMsg,
    fileInputRef,
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
  } = useAudioMerger();

  const canMerge = files.length >= MIN_AUDIO_COUNT && !isProcessing;

  return (
    <>
      <Helmet>
        <title>Merge Audio Files Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Join multiple audio tracks into one file instantly. Combine MP3, WAV, AAC files with ease."
        />
        <meta property="og:title" content={`Merge Audio Files Online For Free | ${APP_INFO.name}`} />
    <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://fileapps.click/tools/audio/merge`} />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href={`https://fileapps.click/tools/audio/merge`} />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Merge Audio Files Online </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Join multiple audio tracks into one file instantly. Combine MP3, WAV, AAC files with ease. </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }}>
                <img src="/images/landing/audio-merger-hero.jpg" alt="Audio Merge" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%' }} />
              </Grid>
            </Grid>

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
              fileInputRef={fileInputRef}
            />

            <AudioList
              files={files}
              isProcessing={isProcessing}
              onRemove={handleFileRemove}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onReplace={(index: number) => createReplaceHandler(index)()}
            />
          </CardContent>

          <CardActions sx={{ display: files.length ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={handleMerge} disabled={!canMerge}>
              {isProcessing ? 'Merging...' : 'Merge'}
            </Button>

            {isProcessing && (
              <Button variant="contained" color="error" onClick={handleStop}>
                Stop
              </Button>
            )}

            {downloadUrl && downloadSize !== null && (
              <Button variant="contained" color="success" onClick={handleDownload}>
                Download ({formatBytes(downloadSize)})
              </Button>
            )}
          </CardActions>

          <ProgressDisplay isProcessing={isProcessing} progress={progress} status={status} consoleLogs={consoleLogs} />
        </Card>

        {errorMsg && (
          <Alert severity="error" sx={{ my: 2 }}>
            {errorMsg}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default AudioMerge;

