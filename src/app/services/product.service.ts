import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'https://vinto-ecommerce-api-production.up.railway.app/api/products';

  private readonly BD_Url = 'https://vinto-ecommerce-api-production.up.railway.app/api/products';
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
  // getFilteredProducts(
  //   categoryIds: string[] = [],
  //   minPrice: number = 500,
  //   maxPrice: number = 5000,
  //   limit: number = 20,
  //   page: number = 1,
  //   sort?: string
  // ): Observable<Product[]> {
  //   let params = `page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  //   if (sort) params += `&sort=${sort}`;
  //
  //   if (categoryIds.length) {
  //     params += `&category=${categoryIds.join(',')}`;
  //   }
  //
  //   return this.http
  //     .get<{ data: { products: Product[] } }>(
  //       `${this.baseUrl}/filter?${params}`
  //     )
  //     .pipe(map((response) => response.data.products));
  // }

  getallproducts() {
    return this.http.get(this.BD_Url);
  }
  getbyid(id: number) {
    return this.http.get(this.BD_Url + '/' + id);
  }
  getallproductsbuttn(pnum: number) {
    return this.http.get(`${this.BD_Url}?page=${pnum}`);
  }
  //http://localhost:4000/api/products/filter?sort=oldest
  getoldest() {
    return this.http.get(`${this.BD_Url}/filter?sort=oldest`);
  }

  getnewest() {
    return this.http.get(`${this.BD_Url}/filter?sort=newest`);
  }

  getSrearched(pproduct: string , page:number=1) {
    return this.http.get(`${this.BD_Url}/search?searched=${pproduct}&page=${page}`);
  }

  getFilteredProducts(
    categoryIds?: string[],
    minPrice: number = 500,
    maxPrice: number = 5000,
    limit: number = 20,
    page: number = 1,

    sort?: string
  ) {
    let params = `page=${page}&limit=${limit}`;

    // Add optional filters
    if (minPrice) params += `&minPrice=${minPrice}`;
    if (maxPrice) params += `&maxPrice=${maxPrice}`;
    if (sort) params += `&sort=${sort}`;

    // Handle multiple categories
    if (categoryIds && categoryIds.length) {
      params += `&category=${categoryIds[0]}`;

      for (let i = 1; i < categoryIds.length; i++) {
        params += `,${categoryIds[i]}`;
      }
    }

    return this.http.get(`${this.BD_Url}/filter?${params}`);
  }


}
