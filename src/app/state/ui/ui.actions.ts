import { createActionGroup, props } from '@ngrx/store';


export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    'Set Loading': props<{ loading: boolean }>()
  }
});