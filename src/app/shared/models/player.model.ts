import { Character } from "./character.model";

export interface Player {
  id: string;
  accountName: string;
  createdAt: string;
  characters: Character[];
}

