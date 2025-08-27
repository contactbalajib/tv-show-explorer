import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { reviewsReducer } from '../../state/reviews/reviews.reducer';
import { ReviewsPageComponent } from './reviews.page';

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
