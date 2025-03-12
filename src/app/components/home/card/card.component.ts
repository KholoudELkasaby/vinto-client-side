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

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnChanges {
  @Input() activeTab: string = 'New Arrivals';

  products: Product[] = [];
  imageIntervals: { [productId: string]: any } = {}; // Store intervals per product

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab']) {
      this.fetchProducts();
    }
  }

  productStates: {
    [productId: string]: { currentIndex: number; isFavorite: boolean };
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
            };
          }
        });
      },
      (error) => console.error(error)
    );
  }

  toggleFavorite(productId: string): void {
    this.productStates[productId].isFavorite =
      !this.productStates[productId].isFavorite;
  }

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
