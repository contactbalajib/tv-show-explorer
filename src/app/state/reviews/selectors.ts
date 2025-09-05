import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ReviewsState } from './reducer';

export const selectReviewsState = createFeatureSelector<ReviewsState>('reviews');

export const selectReviews = createSelector(selectReviewsState, state => state.reviews);
export const selectReviewsLoading = createSelector(selectReviewsState, state => state.loading);
export const selectReviewsError = createSelector(selectReviewsState, state => state.error);
export const selectReviewsEmpty = createSelector(selectReviews, reviews => reviews.length === 0);

// Selectors for individual review operations can be added as needed, for example:
export const selectReviewById = (reviewId: string) => createSelector(
  selectReviews,
  reviews => reviews.find(r => r.id === reviewId)
);