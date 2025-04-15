import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, NgxSkeletonLoaderModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnChanges {
  @Input() activeTab: string = 'New Arrivals';
  userId: any;
  wishlistItems: any[] = [];
  products: Product[] = [];
  imageIntervals: { [productId: string]: any } = {}; // Store intervals per product
  imageLoading: { [productId: string]: boolean } = {}; // Track loading state of images

  imageLoaded(productId: string): void {
    this.imageLoading[productId] = false;
    this.cdr.markForCheck();
  }

  deleteMode: 'single' | 'all' = 'all';
  itemToDeleteId: string = '';
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;

  isOutOfStock(quantity: number): boolean {
    return quantity === 0;
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private wishService: WishService,
    private authService: AuthService,
    private genral: GenralService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserId();

      if (loggedIn && this.userId) {
        console.log(this.userId);
        this.fetchProducts();
        this.cdr.detectChanges();
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
    if (this.isOutOfStock(quantity)) {
      this.notificationService.showNotification({
        message: 'This item is out of Stock for now!',
        type: 'error', // You can use 'error' to indicate it's an issue
      });
      return; // Don't proceed if out of stock
    }
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.genral.increment();
        this.notificationService.showNotification({
          message: 'added to Cart Successfully!',
          type: 'success', // or 'info', 'error', based on your style
        });
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
        this.cdr.detectChanges();
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
    console.log('Toggle favorite:', productId);

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

  trackByProductId(index: number, product: Product): string {
    return product._id;
  }

  startImageRotation(productId: string, images: string[]): void {
    if (this.imageIntervals[productId] || images.length <= 1) return;

    this.imageIntervals[productId] = setInterval(() => {
      const state = this.productStates[productId];
      state.currentIndex = (state.currentIndex + 1) % images.length;
      this.cdr.detectChanges();
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
    console.log('Toggle wishlist:', productId);
    console.log('userId:', userId);
    this.wishService.getAll(userId).subscribe({
      next: (response) => {
        const wishlist = response.data.wishlist;
        this.wishlistItems = wishlist.products;
        const exists = this.wishlistItems.some(
          (item) => item._id === productId
        );
        console.log('Exists:', exists);
        console.log('uswe:', userId);
        if (exists) {
          console.log('from f');
          this.removefromWish(userId, productId);
          this.notificationService.showNotification({
            message: 'Removed from Wishlist Successfully!',
            type: 'success', // or 'info', 'error', based on your style
          });
        } else {
          console.log('from e');

          this.addToWish(userId, productId);
          this.notificationService.showNotification({
            message: 'Added to Wishlist Successfully!',
            type: 'success', // or 'info', 'error', based on your style
          });
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
