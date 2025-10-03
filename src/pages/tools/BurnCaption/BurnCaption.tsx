import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { APP_INFO } from '../../../constants';
import { styled, alpha, useTheme } from '@mui/material/styles';

// MUI imports
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import CropIcon from '@mui/icons-material/Crop';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

// Component imports
import { useCaptionBurner } from './useCaptionBurner';
import FileUploadArea from './FileUploadArea';
import SubtitleUpload from './SubtitleUpload';
import StyleControls from './StyleControls';
import ProgressDisplay from './ProgressDisplay';
import { formatFileSize } from './utils';

function BurnCaption() {
  const theme = useTheme();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    state,
    removeVideoFile,
    removeSubtitleFile,
    onDragOver,
    onDragLeave,
    onDrop,
    onVideoInputChange,
    onSubtitleInputChange,
    updateFontSize,
    updateFontColor,
    updateOutlineColor,
    updateOutlineWidth,
    adjustFontSize,
    adjustOutlineWidth,
    burnCaptions,
    stopBurning,
    downloadBurnedVideo,
    canBurnCaptions,
    resetAll,
    clearError
  } = useCaptionBurner();

  const handleRemoveVideoFile = () => {
    removeVideoFile(fileInputRef);
  };

  const handleRemoveSubtitleFile = () => {
    removeSubtitleFile(subtitleInputRef);
  };

  const handleReset = () => {
    resetAll(fileInputRef, subtitleInputRef);
  };

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
      description: 'All caption burning happens locally in your browser. Your files never leave your device.',
      icon: <SecurityIcon fontSize="large" color="success" />
    },
    {
      title: 'No Upload Required',
      description: 'Burn captions directly in your browser without uploading to any server.',
      icon: <CloudOffIcon fontSize="large" color="info" />
    },
    {
      title: 'Always Free',
      description: 'Burn captions on unlimited videos with no restrictions, watermarks, or hidden fees.',
      icon: <MoneyOffIcon fontSize="large" color="warning" />
    },
    {
      title: 'High-Quality Output',
      description: 'Maintain video quality while adding professional-looking subtitles with custom styling.',
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
      title: 'Video Converter',
      description: 'Convert videos to different formats',
      icon: <VideoFileIcon color="secondary" />,
      link: '/tools/video/convert'
    },
    {
      title: 'Video Resizer',
      description: 'Resize videos to different dimensions',
      icon: <AspectRatioIcon color="secondary" />,
      link: '/tools/video/resize'
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
        <title>Burn Captions Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Add subtitles to videos. Burn captions directly into the video. Supports SRT and VTT formats. Customize font, size, color, and position."
        />
        <meta property="og:title" content={`Burn Captions Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/burn-captions-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/burn-caption" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Burn Captions Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Add subtitles to videos. Burn captions directly into the video. Supports SRT and VTT formats. Customize font, size, color, and position." />
        <meta name="twitter:image" content="/images/landing/burn-captions-hero.png" />
        <link rel="canonical" href="https://fileapps.click/tools/burn-caption" />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What subtitle formats are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support popular subtitle formats including SRT and VTT files. These are the most common formats used for subtitles and captions in videos."
                }
              },
              {
                "@type": "Question",
                "name": "Can I customize the appearance of captions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! You can customize font size, font color, outline color, and outline width to match your video's style and ensure optimal readability."
                }
              },
              {
                "@type": "Question",
                "name": "Are my video files kept private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All caption burning happens locally in your browser using WebAssembly. Your videos and subtitle files never leave your device or get uploaded to any server."
                }
              },
              {
                "@type": "Question",
                "name": "What video formats are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support all major video formats including MP4, MOV, AVI, MKV, WebM, and many more. The output will maintain the same format as your input video."
                }
              },
              {
                "@type": "Question",
                "name": "Will the video quality be affected?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our caption burning process is designed to maintain the original video quality while permanently embedding the subtitles into the video stream."
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
                  Burn Captions
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
                Add subtitles to videos. Burn captions directly into the video. Supports SRT and VTT formats. Customize font, size, color, and position.
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
                  Start Burning
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
                  Supports SRT and VTT subtitle formats
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="/images/landing/burn-captions-hero.png"
                  alt="Burn Captions Tool Interface"
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
              {/* File Upload Area */}
              <FileUploadArea
                videoFile={state.videoFile}
                isDragActive={state.isDragActive}
                isProcessing={state.processing.isProcessing}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onInputChange={onVideoInputChange}
                onRemoveFile={handleRemoveVideoFile}
                inputRef={fileInputRef}
                videoRef={videoRef}
              />

              {/* Subtitle Upload */}
              <SubtitleUpload
                subtitleFile={state.subtitleFile}
                isProcessing={state.processing.isProcessing}
                hasVideoFile={!!state.videoFile}
                onInputChange={onSubtitleInputChange}
                onRemoveFile={handleRemoveSubtitleFile}
                inputRef={subtitleInputRef}
              />

              {/* Style Controls */}
              {state.videoFile && state.subtitleFile && (
                <StyleControls
                  styleOptions={state.styleOptions}
                  isProcessing={state.processing.isProcessing}
                  onFontSizeChange={updateFontSize}
                  onFontColorChange={updateFontColor}
                  onOutlineColorChange={updateOutlineColor}
                  onOutlineWidthChange={updateOutlineWidth}
                  onAdjustFontSize={adjustFontSize}
                  onAdjustOutlineWidth={adjustOutlineWidth}
                />
              )}
            </CardContent>

            {/* Action Buttons */}
            <CardActions sx={{
              display: state.videoFile && state.subtitleFile ? 'flex' : 'none',
              flexWrap: 'wrap',
              justifyContent: 'center',
              pb: 4,
              mt: 2,
              gap: 1
            }}>
              <Button
                variant="contained"
                onClick={burnCaptions}
                disabled={!canBurnCaptions()}
                size="small"
              >
                {state.processing.isProcessing ? 'Burning...' : 'Burn Caption'}
              </Button>

              {!state.processing.isProcessing && (
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  size="small"
                >
                  Reset
                </Button>
              )}

              {state.processing.isProcessing && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={stopBurning}
                  size="small"
                >
                  Stop
                </Button>
              )}

              {state.download.url && state.download.size !== null && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={downloadBurnedVideo}
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

            {/* Error Alert */}
            {state.processing.errorMsg && (
              <Alert
                severity="error"
                sx={{ mt: 2 }}
                onClose={clearError}
              >
                {state.processing.errorMsg}
              </Alert>
            )}
          </Card>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Why Choose Our Caption Burner?
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
                <Typography variant="h6" gutterBottom fontWeight={600}>Upload Video & Subtitles</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select your video file and upload your SRT or VTT subtitle file
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
                <Typography variant="h6" gutterBottom fontWeight={600}>Customize Style</Typography>
                <Typography variant="body2" color="text.secondary">
                  Adjust font size, color, outline, and positioning to match your preferences
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
                  Get your video with permanently burned-in captions
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
              <Typography variant="h6" fontWeight={600}>What subtitle formats are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We support popular subtitle formats including SRT and VTT files. These are the most common formats 
                used for subtitles and captions in videos.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I customize the appearance of captions?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! You can customize font size, font color, outline color, and outline width to match your video's 
                style and ensure optimal readability.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Are my video files kept private?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! All caption burning happens locally in your browser using WebAssembly. Your videos and 
                subtitle files never leave your device or get uploaded to any server.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>What video formats are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We support all major video formats including MP4, MOV, AVI, MKV, WebM, and many more. 
                The output will maintain the same format as your input video.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Will the video quality be affected?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our caption burning process is designed to maintain the original video quality while permanently 
                embedding the subtitles into the video stream.
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
            <SubtitlesIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Burn Captions?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start adding professional captions to your videos now with our free, secure, and easy-to-use tool.
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
              Burn Captions Now
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

export default BurnCaption;
