export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate?: string;
  summary?: string;
  url?: string;
}
