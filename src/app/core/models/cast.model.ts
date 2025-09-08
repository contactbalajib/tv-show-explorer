export interface CastPerson {
  id: number;
  name: string;
  image?: { medium?: string; original?: string };
}
export interface Character {
  id: number;
  name: string;
  image?: { medium?: string; original?: string };
}
export interface CastItem {
  person: CastPerson;
  character: Character;
}
