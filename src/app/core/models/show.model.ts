export interface Rating {
  average: number | null;
}
export interface Image {
  medium?: string;
  original?: string;
}
export interface Show {
  id: number;
  name: string;
  genres: string[];
  rating?: Rating;
  image?: Image;
  summary?: string;
  premiered?: string;
  language?: string;
  network?: { name: string } | null;
}
export interface SearchResult {
  score: number;
  show: Show;
}
