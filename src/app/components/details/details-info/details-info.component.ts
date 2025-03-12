import { Component, Input } from '@angular/core';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-details-info',
  imports: [AddToCartBtnComponent, CommonModule],
  templateUrl: './details-info.component.html',
  styleUrl: './details-info.component.css',
})
export class DetailsInfoComponent {
  @Input() product!: Product;
  isExpanded: boolean = false;
  // activeSize: number = 2;

  // sizes: string[] = ['S', 'M', 'L', 'XL'];

  // setActive(type: string, index: number) {
  //   if (type === 'size') {
  //     this.activeSize = index;
  //   }
  // }
  get isDescriptionExpandable(): boolean {
    const words = this.product.describe.split(' ').length;
    return words > 20; // Adjust this based on testing
  }

  get offerPrice(): number {
    return this.product.discount > 0
      ? parseFloat(
          (this.product.price / (1 - this.product.discount / 100)).toFixed(2)
        )
      : 0;
  }
}
