import React, { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
import { APP_INFO } from '../../../constants'

// MUI imports
import { styled, alpha, useTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'

// Icons
import SecurityIcon from '@mui/icons-material/Security'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoIcon from '@mui/icons-material/Info'
import ImageIcon from '@mui/icons-material/Image'
import SpeedIcon from '@mui/icons-material/Speed'
import DevicesIcon from '@mui/icons-material/Devices'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import CropIcon from '@mui/icons-material/Crop'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

// Component imports
import { useFFmpeg } from './utils'
import { useThumbnailState } from './useThumbnailState'
import FileUploadArea from './FileUploadArea'
import ModeTabs from './ModeTabs'
import ModeControls from './ModeControls'
import ThumbnailDisplay from './ThumbnailDisplay'
import ProgressDisplay from './ProgressDisplay'
import { ThumbnailProcessor } from './ThumbnailProcessor'
import { handleDragEvents } from './fileHandling'

function ThumbnailGenerator() {
  const theme = useTheme()

  // Custom hooks
  const ffmpegManager = useFFmpeg()
  const statusRef = useRef<string | null>(null)
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
    warningMsg,
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
    fileInputRef,
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
    resetState,
    handleFileSelect,
    handleLoadedMetadata,
    handleSizePresetChange,
    handleWidthChange,
    handleHeightChange
  } = useThumbnailState()

  // Drag and drop handlers
  const dragHandlers = handleDragEvents(setIsDragActive, setErrorMsg, handleFileSelect)

  // Update status with ref tracking
  const updateStatus = (newStatus: string | null) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      handleFileSelect(event.target.files[0])
    }
  }

  const handleReset = () => {
    resetState();
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

  const handleExtractThumbnail = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)
    updateStatus('Preparing')
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
      updateStatus('Completed')
    } catch (err: any) {
      updateStatus('Failed')

      // Only log errors that aren't from termination
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (!errorMessage.includes('terminate')) {
        setConsoleLogs(logs => [...logs, errorMessage])
      }

      if (err.message && (err.message.includes('memory') || err.message.includes('out of bounds'))) {
        setErrorMsg('Memory error: Video is too large or complex. Please try with a shorter video or smaller resolution.')
        await ffmpegManager.reset()
      } else if (err.message && (err.message.includes('Input file validation failed') || err.message.includes('Failed to write input file'))) {
        setErrorMsg('Failed to process video file. Please try again or try with a different video file.')
        await ffmpegManager.reset()
      } else if (!errorMessage.includes('terminate')) {
        setErrorMsg(errorMessage)
      }
    } finally {
      setIsProcessing(false)
      // Only reset progress/status after completion, not after stopping
      setTimeout(() => {
        const currentStatus = statusRef.current;
        if (currentStatus === 'Completed' || currentStatus === 'Failed') {
          setProgress(0)
          updateStatus(null)
        }
      }, 2000)
    }
  }

  const handleStop = () => {
    ffmpegManager.terminate()
    updateStatus('Stopped')
    setIsProcessing(false)
    setErrorMsg(null)
  }

  const handleDownload = async () => {
    await ThumbnailProcessor.downloadThumbnails(mode, thumbnailUrl, thumbnails, file?.name)
  }

  // Smooth scroll to tool section
  const scrollToTool = () => {
    const toolSection = document.querySelector('.tool');
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      title: 'Multiple Extraction Modes',
      description: 'Extract single frames, create contact sheets, or generate interval-based sequences for video scrubbing.',
      icon: <ImageIcon fontSize="large" color="primary" />
    },
    {
      title: 'Precise Frame Control',
      description: 'Extract frames at exact timestamps with millisecond precision and custom intervals.',
      icon: <PrecisionManufacturingIcon fontSize="large" color="secondary" />
    },
    {
      title: '100% Private & Secure',
      description: 'All video processing happens locally in your browser. Your files never leave your device.',
      icon: <SecurityIcon fontSize="large" color="success" />
    },
    {
      title: 'High-Quality Output',
      description: 'Generate thumbnails in original video quality or customize dimensions while maintaining aspect ratios.',
      icon: <HighQualityIcon fontSize="large" color="info" />
    },
    {
      title: 'Fast Processing',
      description: 'Optimized WebAssembly-based processing for fast thumbnail extraction with real-time preview.',
      icon: <SpeedIcon fontSize="large" color="warning" />
    },
    {
      title: 'Universal Compatibility',
      description: 'Works with all major video formats. No software installation needed.',
      icon: <DevicesIcon fontSize="large" color="error" />
    }
  ];

  const relatedTools = [
    {
      title: 'Video Converter',
      description: 'Convert videos between different formats',
      icon: <SwapHorizIcon color="secondary" />,
      link: '/tools/video/convert'
    },
    {
      title: 'Video Trimmer',
      description: 'Cut and trim video segments precisely',
      icon: <CropIcon color="secondary" />,
      link: '/tools/video/trim'
    },
    {
      title: 'Video Resizer',
      description: 'Resize videos to different dimensions',
      icon: <AspectRatioIcon color="secondary" />,
      link: '/tools/video/resize'
    },
    {
      title: 'Video Compressor',
      description: 'Reduce video file sizes efficiently',
      icon: <PrecisionManufacturingIcon color="secondary" />,
      link: '/tools/video/compress'
    }
  ];

  return (
    <Root>
      <Helmet>
        <title>Extract Frames, Generate Scrubs from Videos Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Extract high-quality thumbnails and contact sheets from videos. Generate image scrubs for easy navigation. Local processing — private & watermark-free."
        />
        <meta property="og:title" content={`Extract Frames, Generate Scrubs from Videos Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/thumbnail-generator-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/thumbnail" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Extract Frames, Generate Scrubs from Videos Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Extract high-quality thumbnails and contact sheets from videos. Generate image scrubs for easy navigation. Local processing — private & watermark-free." />
        <meta name="twitter:image" content="/images/landing/thumbnail-generator-hero.png" />
        <link rel="canonical" href="https://fileapps.click/tools/thumbnail" />

        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a video thumbnail generator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A video thumbnail generator is a tool that extracts still images (frames) from video files. It can create single thumbnails at specific timestamps, contact sheets with multiple frames, or image sequences for video scrubbing and navigation."
                }
              },
              {
                "@type": "Question",
                "name": "What video formats are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our thumbnail generator supports all major video formats including MP4, MOV, AVI, MKV, WebM, WMV, FLV, and many others. The tool uses FFmpeg technology for broad format compatibility."
                }
              },
              {
                "@type": "Question",
                "name": "Can I extract multiple thumbnails at once?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our tool offers multiple extraction modes: single frame at a specific time, contact sheet with multiple frames, and interval-based extraction for creating video scrubs or frame sequences."
                }
              },
              {
                "@type": "Question",
                "name": "Is my video data secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All video processing happens locally in your browser using WebAssembly technology. Your videos never leave your device, ensuring complete privacy and security."
                }
              },
              {
                "@type": "Question",
                "name": "Can I customize the thumbnail quality and size?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can customize both the dimensions and quality of extracted thumbnails. Choose from preset sizes or set custom width and height values to match your specific requirements."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className='hero'>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', pt: { xs: 10, md: 20 } }}>
          <Grid container spacing={6} alignItems="center" flexDirection={{ xs: 'column-reverse', md: 'row' }}>
            <Grid size={{ xs: 12, md: 6, lg: 7 }}>
              <Stack direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} spacing={2} sx={{ mb: 4 }}>
                <Chip
                  label="100% Private"
                  color="success"
                  size="medium"
                  icon={<SecurityIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Chip
                  label="No Upload"
                  color="info"
                  size="medium"
                  icon={<CloudOffIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Chip
                  label="Always Free"
                  color="warning"
                  size="medium"
                  icon={<MoneyOffIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Stack>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                <Typography component="span" className='gradient-text-primary' sx={{ fontSize: 'inherit', fontWeight: 'inherit' }} > Extract Frames </Typography> {' '}&{' '}<Typography component="span" className='gradient-text-primary' sx={{ fontSize: 'inherit', fontWeight: 'inherit' }} > Generate Video Thumbnails </Typography>
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 4,
                  lineHeight: 1.4,
                  fontWeight: 400,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Create high-quality thumbnails, contact sheets, and image scrubs from videos. Perfect for video previews, navigation, and content creation.
              </Typography>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 6, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  color='warning'
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={scrollToTool}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  Start Extracting
                </Button>
                <Button
                  color="warning"
                  component={RouterLink}
                  to="/about"
                  variant="outlined"
                  size="large"
                  startIcon={<InfoIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem'
                  }}
                >
                  Learn More
                </Button>
              </Stack>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.success.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  maxWidth: { xs: '100%', md: 'fit-content' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  Supports MP4, MOV, AVI, MKV, WebM and more
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="/images/landing/thumbnail-generator-hero.png"
                  alt="Thumbnail Generator Tool Interface"
                  style={{
                    width: '100%',
                    maxWidth: 400,
                    height: 'auto',
                    borderRadius: 16
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Tool Section */}
      <section className="tool">
        <Container maxWidth="lg" sx={{ pt: 20, pb: 10 }}>
          <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <CardContent sx={{ p: 4 }}>
              {/* Upload area */}
              <FileUploadArea
                file={file}
                previewUrl={previewUrl}
                isDragActive={isDragActive}
                isProcessing={isProcessing}
                onFileChange={handleFileChange}
                onReset={handleReset}
                onDragOver={dragHandlers.onDragOver}
                onDragLeave={dragHandlers.onDragLeave}
                onDrop={dragHandlers.onDrop}
                onLoadedMetadata={handleLoadedMetadata}
                videoRef={videoRef}
                fileInputRef={fileInputRef}
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

            <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 4, mt: 2, gap: 1 }}>
              <Button variant="contained" onClick={handleExtractThumbnail} disabled={!file || isProcessing}>
                {isProcessing ? 'Extracting' : 'Extract'}
              </Button>
              {!isProcessing && (
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              )}
              {isProcessing && (
                <Button color="error" variant="contained" onClick={handleStop}>
                  Stop
                </Button>
              )}
              {(thumbnailUrl || thumbnails.length > 0) && (
                <Button color="success" variant="contained" onClick={handleDownload}>
                  {(thumbnails.length > 1 && mode !== 0 && mode !== 1) ? 'Download All' : 'Download'}
                </Button>
              )}
            </CardActions>

            {warningMsg && (
              <Alert severity="warning" sx={{ fontSize: '0.875rem' }}>
                {warningMsg}
              </Alert>
            )}

            <ProgressDisplay
              isProcessing={isProcessing}
              progress={progress}
              status={status}
              consoleLogs={consoleLogs}
            />
          </Card>
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Why Choose Our Thumbnail Generator?
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card elevation={0} sx={{ height: '100%', bgcolor: alpha(theme.palette.background.paper, 0.5), backdropFilter: 'blur(5px)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[4] } }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            How It Works
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.25),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" fontWeight={700} color="primary">1</Typography>
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>Upload Video</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select your video file or drag & drop it into the thumbnail generator
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.secondary.main, 0.25),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" fontWeight={700} color="secondary">2</Typography>
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>Choose Mode</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select extraction mode and customize settings that suit your needs
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.success.main, 0.25),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Typography variant="h4" fontWeight={700} color="success">3</Typography>
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>Download</Typography>
                <Typography variant="body2" color="text.secondary">
                  Extract and download your thumbnails instantly to your device
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Frequently Asked Questions
          </Typography>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>What is a video thumbnail generator?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                A video thumbnail generator is a tool that extracts still images (frames) from video files. It can create single thumbnails at specific timestamps, contact sheets with multiple frames, or image sequences for video scrubbing and navigation.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>What video formats are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our thumbnail generator supports all major video formats including MP4, MOV, AVI, MKV, WebM, WMV, FLV, and many others. The tool uses FFmpeg technology for broad format compatibility.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I extract multiple thumbnails at once?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Our tool offers multiple extraction modes: single frame at a specific time, contact sheet with multiple frames, and interval-based extraction for creating video scrubs or frame sequences.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Is my video data secure?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! All video processing happens locally in your browser using WebAssembly technology. Your videos never leave your device, ensuring complete privacy and security.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I customize the thumbnail quality and size?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, you can customize both the dimensions and quality of extracted thumbnails. Choose from preset sizes or set custom width and height values to match your specific requirements.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </section>

      {/* Related Tools Section */}
      <section className="related-tools">
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            More Video Tools
          </Typography>

          <Grid container spacing={3}>
            {relatedTools.map((tool, index) => (
              <Grid container key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  component={RouterLink}
                  to={tool.link}
                  elevation={0}
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                      textDecoration: 'none'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {tool.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600} color="text.primary">
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tool.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="cta">
        <Container maxWidth="md" sx={{ pb: 10 }}>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              color: 'white',
              borderRadius: 3
            }}
          >
            <ImageIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Extract Video Thumbnails?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start creating professional thumbnails from your videos now with our free, secure, and easy-to-use tool.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => fileInputRef.current?.click()}
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': { bgcolor: alpha('#fff', 0.9) },
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
              startIcon={<PlayArrowIcon />}
            >
              Extract Thumbnails Now
            </Button>
          </Paper>
        </Container>
      </section>
    </Root>
  );
}

// Styled components
const Root = styled('div')(() => ({
  '& .hero': {
    overflow: 'hidden',
  },
}));

export default ThumbnailGenerator
