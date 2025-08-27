import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReviewsActions } from '../../state/reviews/reviews.actions';
import { selectAllReviews } from '../../state/reviews/reviews.selectors';
import { v4 as uuidv4 } from './uuid';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviews.page.html',
  styleUrl: './reviews.page.css'
})
export class ReviewsPageComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  reviews$ = this.store.select(selectAllReviews);
  editingId = signal<string | null>(null);

  form = this.fb.group({
    showId: [null as any, [Validators.required, Validators.min(1)]],
    rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(5)]]
  });

  submit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    const review = { id: uuidv4(), showId: Number(value.showId), rating: Number(value.rating), comment: String(value.comment), createdAt: new Date().toISOString() };
    this.store.dispatch(ReviewsActions.add({ review }));
    this.saveToStorage();
    this.form.reset({ showId: null, rating: 3, comment: '' });
  }

  edit(r: any) {
    console.log(r);
    this.editingId.set(r.id);
    this.form.setValue({ showId: r.showId, rating: r.rating, comment: r.comment });
  }
  update() {
    if (!this.editingId()) return;
    const value = this.form.value;
    const review = { id: this.editingId()!, showId: Number(value.showId), rating: Number(value.rating), comment: String(value.comment), createdAt: new Date().toISOString() };
    this.store.dispatch(ReviewsActions.update({ review }));
    this.saveToStorage();
    this.cancel();
  }
  remove(id: string) { this.store.dispatch(ReviewsActions.delete({ id })); this.saveToStorage(); }
  cancel() { this.editingId.set(null); this.form.reset({ showId: null, rating: 3, comment: '' }); }

  saveToStorage() {
    // naive persistence by selecting synchronously via subscribe-once
    this.reviews$.pipe().subscribe(items => {
      localStorage.setItem('reviews_state', JSON.stringify({ items }));
    }).unsubscribe();
  }

  ngOnInit() {
    const raw = localStorage.getItem('reviews_state');
    if (raw) {
      try { const parsed = JSON.parse(raw); this.store.dispatch(ReviewsActions.loadFromStorage({ reviews: parsed.items || [] })); } catch {}
    }
  }
}
