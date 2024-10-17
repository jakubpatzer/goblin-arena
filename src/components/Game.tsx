"use client";

import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { generateRandomName } from "@/utils";
import TeamCard from "./TeamCard";
import { Team } from "@/interfaces";
import { battle } from "@/utils";
import Image from "next/image";

// Goblin visuials that gives possibility to set each goblins position on the battlefield
// TODO: Consider UUID for each image specific ID
const goblinImages_1 = [
  { src: "/assets/goblin-9.gif", posX: 0, posY: 10 },
  { src: "/assets/goblin-9.gif", posX: 50, posY: 40 },
  { src: "/assets/goblin-9.gif", posX: 0, posY: 70 },
  { src: "/assets/goblin-9.gif", posX: 0, posY: 130 },
  { src: "/assets/goblin-9.gif", posX: 50, posY: 100 },
];
const goblinImages_2 = [
  { src: "/assets/goblin-7.webp", posX: 0, posY: 10 },
  { src: "/assets/goblin-7.webp", posX: 50, posY: 40 },
  { src: "/assets/goblin-7.webp", posX: 0, posY: 70 },
  { src: "/assets/goblin-7.webp", posX: 0, posY: 130 },
  { src: "/assets/goblin-7.webp", posX: 50, posY: 100 },
];

const modalStyle = {
  height: "300px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 500,
  bgcolor: "#F0F0C9",
  border: "4px solid #3B3B3B",
  boxShadow: "8px 8px 0px #2B2B2B",
  padding: "10px",
  textAlign: "center",
  backgroundImage: 'url("/assets/battle-background.png")',
  backgroundSize: "cover",
};

