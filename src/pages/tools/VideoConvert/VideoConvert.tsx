import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';

// MUI imports
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Icons
import VideoFileIcon from '@mui/icons-material/VideoFile';
import SecurityIcon from '@mui/icons-material/Security';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedIcon from '@mui/icons-material/Speed';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import DevicesIcon from '@mui/icons-material/Devices';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import CropIcon from '@mui/icons-material/Crop';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CompressIcon from '@mui/icons-material/Compress';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

// Component imports
import { useVideoConverter } from './useVideoConverter';
import FileUploadArea from './FileUploadArea';
import ConversionSettings from './ConversionSettings';
import ProgressDisplay from './ProgressDisplay';
import InfoPopovers from './InfoPopovers';

function VideoConvert() {
  const theme = useTheme();

  const {
    // State
    file,
    previewUrl,
    outputFormat,
    videoCodec,
    audioCodec,
    width,
    height,
    fps,
    crf,
    preset,
    audioBitrate,
    resolutionRatio,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    crfAnchor,
    presetAnchor,
    isDragActive,

    // Refs
    videoRef,
    fileInputRef,

    // Event handlers
    handleFileChange,
    handleRemoveFile,
    handleLoadedMetadata,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDownload,
    handleCrfInfoClick,
    handleCrfInfoClose,
    handlePresetInfoClick,
    handlePresetInfoClose,
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleFormatChange,
    handleReset,
    handleVideoCodecChange,
    handleAudioCodecChange,
    handleFpsChange,
    handleCrfChange,
    handlePresetChange,
    handleAudioBitrateChange,

    // Processing
    processVideo,
    stopProcessing,
  } = useVideoConverter();

  // Smooth scroll to tool section
  const scrollToTool = () => {
    const toolSection = document.querySelector('.tool');
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      title: '100% Private & Secure',
      description: 'All video processing happens locally in your browser. Your files never leave your device.',
      icon: <SecurityIcon fontSize="large" color="success" />
    },
    {
      title: 'No Upload Required',
      description: 'Convert video files directly in your browser without uploading to any server.',
      icon: <CloudOffIcon fontSize="large" color="info" />
    },
    {
      title: 'Always Free',
      description: 'Convert unlimited video files with no restrictions, watermarks, or hidden fees.',
      icon: <MoneyOffIcon fontSize="large" color="warning" />
    },
    {
      title: 'High-Quality Output',
      description: 'Maintain video quality with customizable codec, resolution, and bitrate settings.',
      icon: <HighQualityIcon fontSize="large" color="primary" />
    },
    {
      title: 'Fast Processing',
      description: 'Powered by WebAssembly for near-native performance in your browser.',
      icon: <SpeedIcon fontSize="large" color="secondary" />
    },
    {
      title: 'All Devices Supported',
      description: 'Works on Windows, Mac, Linux, iOS, and Android. No software installation needed.',
      icon: <DevicesIcon fontSize="large" color="error" />
    }
  ];

  const relatedTools = [
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
      icon: <CompressIcon color="secondary" />,
      link: '/tools/video/compress'
    },
    {
      title: 'Extract Audio',
      description: 'Extract audio from video files',
      icon: <AudiotrackIcon color="secondary" />,
      link: '/tools/video/extract-audio'
    }
  ];

  return (
    <Root>
      <Helmet>
        <title>Convert Video Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Convert Video to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free."
        />
        <meta property="og:title" content={`Convert Video Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/video-convert-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/convert" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Convert Video Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Convert Video to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta name="twitter:image" content="/images/landing/video-convert-hero.png" />
        <link rel="canonical" href="https://fileapps.click/tools/video/convert" />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What video formats are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support all major video formats including MP4, MOV, AVI, MKV, WebM, WMV, FLV, and many more. You can convert from any supported format to any other supported format with customizable quality settings."
                }
              },
              {
                "@type": "Question",
                "name": "Can I customize video quality settings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! You can customize resolution, codec, bitrate, frame rate, and compression settings. Our converter maintains the highest possible quality while giving you full control over the output."
                }
              },
              {
                "@type": "Question",
                "name": "Are my video files kept private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All conversion happens locally in your browser using WebAssembly. Your videos never leave your device or get uploaded to any server. This ensures complete privacy and security."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a file size limit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "File size limits depend on your device's available memory. Generally, videos up to several GB can be processed without issues. Larger files may take longer to process but there are no artificial restrictions."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for commercial projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our video converter is completely free for both personal and commercial use. There are no watermarks, licensing fees, or restrictions on how you can use the converted video files."
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
                <Typography
                  component="span"
                  className='gradient-text-primary'
                  sx={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit'
                  }}
                >
                  Convert Video
                </Typography>
                {' '}Online For Free
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
                Convert to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free.
              </Typography>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 6, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
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
                  Start Converting
                </Button>
                <Button
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
                  src="/images/landing/video-convert-hero.png"
                  alt="Video Convert Tool Interface"
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
                videoRef={videoRef}
                fileInputRef={fileInputRef}
                isDragActive={isDragActive}
                isProcessing={isProcessing}
                onFileChange={handleFileChange}
                onRemoveFile={handleRemoveFile}
                onLoadedMetadata={handleLoadedMetadata}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              />
              
              {file && (
                <ConversionSettings
                  outputFormat={outputFormat}
                  videoCodec={videoCodec}
                  audioCodec={audioCodec}
                  width={width}
                  height={height}
                  fps={fps}
                  crf={crf}
                  preset={preset}
                  audioBitrate={audioBitrate}
                  resolutionRatio={resolutionRatio}
                  onFormatChange={handleFormatChange}
                  onVideoCodecChange={handleVideoCodecChange}
                  onAudioCodecChange={handleAudioCodecChange}
                  onWidthChange={handleWidthChange}
                  onHeightChange={handleHeightChange}
                  onFpsChange={handleFpsChange}
                  onCrfChange={handleCrfChange}
                  onPresetChange={handlePresetChange}
                  onAudioBitrateChange={handleAudioBitrateChange}
                  onRatioChange={handleRatioChange}
                  onCrfInfoClick={handleCrfInfoClick}
                  onPresetInfoClick={handlePresetInfoClick}
                />
              )}
            </CardContent>

            <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 4, mt: 2, gap: 1 }}>
              <Button variant="contained" onClick={processVideo} disabled={isProcessing || !file}>
                {isProcessing ? 'Converting' : 'Convert'}
              </Button>
              {!isProcessing && (
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              )}
              {isProcessing && (
                <Button color="error" variant="contained" onClick={stopProcessing} disabled={!isProcessing}>
                  Stop
                </Button>
              )}
              {downloadUrl && downloadSize !== null && (
                <Button color="success" variant="contained" onClick={handleDownload}>
                  Download ({formatBytes(downloadSize)})
                </Button>
              )}
            </CardActions>

            {isProcessing && <ProgressDisplay progress={progress} status={status} consoleLogs={consoleLogs} />}
          </Card>
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Why Choose Our Video Converter?
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card elevation={0} sx={{ height: '100%', bgcolor: alpha(theme.palette.background.paper, 0.5), backdropFilter: 'blur(5px)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[4] } }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
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
                  Select your video file or drag & drop it into the converter
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
                <Typography variant="h6" gutterBottom fontWeight={600}>Choose Settings</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select output format, resolution, and quality settings that suit your needs
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
                  Convert and download your video file instantly to your device
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
              <Typography variant="h6" fontWeight={600}>What video formats are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We support all major video formats including MP4, MOV, AVI, MKV, WebM, WMV, FLV, and many more.
                You can convert from any supported format to any other supported format with customizable quality settings.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I customize video quality settings?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! You can customize resolution, codec, bitrate, frame rate, and compression settings.
                Our converter maintains the highest possible quality while giving you full control over the output.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Are my video files kept private?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! All conversion happens locally in your browser using WebAssembly. Your videos never leave
                your device or get uploaded to any server. This ensures complete privacy and security.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Is there a file size limit?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                File size limits depend on your device's available memory. Generally, videos up to several GB
                can be processed without issues. Larger files may take longer to process but there are no artificial restrictions.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I use this for commercial projects?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Our video converter is completely free for both personal and commercial use. There are no
                watermarks, licensing fees, or restrictions on how you can use the converted video files.
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
                    textDecoration: 'none',
                    background: 'transparent',
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                      borderColor: theme.palette.secondary.main
                    }
                  }}
                >
                  <CardContent sx={{
                    height: '100%',
                    background: alpha(theme.palette.background.paper, 0.5),
                    p: 3,
                    textAlign: 'center'
                  }}>
                    <Box sx={{ mb: 2 }}>
                      {tool.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
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
            <VideoFileIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Convert Your Video?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start converting your video files now with our free, secure, and easy-to-use tool.
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
              Convert Video Now
            </Button>
          </Paper>
        </Container>
      </section>

      <InfoPopovers
        crfAnchor={crfAnchor}
        presetAnchor={presetAnchor}
        onCrfInfoClose={handleCrfInfoClose}
        onPresetInfoClose={handlePresetInfoClose}
      />
    </Root>
  );
}

// Styled components
const Root = styled('div')(() => ({
  '& .hero': {
    overflow: 'hidden',
  },
}));

export default VideoConvert;