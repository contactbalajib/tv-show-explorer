import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { ReviewsPageComponent } from './reviews.page';
import { reviewsReducer } from 'src/app/state/reviews/reducer';

describe('ReviewsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsPageComponent],
      providers: [provideStore({ reviews: reviewsReducer })]
    }).compileComponents();
  });
  it('should create', () => {
    const fixture = TestBed.createComponent(ReviewsPageComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
