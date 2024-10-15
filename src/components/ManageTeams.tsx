"use client";

import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { generateRandomName } from "@/utils";
import TeamCard from "./TeamCard";
import { Team } from "@/interfaces";

const ManageTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Load teams from localStorage on component mount
  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  // Save teams to localStorage whenever teams state changes
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
        },
      ];
      return newTeams;
    });
    setInputValue("");
  };

  const handleRemoveAllTeams = () => {
    setTeams([]); // Clear the state
    localStorage.removeItem("teams"); // Clear from localStorage
  };

  return (
    <Box>
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
        }}
      >
        <TextField
          label="Enter team name"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" type="submit">
          Create team
        </Button>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveAllTeams}
        >
          Remove All Teams
        </Button>
      </Box>

      <Box mt={4}>
        <h2>TEAMS:</h2>
        {teams.length === 0 ? (
          <p>No teams available</p>
        ) : (
          teams.map((team: Team) => (
            <TeamCard key={team.teamName} team={team} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ManageTeams;
