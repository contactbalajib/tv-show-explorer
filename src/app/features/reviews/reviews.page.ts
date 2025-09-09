import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Review } from '../../state/reviews/review.model';
import * as ReviewsActions from '../../state/reviews/actions';
import { selectReviews, selectReviewsLoading } from '../../state/reviews/selectors';
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
  private store = inject(Store);

  reviews = this.store.select(selectReviews);
  loading = this.store.select(selectReviewsLoading);
  editingId = signal<string | null>(null);

  form = this.fb.group({
    showId: [null as any, [Validators.required, Validators.min(1)]],
    rating: [4, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(5)]]
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.value;
    const review: Review = {
      id: uuidv4(),
      showId: Number(value.showId),
      rating: Number(value.rating),
      comment: String(value.comment),
      createdAt: new Date().toISOString()
    };
    this.store.dispatch(ReviewsActions.addReview({ review }));
    this.form.reset({ showId: null, rating: 4, comment: '' });
  }

  edit(r: Review) {
    this.editingId.set(r.id);
    this.form.setValue({ showId: r.showId, rating: r.rating, comment: r.comment });
  }

  update() {
    if (!this.editingId() || this.form.invalid) {
      return;
    }
    const value = this.form.value;
    const review: Review = {
      id: this.editingId()!,
      showId: Number(value.showId),
      rating: Number(value.rating),
      comment: String(value.comment),
      createdAt: new Date().toISOString()
    };
    this.store.dispatch(ReviewsActions.updateReview({ review }));
    this.cancel();
  }

  remove(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.store.dispatch(ReviewsActions.deleteReview({ reviewId:id }));
    }
  }

  cancel() {
    this.editingId.set(null);
    this.form.reset({ showId: null, rating: 3, comment: '' });
  }

  clearAllReviews() {
    if (confirm('Are you sure you want to delete ALL reviews? This cannot be undone.')) {
      this.store.dispatch(ReviewsActions.clearAllReviews());
    }
  }
}
