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
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { styled, alpha, useTheme } from '@mui/material/styles';

// Icons
import EmailIcon from '@mui/icons-material/Email';
import SupportIcon from '@mui/icons-material/Support';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BugReportIcon from '@mui/icons-material/BugReport';
import BusinessIcon from '@mui/icons-material/Business';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
}));

function Contact() {
  const theme = useTheme();

  const contactReasons = [
    {
      title: 'Technical Support',
      description: 'Need help with our tools or experiencing technical issues? We\'re here to help you get the most out of our platform.',
      icon: <SupportIcon fontSize="large" color="primary" />,
      action: 'Get Support'
    },
    {
      title: 'Feature Requests',
      description: 'Have an idea for a new tool or feature? We love hearing from our community about what would make your workflow better.',
      icon: <FeedbackIcon fontSize="large" color="secondary" />,
      action: 'Share Ideas'
    },
    {
      title: 'Bug Reports',
      description: 'Found a bug or something not working as expected? Help us improve by reporting issues you encounter.',
      icon: <BugReportIcon fontSize="large" color="error" />,
      action: 'Report Issue'
    },
    {
      title: 'Business Inquiries',
      description: 'Interested in partnerships, integrations, or business opportunities? Let\'s discuss how we can work together.',
      icon: <BusinessIcon fontSize="large" color="success" />,
      action: 'Contact Us'
    }
  ];

  const developerInfo = {
    name: 'Ayaz Ullah Burki',
    role: 'Founder & Lead Developer',
    email: 'ayazullahburki@gmail.com',
    bio: 'Passionate about creating accessible technology solutions that empower creators and respect user privacy. Building the future of browser-based media processing.',
    specialties: ['Web Development', 'WebAssembly', 'Media Processing', 'Privacy-First Design']
  };

  return (
    <>
      <Helmet>
        <title>Contact {APP_INFO.name} - Get Support for Video, Audio & Image Tools</title>
        <meta name="description" content={`Contact ${APP_INFO.name} for questions, feedback, or support. Reach out to our team for help with free video, audio, and image editing tools. Developer support available.`} />
        <meta name="keywords" content={`contact ${APP_INFO.name.toLowerCase()}, video tools support, audio editor help, image converter support, video editing assistance, customer support, technical help`} />
        <meta property="og:title" content={`Contact ${APP_INFO.name} - Get Support for Video, Audio & Image Tools`} />
        <meta property="og:description" content={`Contact ${APP_INFO.name} for questions, feedback, or support. Reach out to our team for help with free video, audio, and image editing tools. Developer support available.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/contact" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <link rel="canonical" href="https://fileapps.click/contact" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "url": "https://fileapps.click/contact",
            "name": `Contact ${APP_INFO.name}`,
            "description": "Get support, share feedback, or reach out for business inquiries related to our free media editing tools.",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "ayazullahburki@gmail.com",
              "availableLanguage": "English"
            }
          })}
        </script>
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 15 }}>
        {/* Hero Section */}
        <HeroSection>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800 }}>
            Get in <span style={{ background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Touch</span>
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            We're here to help! Whether you need support, have feedback, or want to collaborate, we'd love to hear from you.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={1}>
            <Chip label="Quick Response" color="success" size="medium" />
            <Chip label="Community Driven" color="primary" size="medium" />
            <Chip label="Always Improving" color="secondary" size="medium" />
          </Stack>
        </HeroSection>

        {/* Contact Reasons */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>
            How Can We Help?
          </Typography>
          <Grid container spacing={4}>
            {contactReasons.map((reason, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ mr: 2, mt: 0.5 }}>
                        {reason.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                          {reason.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                          {reason.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          href={`mailto:${developerInfo.email}?subject=${reason.title} - ${APP_INFO.name}`}
                        >
                          {reason.action}
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Developer Information */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>
            Meet the Developer
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 4, background: alpha(theme.palette.background.paper, 0.7), backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" component="h3" gutterBottom fontWeight={600} color="primary">
                  {developerInfo.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {developerInfo.role}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
                  {developerInfo.bio}
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" gutterBottom fontWeight={600} color="secondary">
                    Specialties:
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {developerInfo.specialties.map((specialty, index) => (
                      <Chip
                        key={index}
                        label={specialty}
                        size="small"
                        variant="outlined"
                        color="secondary"
                      />
                    ))}
                  </Stack>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  href={`mailto:${developerInfo.email}`}
                  size="large"
                >
                  Send Email
                </Button>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 4, background: alpha(theme.palette.background.paper, 0.7), backdropFilter: 'blur(10px)' }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight={600} color="primary">
                  Why {APP_INFO.name} Exists
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
                  I created {APP_INFO.name} because I believe powerful tools shouldn't require expensive software
                  or compromise your privacy. Every creator deserves access to professional-grade editing capabilities
                  that respect their data and workflow.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
                  This platform represents my commitment to open, accessible technology that empowers users while
                  maintaining the highest standards of privacy and performance.
                </Typography>
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  "Building tools that I would want to use myself, with the values I care about."
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Contact Information */}
        <Paper elevation={2} sx={{
          p: 6,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`
        }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
            Ready to Connect?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            We value every message and strive to respond quickly to all inquiries.
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon color="primary" />
              <Link href={`mailto:${developerInfo.email}`} variant="h6" underline="hover">
                {developerInfo.email}
              </Link>
            </Box>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Expected response time: Within 24-48 hours
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<EmailIcon />}
              href={`mailto:${developerInfo.email}?subject=Hello from ${APP_INFO.name} user`}
            >
              Send Message
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FeedbackIcon />}
              href={`mailto:${developerInfo.email}?subject=Feedback for ${APP_INFO.name}`}
            >
              Share Feedback
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default Contact
