import { Box } from "@mui/material";
import { Team, Goblin } from "@/interfaces";

const TeamCard = ({ team }: { team: Team }) => {
  return (
    <Box key={team.teamName}>
      <h3>{team.teamName}</h3>
      {team.goblins.map((goblin: Goblin) => (
        <div key={goblin.name}>
          <div>{goblin.name}</div>
          <div>ATT: {goblin.attack}</div>
          <div>DEF: {goblin.defense}</div>
        </div>
      ))}
    </Box>
  );
};

export default TeamCard;
