import { createAction, props } from '@ngrx/store';

export const loadReviews = createAction('[Reviews] Load', props<{ showId: string }>());
export const loadReviewsSuccess = createAction('[Reviews] Load Success', props<{ reviews: any[] }>());
export const loadReviewsFailure = createAction('[Reviews] Load Failure', props<{ error: any }>());

export const addReview = createAction('[Reviews] Add', props<{ review: any }>());
export const updateReview = createAction('[Reviews] Update', props<{ review: any }>());
export const deleteReview = createAction('[Reviews] Delete', props<{ reviewId: string }>());

export const clearAllReviews = createAction('[Reviews] Clear All');