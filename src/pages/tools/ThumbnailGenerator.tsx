import React from 'react'
import { Helmet } from 'react-helmet-async'

// Custom hooks
import { useFFmpeg } from '../../hooks/useFFmpeg'
import { useThumbnailState } from '../../hooks/useThumbnailState'

// Components
import { FileUploadArea } from './ThumbnailGenerator/FileUploadArea'
import { ModeTabs } from './ThumbnailGenerator/ModeTabs'
import { ModeControls } from './ThumbnailGenerator/ModeControls'
import { ThumbnailDisplay } from './ThumbnailGenerator/ThumbnailDisplay'
import { ProgressDisplay } from './ThumbnailGenerator/ProgressDisplay'

// Processing logic
import { ThumbnailProcessor } from './ThumbnailGenerator/ThumbnailProcessor'

// Utilities
import { handleDragEvents } from '../../utils/fileHandling'

// MUI Imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'

// Icons
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'

// Components
import PerformanceInfoDialog from '../../components/PerformanceInfoDialog'

function ThumbnailGenerator() {
  // Custom hooks
  const ffmpegManager = useFFmpeg()
  const {
    file,
    previewUrl,
    duration,
    time,
    width,
    height,
    sizePreset,
    isProcessing,
    progress,
    status,
    errorMsg,
    thumbnailUrl,
    mode,
    startTime,
    endTime,
    scrubInterval,
    frameInterval,
    thumbnails,
    consoleLogs,
    isDragActive,
    videoRef,
    setTime,
    setIsProcessing,
    setProgress,
    setStatus,
    setErrorMsg,
    setThumbnailUrl,
    setMode,
    setStartTime,
    setEndTime,
    setScrubInterval,
    setFrameInterval,
    setThumbnails,
    setConsoleLogs,
    setIsDragActive,
    handleFileSelect,
    handleLoadedMetadata,
    handleSizePresetChange,
    handleWidthChange,
    handleHeightChange
  } = useThumbnailState()

  // Drag and drop handlers
  const dragHandlers = handleDragEvents(setIsDragActive, setErrorMsg, handleFileSelect)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      handleFileSelect(event.target.files[0])
    }
  }

  const handleReset = () => {
    window.location.reload();
  };

  // Slider for start/end time
  const handleRangeChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setStartTime(Number(newValue[0]))
      setEndTime(Number(newValue[1]))
      setTime(Number(newValue[0]))
    }
  }

  const handleTimeChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') setTime(newValue)
  }

  const handleModeChange = (_: React.SyntheticEvent, newValue: number) => {
    setMode(newValue)
    setThumbnails([])
    setThumbnailUrl(null)
    setErrorMsg(null)
    setProgress(0)
    setStatus(null)
  }

  const handleScrubIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(event.target.value)
    if (!isNaN(val) && val > 0) setScrubInterval(val)
  }

  const handleFrameIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value)
    if (!isNaN(val) && val > 0) setFrameInterval(val)
  }

  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = React.useState(false)

  const handlePerformanceDialogOpen = () => {
    setIsPerformanceDialogOpen(true)
  }

  const handlePerformanceDialogClose = () => {
    setIsPerformanceDialogOpen(false)
  }

  const handleExtractThumbnail = async () => {
    if (!file) return
    
    setIsProcessing(true)
    setProgress(0)
    setStatus('Preparing')
    setErrorMsg(null)
    setThumbnailUrl(null)
    setThumbnails([])
    setConsoleLogs([])

    try {
      const ffmpeg = await ffmpegManager.ensureReady()
      
      // Add a small delay to ensure FFmpeg is fully ready
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const options = {
        mode,
        time,
        startTime,
        endTime,
        width,
        height,
        scrubInterval,
        frameInterval
      }

      const callbacks = {
        setProgress,
        setStatus,
        setConsoleLogs
      }

      const urls = await ThumbnailProcessor.processThumbnails(file, ffmpeg, options, callbacks)
      
      if (mode === 0 || mode === 1) {
        setThumbnailUrl(urls[0])
      } else {
        setThumbnails(urls)
      }
      
      setProgress(100)
      setStatus('Completed')
    } catch (err: any) {
      setStatus('Failed')
      setConsoleLogs(logs => [...logs, String(err)])
      
      if (err.message && (err.message.includes('memory') || err.message.includes('out of bounds'))) {
        setErrorMsg('Memory error: Video is too large or complex. Please try with a shorter video or smaller resolution.')
        await ffmpegManager.reset()
      } else if (err.message && (err.message.includes('Input file validation failed') || err.message.includes('Failed to write input file'))) {
        setErrorMsg('Failed to process video file. Please try again or try with a different video file.')
        await ffmpegManager.reset()
      } else if (err.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err))
      }
    } finally {
      setIsProcessing(false)
      setTimeout(() => {
        setProgress(0)
        setStatus(null)
      }, 2000)
    }
  }

  const handleStop = () => {
    ffmpegManager.terminate()
    setStatus('Stopped')
    setIsProcessing(false)
    setErrorMsg(null)
  }

  const handleDownload = async () => {
    await ThumbnailProcessor.downloadThumbnails(mode, thumbnailUrl, thumbnails, file?.name)
  }

  return (
    <>
      <Helmet>
        <title>Video Thumbnail Generator - Extract Preview Images from Videos Free</title>
        <meta name="description" content="Free online video thumbnail generator. Extract high-quality preview images from videos instantly. Generate thumbnails in multiple sizes with no watermarks or signups required." />
        <meta name="keywords" content="video thumbnail generator, extract video thumbnails, video preview images, thumbnail maker, video screenshots, free thumbnail generator" />
        <meta property="og:title" content="Video Thumbnail Generator - Extract Preview Images from Videos Free" />
        <meta property="og:description" content="Free online video thumbnail generator. Extract high-quality preview images from videos instantly. Generate thumbnails in multiple sizes with no watermarks or signups required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/thumbnail-generator" />
        <link rel="canonical" href="https://fileapps.click/tools/thumbnail-generator" />
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
        
        <Card sx={{ p: 1.5 }} elevation={3}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <PhotoSizeSelectActualIcon color="secondary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Video Thumbnail Generator
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Extract high-quality thumbnails from videos instantly. Generate preview images in multiple sizes — no watermark, no signup required.
            </Typography>
            
            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              isDragActive={isDragActive}
              onFileChange={handleFileChange}
              onReset={handleReset}
              onDragOver={dragHandlers.onDragOver}
              onDragLeave={dragHandlers.onDragLeave}
              onDrop={dragHandlers.onDrop}
              onLoadedMetadata={handleLoadedMetadata}
              videoRef={videoRef}
            />

            <ModeTabs
              mode={mode}
              onChange={handleModeChange}
              show={!!(file && !isProcessing && duration > 0)}
            />

            {file && duration > 0 && !isProcessing && (
              <ModeControls
                mode={mode}
                time={time}
                startTime={startTime}
                endTime={endTime}
                width={width}
                height={height}
                sizePreset={sizePreset}
                scrubInterval={scrubInterval}
                frameInterval={frameInterval}
                duration={duration}
                isProcessing={isProcessing}
                onTimeChange={handleTimeChange}
                onRangeChange={handleRangeChange}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                onSizePresetChange={handleSizePresetChange}
                onScrubIntervalChange={handleScrubIntervalChange}
                onFrameIntervalChange={handleFrameIntervalChange}
                setTime={setTime}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
              />
            )}

            <ThumbnailDisplay
              mode={mode}
              thumbnailUrl={thumbnailUrl}
              thumbnails={thumbnails}
            />
          </CardContent>
          
          <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={handleExtractThumbnail} disabled={!file || isProcessing}>
              {isProcessing ? 'Extracting' : 'Extract'}
            </Button>
            {isProcessing && (
              <Button color="error" variant="contained" onClick={handleStop}>
                Stop
              </Button>
            )}
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            )}
            {(thumbnailUrl || thumbnails.length > 0) && (
              <Button color="success" variant="contained" onClick={handleDownload}>
                {(thumbnails.length > 1 && mode !== 0 && mode !== 1) ? 'Download All' : 'Download'}
              </Button>
            )}
          </CardActions>
          
          <ProgressDisplay
            isProcessing={isProcessing}
            progress={progress}
            status={status}
            consoleLogs={consoleLogs}
          />

          <Alert icon={false} severity="warning" sx={{ alignItems: 'center', mt: 2, py: 0 }}>
            <Typography variant='subtitle1' fontWeight={600} component="h4">Recommendations:</Typography>
            <ol style={{ paddingLeft: 15 }}>
              <li><Typography variant='body2' component="p"> <strong>Use predefined sizes:</strong> Choose from YouTube, Instagram, Facebook, and other optimized thumbnail sizes to prevent memory errors.</Typography></li>
              <li><Typography variant='body2' component="p"> <strong>Avoid custom large sizes:</strong> Custom dimensions above 1920×1080px may cause memory issues. Use preset sizes for best results.</Typography></li>
              <li><Typography variant='body2' component="p"> <strong>Extract fewer thumbnails:</strong> If you need fewer thumbnails, consider adjusting the extraction settings.</Typography></li>
            </ol>
            <Typography variant='body2' component="p">Progress depends on the system hardware mostly <Link color="info" sx={{ cursor: 'pointer' }} onClick={handlePerformanceDialogOpen}>Learn more</Link></Typography>
          </Alert>
        </Card>

        <PerformanceInfoDialog
          open={isPerformanceDialogOpen}
          onClose={handlePerformanceDialogClose}
        />
      </Container>
    </>
  )
}

export default ThumbnailGenerator
