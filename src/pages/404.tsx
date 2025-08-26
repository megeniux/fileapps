import { APP_INFO } from "../constants";
import { useNavigate } from 'react-router-dom';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// 404 Not Found page content (BasicLayout is applied in the route wrapper)
function NotFound() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={3} sx={{ px: 4, py: 6, maxWidth: 460, width: '100%', textAlign: 'center' }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src="/images/branding/logo-small.svg"
            alt={APP_INFO.name}
            title={APP_INFO.name}
            loading="lazy"
            width={48}
            height={48}
            style={{ display: 'block' }}
          />
        </Box>
        <Typography variant="h3" fontWeight={700} gutterBottom>404</Typography>
        <Typography variant="h6" gutterBottom fontWeight={600}>Page Not Found</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          The page you're looking for doesn't exist or was moved. Try heading back home or exploring our tools.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>Go Home</Button>
          <Button variant="outlined" onClick={() => navigate('/contact')}>Contact</Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default NotFound;
