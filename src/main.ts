import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
// Remove NgRx imports - now using localStorage services
// import { provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { reviewsReducer } from './app/state/reviews/reviews.reducer';
// import { uiReducer } from './app/state/ui/ui.reducer';
// import { ReviewsEffects } from './app/state/reviews/reviews.effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    // Storage services are automatically provided via @Injectable({ providedIn: 'root' })
    // No need for NgRx store configuration
  ]
}).catch(err => console.error(err));
