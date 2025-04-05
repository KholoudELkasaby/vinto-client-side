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

  user: string = "67b798659f02ecbe9f4d7ef0"
  constructor(private router: Router, private wishListService: WishService) { }
  ngOnInit(): void {
    this.getWishList()
  }
  getWishList(): void {
    this.wishListService.getAll(this.user).subscribe((data) => {
      this.wishlist = data.data.wishlist.products;
    });
  }
  goToDetails(product: any): void {
    this.router.navigate(['/details', product.id]);
  }

  removeWish(product: string): void {
    this.wishListService.removeOne(this.user, product).subscribe((data) => { })
  }

  removeAll(): void {
    if (this.wishlist) {
      if (this.wishlist.length > 1) {
        this.wishlist.forEach(element => {
          this.wishListService.removeOne(this.user, element._id).subscribe((data) => {
          })
        });
        this.getWishList();
      } else {
        this.wishListService.removeOne(this.user, this.wishlist[0]._id).subscribe((data) => {
        })
        this.getWishList();
      }
    }
  }
}
