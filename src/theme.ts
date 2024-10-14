'use client';
import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Merriweather, serif', // Using Material-UI Typography with Merriweather
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
  },
});

export default theme;
