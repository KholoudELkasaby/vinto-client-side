import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { OrderedItemsService } from '../../services/ordered-items.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  providers: [CartService, OrderedItemsService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})

export class CartComponent {
  cart?: Cart;

  constructor(
    private router: Router,
    private cartService: CartService,
    private removeAll: OrderedItemsService
  ) { }

  ngOnInit(): void {
    this.cartService.getCart("67b87e4bee6c8c97157670ed")
      .subscribe((data) => {
        this.cart = data;
      });
  }


  goToDetails(product: any) {
    this.router.navigate(['/details', product.id]);
  }

  removeProduct(orderedItemId: string, event: Event) {
    event.stopPropagation();
    this.removeAll.deleteById(orderedItemId).subscribe({});
  }


  removeAllProducts() {
    if (this.cart) {
      this.cart.items.forEach(element => {
        this.removeAll.deleteById(element.orderedItemId.toString()).subscribe((data) => {
        });
      });
    }
  }

  incrementQuantity(orderedItemId: string, quantity: number, event: MouseEvent) {
    event.stopPropagation();
    this.updateQuantity(orderedItemId, (quantity + 1).toString());
  }

  decrementQuantity(orderedItemId: string, quantity: number, event: MouseEvent) {
    event.stopPropagation();
    this.updateQuantity(orderedItemId, (quantity - 1).toString());
  }

  private updateQuantity(orderedItemId: string, itemQ: string) {
    this.cartService.updateCart("67b87e4bee6c8c97157670ed", { itemOrderedId: orderedItemId, newQuantity: itemQ }).subscribe({
      next: (updatedCart) => {
        this.cart = updatedCart;
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      }
    });
  }

}
