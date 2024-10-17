import { faker } from '@faker-js/faker';

export function generateRandomName(): string {
  return faker.name.firstName()
}

import { Team, Goblin } from "@/interfaces";

// Single battle between goblins
const fightGoblinBattle = (goblin1: Goblin, goblin2: Goblin) => {
  let goblin1Alive: boolean = true;
  let goblin2Alive: boolean = true;

  // Check if goblin1 kills goblin2
  if (goblin1.attack > goblin2.defense) {
    goblin2Alive = false;
  }

  // Check if goblin2 kills goblin1
  if (goblin2.attack > goblin1.defense) {
    goblin1Alive = false;
  }

  return { goblin1Alive, goblin2Alive };
};

// Single round between two teams
const battleRound = (team1: Team, team2: Team) => {
  let team1Wins: number = 0;
  let team2Wins: number = 0;

  // Select random goblins from each team for the battle
  const randomGoblins1: Goblin[] = team1.goblins.sort(() => Math.random() - 0.5).slice(0, 5);
  const randomGoblins2: Goblin[] = team2.goblins.sort(() => Math.random() - 0.5).slice(0, 5);

  // 5 fights
  for (let i = 0; i < 5; i++) {
    const goblin1: Goblin = randomGoblins1[i];
    const goblin2: Goblin = randomGoblins2[i];

    const result = fightGoblinBattle(goblin1, goblin2);

    // Count wins
    if (result.goblin1Alive && !result.goblin2Alive) {
      team1Wins++;
    } else if (!result.goblin1Alive && result.goblin2Alive) {
      team2Wins++;
    }
  }

  // CHeck for winner or tie
  if (team1Wins > team2Wins) {
    return team1;
  } else if (team2Wins > team1Wins) {
    return team2;
  } else {
    return null;
  }
};

// Main battle
export const battle = (teams: Team[]): { updatedTeams: Team[], participatingTeams: Team[], winner: Team | null } => {
  // Ensure there are at least two teams
  if (teams.length < 2) {
    console.log("Not enough teams to battle.");
    return { updatedTeams: teams, participatingTeams: [], winner: null };
  }

  // Teams array clone
  const updatedTeams: Team[] = teams.map((team: Team) => ({ ...team }));

  // Randomly select two teams for a round
  const participatingTeams: Team[] = updatedTeams.sort(() => Math.random() - 0.5).slice(0, 2);
  const [team1, team2] = participatingTeams;

  // Set victory points for teams
  team1.victoryPoints = team1.victoryPoints ?? 0;
  team2.victoryPoints = team2.victoryPoints ?? 0;

  // Simulate a round
  const winner = battleRound(team1, team2);

  // Assign victory points
  if (winner === team1) {
    team1.victoryPoints++;
  } else if (winner === team2) {
    team2.victoryPoints++;
  } else {
    // If tie, both teams get a victory point
    team1.victoryPoints++;
    team2.victoryPoints++;
  }

  // Return all needed stuff
  return { updatedTeams, participatingTeams, winner }; 
};

