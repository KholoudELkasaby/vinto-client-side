import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:4000/api/products';

  constructor(private http: HttpClient) {}

  getTopRatedProducts(): Observable<Product[]> {
    return this.http
      .get<{ data: { products: Product[] } }>(`${this.baseUrl}/toprated`)
      .pipe(map((response) => response.data.products));
  }

  getNewArrivals(): Observable<Product[]> {
    return this.http
      .get<{ data: { products: Product[] } }>(`${this.baseUrl}/newarrivals`)
      .pipe(map((response) => response.data.products));
  }

  getOffers(): Observable<Product[]> {
    return this.http
      .get<{ data: { products: Product[] } }>(`${this.baseUrl}/offers`)
      .pipe(map((response) => response.data.products));
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<{ data: { product: Product } }>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data.product));
  }
}
