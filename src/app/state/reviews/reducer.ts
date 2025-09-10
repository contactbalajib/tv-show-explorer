import { createReducer, on } from '@ngrx/store';
import * as ReviewsActions from './actions';
import { Review } from './review.model';

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: any;
}

export const initialState: ReviewsState = {
  reviews: [] as Review[],
  loading: false,
  error: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(ReviewsActions.loadReviews, state => ({ ...state, loading: true })),
  on(ReviewsActions.addReview, (state, { review }) => ({
    ...state,
    reviews: [...state.reviews, review]
  })),
  on(ReviewsActions.updateReview, (state, { review }) => ({
    ...state,
    reviews: state.reviews.map(r => r.id === review.id ? review : r)
  })),
  on(ReviewsActions.deleteReview, (state, { reviewId }) => ({
    ...state,
    reviews: state.reviews.filter(r => r.id !== reviewId)
  })),
  on(ReviewsActions.clearAllReviews, state => ({
    ...state,
    reviews: []
  }))
);