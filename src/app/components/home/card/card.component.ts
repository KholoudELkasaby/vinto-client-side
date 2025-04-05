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

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnChanges {
  @Input() activeTab: string = 'New Arrivals';
  userId = "67b87e4bee6c8c97157670ed";
  quantity: number = 1;
  inWishlist: boolean = false;
  wishlistItems: any[] = [];
  products: Product[] = [];
  imageIntervals: { [productId: string]: any } = {}; // Store intervals per product

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private wishService: WishService
  ) { }


  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab']) {
      this.fetchProducts();
    }
  }

  addToCart(id: string, productId: string, quantity: number): void {
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.router.navigate(["/cart"])
      }
    })
  }

  toggleWish(userId: string, productId: string): void {
    this.wishService.getAll(userId).subscribe({
      next: (response) => {
        const wishlist = response.data.wishlist;
        this.wishlistItems = wishlist.products;
        const exists = this.wishlistItems.some(item => item.product._id === productId);

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
        //this.loadCartState();
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
  toggleCart(productId: string): void {
    this.cartService.addToCart("userId", productId, 1).subscribe(
      () => (this.productStates[productId].isInCart = true),
      (error) => console.error('Error adding item:', error)
    );
  }
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
}
