import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemOrdered } from '../models/itemOrdered.model';

@Injectable({
  providedIn: 'root'
})

export class OrderedItemsService {

  private URL = "http://localhost:4000/api/itemOrdered";

  constructor(public http: HttpClient) { }


  getAllitemOrdered(): Observable<ItemOrdered[]> {
    return this.http
      .get<{ data: { itemsOrdered: ItemOrdered[] } }>(`${this.URL}`)
      .pipe(map((response): ItemOrdered[] => response.data.itemsOrdered));
  }


  getProduct(id: string) {
    return this.http.get(this.URL + '/' + id)
  }

  // createCart(cart: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post(this.URL, cart, { headers })
  // }
}
