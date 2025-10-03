import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { styled, alpha, useTheme } from '@mui/material/styles';

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import CodeIcon from '@mui/icons-material/Code';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ImageIcon from '@mui/icons-material/Image';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
}));

function AboutUs() {
  const theme = useTheme();

  const features = [
    {
      title: '100% Private & Secure',
      description: 'All processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security.',
      icon: <SecurityIcon fontSize="large" color="success" />
    },
    {
      title: 'No Upload Required',
      description: 'Process files directly in your browser without uploading to any server. Faster processing and better privacy.',
      icon: <CloudOffIcon fontSize="large" color="info" />
    },
    {
      title: 'Always Free',
      description: 'All tools are completely free with no restrictions, watermarks, or hidden fees. Professional results without cost.',
      icon: <MoneyOffIcon fontSize="large" color="warning" />
    },
    {
      title: 'Fast Processing',
      description: 'Powered by WebAssembly for near-native performance in your browser. No waiting for uploads or downloads.',
      icon: <SpeedIcon fontSize="large" color="secondary" />
    },
    {
      title: 'All Devices Supported',
      description: 'Works on Windows, Mac, Linux, iOS, and Android. No software installation needed.',
      icon: <DevicesIcon fontSize="large" color="error" />
    },
    {
      title: 'Open Source Technology',
      description: 'Built with modern web technologies and open source libraries. Transparent and continuously improving.',
      icon: <CodeIcon fontSize="large" color="primary" />
    }
  ];

  const toolCategories = [
    {
      title: 'Video Tools',
      description: 'Comprehensive video editing suite including conversion, compression, trimming, resizing, merging, and speed adjustment.',
      icon: <VideoLibraryIcon fontSize="large" color="primary" />,
      tools: ['Video Converter', 'Video Compressor', 'Video Trimmer', 'Video Resizer', 'Video Merger', 'Speed Editor']
    },
    {
      title: 'Audio Tools',
      description: 'Professional audio processing tools for conversion, extraction, editing, and enhancement.',
      icon: <AudiotrackIcon fontSize="large" color="secondary" />,
      tools: ['Audio Converter', 'Audio Extractor', 'Audio Trimmer', 'Audio Effects', 'Audio Merger']
    },
    {
      title: 'Image Tools',
      description: 'Powerful image editing and conversion tools for various formats and optimization needs.',
      icon: <ImageIcon fontSize="large" color="success" />,
      tools: ['Image Converter', 'Thumbnail Generator', 'Image Optimizer', 'Format Converter']
    }
  ];

  return (
    <>
      <Helmet>
        <title>About {APP_INFO.name} - Free Online Video, Audio & Image Editor</title>
        <meta name="description" content={`Learn about ${APP_INFO.name}, a comprehensive platform providing free video compression and editing tools. Professional media editing without cost or technical barriers.`} />
        <meta name="keywords" content={`about ${APP_INFO.name.toLowerCase()}, video editing platform, free video tools, video compression, media editing, online video editor, privacy-focused tools`} />
        <meta property="og:title" content={`About ${APP_INFO.name} - Free Online Video, Audio & Image Editor`} />
        <meta property="og:description" content={`Learn about ${APP_INFO.name}, a comprehensive platform providing free video compression and editing tools. Professional media editing without cost or technical barriers.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/about" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <link rel="canonical" href="https://fileapps.click/about" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": APP_INFO.name,
            "url": "https://fileapps.click",
            "logo": "https://fileapps.click/images/branding/logo-xl.svg",
            "description": "Free online video, audio, and image editing tools. Privacy-focused, browser-based processing with no uploads required.",
            "foundingDate": "2024",
            "applicationCategory": "Multimedia",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "ayazullahburki@gmail.com"
            }
          })}
        </script>
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 15 }}>
        {/* Hero Section */}
        <HeroSection>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800 }}>
            About <span style={{ background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{APP_INFO.name}</span>
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Empowering creators with professional-grade media editing tools that are completely free, secure, and privacy-focused.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
            <Chip label="100% Free" color="success" size="medium" />
            <Chip label="No Registration" color="info" size="medium" />
            <Chip label="Privacy First" color="warning" size="medium" />
            <Chip label="Browser Based" color="primary" size="medium" />
          </Stack>
        </HeroSection>

        {/* Mission Statement */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
            Our Mission
          </Typography>
          <Paper elevation={2} sx={{ p: 4, background: alpha(theme.palette.background.paper, 0.7), backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" align="center" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
              At {APP_INFO.name}, we believe that powerful media editing tools should be accessible to everyone. 
              Our mission is to democratize content creation by providing professional-grade video, audio, and image 
              editing capabilities that are completely free, require no registration, and respect your privacy. 
              We're building the future of browser-based media processing where your files never leave your device.
            </Typography>
          </Paper>
        </Box>

        {/* Key Features */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>
            Why Choose {APP_INFO.name}?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Card elevation={2} sx={{ 
                  height: '100%', 
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)', 
                    boxShadow: theme.shadows[8] 
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tool Categories */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>
            Comprehensive Tool Suite
          </Typography>
          <Grid container spacing={4}>
            {toolCategories.map((category, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card elevation={2} sx={{ 
                  height: '100%',
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      {category.icon}
                      <Typography variant="h5" component="h3" gutterBottom fontWeight={600} sx={{ mt: 2 }}>
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {category.description}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom fontWeight={600} color="primary">
                        Available Tools:
                      </Typography>
                      {category.tools.map((tool, toolIndex) => (
                        <Chip 
                          key={toolIndex}
                          label={tool} 
                          size="small" 
                          variant="outlined" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technology & Privacy */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>
            Technology & Privacy
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 4, height: '100%', background: alpha(theme.palette.background.paper, 0.7) }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight={600} color="primary">
                  Browser-Based Processing
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                  Our tools are powered by cutting-edge web technologies including WebAssembly (WASM), Web Workers, 
                  and modern JavaScript APIs. This enables near-native performance directly in your browser without 
                  requiring any software installation or plugins.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  All processing happens locally on your device, ensuring fast performance and eliminating the need 
                  for file uploads or downloads. This approach provides better security, privacy, and speed compared 
                  to traditional server-based solutions.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 4, height: '100%', background: alpha(theme.palette.background.paper, 0.7) }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight={600} color="secondary">
                  Privacy by Design
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                  Privacy is not an afterthought—it's built into the core of our platform. Since all processing 
                  happens in your browser, your files never touch our servers. We don't collect, store, or have 
                  access to any of your personal files or data.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  No user accounts, no file uploads, no tracking of your content. Your creative work remains 
                  completely private and under your control. This is how digital tools should work in the modern era.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Future Vision */}
        <Paper elevation={2} sx={{ p: 6, textAlign: 'center', background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})` }}>
          <Typography variant="h2" component="h2" gutterBottom fontWeight={700}>
            Building the Future of Media Editing
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            We're continuously expanding our toolkit with new features, improved performance, and cutting-edge 
            capabilities. Our goal is to make professional-grade media editing accessible to creators worldwide, 
            without compromising on privacy, performance, or cost.
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" gap={2}>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700} color="primary">15+</Typography>
              <Typography variant="body2" color="text.secondary">Editing Tools</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700} color="secondary">100%</Typography>
              <Typography variant="body2" color="text.secondary">Browser Based</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700} color="success.main">∞</Typography>
              <Typography variant="body2" color="text.secondary">Free Forever</Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default AboutUs
