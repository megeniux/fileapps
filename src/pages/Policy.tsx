import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
        <meta property="og:url" content="https://videotools.netlify.app/policy" />
        <link rel="canonical" href="https://videotools.netlify.app/policy" />
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
          <Typography variant="body1" mb={2}>
            Please note that {APP_INFO.name} may display advertisements to support the service. These ads are managed by third-party providers and may use cookies or similar technologies for ad delivery and analytics. We do not have access to or control over the information collected by these third parties.
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
