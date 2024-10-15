'use client';
import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#FF5733',
    }
  },
  typography: {
    h1: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
  },
});

export default theme;
