import { Injectable, signal, computed } from '@angular/core';
import { Review } from '../../state/reviews/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsStorageService {
  private readonly STORAGE_KEY = 'tv-show-reviews';
  
  // Signal-based state management
  private reviewsSignal = signal<Review[]>([]);
  
  // Public readonly signals
  readonly reviews = this.reviewsSignal.asReadonly();
  
  // Computed selectors
  readonly reviewsCount = computed(() => this.reviews().length);
  
  constructor() {
    this.loadFromStorage();
  }
  
  // Get reviews by show ID
  getReviewsByShow(showId: number): Review[] {
    return this.reviews().filter(review => review.showId === showId);
  }
  
  // Get a specific review by ID
  getReviewById(id: string): Review | undefined {
    return this.reviews().find(review => review.id === id);
  }
  
  // Add a new review
  addReview(review: Review): void {
    const currentReviews = this.reviews();
    const updatedReviews = [review, ...currentReviews];
    this.reviewsSignal.set(updatedReviews);
    this.saveToStorage();
  }
  
  // Update an existing review
  updateReview(updatedReview: Review): void {
    const currentReviews = this.reviews();
    const updatedReviews = currentReviews.map(review => 
      review.id === updatedReview.id ? updatedReview : review
    );
    this.reviewsSignal.set(updatedReviews);
    this.saveToStorage();
  }
  
  // Delete a review
  deleteReview(id: string): void {
    const currentReviews = this.reviews();
    const updatedReviews = currentReviews.filter(review => review.id !== id);
    this.reviewsSignal.set(updatedReviews);
    this.saveToStorage();
  }
  
  // Clear all reviews
  clearAllReviews(): void {
    this.reviewsSignal.set([]);
    this.saveToStorage();
  }
  
  // Private methods for localStorage operations
  private saveToStorage(): void {
    try {
      const data = { items: this.reviews(), lastUpdated: new Date().toISOString() };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save reviews to localStorage:', error);
    }
  }
  
  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const reviews = parsed.items || [];
        this.reviewsSignal.set(reviews);
      }
    } catch (error) {
      console.error('Failed to load reviews from localStorage:', error);
      this.reviewsSignal.set([]);
    }
  }
  
  // Export data (for backup or transfer)
  exportData(): string {
    return JSON.stringify({
      reviews: this.reviews(),
      exportedAt: new Date().toISOString()
    });
  }
  
  // Import data (for restore or transfer)
  importData(jsonData: string): boolean {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.reviews && Array.isArray(parsed.reviews)) {
        this.reviewsSignal.set(parsed.reviews);
        this.saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}
