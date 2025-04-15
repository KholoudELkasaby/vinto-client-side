import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShipmentOrder } from '../models/shipmentOrder.model';
import { ShipmentResponse } from '../models/ShipmentResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'http://localhost:4000/api';


  constructor(private http: HttpClient) { }

  getShipmentOrders(): Observable<ShipmentOrder[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ShipmentResponse>(`${this.apiUrl}/shipmentOrder`, { headers })
      .pipe(
        map(response => response.data.shipmentOrder)
      );
  }

  getShipmentOrderByCart(cartId: string): Observable<any> {

    // const token = localStorage.getItem('token');
    console.log("test")
    return this.http.get<any>(`${this.apiUrl}/shipmentOrder/progress/${cartId}`)
      .pipe(
        map(response => ({
          ...response.data.shipmentOrder,
        }))
      );
  }

  updateShipmentStatus(shipmentId: string, status: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch<any>(
      `${this.apiUrl}/shipmentOrder/${shipmentId}`,
      { status },
      { headers }
    );
  }

  // New method to update delivery date
  updateShipmentDeliveryDate(shipmentId: string, dateOfDelivery: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch<any>(
      `${this.apiUrl}/shipmentOrder/${shipmentId}`,
      { dateOfDelivery },
      { headers }
    );
  }
}
