import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show.model';


/**
 * This component will retain the search term and result for the session. 
 * So that when user navigates back from show details page to search page, the previous search results will be shown.
 * This is a simple state management using Angular signals.
 * For more complex scenarios, consider using libraries like NgRx or Akita.
 */
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