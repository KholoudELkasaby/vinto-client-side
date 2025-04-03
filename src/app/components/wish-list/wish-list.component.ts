import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WishService } from '../../services/wish.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-wish-list',
  imports: [CommonModule],
  providers: [WishListComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  wishlist?: Product[];
  //   {
  //     name: 'Product 1',
  //     id: 1,
  //     category: 'Category A',
  //     price: 99.99,
  //     image: '/Images/dress.jfif',
  //   },
  //   {
  //     name: 'Product 2',
  //     id: 2,
  //     category: 'Category B',
  //     price: 149.99,
  //     image: '/Images/dress.jfif',
  //   },
  //   {
  //     name: 'Product 3',
  //     id: 3,
  //     category: 'Category C',
  //     price: 199.99,
  //     image: '/Images/dress.jfif',
  //   },
  // ];
  user = "67b798659f02ecbe9f4d7ef0"
  constructor(private router: Router, private wishListService: WishService) { }
  ngOnInit() {
    this.getWishList(this.user)
  }
  getWishList(id: string) {
    this.wishListService.getAll(id).subscribe((data) => {
      this.wishlist = data.data.wishlist.products;
    });
  }
  goToDetails(product: any) {
    this.router.navigate(['/details', product.id]);
  }

  removeWish(product: string) {
    this.wishListService.removeOne(this.user, product).subscribe()
  }

  removeAllProducts() {
    this.wishlist = [];
  }

}
