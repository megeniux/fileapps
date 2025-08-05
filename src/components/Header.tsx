
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Mui imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Icons
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

function Header() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}><MovieFilterIcon sx={{ fontSize: 26, mb: -0.75, mr: 0.5 }} /> Video Tools </Typography>
        {/* Navigation Links */}
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;
