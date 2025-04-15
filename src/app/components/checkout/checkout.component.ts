import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { State, City } from 'country-state-city';
import { CartService } from '../../services/cart.service';
import { OrderedItemsService } from '../../services/ordered-items.service';
import { StripeService } from '../../services/stripe.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { GenralService } from '../../services/genral.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [CartService, OrderedItemsService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartService: CartService = inject(CartService);
  orderedItemService: OrderedItemsService = inject(OrderedItemsService);
  checkoutForm: FormGroup;
  paymentMethod: string = 'card';
  cart: any = null;
  cartItems: any = { items: [], total: 0 };
  orderedItemsList: any;
  public isProcessing = false;
  citiesInEgypt: any[] = [];
  statesInEgypt: any[] = [];
  selectedValue = signal<string>('');
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;
  deliveryFees: number = 0;
  user: any;
  isDisabled = false;

  constructor(
    private stripeService: StripeService,
    private fb: FormBuilder,
    private authService: AuthService,
    private genral: GenralService
  ) {
    this.deliveryFees = this.genral.deliveryFees;
    this.authSub = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.user = this.authService.getUserId();

      if (loggedIn && this.user) {
      } else {
      }
    });

    this.cartService.getCart(this.user).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.cart = data;
          // Add a null check here
          if (this.cart) {
            this.cartItems = this.cart;
          } else {
            console.warn('Cart data is empty or malformed');
            this.cartItems = { items: [], total: 0 };
          }
        }
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
        this.cartItems = { items: [], total: 0 };
      },
    });

    this.checkoutForm = this.fb.group(
      {
        address: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
        phone2: ['', [Validators.pattern(/^01[0-9]{9}$/)]],
        state: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      },
      {
        validators: this.phoneNumberValidator,
      }
    );
  }

  private phoneNumberValidator: ValidatorFn = (control: AbstractControl) => {
    const phone1 = control.get('phone');
    const phone2 = control.get('phone2');

    if (phone2?.value && phone1?.value === phone2.value) {
      phone2.setErrors({ sameAsPrimary: true });
      return { phoneMismatch: true };
    }

    if (phone2?.hasError('sameAsPrimary')) {
      phone2.setErrors(null);
    }
    return null;
  };
  get addressValid() {
    return this.checkoutForm.controls['address'].valid;
  }
  get phoneValid() {
    return this.checkoutForm.controls['phone'].valid;
  }
  get phone2Valid() {
    return (
      !this.checkoutForm.controls['phone2'].errors?.['sameAsPrimary'] &&
      this.checkoutForm.controls['phone2'].valid
    );
  }
  get stateValid() {
    return this.checkoutForm.controls['state'].valid;
  }
  get cityValid() {
    return this.checkoutForm.controls['city'].valid;
  }
  get zipCodeValid() {
    return this.checkoutForm.controls['zipCode'].valid;
  }
  get addressErrors() {
    return this.checkoutForm.controls['address'].errors;
  }
  get phoneErrors() {
    return this.checkoutForm.controls['phone'].errors;
  }
  get phone2Errors() {
    return this.checkoutForm.controls['phone2'].errors;
  }
  get zipCodeErrors() {
    return this.checkoutForm.controls['zipCode'].errors;
  }

  ngOnInit(): void {
    this.statesInEgypt = State.getStatesOfCountry('EG');
  }

  updateSelectedValue(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const stateIso = selectElement.value;
    this.selectedValue.set(stateIso);
    console.log('Selected State ISO:', stateIso);

    // CORRECTED: Remove the redundant filter
    this.citiesInEgypt = City.getCitiesOfState('EG', stateIso);
    console.log('Cities:', this.citiesInEgypt);

    // Reset city control when state changes
    this.checkoutForm.get('city')?.reset();
  }
  // updateSelectedValue(event: Event) {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.selectedValue.set(selectElement.value);
  //   const state: string = this.selectedValue();
  //   this.citiesInEgypt = City.getCitiesOfState("EG", state);
  // }

  onSubmit() {
    if (this.checkoutForm.valid) {
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onCheckout() {
    this.isDisabled = true;
  }

  checkout(): void {
    this.isProcessing = true;

    if (this.checkoutForm.invalid) {
      this.markFormGroupTouched(this.checkoutForm);
      this.isProcessing = false;
      return;
    }

    const shipmentData = {
      street: this.checkoutForm.value.address,
      city: this.checkoutForm.value.city,
      state: this.checkoutForm.value.state,
      zipCode: this.checkoutForm.value.zipCode,
      phone: this.checkoutForm.value.phone,
      phone2: this.checkoutForm.value.phone2,
    };
    if (this.checkoutForm.valid) {
      this.stripeService
        .createCheckoutSession(this.user, shipmentData)
        .then((response) => {
          if (response && response.url) {
            window.location.href = response.url;
          } else {
            throw new Error('Invalid response from payment service');
          }
        })
        .catch((error) => {
          console.error('Checkout error:', error);
          alert(
            'There was a problem connecting to the payment service. Please try again later.'
          );
        })
        .finally(() => {
          this.isProcessing = false;
        });
    }
  }
}
