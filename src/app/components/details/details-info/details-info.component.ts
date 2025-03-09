import { Component } from '@angular/core';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-info',
  imports: [AddToCartBtnComponent, CommonModule],
  templateUrl: './details-info.component.html',
  styleUrl: './details-info.component.css',
})
export class DetailsInfoComponent {
  isExpanded: boolean = false;
  activeSize: number = 2;

  sizes: string[] = ['S', 'M', 'L', 'XL'];

  setActive(type: string, index: number) {
    if (type === 'size') {
      this.activeSize = index;
    }
  }
}
