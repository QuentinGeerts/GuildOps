export interface Character {
  id: string;
  level: number;
  name: string;
  characterClassId: string;
  server: string;
  gameId: string;
  guildId: string | null;
  guildName: string | null;
  createdAt: string;
}

export interface CreateCharacterRequest {
  characterClassId: string;
  gameId: string;
  name: string;
  server: string;
  level: number;
}