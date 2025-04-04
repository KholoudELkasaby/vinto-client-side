import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnChanges {
  @Input() activeTab: string = 'New Arrivals';
  userId = '67b798659f02ecbe9f4d7ef0';

  products: Product[] = [];
  imageIntervals: { [productId: string]: any } = {}; // Store intervals per product

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab']) {
      this.fetchProducts();
    }
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
