"use client";

import { useState } from "react";
import { Team, Goblin } from "@/interfaces";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from "@mui/material";
import Image from "next/image";


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function TeamCard({ team }: { team: Team }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 220,
        maxWidth: 220,
        borderWidth: '4px',
        borderColor: '#3B3B3B',
        backgroundColor: '#F0F0C9',
        boxShadow: '8px 8px 0px #2B2B2B',
        marginBottom: '20px'
      }}
    >
      <CardHeader
        title={team.teamName}
        subheader={`Wins: ${team.victoryPoints}`}
        sx={{
          fontSize: '0.9rem',
          color: '#F24B1A',
          textAlign: 'center',
        }}
      />
      <CardMedia
        component="img"
        height="100"
        image="/assets/logo.jpeg"
        alt="Retro game logo"
        sx={{
          border: '2px solid #2B2B2B',
        }}
      />
   <CardActions
      sx={{ display: 'flex', justifyContent: 'center' }}
      disableSpacing
    >
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            color: '#333',
            lineHeight: '1.5',
          }}
        >
          {team.goblins.map((goblin: Goblin) => (
            // TODO: Install UUID for goblin (and possibly team) unique IDs
            <Box key={goblin.name} sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontSize: '1.2rem',
                  color: '#0C6C91',
                  marginBottom: '20px',
                  borderTop: '2px solid black',
                  paddingTop: '10px',
                }}
              >
                {goblin.name}
              </Typography>
              {/* TODO: Find/make better sword and shield images with similar width and height */}
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                  src='/assets/sword.png'
                  width={80}
                  height={40}
                  alt='sword'
                />
                <Typography sx={{ fontSize: '0.9rem', color: 'red' }}>
                  {goblin.attack}
                </Typography>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                  src='/assets/shield.png'
                  width={30}
                  height={30}
                  alt='sword'
                />
                <Typography sx={{ fontSize: '0.9rem', position: 'relative', left: '25px', color: 'blue' }}>
                  {goblin.defense}
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
