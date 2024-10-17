"use client";
import { createTheme, Theme } from "@mui/material/styles";
import localFont from "next/font/local";

const pixelify = localFont({
  src: "./app/fonts/Pixelify_Sans/PixelifySans-VariableFont_wght.ttf",
  weight: "normal",
});

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
    },
  },
  typography: {
    fontFamily: pixelify.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
  },
});

export default theme;
