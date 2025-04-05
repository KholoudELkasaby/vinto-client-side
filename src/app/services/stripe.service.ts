import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = 'http://localhost:4000/api/stripe';

  constructor(private http: HttpClient) { }

  async createCheckoutSession(shipmentData: any): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.post(`${this.apiUrl}/create-checkout-session/67b87e4bee6c8c97157670ed`, { shipmentData })
      );
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }
}
