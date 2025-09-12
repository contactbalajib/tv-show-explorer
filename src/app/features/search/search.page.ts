import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { TvMazeApiService } from "../../core/services/tvmaze-api.service";
import { ShowCardComponent } from "./show-card/show-card.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { ErrorComponent } from "../../shared/components/error/error.component";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
  of,
} from "rxjs";
import { SearchResult, Show } from "../../core/models/show.model";

@Component({
  selector: "app-search-page",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShowCardComponent,
    LoaderComponent,
    ErrorComponent,
  ],
  templateUrl: "./search.page.html",
  styleUrl: "./search.page.css",
})
export class SearchPageComponent {
  private fb = inject(FormBuilder);
  private api = inject(TvMazeApiService);

  loading = signal<boolean>(false);
  error = signal<string>("");
  shows = signal<Show[]>([]);

  page = signal(1);
  pageSize = 3;

  form = this.fb.group({
    q: ["", [Validators.required, Validators.minLength(3)]],
  });

  constructor() {
    this.form
      .get("q")!
      .valueChanges!.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.loading.set(true);
          this.error.set("");
          this.page.set(1);
        }),
        switchMap((q) => {
          if (!q || (q as string).length < 3) {
            this.loading.set(false);
            this.shows.set([]);
            return of([] as SearchResult[]);
          }
          return this.api.searchShows(String(q)).pipe(
            catchError((err) => {
              this.error.set("Failed to load shows");
              return of([] as SearchResult[]);
            })
          );
        }),
        tap(() => this.loading.set(false))
      )
      .subscribe((results: any) => {
        const shows = (results as SearchResult[]).map((r) => r.show);
        this.shows.set(shows);
      });
  }

  get paged() {
    const start = (this.page() - 1) * this.pageSize;
    return this.shows().slice(start, start + this.pageSize);
  }
  totalPages() {
    console.log("SHOWS : " , this.shows());
    return Math.max(1, Math.ceil(this.shows().length / this.pageSize));
  }
  next() {
    if (this.page() < this.totalPages()) this.page.update((pageNo) => pageNo + 1);
  }
  prev() {
    if (this.page() > 1) this.page.update((pageNo) => pageNo - 1);
  }
}
