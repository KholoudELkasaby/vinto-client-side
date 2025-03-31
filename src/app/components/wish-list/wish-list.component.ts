import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  wishlist = [
    {
      name: 'Product 1',
      id: 1,
      category: 'Category A',
      price: 99.99,
      image: '/Images/dress.jfif',
    },
    {
      name: 'Product 2',
      id: 2,
      category: 'Category B',
      price: 149.99,
      image: '/Images/dress.jfif',
    },
    {
      name: 'Product 3',
      id: 3,
      category: 'Category C',
      price: 199.99,
      image: '/Images/dress.jfif',
    },
  ];

  constructor(private router: Router) {}

  goToDetails(product: any) {
    this.router.navigate(['/details', product.id]);
  }

  removeProduct(index: number, event: Event) {
    event.stopPropagation();
    this.wishlist.splice(index, 1);
  }

  removeAllProducts() {
    this.wishlist = [];
  }
}
