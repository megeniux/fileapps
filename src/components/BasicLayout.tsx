import React from 'react';

// Components
import Header from './Header';

// MUI imports
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

type BasicLayoutProps = {
  children: React.ReactNode;
};

const Root = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  '& > .main-container': {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(90deg, rgb(23 173 196 / 15%), rgb(200 4 171 / 15%), rgb(250 158 48 / 15%))',
    height: '100dvh',
    paddingTop: theme.spacing(3),
    overflowY: 'auto',
  }
}));

function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <Root>
      <Header />
      <Paper square elevation={0} className='main-container'>
        {children}
      </Paper>
    </Root>
  );
}

export default BasicLayout;