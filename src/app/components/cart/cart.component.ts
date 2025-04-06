import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { OrderedItemsService } from '../../services/ordered-items.service';
import { ConfirmationModalComponent } from '../admin/admin-selection/confirmation-modal/confirmation-modal.component';
import { forkJoin, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  user: any;
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;


  constructor(
    private router: Router,
    private cartService: CartService,
    private orderedItemService: OrderedItemsService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toastr.success('Test Toastr Notification', 'Success');
    this.authSub = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.user = this.authService.getUserId();

      if (loggedIn && this.user) {
        console.log(this.user)
        this.updateCart()
      } else {
      }
    });
  }

  updateCart() {
    this.cartService.getCart(this.user).subscribe((data) => {
      this.cart = data || [];
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
    console.log("q", quantity)
    this.updateQuantity(orderedItemId, (quantity + 1));
    console.log("q", quantity)
  }

  decrementQuantity(orderedItemId: string, quantity: number, event: MouseEvent) {
    event.stopPropagation();
    this.updateQuantity(orderedItemId, (quantity - 1));
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
  private updateQuantity(orderedItemId: string, itemQ: number) {
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
  checkout(): void {
    this.router.navigate(['/checkout'])
  }
}
