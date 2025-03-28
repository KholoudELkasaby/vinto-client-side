import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:4000/api/cart';

  constructor(private http: HttpClient) {}

  // Add item to cart
  addToCart(productId: string, quantity: number): Observable<any> {
    const payload = {
      productId,
      quantity,
    };

    console.log('Sending payload:', payload);

    return this.http.post(this.apiUrl, payload);
  }
}
