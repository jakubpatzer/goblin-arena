"use client";

import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { generateRandomName } from "@/utils";
import TeamCard from "./TeamCard";
import { Team } from "@/interfaces";
import { battle } from "@/utils";
import Image from "next/image";

const goblinImages_1 = [
  {
    src: '/assets/goblin-9.gif',
    posLeft: 0,
    posBottom: 10,
  },
  {
    src: '/assets/goblin-9.gif',
    posLeft: 50,
    posBottom: 40,
  },
  {
    src: '/assets/goblin-9.gif',
    posLeft: 0,
    posBottom: 70,
  },
  {
    src: '/assets/goblin-9.gif',
    posLeft: 0,
    posBottom: 130,
  },
  {
    src: '/assets/goblin-9.gif',
    posLeft: 50,
    posBottom: 100,
  },
]
const goblinImages_2 = [
  {
    src: '/assets/goblin-7.webp',
    posLeft: 0,
    posBottom: 10,
  },
  {
    src: '/assets/goblin-7.webp',
    posLeft: 50,
    posBottom: 40,
  },
  {
    src: '/assets/goblin-7.webp',
    posLeft: 0,
    posBottom: 70,
  },
  {
    src: '/assets/goblin-7.webp',
    posLeft: 0,
    posBottom: 130,
  },
  {
    src: '/assets/goblin-7.webp',
    posLeft: 50,
    posBottom: 100,
  },
]

const modalStyle = {
  height: '300px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 500,
  bgcolor: '#F0F0C9',
  border: '4px solid #3B3B3B',
  boxShadow: '8px 8px 0px #2B2B2B',
  padding: '10px',
  textAlign: 'center',
  backgroundImage: 'url("/assets/battle-background.png")',
  backgroundSize: 'cover',
};

const ManageTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [battlingTeams, setBattlingTeams] = useState<Team[]>([]);
  const [winner, setWinner] = useState<Team | null>(null);

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

  const handleRemoveAllTeams = () => {
    setTeams([]);
    localStorage.removeItem("teams");
  };

  const handleBattle = () => {
    if (teams.length > 1) {
      const { updatedTeams, participatingTeams, winner } = battle(teams);

      setTeams([...updatedTeams].sort((a, b) => (b.victoryPoints || 0) - (a.victoryPoints || 0)));
      setBattlingTeams(participatingTeams);
      setWinner(winner);
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
    <Box>
      {battlingTeams.length === 2 && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Typography 
            sx={{
              color: 'red',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            {battlingTeams[0].teamName}
          </Typography>
          <Typography 
            sx={{
              color: 'red',
              fontSize: '1.8rem',
              fontWeight: 'bold',
            }}
          >
            {battlingTeams[1].teamName}
          </Typography>
        </Box>
      )}
      <Box>
        {goblinImages_1.map((char, i) => (
          <Image 
            key={i}
            src={char.src}
            width={60} 
            height={60} 
            alt='goblin'
            style={{
              transform: 'scaleX(-1)',
              position: 'absolute',
              left: char.posLeft,
              bottom: char.posBottom,
            }}
          />

        ))}
      </Box>
      <Box>
        {goblinImages_2.map((char, i) => (
          <Image 
            key={i}
            src={char.src}
            width={80} 
            height={80} 
            alt='goblin'
            style={{
              position: 'absolute',
              right: char.posLeft,
              bottom: char.posBottom,
            }}
          />

        ))}
      </Box>
      <Box>
        <Image
          src='/assets/effect-2.gif'
          width={100}
          height={100}
          alt='effect1'
        />
      </Box>
    </Box>
    <Box>
    <Typography 
      sx={{
        color: 'red',
        fontSize: '1.8rem',
        fontWeight: 'bold',
      }}
    >
      {winner ? `${winner.teamName} wins!` : 'TIE!'}
    </Typography>
    </Box>
    {/* <Button 
      onClick={handleClose}
      sx={{
        mt: 20,
        backgroundColor: '#FFDD57', 
        color: '#3B3B3B', 
        boxShadow: '4px 4px 0px #2B2B2B',
        '&:hover': {
          backgroundColor: '#FFB74A',
        },
      }}
    >
      Close
    </Button> */}
  </Box>
</Modal>
    </Box>
  );
};

export default ManageTeams;
