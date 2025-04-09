import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL = "https://vinto-ecommerce-api-production.up.railway.app/api/categories";

  constructor(public http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http
      .get<{ data: { categories: any } }>(`${this.URL}`)
      .pipe(map((response): any => response.data));
  }

}
