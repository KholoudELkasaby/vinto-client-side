// import { Component } from '@angular/core';
// import { StripeService } from '../../../services/stripe.service';
//
//
//
// @Component({
//   selector: 'app-stripe',
//   imports: [],
//   providers: [StripeService],
//   templateUrl: './stripe.component.html',
//   styleUrl: './stripe.component.css',
//   template: `
//     <button (click)="checkout()" [disabled]="isLoading">
//       {{ isLoading ? 'Processing...' : 'Checkout with Stripe' }}
//     </button>
//   `
// })
// export class StripeComponent {
//   isLoading = false;
//   constructor(private stripeService: StripeService) { }
//
//   checkout() {
//     this.isLoading = true;
//
//     // Replace with your actual Stripe price ID
//     const priceId = 'price_1234567890';
//
//     this.stripeService.createCheckoutSession(priceId).subscribe({
//       next: (response) => {
//         // Redirect to Stripe checkout page
//         window.location.href = response.url;
//       },
//       error: (error) => {
//         console.error('Error creating checkout session:', error);
//         this.isLoading = false;
//       }
//     });
//   }
// }
