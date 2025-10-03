import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { APP_INFO } from "../constants";

// MUI imports
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';

// Icons
import VideocamIcon from '@mui/icons-material/Videocam';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ImageIcon from '@mui/icons-material/Image';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CompressIcon from '@mui/icons-material/Compress';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import SpeedIcon from '@mui/icons-material/Speed';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SecurityIcon from '@mui/icons-material/Security';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DevicesIcon from '@mui/icons-material/Devices';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Root = styled('div')(({ theme }) => ({
  '& > section': {
    display: 'flex',
    alignItems: 'center',
    paddingBlock: theme.spacing(15),
    [theme.breakpoints.down('md')]: {
      paddingBlock: theme.spacing(5),
    }
  },
  '& > .hero': {
    background: `url('/images/backgrounds/bg0.jpg') no-repeat center/cover fixed`,
    paddingBottom: `0`,
    '& .left': {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      }
    }
  },
  '& .benefits': {
    background: `url('/images/backgrounds/bg0.jpg') no-repeat center/cover fixed`,
  },
  '& .tools': {
    '&.video': {
      background: `url('/images/backgrounds/bg1.jpg') no-repeat center/cover fixed`,
      '& h2': {
        color: theme.palette.primary.main,
      },
    },
    '&.audio': {
      background: `url('/images/backgrounds/bg2.jpg') no-repeat center/cover fixed`,
      '& h2': {
        color: theme.palette.secondary.main,
      },
    },
    '&.image': {
      background: `url('/images/backgrounds/bg3.jpg') no-repeat center/cover fixed`,
      '& h2': {
        color: theme.palette.warning.main,
      },
    },
  },
  '& .faq': {
    background: `url('/images/backgrounds/bg0.jpg') no-repeat center/cover fixed`,
  },
  '& .cta': {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(15),
    }
  }
}));

// Slider component for hero images
const HeroSlider = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  '& .slider-image': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 1s ease-in-out',
    opacity: 0,
    '&.active': {
      opacity: 1,
    },
  },
  '& .slider-placeholder': {
    width: '100%',
    height: 'auto',
    opacity: 0,
  },
}));

const sliderImages = [
  '/images/slider/slider1.png',
  '/images/slider/slider2.png',
  '/images/slider/slider3.png',
  '/images/slider/slider4.png',
];

const sliderAltTexts = [
  'Professional video editing interface',
  'Audio processing workspace',
  'Image editing tools',
  'Multimedia conversion dashboard',
];

