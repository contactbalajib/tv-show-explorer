import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TvMazeApiService } from '../../core/services/tvmaze-api.service';
import { ShowCardComponent } from './show-card/show-card.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, of } from 'rxjs';
import { SearchResult, Show } from '../../core/models/show.model';
import { SearchStateService } from 'src/app/core/services/search-state-service.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShowCardComponent, LoaderComponent, ErrorComponent],
  templateUrl: './search.page.html',
  styleUrl: './search.page.css'
})
export class SearchPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(TvMazeApiService);
  private searchState = inject(SearchStateService);

  loading = signal(false);
  error = signal('');
  shows = signal<Show[]>([]);

  page = signal(1);
  pageSize = 3;

  form = this.fb.group({ q: ['', [Validators.required, Validators.minLength(2)]] });

  ngOnInit() {
    // Restore previous search state
    const savedTerm = this.searchState.getSearchTerm();
    const savedResults = this.searchState.getSearchResults();
    const savedPage = this.searchState.getCurrentPage();

    if (savedTerm && savedResults.length > 0) {
      this.form.patchValue({ q: savedTerm }, { emitEvent: false });
      this.shows.set(savedResults);
      this.page.set(savedPage);
    }
  }

  constructor() {
    this.form.get('q')!.valueChanges!.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { 
        this.loading.set(true); 
        this.error.set(''); 
        this.page.set(1);
        this.searchState.setCurrentPage(1);
      }),
      switchMap(q => {
        if (!q || (q as string).length < 2) { 
          this.loading.set(false); 
          this.shows.set([]);
          this.searchState.setSearchTerm('');
          this.searchState.setSearchResults([]);
          return of([] as SearchResult[]); 
        }
        // Save search term
        this.searchState.setSearchTerm(q as string);
        return this.api.searchShows(String(q)).pipe(
          catchError(err => { this.error.set('Failed to load shows'); return of([] as SearchResult[]); })
        );
      }),
      tap(() => this.loading.set(false))
    ).subscribe((results: any) => {
      const shows = (results as SearchResult[]).map(r => r.show);
      this.shows.set(shows);
      // Save search results
      this.searchState.setSearchResults(shows);
    });
  }

  get paged() {
    const start = (this.page() - 1) * this.pageSize;
    return this.shows().slice(start, start + this.pageSize);
  }
  
  totalPages() { 
    return Math.max(1, Math.ceil(this.shows().length / this.pageSize)); 
  }
  
  next() { 
    if (this.page() < this.totalPages()) {
      this.page.update(v => v + 1);
      this.searchState.setCurrentPage(this.page());
    }
  }
  
  prev() { 
    if (this.page() > 1) {
      this.page.update(v => v - 1);
      this.searchState.setCurrentPage(this.page());
    }
  }
}