import { Component, input, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishService } from '../../services/wish.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productitem',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  providers: [CartService, WishService],
  templateUrl: './productitem.component.html',
  styleUrl: './productitem.component.css',
})
export class ProductitemComponent {
  @Input() products: any;
  @Input() controlName: any;
  @Input() rate: number = 0;
  @Input() id: any;
  userId: any;
  quantity: number = 1;
  inWishlist: boolean = false;
  wishlistItems: any[] = [];
  imageIntervals: { [productId: string]: any } = {}; // Store intervals per product
  deleteMode: 'single' | 'all' = 'all';
  itemToDeleteId: string = '';
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private wishService: WishService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSub = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserId();

      if (loggedIn && this.userId) {
        this.fetchWishlist();
      } else {
        this.wishlistItems = [];
        this.liked = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
      this.updateLikedState();
    }
  }

  fetchWishlist() {
    this.wishService.getAll(this.userId).subscribe({
      next: (response) => {
        this.wishlistItems = response.data.wishlist.products;
        this.updateLikedState();
      },
      error: (err) => console.error('Error fetching wishlist:', err)
    });
  }

  updateLikedState() {
    if (this.userId && this.products) {
      this.liked = this.isInWishlist(this.products._id);
    }
  }

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
    if (index === fullStars) {
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
        const exists = this.wishlistItems.some(
          (item) => item._id === productId
        );

        if (exists) {
          this.removefromWish(userId, productId);
        } else {
          this.addToWish(userId, productId);
        }
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      },
    });
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistItems.some((item) => item._id === productId); // Use item._id
  }
  addToWish(id: string, productId: string): void {
    this.wishService.addWish(id, productId).subscribe({});
  }
  removefromWish(id: string, productId: string): void {
    this.wishService.removeOne(id, productId).subscribe({});
  }
  // isInWishlist(productId: string): boolean {
  //   return this.wishlistItems.some((item) => item.product._id === productId);
  // }
  toggleLike(): void {
    this.liked = !this.liked;
  }

  addToCart(id: string, productId: string, quantity: number): void {
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.router.navigate(['/cart']);
      },
    });
  }
}
