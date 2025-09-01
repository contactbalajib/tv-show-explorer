import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show.model';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private searchTerm = signal('');
  private searchResults = signal<Show[]>([]);
  private currentPage = signal(1);

  getSearchTerm() {
    return this.searchTerm();
  }

  getSearchResults() {
    return this.searchResults();
  }

  getCurrentPage() {
    return this.currentPage();
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  setSearchResults(results: Show[]) {
    this.searchResults.set(results);
  }

  setCurrentPage(page: number) {
    this.currentPage.set(page);
  }

  clearState() {
    this.searchTerm.set('');
    this.searchResults.set([]);
    this.currentPage.set(1);
  }
}