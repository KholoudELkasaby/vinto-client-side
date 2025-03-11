import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoroductsService {
private readonly BD_Url="http://localhost:4000/api/products"
  constructor(private Http: HttpClient) { }
  getallproducts(){
    return this.Http.get(this.BD_Url) ;
  }
  getbyid(id:number){
    return this.Http.get(this.BD_Url +"/"+id)
  }
}
