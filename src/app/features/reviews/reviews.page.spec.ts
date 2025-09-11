import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { ReviewsPageComponent } from './reviews.page';
import { reviewsReducer } from 'src/app/state/reviews/reducer';
import { Review } from 'src/app/state/reviews/review.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, firstValueFrom } from 'rxjs';

describe('ReviewsPageComponent', () => {
  let fixture: ComponentFixture<ReviewsPageComponent>;
  let comp: ReviewsPageComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsPageComponent, ReactiveFormsModule],
      providers: [provideStore({ reviews: reviewsReducer })]
    }).compileComponents();
    fixture = TestBed.createComponent(ReviewsPageComponent);
    comp = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should initialize form with validators', () => {
    expect(comp.form.get('showId')).toBeTruthy();
    expect(comp.form.get('rating')).toBeTruthy();
    expect(comp.form.get('comment')).toBeTruthy();
    comp.form.get('showId')!.setValue('');
    comp.form.get('rating')!.setValue(0);
    comp.form.get('comment')!.setValue('');
    expect(comp.form.invalid).toBeTrue();
    comp.form.get('showId')!.setValue(1);
    comp.form.get('rating')!.setValue(5);
    comp.form.get('comment')!.setValue('Great show!');
    expect(comp.form.valid).toBeTrue();
  });

  it('should add a review', async () => {
    comp.form.get('showId')!.setValue(1);
    comp.form.get('rating')!.setValue(5);
    comp.form.get('comment')!.setValue('Great show!');
    comp.submit();
    const reviews = await firstValueFrom(comp.reviews);
    expect(reviews.length).toBe(1);
    expect(reviews[0].comment).toBe('Great show!');
  });

  it('should edit a review', async () => {
    comp.form.get('showId')!.setValue(1);
    comp.form.get('rating')!.setValue(5);
    comp.form.get('comment')!.setValue('Great show!');
    comp.submit();
    let reviews = await firstValueFrom(comp.reviews);
    const review = reviews[0];
    comp.edit(review);
    comp.form.get('comment')!.setValue('Updated comment');
    comp.update();
    reviews = await firstValueFrom(comp.reviews);
    expect(reviews[0].comment).toBe('Updated comment');
  });

  // it('should delete a review', async () => {
  //   comp.form.get('showId')!.setValue(1);
  //   comp.form.get('rating')!.setValue(5);
  //   comp.form.get('comment')!.setValue('Great show!');
  //   comp.submit();
  //   let reviews = await firstValueFrom(comp.reviews);
  //   const review = reviews[0];
  //   comp.remove(review.id);
  //   reviews = await firstValueFrom(comp.reviews);
  //   expect(reviews.length).toBe(0);
  // });

  // it('should clear all reviews', async () => {
  //   comp.form.get('showId')!.setValue(1);
  //   comp.form.get('rating')!.setValue(5);
  //   comp.form.get('comment')!.setValue('Great show!');
  //   comp.submit();
  //   comp.clearAllReviews();
  //   const reviews = await firstValueFrom(comp.reviews);
  //   expect(reviews.length).toBe(0);
  // });

  // it('should show empty state when no reviews', async () => {
  //   comp.clearAllReviews();
  //   const reviews = await firstValueFrom(comp.reviews);
  //   expect(reviews.length).toBe(0);
  // });

  it('should cancel editing', async () => {
    comp.form.get('showId')!.setValue(1);
    comp.form.get('rating')!.setValue(5);
    comp.form.get('comment')!.setValue('Great show!');
    comp.submit();
    const reviews = await firstValueFrom(comp.reviews);
    const review = reviews[0];
    comp.edit(review);
    comp.cancel();
    expect(comp.editingId()).toBeNull();
  });
});
