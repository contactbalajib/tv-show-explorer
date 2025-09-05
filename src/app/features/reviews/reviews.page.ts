import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ReviewsStorageService } from '../../core/services/reviews-storage.service';
import { UiStorageService } from '../../core/services/ui-storage.service';
import { Review } from '../../state/reviews/review.model';
import { v4 as uuidv4 } from './uuid';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviews.page.html',
  styleUrl: './reviews.page.css'
})
export class ReviewsPageComponent {
  private fb = inject(FormBuilder);
  private reviewsStorage = inject(ReviewsStorageService);
  public uiStorage = inject(UiStorageService); // Made public for template access

  // Use signals from storage services
  reviews = this.reviewsStorage.reviews;
  loading = computed(() => this.uiStorage.uiState().loading);
  editingId = signal<string | null>(null);

  form = this.fb.group({
    showId: [null as any, [Validators.required, Validators.min(1)]],
    rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(5)]]
  });

  submit() {
    if (this.form.invalid) {
      this.uiStorage.showError('Please fill in all required fields correctly');
      return;
    }
    
    this.uiStorage.setLoading(true);
    
    try {
      const value = this.form.value;
      const review: Review = { 
        id: uuidv4(), 
        showId: Number(value.showId), 
        rating: Number(value.rating), 
        comment: String(value.comment), 
        createdAt: new Date().toISOString() 
      };
      
      this.reviewsStorage.addReview(review);
      this.form.reset({ showId: null, rating: 3, comment: '' });
      this.uiStorage.showNotification('Review added successfully!');
    } catch (error) {
      this.uiStorage.showError('Failed to add review');
    } finally {
      this.uiStorage.setLoading(false);
    }
  }

  edit(r: Review) {
    this.editingId.set(r.id);
    this.form.setValue({ showId: r.showId, rating: r.rating, comment: r.comment });
  }

  update() {
    if (!this.editingId() || this.form.invalid) {
      this.uiStorage.showError('Please fill in all required fields correctly');
      return;
    }
    
    this.uiStorage.setLoading(true);
    
    try {
      const value = this.form.value;
      const review: Review = { 
        id: this.editingId()!, 
        showId: Number(value.showId), 
        rating: Number(value.rating), 
        comment: String(value.comment), 
        createdAt: new Date().toISOString() 
      };
      
      this.reviewsStorage.updateReview(review);
      this.cancel();
      this.uiStorage.showNotification('Review updated successfully!');
    } catch (error) {
      this.uiStorage.showError('Failed to update review');
    } finally {
      this.uiStorage.setLoading(false);
    }
  }

  remove(id: string) { 
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        this.reviewsStorage.deleteReview(id);
        this.uiStorage.showNotification('Review deleted successfully!');
      } catch (error) {
        this.uiStorage.showError('Failed to delete review');
      }
    }
  }

  cancel() { 
    this.editingId.set(null); 
    this.form.reset({ showId: null, rating: 3, comment: '' }); 
  }

  // Get reviews for a specific show
  getReviewsForShow(showId: number): Review[] {
    return this.reviewsStorage.getReviewsByShow(showId);
  }

  // Clear all reviews
  clearAllReviews() {
    if (confirm('Are you sure you want to delete ALL reviews? This cannot be undone.')) {
      try {
        this.reviewsStorage.clearAllReviews();
        this.uiStorage.showNotification('All reviews cleared!');
      } catch (error) {
        this.uiStorage.showError('Failed to clear reviews');
      }
    }
  }
}
