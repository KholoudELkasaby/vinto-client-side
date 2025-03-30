import { PoroductsService } from './../poroducts.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FilteredImageComponent } from '../filtered-image/filtered-image.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SliderRangeComponent } from '../slider-range/slider-range.component';
import { ProductitemComponent } from '../productitem/productitem.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-products',
  imports: [SidebarComponent ,FilteredImageComponent , SliderRangeComponent  ,ProductitemComponent,RouterOutlet   ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [PoroductsService]
})
export class ProductsComponent  implements OnInit {
  x: any[] = [];
  isSorted: string = '';
  constructor(private PoroductsService:PoroductsService){}
//  products:any;
 

  ngOnInit():void{
    this.PoroductsService.getallproducts().subscribe({
      next:(data)=>{console.log(data)
       var products:any = data;
        console.log((products.data.products))
        // products.data.products.forEach(element => {
        //   console.log(element)
          
        // });
        this.x= products.data.products;
      }  ,
      error:(err)=>{console.log(err)},
      complete:()=>{console.log("completeeee")}
    })
      } 

      updateProducts(sortedProducts: any[]) {
        this.x = sortedProducts; // Override default products with sorted data
      }


  state:boolean=false;
  onHover(state:boolean){
    var slider= document.getElementById("slider")  as HTMLElement ||null;
    console.log(slider);
    if(state==true &&  state!=null){
      slider.style.visibility="visible";
      
    }
    else if(state==false){
      slider.style.visibility="hidden";

    }
    console.log(state);
  }


press(event: Event){
  const button = event.target as HTMLButtonElement;
  const buttonValue: number = parseInt(button.innerText, 10); // Convert to integer (base 10)
  console.log(buttonValue);
  this.PoroductsService.getallproductsbuttn(buttonValue).subscribe({
    next:(data)=>{console.log(data)
     var products:any = data;
      console.log((products.data.products))
      // products.data.products.forEach(element => {
      //   console.log(element)
        
      // });
      this.x= products.data.products;
      console.log(this.x);
    }  ,
    error:(err)=>{console.log(err)},
    complete:()=>{console.log("completeeee")}
  })
}



  // ///////////////////
 
  
  
}
