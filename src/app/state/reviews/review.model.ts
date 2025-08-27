export interface Review {
  id: string; // uuid
  showId: number;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO
}