const Game = () => {
  // TODO: Consider moving to some global state when complexity/prop drill grows
  const [teams, setTeams] = useState<Team[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [battlingTeams, setBattlingTeams] = useState<Team[]>([]);
  const [winner, setWinner] = useState<Team | null>(null);
  const [effectVisible, setEffectVisible] = useState<boolean>(false);
  const [winnerVisible, setWinnerVisible] = useState<boolean>(false);

  // Timing controls
  const appearDisappearInterval: number = 250; // Control how long the effect stays visible
  const startDelay: number = 100; // Time after modal
  const displayWinnerDelay: number = 3500; // Time before showing the winner
  const autoCloseTime: number = 4500; // Time before closing modal

  const handleCloseModal = (): void => setModalOpen(false);

  // SUPER FANCY AI POWERED BATTLE EFFECTS BETTER THAN IN FINAL FANTASY
  // TODO: Many ideas for better and new battle effects and elements, also moving visuals to separate file
  // TODO: Battle effects now are visible only on one team, update it and upgrade for different visuals for other team
  useEffect(() => {
    if (modalOpen) {
      // Start effects animation
      const timeout = setTimeout(() => {
        let cycleCount = 0;
        const interval = setInterval(() => {
          setEffectVisible(true); // Show effect

          setTimeout(() => {
            setEffectVisible(false); // Hide effect
          }, appearDisappearInterval);

          cycleCount += 1;

          if (cycleCount > 5) {
            clearInterval(interval);
            setEffectVisible(false);
          }
        }, appearDisappearInterval * 2);

        return () => clearInterval(interval); // Cleanup
      }, startDelay);

      // Show the winner team
      const showWinnerTimeout = setTimeout(() => {
        setWinnerVisible(true);
      }, displayWinnerDelay);

      // Automatically close the modal
      const autoCloseTimeout = setTimeout(() => {
        handleCloseModal();
        setWinnerVisible(false);
      }, autoCloseTime);

      return () => {
        clearTimeout(timeout);
        clearTimeout(autoCloseTimeout);
        clearTimeout(showWinnerTimeout);
        setEffectVisible(false);
      };
    }
  }, [modalOpen, appearDisappearInterval, startDelay, autoCloseTime]);

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  useEffect(() => {
    if (teams.length > 0) {
      localStorage.setItem("teams", JSON.stringify(teams));
    }
  }, [teams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  // TODO: Consider handling max team name lenght
  const handleCreateTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim().length > 0) {
      setTeams((prevTeams: Team[]): Team[] => {
        const newTeams = [
          ...prevTeams,
          {
            teamName: inputValue,
            goblins: Array.from({ length: 5 }, () => ({
              name: generateRandomName(),
              attack: Math.floor(Math.random() * 10 + 1),
              defense: Math.floor(Math.random() * 10 + 1),
            })),
            victoryPoints: 0,
          },
        ];
        return newTeams;
      });
    }
    setInputValue("");
  };

  const handleRemoveAllTeams = (): void => {
    setTeams([]);
    localStorage.removeItem("teams");
  };

  const handleBattle = (): void => {
    if (teams.length > 1) {
      const { updatedTeams, participatingTeams, winner } = battle(teams);

      setTeams(
        [...updatedTeams].sort(
          (a: Team, b: Team) => (b.victoryPoints || 0) - (a.victoryPoints || 0)
        )
      );
      setBattlingTeams(participatingTeams);
      setWinner(winner);
      setModalOpen(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F0F0C9",
        padding: 3,
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Box
        component="form"
        onSubmit={handleCreateTeam}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mt: 5,
          backgroundColor: "#D4D7A7",
          padding: 2,
          boxShadow: "8px 8px 0px #2B2B2B",
          border: "3px solid #3B3B3B",
        }}
      >
        <Typography variant="h5" sx={{ color: "#F24B1A", textAlign: "center" }}>
          Create New Team
        </Typography>

        <TextField
          label="Enter team name"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            backgroundColor: "#FFDD57",
            color: "#3B3B3B",
            boxShadow: "4px 4px 0px #2B2B2B",
            "&:hover": {
              backgroundColor: "#FFB74A",
            },
          }}
        >
          Create Team
        </Button>
      </Box>

      <Box
        mt={4}
        sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveAllTeams}
          sx={{
            backgroundColor: "#FF6B6B",
            color: "white",
            boxShadow: "4px 4px 0px #2B2B2B",
            "&:hover": {
              backgroundColor: "#E74C3C",
            },
          }}
        >
          Remove All Teams
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBattle}
          sx={{
            backgroundColor: "#FF6B6B",
            color: "white",
            boxShadow: "4px 4px 0px #2B2B2B",
            "&:hover": {
              backgroundColor: "#E74C3C",
            },
          }}
        >
          Fight!
        </Button>
      </Box>

      <Box mt={4} sx={{ textAlign: "center", color: "#3B3B3B" }}>
        <Typography variant="h6" sx={{ color: "#F24B1A" }}>
          TEAMS:
        </Typography>
        {teams.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No teams available</Typography>
        ) : (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {teams.map((team: Team) => (
              <TeamCard key={team.teamName} team={team} />
            ))}
          </Box>
        )}
      </Box>

      <Modal
        open={modalOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleCloseModal();
            setWinnerVisible(false);
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box>
            {battlingTeams.length === 2 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ color: "red", fontSize: "1.8rem", fontWeight: "bold" }}
                >
                  {battlingTeams[0].teamName}
                </Typography>
                <Typography
                  sx={{ color: "red", fontSize: "1.8rem", fontWeight: "bold" }}
                >
                  {battlingTeams[1].teamName}
                </Typography>
              </Box>
            )}

            {/* Goblins on the left */}
            <Box>
              {goblinImages_1.map((goblinImage, i) => (
                <Image
                  key={i}
                  src={goblinImage.src}
                  width={60}
                  height={60}
                  alt="goblin"
                  style={{
                    transform: "scaleX(-1)",
                    position: "absolute",
                    left: goblinImage.posX,
                    bottom: goblinImage.posY,
                  }}
                />
              ))}
            </Box>

            {/* Goblins on the right */}
            <Box>
              {goblinImages_2.map((goblinImage, i) => (
                <Image
                  key={i}
                  src={goblinImage.src}
                  width={80}
                  height={80}
                  alt="goblin"
                  style={{
                    position: "absolute",
                    right: goblinImage.posX,
                    bottom: goblinImage.posY,
                  }}
                />
              ))}
            </Box>

            {/* Battle effect */}
            <Box
              sx={{
                position: "absolute",
                left: "0px",
                top: "100px",
                opacity: effectVisible ? 1 : 0,
                transition: `opacity ${
                  appearDisappearInterval / 1000
                }s ease-in-out`,
              }}
            >
              <Image
                src="/assets/effect-2.gif"
                width={100}
                height={100}
                alt="battle effect"
              />
            </Box>
          </Box>
          {winnerVisible && (
            <Box sx={{ position: "relative", top: "50px" }}>
              <Typography
                sx={{ color: "red", fontSize: "1.8rem", fontWeight: "bold" }}
              >
                {winner ? `${winner.teamName} wins!` : "TIE!"}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Game;
