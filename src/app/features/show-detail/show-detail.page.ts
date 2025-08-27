import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage, DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TvMazeApiService } from '../../core/services/tvmaze-api.service';
import { Show } from '../../core/models/show.model';
import { CastItem } from '../../core/models/cast.model';
import { Episode } from '../../core/models/episode.model';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-show-detail-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LoaderComponent],
  templateUrl: './show-detail.page.html',
  styleUrl: './show-detail.page.css'
})
export class ShowDetailPageComponent {
  private route = inject(ActivatedRoute);
  private api = inject(TvMazeApiService);
  private doc = inject(DOCUMENT); 

  id = signal<number>(0);
  loading = signal(true);
  show = signal<Show | null>(null);
  cast = signal<CastItem[]>([]);
  episodes = signal<Episode[]>([]);

  // constructor() {
  //   effect(() => {
  //     const param = this.route.snapshot.paramMap.get('id');
  //     const id = Number(param);
  //     this.id.set(id);
  //     this.loading.set(true);
  //     this.api.getShow(id).subscribe(s => this.show.set(s));
  //     this.api.getCast(id).subscribe(c => this.cast.set(c));
  //     this.api.getEpisodes(id).subscribe(e => { this.episodes.set(e); this.loading.set(false); });
  //   });
  // }


  
constructor() {
    // Allow writing to signals within this effect
    effect(() => {
      const param = this.route.snapshot.paramMap.get('id');
      const id = Number(param);
      this.id.set(id);
      this.loading.set(true);

      this.api.getShow(id).subscribe(s => this.show.set(s));
      this.api.getCast(id).subscribe(c => this.cast.set(c));
      this.api.getEpisodes(id).subscribe(e => {
        this.episodes.set(e);
        this.loading.set(false);
      });
    }, { allowSignalWrites: true });
  }


  seasons() {
    const groups = new Map<number, Episode[]>();
    for (const e of this.episodes()) {
      const arr = groups.get(e.season) ?? [];
      arr.push(e);
      groups.set(e.season, arr);
    }
    return Array.from(groups.entries()).sort((a,b)=>a[0]-b[0]);
  }

  
// NEW: safe open method
  openTrailer(e: Episode) {
    const q = `${this.show()?.name ?? ''} trailer ${e.name}`.trim();
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
    // Use document.defaultView instead of directly referencing window (SSR-friendly)
    this.doc.defaultView?.open(url, '_blank', 'noopener');
  }

}
