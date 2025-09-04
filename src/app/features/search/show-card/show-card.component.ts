import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../../../core/models/show.model';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show-card.component.html',
  styleUrl: './show-card.component.css'
})
export class ShowCardComponent {
  @Input() show!: Show;
  image(src?: string) { return src || 'https://placehold.co/600x400?text=No+Image'; }
}
