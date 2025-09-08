import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  imports: [NgIf]
})
export class ErrorComponent { @Input() message = ''; }
