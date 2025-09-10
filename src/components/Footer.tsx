import { APP_INFO } from '../constants';
import { NavLink } from 'react-router-dom';

// MUI imports
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const StyledFooter = styled('footer')(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    width: '100%',
}));

function Footer() {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <Toolbar component={Paper} elevation={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <Typography variant="body1">Version {APP_INFO.version}</Typography>
        </Box>

        <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
          <Link component={NavLink} to="/privacy" underline="hover" color="inherit" sx={{ fontSize: '0.9rem' }}>
            Privacy Policy
          </Link>
          <Link component={NavLink} to="/terms" underline="hover" color="inherit" sx={{ fontSize: '0.9rem' }}>
            Terms and Condition
          </Link>
        </Box>
      </Toolbar>
    </StyledFooter>
  );
}

export default Footer;
