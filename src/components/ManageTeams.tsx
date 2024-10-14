"use client";

import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface Goblin {
  name: string;
  attack: number;
  defense: number;
}

interface Team {
  teamName: string;
  goblins: Goblin[];
}

const initialTeam: Team[] = [
  {
    teamName: "Jogarr",
    goblins: [
      { name: "Bobo", attack: 8, defense: 5 },
      { name: "Koko", attack: 5, defense: 1 },
      { name: "Jajo", attack: 3, defense: 8 },
      { name: "Lolo", attack: 2, defense: 3 },
      { name: "Zozo", attack: 9, defense: 4 },
    ],
  },
];

const ManageTeams = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeam);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCreateTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTeams((prevTeams: Team[]): Team[] => {
      return [
        ...prevTeams,
        {
          teamName: inputValue,
          goblins: Array.from({ length: 5 }, (e, i) => ({
            name: `Name_${i}`,
            attack: Math.floor(Math.random() * 9 + 1),
            defense: Math.floor(Math.random() * 9 + 1),
          })),
        },
      ];
    });
    setInputValue("");
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
      <Box>
        TEAMS:
        {teams.map((team: Team) => (
          <Box key={team.teamName}>
            <h2>{team.teamName}</h2>
            {team.goblins.map((goblin: Goblin) => (
              <div key={goblin.name}>
                <div>{goblin.name}</div>
                <div>ATT: {goblin.attack}</div>
                <div>DEF: {goblin.defense}</div>
              </div>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ManageTeams;
