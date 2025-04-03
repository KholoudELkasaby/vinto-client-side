import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cart, CartItem } from '../models/cart.model';


@Injectable({
  providedIn: 'root'
})

export class CartService {


  private URL = "http://localhost:4000/api/cart";
  private historySubject = new BehaviorSubject<any[]>([]);
  private historyData: any[] = [];

  constructor(public http: HttpClient) { }




  getHistory(userId: string): Observable<any> {
    if (this.historyData.length === 0) {
      return this.http.get(`${this.URL}/history/${userId}`).pipe(
        tap((data: any) => {
          this.historySubject.next(data);
          this.historyData = data.data.carts;
        })
      );
    } else {
      return of(this.historySubject.value);
    }
  }

  filterHistory(status: string): any[] {
    if (!this.historyData || this.historyData.length === 0) {
      return [];
    }

    if (status === 'All orders') return this.historyData;

    const statusMap: { [key: string]: string } = {
      'Completed': 'completed',
      'Cancelled': 'cancelled',
      'inprogress': 'inprogress',
      'Summary': 'summary'
    };

    return this.historyData.filter(item => {
      if (status === 'Summary') {
        return item.summaryExists;
      }

      const mappedStatus = statusMap[status];
      return item.status && item.status.toLowerCase() === mappedStatus.toLowerCase();
    });
  }

  getCart(userId: string): Observable<Cart> {
    return this.http.get<{ data: { cart: Cart } }>(`${this.URL}/${userId}`)
      .pipe(map((response): Cart => response.data.cart))
  }

  getAllCarts(): Observable<CartItem[]> {
    return this.http
      .get<{ data: { cart: CartItem[] } }>(`${this.URL}`)
      .pipe(map((response): CartItem[] => response.data.cart));
  }

  updateCart(id: string, body: { itemOrderedId: string, newQuantity: string }): Observable<Cart> {
    return this.http
      .patch<{ data: { cart: Cart } }>(`${this.URL}/${id}`, body)
      .pipe(map((response): Cart => response.data.cart));
  }

  removeItem(id: string, itemOrderedId: string) {
    return this.http.post(`${this.URL}/remove/${id}`, { itemOrderedId: itemOrderedId })
  }
  addToCart(id: string, productId: string, quantity: number) {
    return this.http.post(`${this.URL}/${id}`, { productId: productId, quantity: quantity })
  }
}
