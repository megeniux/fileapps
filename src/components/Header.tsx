import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { APP_INFO } from "../constants";
import React from 'react';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  '& .MuiToolbar-root': {
    minHeight: 68,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// Menu lists copied from Home.tsx (kept minimal: title + link + icon)
const VIDEO_TOOLS = [
  { title: 'Video Converter', link: '/tools/video/convert' },
  { title: 'Video Compressor', link: '/tools/video/compress' },
  { title: 'Video Resizer', link: '/tools/video/resize' },
  { title: 'Video Trimmer', link: '/tools/video/trim' },
  { title: 'Video Merger', link: '/tools/video/merge' },
  { title: 'Extract Audio from Video', link: '/tools/video/extract-audio' },
  { title: 'Burn Captions into Video', link: '/tools/video/burn-captions' },
  { title: 'Video Speed Editor', link: '/tools/video/playback' },
];

const AUDIO_TOOLS = [
  { title: 'Audio Converter', link: '/tools/audio/convert' },
  { title: 'Audio Trimmer', link: '/tools/audio/trim' },
  { title: 'Audio Merger', link: '/tools/audio/merge' },
  { title: 'Audio Effects', link: '/tools/audio/effects' },
  { title: 'Audio Speed Editor', link: '/tools/audio/playback' },
];

const IMAGE_TOOLS = [
  { title: 'Image Converter & Editor', link: '/tools/image/convert' },
  { title: 'Thumbnail Generator', link: '/tools/image/thumbnail' },
];

function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;
  const isActiveGroup = (prefix: string) => location.pathname.startsWith(prefix);

  // Desktop menu anchors
  const [audioAnchor, setAudioAnchor] = React.useState<null | HTMLElement>(null);
  const [imageAnchor, setImageAnchor] = React.useState<null | HTMLElement>(null);
  const [videoAnchor, setVideoAnchor] = React.useState<null | HTMLElement>(null);

  const openAudio = Boolean(audioAnchor);
  const openImage = Boolean(imageAnchor);
  const openVideo = Boolean(videoAnchor);

  // Drawer state for small screens
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [openAudioDrawer, setOpenAudioDrawer] = React.useState(false);
  const [openImageDrawer, setOpenImageDrawer] = React.useState(false);
  const [openVideoDrawer, setOpenVideoDrawer] = React.useState(false);

  return (
    <StyledAppBar position="fixed" color="default">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/images/branding/logo-small.svg" alt={APP_INFO.name} width={28} height={28} style={{ marginRight: 8 }} />
          <Typography variant="h6" component="p" sx={{ fontWeight: 700 }}>{APP_INFO.name}</Typography>
        </Box>

        {/* Desktop nav */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button component={NavLink} to="/" color="inherit" sx={{ textAlign: 'center', color: isActivePath('/') ? 'primary.main' : 'inherit', fontWeight: isActivePath('/') ? 700 : 400 }}>Home</Button>

            <Button
              color="inherit"
              onClick={(e) => setAudioAnchor(e.currentTarget)}
              sx={{ textAlign: 'center', color: isActiveGroup('/tools/audio') ? 'primary.main' : 'inherit', fontWeight: isActiveGroup('/tools/audio') ? 700 : 400 }}
            >
              Audio Tools
            </Button>
            {/* show active state for group */}
            <Box sx={{ display: 'none' }} />
            <Menu
              anchorEl={audioAnchor}
              open={openAudio}
              onClose={() => setAudioAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {AUDIO_TOOLS.map((t) => (
                <MenuItem
                  key={t.link}
                  component={NavLink}
                  to={t.link}
                  onClick={() => setAudioAnchor(null)}
                  sx={{ color: isActivePath(t.link) ? 'primary.main' : 'text.primary', fontWeight: isActivePath(t.link) ? 700 : 400 }}
                >
                  <Typography variant='body2' align='center'>{t.title}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Button color="inherit" onClick={(e) => setImageAnchor(e.currentTarget)} sx={{ textAlign: 'center', color: isActiveGroup('/tools/image') ? 'primary.main' : 'inherit', fontWeight: isActiveGroup('/tools/image') ? 700 : 400 }}>Image Tools</Button>
            <Menu
              anchorEl={imageAnchor}
              open={openImage}
              onClose={() => setImageAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {IMAGE_TOOLS.map((t) => (
                <MenuItem key={t.link} component={NavLink} to={t.link} onClick={() => setImageAnchor(null)} sx={{ color: isActivePath(t.link) ? 'primary.main' : 'text.primary', fontWeight: isActivePath(t.link) ? 700 : 400 }}>
                  <Typography variant='body2' align='center'>{t.title}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Button color="inherit" onClick={(e) => setVideoAnchor(e.currentTarget)} sx={{ textAlign: 'center', color: isActiveGroup('/tools/video') ? 'primary.main' : 'inherit', fontWeight: isActiveGroup('/tools/video') ? 700 : 400 }}>Video Tools</Button>
            <Menu
              anchorEl={videoAnchor}
              open={openVideo}
              onClose={() => setVideoAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {VIDEO_TOOLS.map((t) => (
                <MenuItem key={t.link} component={NavLink} to={t.link} onClick={() => setVideoAnchor(null)} sx={{ color: isActivePath(t.link) ? 'primary.main' : 'text.primary', fontWeight: isActivePath(t.link) ? 700 : 400 }}>
                  <Typography variant='body2' align='center'>{t.title}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Button component={NavLink} to="/about" color="inherit" sx={{ textAlign: 'center', color: isActivePath('/about') ? 'primary.main' : 'inherit', fontWeight: isActivePath('/about') ? 700 : 400 }}>About Us</Button>
            <Button component={NavLink} to="/contact" color="inherit" sx={{ textAlign: 'center', color: isActivePath('/contact') ? 'primary.main' : 'inherit', fontWeight: isActivePath('/contact') ? 700 : 400 }}>Contact Us</Button>
            <Button component={NavLink} to="/privacy" color="inherit" sx={{ textAlign: 'center', color: isActivePath('/privacy') ? 'primary.main' : 'inherit', fontWeight: isActivePath('/privacy') ? 700 : 400 }}>Privacy Policy</Button>
            <Button component={NavLink} to="/terms" color="inherit" sx={{ textAlign: 'center', color: isActivePath('/terms') ? 'primary.main' : 'inherit', fontWeight: isActivePath('/terms') ? 700 : 400 }}>Terms and Condition</Button>
          </Box>
        )}

        {/* Mobile drawer trigger */}
        {isMobile && (
          <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}

        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 300, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <List>
              <ListItem>
                <ListItemButton component={NavLink} to="/" onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath('/') ? 'primary.main' : 'text.primary', py: 0.5 }}>
                  <ListItemText primary="Home" primaryTypographyProps={{ align: 'left', noWrap: true, sx: { color: isActivePath('/') ? 'primary.main' : 'text.primary', fontWeight: isActivePath('/') ? 700 : 400 } }} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem>
                <ListItemButton onClick={() => setOpenAudioDrawer((s) => !s)}>
                  <ListItemText primary="Audio Tools" />
                  {openAudioDrawer ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openAudioDrawer} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {AUDIO_TOOLS.map((t) => (
                    <ListItem key={t.link}>
                      <ListItemButton component={NavLink} to={t.link} onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath(t.link) ? 'primary.main' : 'text.primary', py: 0.5 }}>
                        <ListItemText primary={t.title} primaryTypographyProps={{ align: 'left', noWrap: true, sx: { color: isActivePath(t.link) ? 'primary.main' : 'text.primary', fontWeight: isActivePath(t.link) ? 700 : 400 } }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              <ListItem>
                <ListItemButton onClick={() => setOpenImageDrawer((s) => !s)}>
                  <ListItemText primary="Image Tools" />
                  {openImageDrawer ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openImageDrawer} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {IMAGE_TOOLS.map((t) => (
                    <ListItem key={t.link}>
                      <ListItemButton component={NavLink} to={t.link} onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath(t.link) ? 'primary.main' : 'text.primary', py: 0.5 }}>
                        <ListItemText primary={t.title} primaryTypographyProps={{ align: 'left', noWrap: true, sx: { color: isActivePath(t.link) ? 'primary.main' : 'text.primary', fontWeight: isActivePath(t.link) ? 700 : 400 } }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              <ListItem>
                <ListItemButton onClick={() => setOpenVideoDrawer((s) => !s)}>
                  <ListItemText primary="Video Tools" />
                  {openVideoDrawer ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openVideoDrawer} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {VIDEO_TOOLS.map((t) => (
                    <ListItem key={t.link}>
                      <ListItemButton component={NavLink} to={t.link} onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath(t.link) ? 'primary.main' : 'text.primary', py: 0.5 }}>
                        <ListItemText primary={t.title} primaryTypographyProps={{ align: 'left', noWrap: true, sx: { color: isActivePath(t.link) ? 'primary.main' : 'text.primary', fontWeight: isActivePath(t.link) ? 700 : 400 } }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              <Divider sx={{ my: 1 }} />
              <ListItem>
                <ListItemButton component={NavLink} to="/about" onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath('/about') ? 'primary.main' : 'text.primary' }}>
                  <ListItemText primary="About Us" primaryTypographyProps={{ sx: { color: isActivePath('/about') ? 'primary.main' : 'text.primary', fontWeight: isActivePath('/about') ? 700 : 400 } }} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={NavLink} to="/contact" onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath('/contact') ? 'primary.main' : 'text.primary' }}>
                  <ListItemText primary="Contact Us" primaryTypographyProps={{ sx: { color: isActivePath('/contact') ? 'primary.main' : 'text.primary', fontWeight: isActivePath('/contact') ? 700 : 400 } }} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={NavLink} to="/privacy" onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath('/privacy') ? 'primary.main' : 'text.primary' }}>
                  <ListItemText primary="Privacy Policy" primaryTypographyProps={{ sx: { color: isActivePath('/privacy') ? 'primary.main' : 'text.primary', fontWeight: isActivePath('/privacy') ? 700 : 400 } }} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={NavLink} to="/terms" onClick={() => setDrawerOpen(false)} sx={{ width: '100%', color: isActivePath('/terms') ? 'primary.main' : 'text.primary' }}>
                  <ListItemText primary="Terms and Condition" primaryTypographyProps={{ sx: { color: isActivePath('/terms') ? 'primary.main' : 'text.primary', fontWeight: isActivePath('/terms') ? 700 : 400 } }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;
