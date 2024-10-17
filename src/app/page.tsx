"use client";

import { Container, Box } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Game from "@/components/Game";

// TODO: Handle page refresh to ramain in Battle view and add a back button/link to welcome screen

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  return (
    <Container
      sx={{
        minHeight: "100vh",
      }}
    >
      {started ? (
        <Game />
      ) : (
        <Box sx={{}}>
          <Box sx={{ mb: 0 }}>
            <Image
              src="/assets/arena.jpeg"
              width={300}
              height={300}
              alt="logo"
              layout="responsive"
            />
          </Box>
          <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <Button variant="outlined" onClick={() => setStarted(true)}>
              Start
            </Button>
            {/* TODO: Create options page */}
            <Button variant="outlined">Options (Comin soon)</Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
