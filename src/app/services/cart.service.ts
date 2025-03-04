import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly URL = "http://localhost:4000/api/cart";

  constructor(public http: HttpClient) { }

  getAllCarts() {
    return this.http.get(this.URL)
  }

  getCart(id: number) {
    return this.http.get(this.URL + '/' + id)
  }

  createCart(cart: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL, cart, { headers })
  }

}
