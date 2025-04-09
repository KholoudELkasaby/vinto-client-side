import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemOrdered } from '../models/itemOrdered.model';
import { shipingInfo } from '../models/shipmentInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ShipingInfoService {

  private URL = "http://localhost:4000/api/shipmentInfo";
  constructor(public http: HttpClient) { }


  createShipment(info: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.URL}/67b87e4bee6c8c97157670ed`, info, { headers })
  }

  getAllShipingInfo(): Observable<shipingInfo[]> {
    return this.http
      .get<{ data: { shipmentInfo: shipingInfo[] } }>(`${this.URL}`)
      .pipe(map((response): shipingInfo[] => response.data.shipmentInfo));
  }

}


