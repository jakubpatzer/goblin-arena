"use client";

import { Team, Goblin } from "@/interfaces";
import * as React from 'react';
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      variant="outlined"
      sx={{
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
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon
            sx={{ 
              // color: '#FFDD57' 
            }}
          />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            fontFamily: '"Press Start 2P", cursive',
            color: '#333',
            lineHeight: '1.5',
          }}
        >
          {team.goblins.map((goblin: Goblin) => (
            <Box key={goblin.name} sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: '#0C6C91',
                  textTransform: 'uppercase',
                }}
              >
                {goblin.name}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem' }}>
                ATT: {goblin.attack}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem' }}>
                DEF: {goblin.defense}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
