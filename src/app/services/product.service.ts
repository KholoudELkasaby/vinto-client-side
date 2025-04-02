import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = "http://localhost:4000/api/products";

  constructor(public http: HttpClient) { }

  getProduct(id: string) {
    return this.http.get(this.URL + '/' + id)
  }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<{ data: { products: Product[] } }>(`${this.URL}`)
      .pipe(map((response) => response.data.products));
  }
}
