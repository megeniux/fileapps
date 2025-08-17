import { APP_INFO } from "../constants";
import { NavLink } from 'react-router-dom';

// Mui imports
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const FooterRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingInline: theme.spacing(2),
  width: '100%',
  position: 'fixed',
  bottom: 0,
  zIndex: theme.zIndex.appBar,
  borderRadius: 0,
  '& .footer-links': {
    display: 'flex',
    '& > a': {
      color: theme.palette.text.primary,
      fontSize: theme.typography.caption.fontSize,
      textDecoration: 'none',
      '&.active': {
        fontWeight: 'bold',
      },
    },
  }
}));

function Footer() {
  return (
    <FooterRoot elevation={1}>
      <Typography variant="caption" align="center"> {APP_INFO.name} &copy; {new Date().getFullYear()} </Typography>
      <Box className="footer-links">
        <NavLink to="/terms">Terms of Service</NavLink>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <NavLink to="/privacy">Privacy Policy</NavLink>
      </Box>
    </FooterRoot>
  );
}

export default Footer;
