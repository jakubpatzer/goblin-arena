"use client";

// import styles from "./page.module.css";
import { Container, Box } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import ManageTeams from "@/components/ManageTeams";

export default function Home() {
  const [started, setStarted] = useState(false);
  return (
    <Container
    sx={{
      minHeight: "100vh",
      // backgroundColor: "black",
    }}
    >
      {!started ? (
        <ManageTeams />
      ) : (
        <Box sx={{
          textAlign: 'center'
        }}>
          <Image
            src="/assets/arena.jpeg"
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
