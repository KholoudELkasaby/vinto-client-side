import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:4000/api/products';

  constructor(private http: HttpClient) { }

  // Fetching Different Product Categories
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

  // Fetch All Products
  getAllProducts(page?: number): Observable<Product[]> {
    const url = page ? `${this.baseUrl}?page=${page}` : this.baseUrl;
    return this.http
      .get<{ data: { products: Product[] } }>(url)
      .pipe(map((response) => response.data.products));
  }

  // Fetch Single Product by ID
  getProductById(id: string): Observable<Product> {
    return this.http
      .get<{ data: { product: Product } }>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data.product));
  }

  // Fetch Sorted Products
  getOldestProducts(): Observable<Product[]> {
    return this.http
      .get<{ data: { products: Product[] } }>(
        `${this.baseUrl}/filter?sort=oldest`
      )
      .pipe(map((response) => response.data.products));
  }

  getNewestProducts(): Observable<Product[]> {
    return this.http
      .get<{ data: { products: Product[] } }>(
        `${this.baseUrl}/filter?sort=newest`
      )
      .pipe(map((response) => response.data.products));
  }

  // Search for Products
  searchProducts(query: string): Observable<Product[]> {
    return this.http
      .get<{ data: { products: Product[] } }>(
        `${this.baseUrl}/search?searched=${query}`
      )
      .pipe(map((response) => response.data.products));
  }

  getProduct(id: string) {
    return this.http.get(this.baseUrl + '/' + id)
  }

  // getAllProducts(): Observable<Product[]> {
  //   return this.http
  //     .get<{ data: { products: Product[] } }>(`${this.URL}`)

  // Filter Products Based on Category, Price, and Sorting
  getFilteredProducts(
    categoryIds: string[] = [],
    minPrice: number = 500,
    maxPrice: number = 5000,
    limit: number = 20,
    page: number = 1,
    sort?: string
  ): Observable<Product[]> {
    let params = `page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    if (sort) params += `&sort=${sort}`;

    if (categoryIds.length) {
      params += `&category=${categoryIds.join(',')}`;
    }

    return this.http
      .get<{ data: { products: Product[] } }>(
        `${this.baseUrl}/filter?${params}`
      )
      .pipe(map((response) => response.data.products));
  }
}
