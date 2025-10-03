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
import MergeTypeIcon from '@mui/icons-material/MergeType';
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
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Component imports
import { FileUploadArea, AudioList, ProgressDisplay, useAudioMerger, MIN_AUDIO_COUNT } from './index';

const AudioMerge: React.FC = () => {
  const theme = useTheme();

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
      title: 'Seamless Merging',
      description: 'Combine multiple audio files into one with precise control over the order and timing.',
      icon: <PrecisionManufacturingIcon fontSize="large" color="primary" />
    },
    {
      title: 'No Quality Loss',
      description: 'Merge audio files without re-encoding to maintain original quality and format.',
      icon: <HighQualityIcon fontSize="large" color="info" />
    },
    {
      title: 'Lightning Fast',
      description: 'Powered by WebAssembly for near-native performance directly in your browser.',
      icon: <SpeedIcon fontSize="large" color="secondary" />
    },
    {
      title: 'Always Free',
      description: 'Merge unlimited audio files with no restrictions, watermarks, or hidden fees.',
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
      title: 'Audio Trimmer',
      description: 'Cut and trim audio files precisely',
      icon: <ContentCutIcon color="secondary" />,
      link: '/tools/audio/trim'
    },
    {
      title: 'Audio Effects',
      description: 'Apply professional effects to audio',
      icon: <GraphicEqIcon color="secondary" />,
      link: '/tools/audio/effects'
    },
    {
      title: 'Audio Speed',
      description: 'Change audio playback speed',
      icon: <SpeedIcon color="secondary" />,
      link: '/tools/audio/playback'
    }
  ];

  return (
    <Root>
      <Helmet>
        <title>Merge Audio Files Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Join multiple audio tracks into one file instantly. Combine MP3, WAV, AAC files with ease."
        />
        <meta property="og:title" content={`Merge Audio Files Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/audio-merger-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/audio/merge" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Merge Audio Files Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Join multiple audio tracks into one file instantly. Combine MP3, WAV, AAC files with ease." />
        <meta name="twitter:image" content="/images/landing/audio-merger-hero.png" />
        <link rel="canonical" href="https://fileapps.click/tools/audio/merge" />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What audio formats can I merge?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our audio merger supports all major formats including MP3, WAV, AAC, FLAC, OGG, M4A, WMA, and many more. You can merge files of different formats and the output will be in your preferred format."
                }
              },
              {
                "@type": "Question",
                "name": "How many audio files can I merge at once?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can merge as many audio files as you need. There's no limit on the number of files you can combine in a single merge operation, making it perfect for creating playlists or compilations."
                }
              },
              {
                "@type": "Question",
                "name": "Are my files kept private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All audio merging happens locally in your browser using WebAssembly. Your files never leave your device or get uploaded to any server. This ensures complete privacy and security."
                }
              },
              {
                "@type": "Question",
                "name": "Does merging reduce audio quality?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No! Our merging process doesn't re-encode the audio unnecessarily, so there's minimal to no quality loss. The merged file maintains the quality of your original audio files."
                }
              },
              {
                "@type": "Question",
                "name": "Can I change the order of files before merging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! You can easily reorder your audio files by using the up and down arrows next to each file. This gives you full control over the sequence in your final merged audio file."
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
                  Merge Audio Files
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
                Join multiple audio tracks into one file instantly. Combine MP3, WAV, AAC files with ease.
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
                  Start Merging
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
                  Combine unlimited files with full order control
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ textAlign: 'center', order: { xs: 1, md: 2 } }}>
              <img
                src="/images/landing/audio-merger-hero.png"
                alt="Audio Merger Tool Interface"
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

            <CardActions sx={{ display: files.length ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 4, mt: 2, gap: 1 }}>
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
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Why Choose Our Audio Merger?
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
              <Typography variant="h6" gutterBottom fontWeight={600}>Upload Files</Typography>
              <Typography variant="body2" color="text.secondary">
                Select multiple audio files or drag & drop them into the merger
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
              <Typography variant="h6" gutterBottom fontWeight={600}>Arrange Order</Typography>
              <Typography variant="body2" color="text.secondary">
                Use arrow buttons to reorder files in your desired sequence
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
                Merge and download your combined audio file instantly
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
              <Typography variant="h6" fontWeight={600}>What audio formats can I merge?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our audio merger supports all major formats including MP3, WAV, AAC, FLAC, OGG, M4A, WMA, and many more.
                You can merge files of different formats and the output will be in your preferred format.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>How many audio files can I merge at once?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can merge as many audio files as you need. There's no limit on the number of files you can 
                combine in a single merge operation, making it perfect for creating playlists or compilations.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Are my files kept private?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! All audio merging happens locally in your browser using WebAssembly. Your files never leave
                your device or get uploaded to any server. This ensures complete privacy and security.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Does merging reduce audio quality?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No! Our merging process doesn't re-encode the audio unnecessarily, so there's minimal to no quality loss. 
                The merged file maintains the quality of your original audio files.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I change the order of files before merging?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! You can easily reorder your audio files by using the up and down arrows next to each file. 
                This gives you full control over the sequence in your final merged audio file.
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
            <MergeTypeIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Merge Audio Files?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start combining your audio files now with our free, secure, and easy-to-use tool.
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
              Merge Audio Now
            </Button>
          </Paper>
        </Container>
      </section>
    </Root>
  );
};

// Styled components
const Root = styled('div')(() => ({
  '& .hero': {
    overflow: 'hidden',
  },
}));

export default AudioMerge;

