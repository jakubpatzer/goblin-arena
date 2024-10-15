export interface Goblin {
  name: string;
  attack: number;
  defense: number;
}

export interface Team {
  teamName: string;
  goblins: Goblin[];
}