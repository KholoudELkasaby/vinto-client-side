import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';


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
  userId: string = "67b798659f02ecbe9f4d7ef0";

  constructor(private cartService: CartService, private router: Router) { }
  addToCart(id: string, productId: string, quantity: number): void {
    this.cartService.addToCart(id, productId, quantity).subscribe({
      next: (response) => {
        this.router.navigate(["/cart"])
      }
    })
  }

}
