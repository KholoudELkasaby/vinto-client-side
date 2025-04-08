import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { WishService } from '../../../services/wish.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { GenralService } from '../../../services/genral.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSkeletonLoaderModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnChanges {
  @Input() activeTab: string = 'New Arrivals';
  userId: any;
  quantity: number = 1;
  wishlistItems: any[] = [];
  products: Product[] = [];
  imageIntervals: { [productId: string]: any } = {}; // Store intervals per product

  deleteMode: 'single' | 'all' = 'all';
  itemToDeleteId: string = '';
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private wishService: WishService,
    private authService: AuthService,
    private genral: GenralService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserId();

      if (loggedIn && this.userId) {
        console.log(this.userId);
        this.fetchProducts();
      } else {
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab']) {
      this.fetchProducts();
      this.updateLikedState();
    }
    // if (changes['product'] && this.products) {
    // }
  }

  addToCart(id: string, productId: string, quantity: number): void {
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.genral.increment();
        this.router.navigate(['/cart']);
      },
    });
  }

  productStates: {
    [productId: string]: {
      currentIndex: number;
      isFavorite: boolean;
      isInCart: boolean;
    };
  } = {};

  fetchProducts(): void {
    let fetchObservable;
    if (this.activeTab === 'Best Sellers') {
      fetchObservable = this.productService.getTopRatedProducts();
    } else if (this.activeTab === 'Offers') {
      fetchObservable = this.productService.getOffers();
    } else {
      fetchObservable = this.productService.getNewArrivals();
    }

    fetchObservable.subscribe(
      (data) => {
        this.products = data;
        console.log(data);

        this.products.forEach((product) => {
          if (!this.productStates[product._id]) {
            this.productStates[product._id] = {
              currentIndex: 0,
              isFavorite: false,
              isInCart: false,
            };
          }
        });
        if (this.userId) {
          this.fetchWishlist();
        }
      },
      (error) => console.error(error)
    );
  }

  toggleFavorite(productId: string): void {
    this.productStates[productId].isFavorite =
      !this.productStates[productId].isFavorite;
    this.toggleWish(this.userId, productId);
  }
  //   loadCartState(): void {
  //   this.cartService.getCart(this.userId).subscribe(
  //     (cart) => {
  //       cart.ItemsOrdered.forEach((item) => {  // item is now an object, not a string
  //         if (this.productStates[item._id]) {
  //           this.productStates[item._id].isInCart = true;
  //         }
  //       });
  //     },
  //     (error) => console.error('Error loading cart:', error)
  //   );
  // }

  ////
  // toggleCart(productId: string): void {
  //   if (!this.userId) return;
  //
  //   this.cartService.addToCart(this.userId, productId, this.quantity).subscribe({
  //     next: () => this.productStates[productId].isInCart = true,
  //     error: (err) => console.error('Error adding to cart:', err)
  //   });
  // }
  ////

  startImageRotation(productId: string, images: string[]): void {
    if (this.imageIntervals[productId] || images.length <= 1) return;

    this.imageIntervals[productId] = setInterval(() => {
      const state = this.productStates[productId];
      state.currentIndex = (state.currentIndex + 1) % images.length;
    }, 1000);
  }

  stopImageRotation(productId: string): void {
    if (this.imageIntervals[productId]) {
      clearInterval(this.imageIntervals[productId]);
      delete this.imageIntervals[productId];
    }
  }

  fetchWishlist() {
    this.wishService.getAll(this.userId).subscribe({
      next: (response) => {
        this.wishlistItems = response.data.wishlist.products;
        this.updateLikedState();
      },
      error: (err) => console.error('Error fetching wishlist:', err),
    });
  }

  updateLikedState() {
    if (this.userId && this.products) {
      this.products.forEach((product) => {
        if (this.productStates[product._id]) {
          this.productStates[product._id].isFavorite = this.isInWishlist(
            product._id
          );
        }
      });
    }
  }

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
}
