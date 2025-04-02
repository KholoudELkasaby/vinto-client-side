import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private URL = "http://localhost:4000/api/categories";

  constructor(public http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<{ data: { categories: Category[] } }>(`${this.URL}`)
      .pipe(map((response): Category[] => response.data.categories));
  }

}
