import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';
import { styled, alpha, useTheme } from '@mui/material/styles';

// MUI imports
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Icon imports
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CompressIcon from '@mui/icons-material/Compress';
import CropIcon from '@mui/icons-material/Crop';
import DevicesIcon from '@mui/icons-material/Devices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import InfoIcon from '@mui/icons-material/Info';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import VideoFileIcon from '@mui/icons-material/VideoFile';

// Component imports
import FileUploadArea from './FileUploadArea';
import ResizeSettings from './ResizeSettings';
import ProgressDisplay from './ProgressDisplay';
import { useVideoResizer } from './useVideoResizer';

function VideoResize() {
  const theme = useTheme();

  const {
    // Refs
    videoRef,
    fileInputRef,

    // State
    file,
    previewUrl,
    width,
    height,
    resolutionRatio,
    resizeMode,
    fps,
    errorMsg,
    warningMsg,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    isDragActive,

    // Event handlers
    handleFileChange,
    handleRemoveFile,
    handleLoadedMetadata,
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleResizeModeChange,
    handleFpsChange,
    handleReset,
    handleDownload,

    // Drag handlers
    onDragOver,
    onDragLeave,
    onDrop,

    // Processing
    processVideo,
    stopProcessing,
  } = useVideoResizer();

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
      description: 'All video resizing happens locally in your browser. Your files never leave your device.',
      icon: <SecurityIcon fontSize="large" color="success" />
    },
    {
      title: 'No Upload Required',
      description: 'Resize video files directly in your browser without uploading to any server.',
      icon: <CloudOffIcon fontSize="large" color="info" />
    },
    {
      title: 'Always Free',
      description: 'Resize unlimited video files with no restrictions, watermarks, or hidden fees.',
      icon: <MoneyOffIcon fontSize="large" color="warning" />
    },
    {
      title: 'High-Quality Output',
      description: 'Maintain video quality while resizing to your desired dimensions and aspect ratios.',
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
      title: 'Video Converter',
      description: 'Convert videos to different formats',
      icon: <VideoFileIcon color="secondary" />,
      link: '/tools/video/convert'
    },
    {
      title: 'Video Trimmer',
      description: 'Cut and trim video segments precisely',
      icon: <CropIcon color="secondary" />,
      link: '/tools/video/trim'
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
        <title>Resize Video Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Resize videos to custom dimensions or aspect ratios (16:9, 4:3, 1:1) for social media. Change resolution privately in your browser."
        />
        <meta property="og:title" content={`Resize Video Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/video-resizer-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/resize" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Resize Video Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Resize videos to custom dimensions or aspect ratios (16:9, 4:3, 1:1) for social media. Change resolution privately in your browser." />
        <meta name="twitter:image" content="/images/landing/video-resizer-hero.png" />
        <link rel="canonical" href="https://fileapps.click/tools/video/resize" />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What aspect ratios are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support all common aspect ratios including 16:9 (widescreen), 4:3 (standard), 1:1 (square), 9:16 (vertical), and custom dimensions. Perfect for social media platforms like Instagram, TikTok, YouTube, and more."
                }
              },
              {
                "@type": "Question",
                "name": "Will resizing affect video quality?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our resizer maintains the highest possible quality during the resize process. When scaling up, we use advanced algorithms to minimize pixelation. When scaling down, quality is preserved efficiently."
                }
              },
              {
                "@type": "Question",
                "name": "Are my video files kept private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All resizing happens locally in your browser using WebAssembly. Your videos never leave your device or get uploaded to any server. This ensures complete privacy and security."
                }
              },
              {
                "@type": "Question",
                "name": "What video formats are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support all major video formats including MP4, MOV, AVI, MKV, WebM, WMV, FLV, and many more. The output will maintain the same format as your input file."
                }
              },
              {
                "@type": "Question",
                "name": "Can I resize videos for social media?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our tool includes preset aspect ratios optimized for social media platforms. Choose 16:9 for YouTube, 1:1 for Instagram posts, 9:16 for Stories and TikTok, or set custom dimensions for any platform."
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
                  Resize Video
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
                Resize videos to custom dimensions or aspect ratios (16:9, 4:3, 1:1) for social media. Change resolution privately in your browser.
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
                  Start Resizing
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
                  Perfect for YouTube, Instagram, TikTok and more
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="/images/landing/video-resizer-hero.png"
                  alt="Video Resize Tool Interface"
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
              <FileUploadArea
                file={file}
                previewUrl={previewUrl}
                videoRef={videoRef}
                fileInputRef={fileInputRef}
                isDragActive={isDragActive}
                isProcessing={isProcessing}
                width={width}
                height={height}
                resizeMode={resizeMode}
                onFileChange={handleFileChange}
                onRemoveFile={handleRemoveFile}
                onLoadedMetadata={handleLoadedMetadata}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              />

              {file && (
                <ResizeSettings
                  width={width}
                  height={height}
                  resolutionRatio={resolutionRatio}
                  resizeMode={resizeMode}
                  fps={fps}
                  onWidthChange={resolutionRatio === 'custom' ? (e) => handleWidthChange(e) : handleWidthChange}
                  onHeightChange={resolutionRatio === 'custom' ? (e) => handleHeightChange(e) : handleHeightChange}
                  onRatioChange={handleRatioChange}
                  onResizeModeChange={handleResizeModeChange}
                  onFpsChange={handleFpsChange}
                  onReset={handleReset}
                />
              )}
            </CardContent>

            <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 4, mt: 2, gap: 1 }}>
              <Button variant="contained" onClick={processVideo} disabled={isProcessing || !file}>
                {isProcessing ? 'Resizing' : 'Resize'}
              </Button>
              {!isProcessing && (
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              )}
              {isProcessing && (
                <Button color="error" variant="contained" onClick={stopProcessing}>
                  Stop
                </Button>
              )}
              {downloadUrl && downloadSize !== null && (
                <Button color="success" variant="contained" onClick={handleDownload}>
                  Download ({formatBytes(downloadSize)})
                </Button>
              )}
            </CardActions>

            <ProgressDisplay
              isProcessing={isProcessing}
              progress={progress}
              status={status}
              consoleLogs={consoleLogs}
            />

            {warningMsg && (
              <Alert severity="warning" sx={{ mt: 2, fontSize: '0.875rem' }}>
                {warningMsg}
              </Alert>
            )}
          </Card>
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Why Choose Our Video Resizer?
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
                  Select your video file or drag & drop it into the resizer
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
                <Typography variant="h6" gutterBottom fontWeight={600}>Choose Dimensions</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select aspect ratio or set custom width and height for your needs
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
                  Get your resized video file ready for any platform or use case
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
              <Typography variant="h6" fontWeight={600}>What aspect ratios are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We support all common aspect ratios including 16:9 (widescreen), 4:3 (standard), 1:1 (square), 9:16 (vertical), and custom dimensions.
                Perfect for social media platforms like Instagram, TikTok, YouTube, and more.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Will resizing affect video quality?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our resizer maintains the highest possible quality during the resize process. When scaling up, we use advanced algorithms 
                to minimize pixelation. When scaling down, quality is preserved efficiently.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Are my video files kept private?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! All resizing happens locally in your browser using WebAssembly. Your videos never leave
                your device or get uploaded to any server. This ensures complete privacy and security.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>What video formats are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We support all major video formats including MP4, MOV, AVI, MKV, WebM, WMV, FLV, and many more.
                The output will maintain the same format as your input file.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I resize videos for social media?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Our tool includes preset aspect ratios optimized for social media platforms. Choose 16:9 for YouTube, 
                1:1 for Instagram posts, 9:16 for Stories and TikTok, or set custom dimensions for any platform.
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
            <AspectRatioIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Resize Your Video?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start resizing your video files now with our free, secure, and easy-to-use tool.
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
              Resize Video Now
            </Button>
          </Paper>
        </Container>
      </section>
    </Root>
  );
}

// Styled components
const Root = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
}));

export default VideoResize;