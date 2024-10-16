"use client";

import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { generateRandomName } from "@/utils";
import TeamCard from "./TeamCard";
import { Team } from "@/interfaces";
import { battle } from "@/utils";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ManageTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [randomTeams, setRandomTeams] = useState<Team[]>([]);

  const handleClose = () => setOpen(false);

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
              attack: Math.floor(Math.random() * 9 + 1),
              defense: Math.floor(Math.random() * 9 + 1),
            })),
            victoryPoints: 0,
          },
        ];
        return newTeams;
      });
    }
    setInputValue("");
  };

  const handleRemoveAllTeams = () => {
    setTeams([]);
    localStorage.removeItem("teams");
  };

  const handleBattle = () => {
    if (teams.length > 1) {
      const { updatedTeams, participatingTeams } = battle(teams);
      setTeams([...updatedTeams].sort((a, b) => (b.victoryPoints || 0) - (a.victoryPoints || 0)));
      setRandomTeams(participatingTeams);
      setOpen(true);
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
        <Typography
          variant="h5"
          sx={{ color: "#F24B1A", textAlign: "center" }}
        >
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
            boxShadow: "inset 4px 4px 0px #2B2B2B",
            border: "2px solid #3B3B3B",
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

      <Box mt={4} textAlign="center">
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {teams.map((team: Team) => (
              <TeamCard key={team.teamName} team={team} />
            ))}
          </Box>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Battle Results
          </Typography>
          <Box>
            {randomTeams.length === 2 && (
              <Box>
                <Typography>{randomTeams[0].teamName}: {randomTeams[0].victoryPoints} victory points</Typography>
                <Typography>{randomTeams[1].teamName}: {randomTeams[1].victoryPoints} victory points</Typography>
              </Box>
            )}
          </Box>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageTeams;
