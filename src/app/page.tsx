"use client";

// import styles from "./page.module.css";
import { Container, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import ManageTeams from "@/components/ManageTeams";

export default function Home() {
  const [started, setStarted] = useState(false);
  return (
    <Container>
      {!started ? (
        <ManageTeams />
      ) : (
        <Box sx={{
          textAlign: 'center'
        }}>
          <Typography variant="h1">GOBLIN ARENA</Typography>
          <Image
            src="/assets/logo.jpeg"
            width={100}
            height={100}
            alt="logo"
            layout="responsive"
          />
          <Button variant="outlined" onClick={() => setStarted(true)}>
            Click to play
          </Button>
        </Box>
      )}
    </Container>
  );
}
