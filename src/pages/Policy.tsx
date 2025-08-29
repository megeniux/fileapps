import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - {APP_INFO.name} Data Protection & Security</title>
        <meta name="description" content={`${APP_INFO.name} privacy policy: We don't collect, store, or share personal information. All processing is local in your browser. Your data remains private and secure.`} />
        <meta name="keywords" content={`privacy policy, data protection, ${APP_INFO.name.toLowerCase()} privacy, browser-based processing, secure video editing, private video tools`} />
        <meta property="og:title" content={`Privacy Policy - ${APP_INFO.name} Data Protection & Security`} />
        <meta property="og:description" content={`${APP_INFO.name} privacy policy: We don't collect, store, or share personal information. All processing is local in your browser. Your data remains private and secure.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/policy" />
        <link rel="canonical" href="https://fileapps.click/policy" />
      </Helmet>
      <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Privacy Policy
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="body1" mb={2}>
            At {APP_INFO.name}, your privacy is our top priority. We do not collect, store, or share any personal information or files. All processing is performed locally in your browser, ensuring that your data remains private and secure.
          </Typography>
          <Typography variant="body1" mb={2}>
            Our platform is entirely browser-based. No files, or user data are uploaded to our servers at any stage. You retain full control over your content, and nothing is transmitted or stored externally.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Advertising and Third-Party Services
          </Typography>
          <Typography variant="body1" mb={2}>
            {APP_INFO.name} displays advertisements provided by Google AdSense and other third-party advertising networks to support our free service. These advertisements may use cookies, web beacons, and similar technologies to:
          </Typography>
          <Typography variant="body1" component="div" mb={2}>
            <ul>
              <li>Deliver personalized advertisements based on your interests</li>
              <li>Measure advertisement effectiveness and engagement</li>
              <li>Provide aggregate usage analytics to advertisers</li>
            </ul>
          </Typography>
          <Typography variant="body1" mb={2}>
            Third-party advertising networks may collect information about your visits to this and other websites to provide advertisements about goods and services of interest to you. You can opt out of personalized advertising by visiting <Link href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google's Ad Settings</Link> or the <Link href="http://www.aboutads.info/choices/" target="_blank" rel="noopener">Network Advertising Initiative's opt-out page</Link>.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Data Protection and Your Rights
          </Typography>
          <Typography variant="body1" mb={2}>
            If you are located in the European Union or other regions with data protection regulations, you have certain rights regarding your personal information, including the right to access, correct, or delete data collected by our advertising partners. For questions about data collected by Google AdSense, please visit <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</Link>.
          </Typography>
          <Typography variant="body1">
            By using {APP_INFO.name}, you acknowledge and accept this privacy policy. If you have any questions or concerns, please contact us at the email address provided on our About Us page.
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </>
  )
}

export default PrivacyPolicy
