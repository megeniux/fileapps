import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

import MergeTypeIcon from '@mui/icons-material/MergeType';

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
        <title>Audio Merger - Join Multiple Audio Files Online Free</title>
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
  <Card sx={{ p: 1.5 }}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <MergeTypeIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight={600} mb={0.5}>Audio Merger</Typography>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Join multiple audio tracks into one file instantly. Combine MP3, WAV, AAC files in your browser — no uploads or signup required.
            </Typography>

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

