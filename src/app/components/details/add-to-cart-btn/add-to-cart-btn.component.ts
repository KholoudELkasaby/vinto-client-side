import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-to-cart-btn',
  imports: [],
  providers: [CartService],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrl: './add-to-cart-btn.component.css'
})

export class AddToCartBtnComponent {

  @Input() productId: string = "";
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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSub = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserId();

      if (loggedIn && this.userId) {
      } else {
      }
    });

  }

  addToCart(id: string, productId: string, quantity: number): void {
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.router.navigate(['/cart']);
      },
    });
  }

}
