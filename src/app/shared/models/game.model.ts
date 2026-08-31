export interface Game {
  id: string;
  name: string;
  maxLevel: number;
}

export interface CharacterClass {
  id: string;
  name: string;
}

export interface GameRole {
  id: string;
  name: string
}

export interface GameDetails extends Game {
  classes: CharacterClass[];
  roles: GameRole[];
}
