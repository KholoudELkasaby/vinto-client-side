import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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
    private authService: AuthService,
    private toastr: ToastrService
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
        console.log("Tesss from cart");
        this.toastr.info('Test Toastr Notification', 'Info');
        this.toastr.success('Test Toastr Notification', 'Success', {
          positionClass: 'toast-top-right', // Change position if necessary
          timeOut: 3000,                   // Notification timeout
          closeButton: true                // Enable close button
        });
        this.router.navigate(['/cart']);
      }
    })
  }

}