function Home() {
  const theme = useTheme();

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      title: '100% Private & Secure',
      description: 'All processing happens locally in your browser. Your files never leave your device or get uploaded to any server.',
      icon: <SecurityIcon fontSize="large" />,
      color: theme.palette.success.main
    },
    {
      title: 'No Installation Required',
      description: 'Use professional-grade tools directly in your browser. No software downloads, no setup, no account creation.',
      icon: <DevicesIcon fontSize="large" />,
      color: theme.palette.info.main
    },
    {
      title: 'Always Free',
      description: 'All tools are completely free with no limitations, watermarks, or hidden fees. Perfect for personal and commercial use.',
      icon: <FreeBreakfastIcon fontSize="large" />,
      color: theme.palette.warning.main
    },
    {
      title: 'Lightning Fast',
      description: 'Powered by WebAssembly and modern web technologies for near-native performance right in your browser.',
      icon: <SpeedOutlinedIcon fontSize="large" />,
      color: theme.palette.primary.main
    },
    {
      title: 'Trusted by Thousands',
      description: 'Used by content creators, businesses, and professionals worldwide for reliable multimedia processing.',
      icon: <VerifiedUserIcon fontSize="large" />,
      color: theme.palette.secondary.main
    },
    {
      title: 'Constantly Improving',
      description: 'Regular updates with new features, format support, and performance improvements based on user feedback.',
      icon: <TrendingUpIcon fontSize="large" />,
      color: theme.palette.error.main
    }
  ];

  const videoTools = [
    {
      title: 'Video Converter',
      description: 'Convert between MP4, MOV, MKV, AVI, WebM and more. High-quality conversion with custom settings.',
      icon: <SwapHorizIcon color="primary" />,
      link: '/tools/video/convert',
      color: theme.palette.primary.main
    },
    {
      title: 'Video Compressor',
      description: 'Reduce file size while maintaining quality. Perfect for sharing and storage optimization.',
      icon: <CompressIcon color="primary" />,
      link: '/tools/video/compression',
      color: theme.palette.primary.main
    },
    {
      title: 'Video Resizer',
      description: 'Change resolution, aspect ratio, and dimensions. Optimize for different platforms and devices.',
      icon: <AspectRatioIcon color="primary" />,
      link: '/tools/video/resize',
      color: theme.palette.primary.main
    },
    {
      title: 'Video Trimmer',
      description: 'Cut and trim videos precisely. Remove unwanted sections with frame-accurate editing.',
      icon: <ContentCutIcon color="primary" />,
      link: '/tools/video/trim',
      color: theme.palette.primary.main
    },
    {
      title: 'Video Merger',
      description: 'Combine multiple videos into one seamless file. Support for different formats and resolutions.',
      icon: <MergeTypeIcon color="primary" />,
      link: '/tools/video/merge',
      color: theme.palette.primary.main
    },
    {
      title: 'Speed Controller',
      description: 'Adjust playback speed from 0.25x to 4x. Create slow-motion or time-lapse effects.',
      icon: <SpeedIcon color="primary" />,
      link: '/tools/video/playback',
      color: theme.palette.primary.main
    },
    {
      title: 'Subtitle Burner',
      description: 'Embed subtitles directly into videos. Support for SRT, VTT, and text overlay.',
      icon: <SubtitlesIcon color="primary" />,
      link: '/tools/video/burn-caption',
      color: theme.palette.primary.main
    }
  ];

  const audioTools = [
    {
      title: 'Audio Converter',
      description: 'Convert between MP3, WAV, AAC, FLAC, OGG formats with customizable quality settings.',
      icon: <MusicNoteIcon color="secondary" />,
      link: '/tools/audio/convert',
      color: theme.palette.secondary.main
    },
    {
      title: 'Audio Trimmer',
      description: 'Precision audio editing with waveform visualization. Cut, trim, and extract segments.',
      icon: <ContentCutIcon color="secondary" />,
      link: '/tools/audio/trim',
      color: theme.palette.secondary.main
    },
    {
      title: 'Audio Merger',
      description: 'Combine multiple audio tracks seamlessly. Perfect for podcasts and music production.',
      icon: <MergeTypeIcon color="secondary" />,
      link: '/tools/audio/merge',
      color: theme.palette.secondary.main
    },
    {
      title: 'Audio Effects',
      description: 'Apply professional effects: normalize, fade in/out, amplify, and audio enhancement.',
      icon: <GraphicEqIcon color="secondary" />,
      link: '/tools/audio/effects',
      color: theme.palette.secondary.main
    },
    {
      title: 'Speed & Pitch',
      description: 'Adjust playback speed and pitch independently. Perfect for music and voice editing.',
      icon: <SpeedIcon color="secondary" />,
      link: '/tools/audio/playback',
      color: theme.palette.secondary.main
    },
    {
      title: 'Extract Audio',
      description: 'Extract high-quality audio tracks from videos in any format you need.',
      icon: <GraphicEqIcon color="secondary" />,
      link: '/tools/audio/extract',
      color: theme.palette.secondary.main
    }
  ];

  const imageTools = [
    {
      title: 'Image Converter & Editor',
      description: 'Convert, resize, crop, rotate, and apply filters to JPG, PNG, WebP, GIF images. Local processing in your browser — fast, secure, no watermark.',
      icon: <ImageIcon color="warning" />,
      link: '/tools/image/convert',
      color: theme.palette.warning.main
    },
    {
      title: 'Thumbnail Generator',
      description: 'Extract high-quality thumbnails from videos instantly. Generate preview images in multiple sizes — no watermark, no signup required.',
      icon: <PhotoSizeSelectActualIcon color="warning" />,
      link: '/tools/image/thumbnail',
      color: theme.palette.warning.main
    }
  ];

  return (
    <Root>
      <Helmet>
        <title>Free Online Video, Audio & Image Tools</title>
        <meta name="description" content="Professional video, audio, and image processing tools that work entirely in your browser. Convert, edit, compress, and enhance multimedia files privately and for free." />
        <meta name="keywords" content="video converter, audio editor, image tools, online multimedia, ffmpeg, browser processing" />
        <meta property="og:title" content="Free Online Video, Audio & Image Tools" />
        <meta property="og:description" content="Professional multimedia processing tools that work entirely in your browser. Private, fast, and always free." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Video, Audio & Image Tools" />
        <meta name="twitter:description" content="Professional multimedia processing tools that work entirely in your browser. Private, fast, and always free." />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this really free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, completely free! All our tools are open-source and run entirely in your browser. There are no hidden fees, subscriptions, or limitations on usage. We believe in keeping multimedia processing accessible to everyone."
                }
              },
              {
                "@type": "Question",
                "name": "How is my privacy protected?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Your files never leave your device. All processing happens locally in your browser using WebAssembly technology. We don't upload, store, or have access to your files. What you process stays completely private."
                }
              },
              {
                "@type": "Question",
                "name": "What file formats are supported?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support all major formats: MP4, MOV, MKV, AVI, WebM for video; MP3, WAV, AAC, FLAC, OGG for audio; and JPG, PNG, WebP, GIF for images. Our tools can convert between these formats and many others."
                }
              },
              {
                "@type": "Question",
                "name": "Are there file size limits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "File size limits depend on your device's memory and processing power. Generally, files up to several GB can be processed. Larger files may take longer to process but there are no artificial restrictions imposed by our service."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to install anything?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No installation required! Our tools work directly in your web browser. We use modern web technologies like WebAssembly to bring desktop-quality processing to the browser. Just visit our site and start using the tools immediately."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for commercial projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Our tools are free for both personal and commercial use. Whether you're a content creator, business, or enterprise, you can use our platform without restrictions or licensing fees."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className='hero'>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Grid container spacing={6} alignItems="center" flexDirection={{ xs: 'column-reverse', md: 'row' }}>
            <Grid size={{ xs: 12, md: 6, lg: 7 }} className="left">
              <Stack direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} spacing={2} sx={{ mb: 4 }}>
                <Chip
                  label="100% Private"
                  color="success"
                  size='medium'
                  icon={<SecurityIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Chip
                  label="No Uploads"
                  color="info"
                  size='medium'
                  icon={<CloudOffIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Chip
                  label="Always Free"
                  color="warning"
                  size='medium'
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
                  mb: 3
                }}
              >
                Professional
                <Typography
                  className='gradient-text-primary'
                  sx={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit'
                  }}
                >
                  Multimedia Tools
                </Typography>
                in Your Browser
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 4,
                  lineHeight: 1.4,
                  fontWeight: 400
                }}
              >
                Convert, edit, and enhance videos, audio, and images with professional-grade tools.
                All processing happens locally — your files stay private and secure.
              </Typography>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 6 }}>
                <Button
                  component={RouterLink}
                  to="/tools/video/convert"
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  Start Processing
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
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                }}
              >
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  Trusted by 1000s creators worldwide
                </Typography>
              </Paper>
            </Grid>

            <Grid container size={{ xs: 12, md: 6, lg: 5 }} justifyContent={{md: 'flex-end'}} alignItems="center" className="right">
              <HeroSlider>
                {/* Placeholder image for proper sizing */}
                <img
                  className="slider-placeholder"
                  src={sliderImages[0]}
                  alt=""
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: 400,
                  }}
                />
                {/* Actual slider images */}
                {sliderImages.map((image, index) => (
                  <img
                    key={index}
                    className={`slider-image ${index === currentSlide ? 'active' : ''}`}
                    src={image}
                    alt={sliderAltTexts[index]}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: 600,
                    }}
                  />
                ))}
              </HeroSlider>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Key Benefits Section */}
      <section className='benefits'>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 2 }}>
            Why Choose {APP_INFO.name}?
          </Typography>
          <Typography variant="h6" component="p" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            We've built the most comprehensive, secure, and user-friendly media processing platform that works entirely in your browser.
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card elevation={0} sx={{ height: '100%', bgcolor: alpha(theme.palette.background.paper, 0.5), backdropFilter: 'blur(5px)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[4] } }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2, color: benefit.color }}>
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

      {/* Video Tools Section */}
      <section className='tools video'>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                <Typography variant="h2" component="h2" gutterBottom fontWeight={700}>
                  <VideocamIcon fontSize="large" sx={{ mr: 2, verticalAlign: 'middle' }} />
                  Video Tools
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  Professional video processing tools that work entirely in your browser. Convert formats,
                  compress files, edit content, and apply effects without any software installation.
                </Typography>

                <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: alpha(theme.palette.info.main, 0.05) }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    What You Can Do:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Convert MP4, MOV, MKV, AVI, WebM formats" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Compress videos while maintaining quality" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Resize and change aspect ratios" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Trim, merge, and edit video clips" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Extract audio and burn subtitles" />
                    </ListItem>
                  </List>
                </Paper>

                <Button
                  component={RouterLink}
                  to="/tools/video/convert"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<VideocamIcon />}
                >
                  Start with Video Tools
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Grid container spacing={3}>
                {videoTools.map((tool) => (
                  <Grid key={tool.title} size={{ xs: 12, sm: 6 }}>
                    <Card
                      component={RouterLink}
                      to={tool.link}
                      elevation={0}
                      sx={{
                        display: 'block',
                        height: '100%',
                        textDecoration: 'none',
                        background: alpha(theme.palette.background.paper, 0.5),
                        backdropFilter: 'blur(5px)',
                        border: `1px dotted ${theme.palette.divider}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                          borderColor: tool.color
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          {tool.icon}
                          <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
                            {tool.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                          {tool.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Audio Tools Section */}
      <section className='tools audio'>
        <Container maxWidth="lg">
          <Grid container spacing={6} flexDirection={{ xs: 'column-reverse', lg: 'row' }}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Grid container spacing={3}>
                {audioTools.map((tool) => (
                  <Grid key={tool.title} size={{ xs: 12, sm: 6 }}>
                    <Card
                      component={RouterLink}
                      to={tool.link}
                      elevation={0}
                      sx={{
                        display: 'block',
                        height: '100%',
                        textDecoration: 'none',
                        background: alpha(theme.palette.background.paper, 0.5),
                        backdropFilter: 'blur(5px)',
                        border: `1px dotted ${theme.palette.divider}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                          borderColor: tool.color
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          {tool.icon}
                          <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
                            {tool.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                          {tool.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid size={12}>
                  <Paper elevation={1} sx={{ p: 3, bgcolor: alpha(theme.palette.secondary.main, 0.05) }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Audio Capabilities:
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 40 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Convert MP3, WAV, AAC, FLAC, OGG formats" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 40 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Precision trimming and seamless merging" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 40 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Professional effects and normalization" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 40 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Adjustable bitrates and quality settings" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 40 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Speed control with pitch correction" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                <Typography variant="h2" component="h2" gutterBottom fontWeight={700}>
                  <MusicNoteIcon fontSize="large" sx={{ mr: 2, verticalAlign: 'middle' }} />
                  Audio Tools
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  Professional audio processing capabilities for podcasters, musicians, and content creators.
                  Edit, convert, and enhance audio files with studio-quality results.
                </Typography>

                <Button
                  component={RouterLink}
                  to="/tools/audio/convert"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  startIcon={<MusicNoteIcon />}
                >
                  Explore Audio Tools
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Image Tools Section */}
      <section className='tools image'>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                <Typography variant="h2" component="h2" gutterBottom fontWeight={700}>
                  <ImageIcon fontSize="large" sx={{ mr: 2, verticalAlign: 'middle' }} />
                  Image Tools
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  Comprehensive image processing and editing tools for photographers, designers, and content creators.
                  Transform images with professional-grade features that work entirely in your browser.
                </Typography>

                <Button
                  component={RouterLink}
                  to="/tools/image/convert"
                  variant="contained"
                  color="warning"
                  size="large"
                  fullWidth
                  startIcon={<ImageIcon />}
                >
                  Start with Image Tools
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Grid container spacing={3}>
                {imageTools.map((tool) => (
                  <Grid key={tool.title} size={{ xs: 12, sm: 6 }}>
                    <Card
                      component={RouterLink}
                      to={tool.link}
                      elevation={0}
                      sx={{
                        display: 'block',
                        height: '100%',
                        textDecoration: 'none',
                        background: alpha(theme.palette.background.paper, 0.5),
                        backdropFilter: 'blur(5px)',
                        border: `1px dotted ${theme.palette.divider}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                          borderColor: tool.color
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          {tool.icon}
                          <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
                            {tool.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                          {tool.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid size={12}>
                  <Paper elevation={1} sx={{ p: 3, bgcolor: alpha(theme.palette.warning.main, 0.05) }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Image Capabilities:
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Convert JPG, PNG, WebP, GIF formats" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Resize, crop, and rotate images" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Apply filters and adjustments" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Generate video thumbnails" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Batch processing support" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className='faq'>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Frequently Asked Questions
          </Typography>

          <Accordion elevation={0} variant='outlined' sx={{
            mb: 2, background: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: 'blur(5px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 1
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Is this really free to use?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, completely free! All our tools are open-source and run entirely in your browser.
                There are no hidden fees, subscriptions, or limitations on usage. We believe in keeping
                multimedia processing accessible to everyone.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{
            mb: 2, background: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: 'blur(5px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 1
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>How is my privacy protected?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Your files never leave your device. All processing happens locally in your browser using
                WebAssembly technology. We don't upload, store, or have access to your files. What you
                process stays completely private.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{
            mb: 2, background: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: 'blur(5px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 1
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>What file formats are supported?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We support all major formats: MP4, MOV, MKV, AVI, WebM for video; MP3, WAV, AAC, FLAC,
                OGG for audio; and JPG, PNG, WebP, GIF for images. Our tools can convert between these
                formats and many others.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{
            mb: 2, background: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: 'blur(5px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 1
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Are there file size limits?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                File size limits depend on your device's memory and processing power. Generally, files up
                to several GB can be processed. Larger files may take longer to process but there are no
                artificial restrictions imposed by our service.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{
            mb: 2, background: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: 'blur(5px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 1
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Do I need to install anything?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No installation required! Our tools work directly in your web browser. We use modern web
                technologies like WebAssembly to bring desktop-quality processing to the browser. Just
                visit our site and start using the tools immediately.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{
            mb: 2, background: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: 'blur(5px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 1
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I use this for commercial projects?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! Our tools are free for both personal and commercial use. Whether you're a
                content creator, business, or enterprise, you can use our platform without restrictions
                or licensing fees.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className='cta'>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              borderRadius: 3
            }}
          >
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of creators who trust our platform for their multimedia processing needs.
              No signups, no downloads, no hassle.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <Button
                component={RouterLink}
                to="/tools/video/convert"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': { bgcolor: alpha('#fff', 0.9) }
                }}
                startIcon={<VideocamIcon />}
              >
                Start with Video
              </Button>
              <Button
                component={RouterLink}
                to="/tools/audio/convert"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: alpha('#fff', 0.1)
                  }
                }}
                startIcon={<MusicNoteIcon />}
              >
                Try Audio Tools
              </Button>
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, opacity: 0.8 }}>
              <Box sx={{ textAlign: 'center' }}>
                <SecurityIcon color='success' sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2">100% Private</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <CloudOffIcon color='info' sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2">No Uploads</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <MoneyOffIcon color='warning' sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2">Always Free</Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </section>
    </Root>
  );
}

export default Home;
