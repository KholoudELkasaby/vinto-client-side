import { Component, input, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productitem',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './productitem.component.html',
  styleUrl: './productitem.component.css',
})
export class ProductitemComponent {
  @Input() products: any;
  @Input() controlName: any;
  @Input() rate: number = 0;
  @Input() id: any;

  getStarClass(index: number): any {
    const fullStars = Math.floor(this.rate);
    const decimalPart = this.rate - fullStars;
    // console.log( "full"+fullStars);
    // console.log("rate" , this.rate)
    // console.log(decimalPart);
    // console.log(index);
    // console.log("*******************************")

    if (index < fullStars) {
      return 'full-star';
    }
    if (decimalPart > 0) {
      if (decimalPart > 0 && decimalPart <= 0.25) return 'quarter-star';
      if (decimalPart > 0.25 && decimalPart <= 0.5) return 'half-star';
      if (decimalPart > 0.5 && decimalPart <= 0.75) return 'three-quarter-star';
      if (decimalPart > 0.75) return 'full-star';
    } else {
      return 'empty-star';
    }
  }
  liked: boolean = false; // Track like state

  toggleLike(): void {
    this.liked = !this.liked;
  }
}
