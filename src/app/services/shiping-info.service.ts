import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemOrdered } from '../models/itemOrdered.model';
import { ShipmentInfo } from '../models/shipmentInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ShipingInfoService {

  private URL = "http://localhost:4000/api/shipmentInfo";
  constructor(public http: HttpClient) { }


  createShipment(info: any, id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.URL}/${id}`, info, { headers })
  }

  getAllShipingInfo(): Observable<ShipmentInfo[]> {
    return this.http
      .get<{ data: { shipmentInfo: ShipmentInfo[] } }>(`${this.URL}`)
      .pipe(map((response): ShipmentInfo[] => response.data.shipmentInfo));
  }

}


