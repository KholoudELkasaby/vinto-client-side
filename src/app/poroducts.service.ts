import { HttpClient  , HttpParams} from '@angular/common/http';
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
  getallproductsbuttn(pnum:number){
    return this.Http.get(`${this.BD_Url}?page=${pnum}`);

  } 
//http://localhost:4000/api/products/filter?sort=oldest
  getoldest(){
    return this.Http.get(`${this.BD_Url}/filter?sort=oldest`);

  } 

  getnewest(){
    return this.Http.get(`${this.BD_Url}/filter?sort=newest`);

  } 


  getSrearched(pproduct:string){
    return this.Http.get(`${this.BD_Url}/search?searched=${pproduct}`);

  } 


  getFilteredProducts(
    categoryIds?: string[], 
    minPrice: number=500, 
    maxPrice: number=5000, 
    limit:number=20,
    page: number = 1, 

    sort?: string, 

  ) {
    let params = `page=${page}&limit=${limit}`;



    // Add optional filters
    if (minPrice) params += `&minPrice=${minPrice}`;
    if (maxPrice) params += `&maxPrice=${maxPrice}`;
    if (sort) params += `&sort=${sort}`;

    // Handle multiple categories
    if ( categoryIds?.length && categoryIds.length) {
      params += `&category=${categoryIds[0]}`;
      
      for (let i = 1; i < categoryIds.length; i++) {
        params += `&${categoryIds[i]}`;
      }
    }  

    return this.Http.get(`${this.BD_Url}/filter?${params}`);
  }
}
