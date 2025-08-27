import { createActionGroup, props } from '@ngrx/store';
import { Review } from './review.model';

export const ReviewsActions = createActionGroup({
  source: 'Reviews',
  events: {
    'Load From Storage': props<{ reviews: Review[] }>(),
    'Add': props<{ review: Review }>(),
    'Update': props<{ review: Review }>(),
    'Delete': props<{ id: string }>()
  }
});
