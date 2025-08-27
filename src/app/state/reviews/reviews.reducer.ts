import { createReducer, on } from '@ngrx/store';
import { ReviewsActions } from './reviews.actions';
import { Review } from './review.model';

export interface ReviewsState { items: Review[] }
export const initialState: ReviewsState = { items: [] };

export const reviewsReducer = createReducer(
  initialState,
  on(ReviewsActions.loadFromStorage, (state, { reviews }) => ({ ...state, items: reviews })),
  on(ReviewsActions.add, (state, { review }) => ({ ...state, items: [review, ...state.items] })),
  on(ReviewsActions.update, (state, { review }) => ({ ...state, items: state.items.map(r => r.id === review.id ? review : r) })),
  on(ReviewsActions.delete, (state, { id }) => ({ ...state, items: state.items.filter(r => r.id !== id) }))
);
