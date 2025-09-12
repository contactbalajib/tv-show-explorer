import { Component, effect, inject, signal, computed } from "@angular/core";
import { CommonModule, NgOptimizedImage, DOCUMENT } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TvMazeApiService } from "../../core/services/tvmaze-api.service";
import { Store } from "@ngrx/store";
import { Show } from "../../core/models/show.model";
import { CastItem } from "../../core/models/cast.model";
import { Episode } from "../../core/models/episode.model";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { selectReviews } from "../../state/reviews/selectors";
import { delay, forkJoin, of, switchMap } from "rxjs";

@Component({
  selector: "app-show-detail-page",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LoaderComponent, RouterLink],
  templateUrl: "./show-detail.page.html",
  styleUrl: "./show-detail.page.css",
})
export class ShowDetailPageComponent {
  private route = inject(ActivatedRoute);
  private api = inject(TvMazeApiService);
  private doc = inject(DOCUMENT);
  private store = inject(Store);

  id = signal<number>(0);
  loading = signal(true);
  show = signal<Show | null>(null);
  cast = signal<CastItem[]>([]);
  episodes = signal<Episode[]>([]);

  reviews = this.store.select(selectReviews);

  showReviews = computed(() => {
    const showId = this.id();
    let reviews: any[] = [];
    this.reviews.subscribe((r) => (reviews = r));
    //console.log("Reviews for showId ", showId, reviews);
    return showId ? reviews.filter((review) => review.showId === showId) : [];
  });

  averageRating = computed(() => {
    const reviews = this.showReviews();
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal place
  });

  constructor() {
    // Allow writing to signals within this effect
    effect(
      () => {
        //console.log("this.route.paramMap: ", this.route.paramMap);
        //console.log("this.route.snapshot: ", this.route.snapshot);
        const param = this.route.snapshot.paramMap.get("id");
        const id = Number(param);
        this.id.set(id);
        this.loading.set(true);

        // this.api.getShow(id).subscribe(s => this.show.set(s));
        // this.api.getCast(id).subscribe(c => this.cast.set(c));
        // this.api.getEpisodes(id).subscribe(e => {
        //   this.episodes.set(e);
        //   this.loading.set(false);
        // });

        //RxJS forkJoin to run all API calls in parallel and set loading to false only after all have completed.
        // forkJoin({
        //   showTmp: this.api.getShow(id),
        //   castTmp: this.api.getCast(id),
        //   episodesTmp: this.api.getEpisodes(id),
        // }).subscribe(({ showTmp, castTmp, episodesTmp }) => {
        //   this.show.set(showTmp);
        //   this.cast.set(castTmp);
        //   this.episodes.set(episodesTmp);
        //   this.loading.set(false);
        // });


        // Wait 300ms before starting API calls
        of(null).pipe(
          //Added delay (in milliseconds) intentionally to showcase the loading state
          delay(300),  
          //The RxJS switchMap operator is used to switch from one observable stream to another. When a new value arrives, switchMap cancels the previous inner observable and subscribes to the new one. This is useful for scenarios like API calls in response to user input, ensuring only the latest request is processed and previous ones are ignored.
          switchMap(() =>
            forkJoin({
              showTmp: this.api.getShow(id),
              castTmp: this.api.getCast(id),
              episodesTmp: this.api.getEpisodes(id),
            })
          )
        ).subscribe(({ showTmp, castTmp, episodesTmp }) => {

          //console.log("showTmp:", showTmp);
          //console.log("castTmp:", castTmp);
          //console.log("episodesTmp:", episodesTmp);
          this.show.set(showTmp);
          this.cast.set(castTmp);
          this.episodes.set(episodesTmp);
          this.loading.set(false);

          // next: ({ showTmp, castTmp, episodesTmp }) => {
          //   this.show.set(showTmp);
          //   this.cast.set(castTmp);
          //   this.episodes.set(episodesTmp);
          //   this.loading.set(false);
          // },
          // error: (err) => {
          //   this.loading.set(false);
          //   this.show.set(null);
          //   this.cast.set([]);
          //   this.episodes.set([]);
          //   console.error('Failed to load show/cast/episode details:', err);
          // }
        });
      },
      { allowSignalWrites: true }
    );
  }

  /**
   * groups all episodes by their season number.
   *
   * It creates a Map called groups where each key is a season number and the value is an array of episodes for that season.
   * It loops through all episodes (this.episodes()).
   * For each episode, it checks if the season already exists in the map. If not, it uses an empty array (?? []).
   * It adds the episode to the correct season array and updates the map.
   * Finally, it converts the map to an array of [season, episodes[]] pairs and sorts them by season number.
   * @returns
   */
  seasons() {
    const groups = new Map<number, Episode[]>();
    //console.log("Episodes : ", this.episodes());
    for (const e of this.episodes()) {
      // The ?? operator is called the nullish coalescing operator in JavaScript and TypeScript.
      // It returns the value on its left if it is not null or undefined; otherwise, it returns the value on its right.
      //console.log("Episode season: ", e.season);
      const arr = groups.get(e.season) ?? [];
      arr.push(e);
      groups.set(e.season, arr);
    }
    //console.log("Groups : ", groups);

    //Converts the map to an array of [season, episodes[]] pairs and sorts them by season number.
    return Array.from(groups.entries()).sort((a, b) => a[0] - b[0]);
  }

  // NEW: safe open method
  // openTrailer(e: Episode) {
  //   const q = `${this.show()?.name ?? ""} trailer ${e.name}`.trim();
  //   const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
  //     q
  //   )}`;
  //   // Use document.defaultView instead of directly referencing window (SSR-friendly)
  //   this.doc.defaultView?.open(url, "_blank", "noopener");
  // }

  openTrailer(e: Episode) {
    const showName = this.show()?.name;
    const episodeName = e?.name;
    if (!showName || !episodeName) return; // Guard clause

    const query = `${showName} trailer ${episodeName}`.trim();
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      query
    )}`;

    // SSR-safe window open
    //SSR-safe window means using code that won’t break when your Angular app is running on the server (Server-Side Rendering), where the global window object does not exist.
    //In SSR, there is no browser, so direct access to window will cause errors. Using this.doc.defaultView (from Angular’s injected DOCUMENT) is a safe way to reference the browser window only when it’s available, avoiding SSR crashes.

    if (this.doc.defaultView) {
      this.doc.defaultView.open(url, "_blank", "noopener");
    } else {
      console.warn("Window object not available to open trailer.");
    }
  }
}
