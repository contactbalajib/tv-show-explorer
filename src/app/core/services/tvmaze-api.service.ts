import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { SearchResult, Show } from "../models/show.model";
import { Episode } from "../models/episode.model";
import { CastItem } from "../models/cast.model";

@Injectable({ providedIn: "root" })
export class TvMazeApiService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  searchShows(q: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(
      `${this.base}/search/shows?q=${encodeURIComponent(q)}`
    );
  }
  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.base}/shows/${id}`);
  }
  getCast(id: number): Observable<CastItem[]> {
    return this.http.get<CastItem[]>(`${this.base}/shows/${id}/cast`);
  }
  getEpisodes(id: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.base}/shows/${id}/episodes`);
  }
}
