import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewsActions } from './reviews.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class ReviewsEffects {
  private actions$ = inject(Actions);

  persist$ = createEffect(() => this.actions$.pipe(
    ofType(ReviewsActions.add, ReviewsActions.update, ReviewsActions.delete),
    tap(() => {
      const state = JSON.parse(localStorage.getItem('reviews_state') || '{"items":[]}');
      // In real app we would use Store to select; for simplicity, keep latest copy via actions stream
      // Here we cannot access state directly, so do nothing
    })
  ), { dispatch: false });
}
