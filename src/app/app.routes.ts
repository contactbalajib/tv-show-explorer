import { Routes } from '@angular/router';
import { SearchPageComponent } from './features/search/search.page';
import { ShowDetailPageComponent } from './features/show-detail/show-detail.page';
import { ReviewsPageComponent } from './features/reviews/reviews.page';

export const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'shows/:id', component: ShowDetailPageComponent },
  { path: 'reviews', component: ReviewsPageComponent },
  { path: '**', redirectTo: '' }
];
