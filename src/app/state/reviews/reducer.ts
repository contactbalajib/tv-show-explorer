import { createReducer, on } from '@ngrx/store';
import * as ReviewsActions from './actions';

export interface ReviewsState {
  reviews: any[];
  loading: boolean;
  error: any;
}

export const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(ReviewsActions.loadReviews, state => ({ ...state, loading: true })),
  on(ReviewsActions.loadReviewsSuccess, (state, { reviews }) => ({ ...state, reviews, loading: false })),
  on(ReviewsActions.loadReviewsFailure, (state, { error }) => ({ ...state, error, loading: false })),
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