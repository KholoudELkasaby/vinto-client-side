import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenralService {

  constructor() { }
  modelCategories: string[] = ["Authentication and Authorization", "Store"]
  authModels: string[] = ["User"]
  storeModels: string[] = ["Product", "ItemOrdered", "Cart", "shipingInfo", "Shipment"];
}
