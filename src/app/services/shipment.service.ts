import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ShipmentInfo {
  _id: string;
  user: string;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  phones: string[];
}

export interface ShipmentOrder {
  _id: string;
  cart: any;
  shipmentInfo: ShipmentInfo | null;
  status: string;
  date: string;
}

export interface ShipmentResponse {
  status: string;
  code: number;
  data: {
    shipmentOrder: ShipmentOrder[];
  };
  message: {
    text: string;
  };
}

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
}