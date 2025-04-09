import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemOrdered } from '../models/itemOrdered.model';
import { ShipmentInfo } from '../models/shipmentInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ShipingInfoService {

  private URL = "https://vinto-ecommerce-api-production.up.railway.app/api/shipmentInfo";
  constructor(public http: HttpClient) { }


  createShipment(info: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.URL}/67b87e4bee6c8c97157670ed`, info, { headers })
  }

  getAllShipingInfo(): Observable<ShipmentInfo[]> {
    return this.http
      .get<{ data: { shipmentInfo: ShipmentInfo[] } }>(`${this.URL}`)
      .pipe(map((response): ShipmentInfo[] => response.data.shipmentInfo));
  }

}


