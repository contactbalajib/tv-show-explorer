import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewsState } from './reviews.reducer';

export const selectReviewsState = createFeatureSelector<ReviewsState>('reviews');
export const selectAllReviews = createSelector(selectReviewsState, s => s.items);
export const selectReviewsByShow = (showId: number) => createSelector(selectAllReviews, items => items.filter(r => r.showId === showId));
