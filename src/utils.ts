import { faker } from '@faker-js/faker';

export function generateRandomName(): string {
  return faker.name.firstName()
}

import { Team, Goblin } from "@/interfaces";

const fightGoblinBattle = (goblin1: Goblin, goblin2: Goblin) => {
  let goblin1Alive = true;
  let goblin2Alive = true;

  if (goblin1.attack > goblin2.defense) {
    goblin2Alive = false;
  }

  if (goblin2.attack > goblin1.defense) {
    goblin1Alive = false;
  }

  return { goblin1Alive, goblin2Alive };
};

const battleRound = (team1: Team, team2: Team) => {
  let team1Wins = 0;
  let team2Wins = 0;

  const randomGoblins1 = team1.goblins.sort(() => Math.random() - 0.5).slice(0, 5);
  const randomGoblins2 = team2.goblins.sort(() => Math.random() - 0.5).slice(0, 5);

  for (let i = 0; i < 5; i++) {
    const goblin1 = randomGoblins1[i];
    const goblin2 = randomGoblins2[i];

    const result = fightGoblinBattle(goblin1, goblin2);

    if (result.goblin1Alive && !result.goblin2Alive) {
      team1Wins++;
    } else if (!result.goblin1Alive && result.goblin2Alive) {
      team2Wins++;
    }
  }

  if (team1Wins > team2Wins) {
    return team1;
  } else if (team2Wins > team1Wins) {
    return team2;
  } else {
    return null;
  }
};

export const battle = (teams: Team[]): { updatedTeams: Team[], participatingTeams: Team[] } => {
  if (teams.length < 2) {
    console.log("Not enough teams to battle.");
    return { updatedTeams: teams, participatingTeams: [] };
  }

  const updatedTeams = teams.map(team => ({ ...team }));

  const participatingTeams = updatedTeams.sort(() => Math.random() - 0.5).slice(0, 2);
  const [team1, team2] = participatingTeams;

  team1.victoryPoints = team1.victoryPoints ?? 0;
  team2.victoryPoints = team2.victoryPoints ?? 0;

  const winner = battleRound(team1, team2);

  if (winner === team1) {
    team1.victoryPoints++;
  } else if (winner === team2) {
    team2.victoryPoints++;
  } else {
    team1.victoryPoints++;
    team2.victoryPoints++;
  }

  console.log(updatedTeams)
  return { updatedTeams, participatingTeams }; 
};
