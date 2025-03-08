import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetailsInfoComponent } from './details-info/details-info.component';

@Component({
  selector: 'app-details',
  imports: [CommonModule, DetailsInfoComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  isFavorite: boolean = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
