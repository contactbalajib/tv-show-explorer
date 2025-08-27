import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  template: `<div *ngIf="message" class="error">{{message}}</div>`,
  styles: [`.error { color: #b00020; padding: 8px 0; }`],
  imports: [NgIf]
})
export class ErrorComponent { @Input() message = ''; }
