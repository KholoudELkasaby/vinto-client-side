import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() activeTab: string = 'New Arrivals';

  //////////////
  isFavorite: boolean = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  //////////////
  images: string[] = ['/Images/test-card.png', '/Images/dress.jfif'];
  currentIndex: number = 0;

  nextImage(event: Event): void {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
