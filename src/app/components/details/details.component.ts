import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetailsInfoComponent } from './details-info/details-info.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [CommonModule, DetailsInfoComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  isFavorite: boolean = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  ///////
  // Array of images
  images = ['/Images/dress.jfif', '/Images/test-card.png'];

  selectedImage = this.images[0];
  isFading = false;

  selectImage(image: string) {
    if (this.selectedImage === image) return;

    this.isFading = true;

    setTimeout(() => {
      this.selectedImage = image;
      this.isFading = false;
    }, 300);
  }
}
