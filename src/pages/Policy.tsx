import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import { styled, alpha, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import CookieIcon from '@mui/icons-material/Cookie';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ShieldIcon from '@mui/icons-material/Shield';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
}));

function PrivacyPolicy() {
  const theme = useTheme();

  const dataSections = [
    {
      title: 'What Data We Collect',
      icon: <SecurityIcon color="primary" />,
      content: [
        'File Processing: All your files are processed locally in your browser. We never receive, store, or have access to any files you edit.',
        'Analytics Data: We use Google Analytics to understand how users interact with our website, including page views, session duration, and feature usage.',
        'Advertising Data: Our advertising partners (Google AdSense) may collect data to show relevant advertisements based on your interests.',
        'Technical Data: We may collect browser type, operating system, and device information to improve compatibility and performance.'
      ]
    },
    {
      title: 'How We Use Your Data',
      icon: <DeviceHubIcon color="info" />,
      content: [
        'Service Improvement: Analytics data helps us understand which tools are most popular and identify areas for improvement.',
        'Advertisement Personalization: Third-party advertising networks use collected data to display relevant advertisements.',
        'Performance Optimization: Technical data helps us optimize our platform for different devices and browsers.',
        'User Experience: We analyze usage patterns to enhance the user interface and add requested features.'
      ]
    },
    {
      title: 'Cookies & Tracking',
      icon: <CookieIcon color="warning" />,
      content: [
        'Essential Cookies: We use necessary cookies to ensure proper website functionality and remember your preferences.',
        'Analytics Cookies: Google Analytics uses cookies to track website usage and generate reports for improvement.',
        'Advertising Cookies: Google AdSense and other advertising networks use cookies to personalize advertisements.',
        'Control Options: You can control cookie settings through your browser preferences or opt-out of personalized advertising.'
      ]
    },
    {
      title: 'Third-Party Services',
      icon: <AdsClickIcon color="error" />,
      content: [
        'Google AdSense: Displays advertisements on our platform and may collect data for ad personalization.',
        'Google Analytics: Tracks website usage statistics and user behavior to help us improve our service.',
        'Content Delivery Networks: We use CDNs to deliver website assets efficiently without collecting personal data.',
        'External Links: Our website may contain links to external sites with their own privacy policies.'
      ]
    },
    {
      title: 'Data Security',
      icon: <ShieldIcon color="success" />,
      content: [
        'Local Processing: Your files never leave your device, ensuring complete privacy and security during editing.',
        'Secure Connections: All data transmission uses HTTPS encryption to protect your privacy.',
        'No File Storage: We do not store any of your processed files or personal documents on our servers.',
        'Limited Data Collection: We collect only the minimum data necessary to provide and improve our service.'
      ]
    },
    {
      title: 'Your Rights',
      icon: <ContactMailIcon color="secondary" />,
      content: [
        'Data Access: You can request information about what data third-party services collect about you.',
        'Opt-Out Options: You can disable cookies, opt out of analytics tracking, and personalized advertising.',
        'Data Deletion: Since we store no personal files, there\'s no personal data to delete from our servers.',
        'Contact Us: You can contact us at any time with questions about our privacy practices.'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - {APP_INFO.name} Data Protection & Security</title>
        <meta name="description" content={`${APP_INFO.name} privacy policy: Local file processing, no data storage, Google AdSense advertising, analytics cookies. Your privacy and data protection explained.`} />
        <meta name="keywords" content={`privacy policy, data protection, ${APP_INFO.name.toLowerCase()} privacy, file security, cookie policy, advertising privacy, GDPR compliance`} />
        <meta property="og:title" content={`Privacy Policy - ${APP_INFO.name} Data Protection`} />
        <meta property="og:description" content={`${APP_INFO.name} privacy policy: Local file processing, no data storage, Google AdSense advertising, analytics cookies. Your privacy and data protection explained.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/policy" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <link rel="canonical" href="https://fileapps.click/policy" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `Privacy Policy - ${APP_INFO.name}`,
            "description": "Comprehensive privacy policy detailing our data protection practices, cookie usage, and advertising policies.",
            "url": "https://fileapps.click/policy",
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
            Privacy <span style={{ background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Policy</span>
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Your privacy matters. Learn how we protect your data and respect your privacy while providing free media editing tools.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
            <Chip label="Local Processing" color="success" size="medium" />
            <Chip label="No File Storage" color="info" size="medium" />
            <Chip label="Transparent Practices" color="warning" size="medium" />
            <Chip label="Your Rights Protected" color="primary" size="medium" />
          </Stack>
        </HeroSection>

        {/* Privacy Promise */}
        <Alert severity="success" sx={{ mb: 6, p: 3 }}>
          <Typography variant="h6" component="div" gutterBottom fontWeight={600}>
            Our Privacy Promise
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            <strong>Your files never leave your device.</strong> All editing is performed locally in your browser using WebAssembly technology. 
            We have no access to your files, and they are never uploaded to our servers. This ensures complete privacy and security for your content.
          </Typography>
        </Alert>

        {/* Introduction */}
        <Paper elevation={2} sx={{ p: 4, mb: 6, background: alpha(theme.palette.background.paper, 0.7), backdropFilter: 'blur(10px)' }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight={600} color="primary">
            Data Protection Overview
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
            This privacy policy explains how {APP_INFO.name} collects, uses, and protects your information. 
            We are committed to transparency and giving you control over your data.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
            Our platform is designed with privacy by design principles - your files are processed entirely on your device, 
            and we collect only the minimum data necessary to provide and improve our free service.
          </Typography>
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>

        {/* Data Sections */}
        <Box sx={{ mb: 6 }}>
          {dataSections.map((section, index) => (
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
                {section.content.map((item, itemIndex) => (
                  <Box key={itemIndex} sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h4" fontWeight={500} color="primary" gutterBottom>
                      {item.split(':')[0]}:
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {item.split(':').slice(1).join(':')}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* GDPR & Compliance */}
        <Paper elevation={2} sx={{ p: 4, mb: 6, background: alpha(theme.palette.info.main, 0.1), border: `1px solid ${alpha(theme.palette.info.main, 0.3)}` }}>
          <Typography variant="h5" component="h3" gutterBottom fontWeight={600} color="info.main">
            GDPR & Data Protection Compliance
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws. 
            Since we process files locally and collect minimal data, compliance is straightforward.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            <strong>Legal Basis:</strong> We process data based on legitimate interests (analytics and advertising) 
            and your consent (cookies and personalized advertising).
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            <strong>Data Retention:</strong> We retain analytics data for up to 26 months as per Google Analytics settings. 
            No personal files are ever stored.
          </Typography>
        </Paper>

        {/* Advertising Transparency */}
        <Paper elevation={2} sx={{ p: 4, mb: 6, background: alpha(theme.palette.warning.main, 0.1), border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}` }}>
          <Typography variant="h5" component="h3" gutterBottom fontWeight={600} color="warning.main">
            Advertising & Monetization
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            {APP_INFO.name} displays advertisements from Google AdSense and other approved advertising networks 
            to support our free service. These ads are clearly marked and help us maintain the platform.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            <strong>Ad Personalization:</strong> Advertisements may be personalized based on your interests. 
            You can opt out of personalized advertising through Google Ad Settings.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            <strong>Third-Party Responsibility:</strong> We are not responsible for the content of advertisements 
            or the privacy practices of advertisers. Please review their policies separately.
          </Typography>
        </Paper>

        {/* Contact and Control */}
        <Paper elevation={2} sx={{ 
          p: 6, 
          textAlign: 'center', 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})` 
        }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
            Your Privacy, Your Control
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3, maxWidth: '600px', mx: 'auto' }}>
            You have complete control over your privacy settings. Manage cookies in your browser, 
            opt out of analytics tracking, or contact us with any privacy concerns.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Chip 
              label="Manage Cookies" 
              onClick={() => window.open('chrome://settings/cookies', '_blank')} 
              clickable 
              color="primary" 
            />
            <Chip 
              label="Opt-out Analytics" 
              onClick={() => window.open('https://tools.google.com/dlpage/gaoptout', '_blank')} 
              clickable 
              color="info" 
            />
            <Chip 
              label="Ad Settings" 
              onClick={() => window.open('https://adssettings.google.com/', '_blank')} 
              clickable 
              color="warning" 
            />
          </Stack>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Questions about our privacy practices? We're here to help.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact us: ayazullahburki@gmail.com
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default PrivacyPolicy
