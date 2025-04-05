import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { OrderedItemsService } from '../../services/ordered-items.service';
import { ConfirmationModalComponent } from '../admin/admin-selection/confirmation-modal/confirmation-modal.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ConfirmationModalComponent],
  providers: [CartService, OrderedItemsService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})

export class CartComponent {
  cart?: Cart;
  deleteRequest: EventEmitter<void> = new EventEmitter<void>();
  selectedItems: boolean[] = [];
  showDeleteModal: boolean = false;
  isLoading: boolean = false;
  deleteMode: 'single' | 'all' = 'all';
  itemToDeleteId: string = '';
  user = "67b87e4bee6c8c97157670ed";



  constructor(
    private router: Router,
    private cartService: CartService,
    private orderedItemService: OrderedItemsService
  ) { }

  ngOnInit(): void {
    this.updateCart();
  }

  updateCart() {
    this.cartService.getCart(this.user)
      .subscribe((data) => {
        this.cart = data;
      });
  }


  goToDetails(product: any) {
    this.router.navigate(['/details', product.id]);
  }

  removeProduct(orderedItemId: string) {
    this.isLoading = true;
    this.cartService.removeItem(this.user, orderedItemId).subscribe({
      next: () => {
        this.updateCart();
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }

  removeAllProducts() {
    if (!this.cart || this.cart.items.length === 0) {
      return;
    }
    const removalOperations: any = [];
    this.cart.items.forEach(element => {
      const removal$ = this.cartService.removeItem(this.user, element.orderedItemId.toString());
      removalOperations.push(removal$);
    });

    if (removalOperations.length > 0) {
      forkJoin(removalOperations).subscribe({
        next: () => {
          this.updateCart();
        },
        error: (err) => {
          console.error('Error removing products:', err);
          this.updateCart();
        }
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

  // private getQuantity(orderedItemId: string): number {
  //   let quantity: number
  //   this.orderedItemService.getProduct(orderedItemId).subscribe({
  //     next: (data) => {
  //       // console.log(quantity)
  //     }
  //   })
  //
  //   // return quantity;
  // }
  private updateQuantity(orderedItemId: string, itemQ: string) {
    this.cartService.updateCart(this.user, { itemOrderedId: orderedItemId, newQuantity: itemQ }).subscribe({
      next: (updatedCart) => {
        this.cart = updatedCart;
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      }
    });
  }

  confirmDeleteAll() {
    this.deleteMode = 'all';
    this.showDeleteModal = true;
  }

  confirmDelete(orderedItemId: string, event: MouseEvent) {
    event.stopPropagation();
    this.deleteMode = 'single';
    this.itemToDeleteId = orderedItemId;
    this.showDeleteModal = true;
  }

  handleDeleteConfirmation(confirmed: boolean) {
    this.showDeleteModal = false;

    if (confirmed) {
      if (this.deleteMode === 'single' && this.itemToDeleteId) {
        this.removeProduct(this.itemToDeleteId);
      } else if (this.deleteMode === 'all') {
        this.removeAllProducts();
      }
    }

    this.itemToDeleteId = '';
  }

  getSelectedCount(): number {
    return this.deleteMode === 'all' && this.cart ? this.cart.items.length : 1;
  }
  chickout(): void {
    this.router.navigate(["/checkout"])
  }
}
