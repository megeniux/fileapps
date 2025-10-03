import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { styled, alpha, useTheme } from '@mui/material/styles';

// Icons
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
}));

function TOS() {
  const theme = useTheme();

  const sections = [
    {
      title: 'Service Description',
      icon: <InfoIcon color="info" />,
      content: [
        `${APP_INFO.name} is a browser-based platform that provides free tools for processing video, audio, and image files. All processing is performed locally on your device using modern web technologies including WebAssembly.`,
        'Our service requires no user registration, file uploads, or personal data collection. Your files remain on your device throughout the entire editing process.',
        'We offer a comprehensive suite of editing tools including but not limited to video conversion, compression, trimming, audio extraction, image processing, and more.'
      ]
    },
    {
      title: 'User Responsibilities',
      icon: <GavelIcon color="primary" />,
      content: [
        'You are solely responsible for the content you process using our tools and must ensure you have the necessary rights and permissions for any files you edit.',
        'You agree not to use our service for any illegal, harmful, or inappropriate content, including but not limited to copyrighted material without permission.',
        'You must not attempt to reverse engineer, hack, or exploit our service in any way that could harm its functionality or other users.',
        'You are responsible for maintaining the security of your device and ensuring your browser is updated to support our tools effectively.'
      ]
    },
    {
      title: 'Service Availability',
      icon: <WarningIcon color="warning" />,
      content: [
        'Our service is provided "as is" and "as available" without any warranties or guarantees of uptime, performance, or compatibility.',
        'We reserve the right to modify, suspend, or discontinue any part of our service at any time without prior notice.',
        'While we strive for reliability, we cannot guarantee that our tools will work perfectly on all devices or with all file types.',
        'Service interruptions may occur due to maintenance, updates, or technical issues beyond our control.'
      ]
    },
    {
      title: 'Privacy & Data',
      icon: <SecurityIcon color="success" />,
      content: [
        'All file processing occurs locally in your browser. We do not receive, store, or have access to any of your files or personal data.',
        'Our website may use cookies and similar technologies for analytics and advertising purposes as described in our Privacy Policy.',
        'We use Google AdSense and other third-party advertising networks to display advertisements that support our free service.',
        'You can review our complete privacy practices in our Privacy Policy, which forms an integral part of these terms.'
      ]
    },
    {
      title: 'Intellectual Property',
      icon: <GavelIcon color="secondary" />,
      content: [
        `${APP_INFO.name} and its associated branding, design, and software are owned by the platform developer and protected by applicable intellectual property laws.`,
        'You retain all rights to content you process using our tools. We claim no ownership over your files or creations.',
        'Our service incorporates various open-source libraries and technologies, each governed by their respective licenses.',
        'You may not reproduce, distribute, or create derivative works from our platform without explicit permission.'
      ]
    },
    {
      title: 'Limitation of Liability',
      icon: <WarningIcon color="error" />,
      content: [
        'We disclaim all liability for any direct, indirect, incidental, special, or consequential damages arising from your use of our service.',
        'You use our tools at your own risk. We are not responsible for any data loss, corruption, or damage to your files or device.',
        'Our maximum liability to you for any claims related to our service shall not exceed the amount you paid to use our service (which is zero for our free tools).',
        'Some jurisdictions may not allow the exclusion of certain warranties or limitations of liability, so these limitations may not apply to you.'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms and Conditions - {APP_INFO.name} Service Agreement</title>
        <meta name="description" content={`${APP_INFO.name} terms and conditions: Browser-based platform providing free file editing tools. All processing is local, service provided as-is. User responsibilities and service terms.`} />
        <meta name="keywords" content={`terms and conditions, service terms, user agreement, ${APP_INFO.name.toLowerCase()} terms, video editor terms, file editing agreement, privacy policy`} />
        <meta property="og:title" content={`Terms and Conditions - ${APP_INFO.name} Service Agreement`} />
        <meta property="og:description" content={`${APP_INFO.name} terms and conditions: Browser-based platform providing free file editing tools. All processing is local, service provided as-is. User responsibilities and service terms.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/terms" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <link rel="canonical" href="https://fileapps.click/terms" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `Terms and Conditions - ${APP_INFO.name}`,
            "description": "Terms of service and user agreement for our free browser-based media editing platform.",
            "url": "https://fileapps.click/terms",
            "isPartOf": {
              "@type": "WebSite",
              "name": APP_INFO.name,
              "url": "https://fileapps.click"
            },
            "dateModified": new Date().toISOString().split('T')[0]
          })}
        </script>
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 15 }}>
        {/* Hero Section */}
        <HeroSection>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800 }}>
            Terms & <span style={{ background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Conditions</span>
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Clear, transparent terms for using our free media editing platform. Your rights and responsibilities explained.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
            <Chip label="Free Service" color="success" size="medium" />
            <Chip label="No Registration" color="info" size="medium" />
            <Chip label="Privacy First" color="warning" size="medium" />
            <Chip label="Fair Terms" color="primary" size="medium" />
          </Stack>
        </HeroSection>

        {/* Agreement Overview */}
        <Paper elevation={2} sx={{ p: 4, mb: 6, background: alpha(theme.palette.background.paper, 0.7), backdropFilter: 'blur(10px)' }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight={600} color="primary">
            Service Agreement
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
            By accessing and using {APP_INFO.name}, you agree to be bound by these terms and conditions. 
            This agreement governs your use of our free, browser-based media editing platform.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
            These terms are designed to be fair and transparent while protecting both your rights as a user 
            and our ability to provide and maintain this free service. Please read them carefully.
          </Typography>
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>

        {/* Terms Sections */}
        <Box sx={{ mb: 6 }}>
          {sections.map((section, index) => (
            <Card 
              key={index} 
              elevation={2} 
              sx={{ 
                mb: 4, 
                background: alpha(theme.palette.background.paper, 0.7),
                backdropFilter: 'blur(10px)'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ mr: 2 }}>
                    {section.icon}
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight={600}>
                    {section.title}
                  </Typography>
                </Box>
                {section.content.map((paragraph, pIndex) => (
                  <Typography 
                    key={pIndex} 
                    variant="body1" 
                    sx={{ lineHeight: 1.7, mb: pIndex < section.content.length - 1 ? 2 : 0 }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Advertising Disclosure */}
        <Paper elevation={2} sx={{ p: 4, mb: 6, background: alpha(theme.palette.warning.main, 0.1), border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}` }}>
          <Typography variant="h5" component="h3" gutterBottom fontWeight={600} color="warning.main">
            Advertising Disclosure
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            {APP_INFO.name} displays advertisements provided by Google AdSense and other third-party advertising 
            networks to support our free service. These advertisements help us maintain and improve our platform 
            without charging users.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            Advertisements are clearly marked and may be personalized based on your interests. We do not control 
            the content of third-party advertisements and are not responsible for the products, services, or claims 
            made in such advertisements.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            Any transactions or interactions with advertisers are solely between you and the advertiser. Please 
            review our Privacy Policy for information about how advertising networks may collect and use data.
          </Typography>
        </Paper>

        {/* Contact and Changes */}
        <Paper elevation={2} sx={{ 
          p: 6, 
          textAlign: 'center', 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})` 
        }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
            Questions About These Terms?
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3, maxWidth: '600px', mx: 'auto' }}>
            We reserve the right to modify these terms at any time. Continued use of our service after changes 
            constitutes acceptance of the new terms. For questions about these terms or our service, please contact us.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            By using {APP_INFO.name}, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For questions or concerns, contact: ayazullahburki@gmail.com
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default TOS
