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

        }}>
          <Image
            src="/assets/arena.jpeg"
            width={300}
            height={300}
            alt="logo"
            layout="responsive"
          />
          <Box sx={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
            <Button variant="outlined" onClick={() => setStarted(true)}>
              Start
            </Button>
            <Button variant="outlined">
              Options (Comin soon)
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
