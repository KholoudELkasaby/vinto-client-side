import { Component, input, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishService } from '../../services/wish.service';

@Component({
  selector: 'app-productitem',
  standalone: true,
  imports: [FormsModule, RatingModule, CommonModule, RouterModule],
  providers: [CartService, WishService],
  templateUrl: './productitem.component.html',
  styleUrl: './productitem.component.css',
})
export class ProductitemComponent {
  @Input() products: any;
  @Input() controlName: any;
  @Input() rate: number = 0;
  @Input() id: any;
  userId = "67b87e4bee6c8c97157670ed";
  quantity: number = 1
  inWishlist: boolean = false;
  wishlistItems: any[] = [];
  imageIntervals: { [productId: string]: any } = {}; // Store intervals per product

  constructor(private cartService: CartService, private router: Router, private wishService: WishService) { }
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


  toggleWish(userId: string, productId: string): void {
    this.wishService.getAll(userId).subscribe({
      next: (response) => {
        const wishlist = response.data.wishlist;
        this.wishlistItems = wishlist.products;
        console.log(this.wishlistItems)
        const exists = this.wishlistItems.some(item => item._id === productId);

        if (exists) {
          this.removefromWish(userId, productId);
        } else {
          this.addToWish(userId, productId);
        }
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }
  addToWish(id: string, productId: string): void {
    this.wishService.addWish(id, productId).subscribe({})
  }
  removefromWish(id: string, productId: string): void {
    this.wishService.removeOne(id, productId).subscribe({})
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistItems.some(item => item.product._id === productId);
  }
  toggleLike(): void {
    this.liked = !this.liked;
  }

  addToCart(id: string, productId: string, quantity: number): void {
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.router.navigate(["/cart"])
      }
    })
  }

}
