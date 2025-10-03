import { useState } from 'react';
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
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Icons
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SecurityIcon from '@mui/icons-material/Security';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import DevicesIcon from '@mui/icons-material/Devices';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import SpeedIcon from '@mui/icons-material/Speed';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Component imports
import { useAudioTrimmer } from './useAudioTrimmer';
import FileUploadArea from './FileUploadArea';
import ProgressDisplay from './ProgressDisplay';
import TrimSettings from './TrimSettings';
import FileInfoDisplay from '../../../components/shared/FileInfoDisplay';

function AudioTrim() {
  const theme = useTheme();

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
      description: 'All audio processing happens locally in your browser. Your files never leave your device.',
      icon: <SecurityIcon fontSize="large" color="success" />
    },
    {
      title: 'Precision Trimming',
      description: 'Frame-accurate trimming with visual waveform display for perfect timing control.',
      icon: <PrecisionManufacturingIcon fontSize="large" color="primary" />
    },
    {
      title: 'No Quality Loss',
      description: 'Trim audio without re-encoding to maintain original quality and format.',
      icon: <HighQualityIcon fontSize="large" color="info" />
    },
    {
      title: 'Lightning Fast',
      description: 'Powered by WebAssembly for near-native performance directly in your browser.',
      icon: <SpeedIcon fontSize="large" color="secondary" />
    },
    {
      title: 'Always Free',
      description: 'Trim unlimited audio files with no restrictions, watermarks, or hidden fees.',
      icon: <MoneyOffIcon fontSize="large" color="warning" />
    },
    {
      title: 'All Devices Supported',
      description: 'Works on Windows, Mac, Linux, iOS, and Android. No software installation needed.',
      icon: <DevicesIcon fontSize="large" color="error" />
    }
  ];

  const relatedTools = [
    {
      title: 'Audio Converter',
      description: 'Convert between different audio formats',
      icon: <SwapHorizIcon color="secondary" />,
      link: '/tools/audio/convert'
    },
    {
      title: 'Audio Merger',
      description: 'Combine multiple audio files seamlessly',
      icon: <MergeTypeIcon color="secondary" />,
      link: '/tools/audio/merge'
    },
    {
      title: 'Audio Effects',
      description: 'Apply professional effects to audio',
      icon: <GraphicEqIcon color="secondary" />,
      link: '/tools/audio/effects'
    },
    {
      title: 'Extract Audio',
      description: 'Extract audio from video files',
      icon: <AudiotrackIcon color="secondary" />,
      link: '/tools/audio/extract'
    }
  ];

  // Local helpers that touch only presentation state (duration/range)
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      setDuration(dur);
      setRange([0, Math.floor(dur)]);
    }
  };

  return (
    <Root>
      <Helmet>
        <title>Cut and Trim Audio Files Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Trim and cut audio files with precision timing for podcasts, music, or voiceovers. Local processing — private & watermark-free."
        />
        <meta property="og:title" content={`Cut and Trim Audio Files Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/audio-trim-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/audio-trim" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Cut and Trim Audio Files Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Trim and cut audio files with precision timing for podcasts, music, or voiceovers. Local processing — private & watermark-free." />
        <meta name="twitter:image" content="/images/landing/audio-trim-hero.png" />
        <link rel="canonical" href="https://fileapps.click/tools/audio-trim" />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What audio formats can I trim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our audio trimmer supports all major formats including MP3, WAV, AAC, FLAC, OGG, M4A, WMA, and many more. The trimmed file will maintain the same format as the original."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is the trimming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our tool provides frame-accurate trimming with precision down to milliseconds. You can use the visual timeline and audio preview to select exact start and end points for perfect timing control."
                }
              },
              {
                "@type": "Question",
                "name": "Are my files kept private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All trimming happens locally in your browser using WebAssembly. Your files never leave your device or get uploaded to any server. This ensures complete privacy and security of your audio files."
                }
              },
              {
                "@type": "Question",
                "name": "Does trimming reduce audio quality?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No! Our trimming process doesn't re-encode the audio, so there's no quality loss. We simply extract the selected portion while maintaining the original audio quality and format specifications."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for commercial projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our audio trimmer is completely free for both personal and commercial use. There are no watermarks, licensing fees, or restrictions on how you can use the trimmed audio files."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className='hero'>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', pt: { xs: 10, md: 20 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 6,
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Box sx={{ order: { xs: 2, md: 1 } }}>
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
                  Trim Audio
                </Typography>
                {' '}Files Online For Free
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
                Trim and cut audio files with precision timing for podcasts, music, or voiceovers. Local processing — private & watermark‑free.
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
                  Start Trimming
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
                  Supports MP3, WAV, AAC, FLAC, OGG, M4A and more
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ textAlign: 'center', order: { xs: 1, md: 2 } }}>
              <img
                src="/images/landing/audio-trim-hero.png"
                alt="Audio Trim Tool Interface"
                style={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  borderRadius: 16
                }}
              />
            </Box>
          </Box>
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
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onInputChange={handleFileChange}
                inputRef={fileInputRef}
                audioRef={audioRef}
                onLoadedMetadata={handleLoadedMetadata}
              />

              {/* File information and remove button */}
              {file && <FileInfoDisplay file={file} onRemove={removeFile} isProcessing={isProcessing} />}

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

            <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 4, mt: 2, gap: 1 }}>
              <Button variant="contained" onClick={() => handleTrim(range[0], range[1])} disabled={isProcessing || !file || duration === 0}>
                {isProcessing ? 'Trimming' : 'Trim'}
              </Button>
              {!isProcessing && (
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              )}
              {isProcessing && (
                <Button color="error" variant="contained" onClick={handleStop} disabled={!isProcessing}>
                  Stop
                </Button>
              )}
              {downloadUrl && downloadSize !== null && (
                <Button color="success" variant="contained" onClick={handleDownload}>
                  Download ({formatBytes(downloadSize)})
                </Button>
              )}
            </CardActions>

            <ProgressDisplay isProcessing={isProcessing} progress={progress} status={status} consoleLogs={consoleLogs} />
          </Card>
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Why Choose Our Audio Trimmer?
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 4
            }}
          >
            {benefits.map((benefit, index) => (
              <Card key={index} elevation={0} sx={{ height: '100%', bgcolor: alpha(theme.palette.background.paper, 0.5), backdropFilter: 'blur(5px)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[4] } }}>
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
            ))}
          </Box>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            How It Works
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 4
            }}
          >
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
              <Typography variant="h6" gutterBottom fontWeight={600}>Upload Audio</Typography>
              <Typography variant="body2" color="text.secondary">
                Select your audio file or drag & drop it into the trimmer
              </Typography>
            </Box>
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
              <Typography variant="h6" gutterBottom fontWeight={600}>Set Trim Points</Typography>
              <Typography variant="body2" color="text.secondary">
                Use visual timeline to select precise start and end points
              </Typography>
            </Box>
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
                Trim and download your audio file instantly to your device
              </Typography>
            </Box>
          </Box>
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
              <Typography variant="h6" fontWeight={600}>What audio formats can I trim?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our audio trimmer supports all major formats including MP3, WAV, AAC, FLAC, OGG, M4A, WMA, and many more.
                The trimmed file will maintain the same format as the original.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>How accurate is the trimming?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our tool provides frame-accurate trimming with precision down to milliseconds. You can use the visual 
                timeline and audio preview to select exact start and end points for perfect timing control.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Are my files kept private?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! All trimming happens locally in your browser using WebAssembly. Your files never leave
                your device or get uploaded to any server. This ensures complete privacy and security of your audio files.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Does trimming reduce audio quality?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No! Our trimming process doesn't re-encode the audio, so there's no quality loss. We simply extract
                the selected portion while maintaining the original audio quality and format specifications.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I use this for commercial projects?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Our audio trimmer is completely free for both personal and commercial use. There are no
                watermarks, licensing fees, or restrictions on how you can use the trimmed audio files.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </section>

      {/* Related Tools Section */}
      <section className="related-tools">
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            More Audio Tools
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3
            }}
          >
            {relatedTools.map((tool, index) => (
              <Card
                key={index}
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
            ))}
          </Box>
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
            <ContentCutIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Trim Your Audio?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start trimming your audio files now with our free, secure, and easy-to-use tool.
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
              Trim Audio Now
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

export default AudioTrim;