import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-loader',
  standalone: true,
  template: `<div *ngIf="show" class="loader">Loading...</div>`,
  styles: [`.loader { padding: 12px; }`],
  imports: [NgIf]
})
export class LoaderComponent { @Input() show = false; }
