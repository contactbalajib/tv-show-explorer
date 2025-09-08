import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  imports: [NgIf]
})
export class LoaderComponent { @Input() show = false; }
