import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class GenralService {
  constructor(private cartService: CartService) {}
  modelCategories: string[] = ['Authentication and Authorization', 'Store'];
  authModels: string[] = ['User'];
  storeModels: string[] = [
    'Product',
    'ItemOrdered',
    'Cart',
    'shipingInfo',
    'Shipment',
  ];
  deliveryFees: number = 1000;

  NumberOfItemInTheCart = new BehaviorSubject<number>(0);
  currentCartItemNumber$ = this.NumberOfItemInTheCart.asObservable();

  updateCartValue(userId: string): void {
    this.cartService.getCart(userId).subscribe({
      next: (cart) => {
        const newValue = cart.items ? cart.items.length : 0;
        this.NumberOfItemInTheCart.next(newValue);
      },
      error: (error) => {
        console.error('Error fetching cart data:', error);
        this.NumberOfItemInTheCart.next(0);
      },
    });
  }

  increment(): void {
    this.NumberOfItemInTheCart.next(this.NumberOfItemInTheCart.getValue() + 1);
  }
  decrement(): void {
    this.NumberOfItemInTheCart.next(this.NumberOfItemInTheCart.getValue() - 1);
  }
}
