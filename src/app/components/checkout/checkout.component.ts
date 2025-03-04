import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [CartService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  paymentMethod: string = 'card';
  totalCost: number = 7.55;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
    }
  }

}
