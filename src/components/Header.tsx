import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { APP_INFO } from "../constants";

// Mui imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingBlock: theme.spacing(0.5),
  '& > .MuiToolbar-root': {
    minHeight: 0,
    '& .nav-links': {
      display: 'flex',
      gap: theme.spacing(2),
      '& > a': {
        color: theme.palette.text.primary,
        fontSize: theme.typography.caption.fontSize,
        textDecoration: 'none',
        '&.active': {
          fontWeight: 'bold',
        },
      },
    }
  }
}));

function Header() {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="fixed" color='default' elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box onClick={() => navigate('/')} display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
          <img src="/images/branding/logo-small.svg" alt={APP_INFO.name} title={APP_INFO.name} loading='lazy' width={15} height={15} style={{ marginRight: 4 }} />
          <Typography variant="body2" fontWeight={600}> {APP_INFO.name} </Typography>
        </Box>

        {/* Navigation Links */}
        <Box className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
          <NavLink to="/terms">Terms</NavLink>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;
