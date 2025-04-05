import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WishlistResponse } from '../models/wish.model';

@Injectable({
  providedIn: 'root'
})

export class WishService {
  URL: string = "http://localhost:4000/api/wishlist";

  constructor(private http: HttpClient) { }

  getAll(id: string): Observable<WishlistResponse> {
    return this.http.get<WishlistResponse>(`${this.URL}/${id}`);
  }

  removeOne(id: string, product: string) {
    return this.http.delete(`${this.URL}`, { body: { user: id, products: [product] } })
  }

  addWish(id: string, product: string) {
    return this.http.post(`${this.URL}`, { user: id, products: [product] })
  }
}
