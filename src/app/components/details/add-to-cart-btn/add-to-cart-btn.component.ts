import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/notification.model';
import { GenralService } from '../../../services/genral.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart-btn',
  imports: [CommonModule],
  providers: [CartService],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrl: './add-to-cart-btn.component.css',
})
export class AddToCartBtnComponent {
  @Input() productId: string = '';
  @Input() quantity: number = 0;
  userId: any;
  deleteMode: 'single' | 'all' = 'all';
  itemToDeleteId: string = '';
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.authSub = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserId();

      if (loggedIn && this.userId) {
      } else {
      }
    });
  }

  addToCart(id: string, productId: string, quantity: number): void {
    if (!this.isLoggedIn) {
      this.notificationService.showNotification({
        message: 'Please log in to add items to your cart.',
        type: 'warning', // or 'info', 'error', based on your style
      });
      return;
    }
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.notificationService.showNotification({
          message: 'added to Cart Successfully!',
          type: 'success',
        });
      },
      error: (error) => {
        this.notificationService.showNotification({
          message: 'Failed to add to cart.',
          type: 'error',
        });
      },
    });
  }
}
