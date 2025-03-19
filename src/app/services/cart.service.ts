import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
        map((data: any) => {
          this.historyData = data.data.carts;
          this.historySubject.next(this.historyData);

          return data;
        })
      );
    }
    return this.historySubject.asObservable();
  }


  filterHistory(status: string): any[] {
    if (status === 'All orders') return this.historyData;

    const statusMap: { [key: string]: string } = {
      'Completed': 'completed',
      'Cancelled': 'cancelled',
      'Inprogress': 'inprogress',
      'Summary': 'summary'
    };

    return this.historyData.filter(item =>
      status === 'Summary' ? item.summaryExists : item.status === statusMap[status]
    );
  }

  getCart(userId: string) {
    console.log(`${this.URL}/${userId}`)
    return this.http.get(`${this.URL}/${userId}`)
  }
}
