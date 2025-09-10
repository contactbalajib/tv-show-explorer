import { createAction, props } from '@ngrx/store';
import { Review } from './review.model';

export const loadReviews = createAction('[Reviews] Load', props<{ showId: string }>());

export const addReview = createAction('[Reviews] Add', props<{ review: Review }>());
export const updateReview = createAction('[Reviews] Update', props<{ review: Review }>());
export const deleteReview = createAction('[Reviews] Delete', props<{ reviewId: string }>());

export const clearAllReviews = createAction('[Reviews] Clear All');