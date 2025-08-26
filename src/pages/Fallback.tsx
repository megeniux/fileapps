import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";
import BasicLayout from '../components/BasicLayout';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';

// A lightweight fallback loader page that can be used in Suspense or route loaders.
function Fallback() {
  return (
    <BasicLayout>
      <Helmet>
        <title>Loading {APP_INFO.name} - Free Video, Audio & Image Editor</title>
        <meta name="description" content={`Loading ${APP_INFO.name} - Professional browser-based media editing tools. Free video compression, audio editing, and image conversion tools loading.`} />
        <meta name="keywords" content={`loading ${APP_INFO.name.toLowerCase()}, video editor loading, audio editor, image converter, media tools`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Paper elevation={3} sx={{ px: 4, py: 5, maxWidth: 360, width: '100%', textAlign: 'center' }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src="/images/branding/logo-small.svg"
              alt={APP_INFO.name}
              title={APP_INFO.name}
              loading="lazy"
              width={40}
              height={40}
              style={{ display: 'block' }}
            />
          </Box>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Loading {APP_INFO.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Preparing tools and optimizing performance...
          </Typography>
          <LinearProgress color="primary" />
        </Paper>
      </Box>
    </BasicLayout>
  );
}

export default Fallback;
