import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  template: `<span class="badge" *ngIf="value !== null">⭐ {{value | number:'1.1-1'}}</span>`,
  styles: [],
  imports: [CommonModule]
})
export class RatingComponent { @Input() value: number | null = null; }
