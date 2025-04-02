import { PoroductsService } from './../poroducts.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FilteredImageComponent } from '../filtered-image/filtered-image.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SliderRangeComponent } from '../slider-range/slider-range.component';
import { ProductitemComponent } from '../productitem/productitem.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-products',
  imports: [SidebarComponent ,FilteredImageComponent , SliderRangeComponent  ,ProductitemComponent,RouterOutlet,CommonModule   ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [PoroductsService]
})
export class ProductsComponent  implements OnInit {
  x: any[] = [];
  isSorted: string = '';
  // latestFilteredProducts: any[] = []; // Store latest filtered data
  isFiltered: boolean = false; // Tracks if we're using filtered data
  productsPerPage: number = 10; // Number of items per page
  pageNumbers: number[] = [];
   tot_pages=0;
  constructor(private PoroductsService:PoroductsService){}
//  products:any;
 arr:number[]=[]

  ngOnInit():void{
    this.PoroductsService.getallproducts().subscribe({
      next:(data)=>{console.log(data)
       var products:any = data;
      
       console.log(this.arr)
       this.tot_pages= products.totalpages ;
       for(var i=1 ; i<=this.tot_pages ; i++){
        this.arr.push(i);
      }
       console.log(  this.tot_pages );
        // console.log((products.data.products))
        // products.data.products.forEach(element => {
        //   console.log(element)
          
        // });
        this.x= products.data.products;
        // this.latestFilteredProducts= products.data.products;
      }  ,
      error:(err)=>{
        // console.log(err);
      },
      complete:()=>{console.log("completeeee")}
    })
    
      } 
 //


 //

      updateProducts(sortedProducts: any[] ) {
        this.x = sortedProducts; // Override default products with sorted data
        console.log(this.x);
        
        // this.latestFilteredProducts = sortedProducts; // Store the latest data
        // console.log(this.latestFilteredProducts);
        
        // this.isFiltered = true; // Enable filtered mode
        // this.updatePagination(sortedProducts); // Update pagination


     
      }
      updatetotalpage(total_page:any[]){
        this.arr=total_page 
        console.log("ana hna in product component" , this.arr);
      }

  state:boolean=false;
  isSidebarVisible:boolean = false;

  onHover(state:boolean){
    this.isSidebarVisible = state;
   
    var slider= document.getElementById("slider")  as HTMLElement ;
    var element = document.getElementById("xx") as HTMLElement;
    var products = document.getElementsByClassName('products-item') as HTMLCollectionOf<HTMLElement>;
    const productsPerRow = 4;  // Define the number of products per row (change as needed)

    // console.log(slider);
    if(state==true &&  state!=null){
      slider.style.visibility="visible";
      element.style.background= "white"

    

    }
    else if(state==false){
      slider.style.visibility="hidden";

      element.style.background = "transparent";


    }
    // console.log(state);
  }



/////////////////////////////updateDatapages////////////////////////

receivedCategories: string[] = [];
minprice: number = 200;
  maxprice: number = 20000; 
newtoold?:boolean= false;
oldtonew?:boolean=false ;

updateDatapages(data: { categories: string[], n_o: boolean,o_n:boolean, max_p: number  ,min_p:number }) {

 

  
  this.receivedCategories = data.categories;
  this.minprice = data.min_p;
  this.maxprice = data.max_p;
  this.newtoold= data.n_o;
  this.oldtonew=data.o_n ;

  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  console.log("Updated Data in Product Component:", this.receivedCategories, this.minprice, this.maxprice  , this.newtoold , this.oldtonew );
}
   
  //////////////////////////////numberbuttn///////////////

press(event: Event){
  const button = event.target as HTMLButtonElement;
  const buttonValue: number = parseInt(button.innerText, 10); // Convert to integer (base 10)
  console.log( "yuuuuuuuuu",buttonValue);
  console.log("Updated Data in Product Component  xxxxxx:", this.receivedCategories, this.minprice, this.maxprice  , this.newtoold , this.oldtonew );
  if(this.receivedCategories.length==0 && this.newtoold == false && this.oldtonew == false  && this.minprice== 200 && this.maxprice== 20000 ){
  this.PoroductsService.getallproductsbuttn(buttonValue).subscribe({
    next:(data)=>{console.log(data)
     var products:any = data;

      // console.log((products.data.products))
      // products.data.products.forEach(element => {
      //   console.log(element)
        
      // });
      this.x= products.data.products;
      console.log("buttonclickeddddd");
       console.log(this.x);
    }  ,
    error:(err)=>{
      // console.log(err)
    },
    complete:()=>{console.log("completeeee")}
  })
}
///if category id has length and new toold oldtovew at least one true 
if(this.receivedCategories.length && this.newtoold )
{

 
////case amr

  this.PoroductsService.getFilteredProducts(
    this.receivedCategories, 
    this.minprice, 
    this.maxprice,  
       6,
       buttonValue,
       'newest', 

  ).subscribe( {
    next:(data)=>{console.log(data)
      var products :any = data;
      console.log("1111111111112222222222222222222222222222333333333333333333333333333333")

      this.arr=[]
      this.tot_pages= products.totalpages ;
      console.log("totalllll" , this.tot_pages) ;
      console.log(this.arr);
      
           for(var i=1 ; i<=this.tot_pages ; i++){
            this.arr.push(i);
          }
          console.log(this.arr);


       console.log((products.data.products))
       this.x=products.data.products;  
 
       this.x= products.data.products;
       // console.log(this.x);
     }  ,
     error:(err)=>{console.log(err)},
     complete:()=>{console.log("completeeee")}

  });
}


////////////////////////////////////////////////////

if(this.receivedCategories.length && this.oldtonew )
  {
    this.PoroductsService.getFilteredProducts(
      this.receivedCategories, 
      this.minprice, 
      this.maxprice,  
         9,
         buttonValue,
         'oldest', 
  
    ).subscribe( {
      next:(data)=>{console.log(data)
        var products :any = data;
        console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
        this.arr=[]
        this.tot_pages= products.totalpages ;
             for(var i=1 ; i<=this.tot_pages ; i++){
              this.arr.push(i);
            }

         console.log((products.data.products))
         this.x=products.data.products;  
   
         this.x= products.data.products;
         // console.log(this.x);
       }  ,
       error:(err)=>{console.log(err)},
       complete:()=>{console.log("completeeee")}
  
    });
  }

  if(this.receivedCategories.length && !this.oldtonew  &&  !this.oldtonew)
    {
      this.PoroductsService.getFilteredProducts(
        this.receivedCategories, 
        this.minprice, 
        this.maxprice,  
           6,
           buttonValue,
    
      ).subscribe( {
        next:(data)=>{console.log(data)
          var products :any = data;
          console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
          this.arr=[]
          console.log("arr before" , this.arr)

          this.tot_pages= products.totalpages ;
               for(var i=1 ; i<=this.tot_pages ; i++){
                this.arr.push(i);
              } 
              console.log("arr after" , this.arr)

           console.log((products.data.products))
           this.x=products.data.products;  
     
           this.x= products.data.products;
           // console.log(this.x);
         }  ,
         error:(err)=>{console.log(err)},
         complete:()=>{console.log("completeeee")}
    
      });
    }
  
    if(this.receivedCategories.length ==0 && this.oldtonew){
      this.PoroductsService.getnewest().subscribe({
        next:(data)=>{console.log(data)
         var products :any = data;
         console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
          console.log((products.data.products))
          this.x=products.data.products; // Send sorted data to ProductsComponent
    
          // products.data.products.forEach(element => {
          //   console.log(element)
            
          // });
          this.x= products.data.products;
          // console.log(this.x);
        }  ,
        error:(err)=>{console.log(err)},
        complete:()=>{console.log("completeeee")}
      })
    }

    if(this.receivedCategories.length ==0 && this.newtoold){
      this.PoroductsService.getoldest().subscribe({
        next:(data)=>{console.log(data)
         var products :any = data;
         console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
          console.log((products.data.products))
          this.x=products.data.products; // Send sorted data to ProductsComponent
    
          // products.data.products.forEach(element => {
          //   console.log(element)
            
          // });
          this.x= products.data.products;
          // console.log(this.x);
        }  ,
        error:(err)=>{console.log(err)},
        complete:()=>{console.log("completeeee")}
      })
    }
}


// pressnew(event: Event) {
//   const button = event.target as HTMLButtonElement;
//   const buttonValue: number = parseInt(button.innerText, 10); // Get page number
//   console.log("Button clicked:", buttonValue);

//   // Choose the correct dataset based on filtering
//   const currentData = this.latestFilteredProducts;

//   // Calculate the slice indexes
//   const startIndex = (buttonValue - 1) * this.productsPerPage;
//   const endIndex = startIndex + this.productsPerPage;

//   // Update displayed products
//   this.x = currentData.slice(startIndex, endIndex);

//   console.log("Displaying page", buttonValue, ":", this.x);

//   // Update pagination buttons
//   this.updatePagination(currentData);
// }
// updatePagination(data: any[]) {
//   const totalPages = Math.ceil(data.length / this.productsPerPage);
//   this.pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
// }

/////////////////////////////updateDatapages////////////////////////

// receivedCategories: string[] = [];
// minprice: number = 200;
//   maxprice: number = 20000; 
// newtoold?:boolean= false;
// oldtonew?:boolean=false ;

// updateDatapages(data: { categories: string[], n_o: boolean,o_n:boolean, max_p: number  ,min_p:number }) {

 

  
//   this.receivedCategories = data.categories;
//   this.minprice = data.min_p;
//   this.maxprice = data.max_p;
//   this.newtoold= data.n_o;
//   this.oldtonew=data.o_n ;

//   console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
//   console.log("Updated Data in Product Component:", this.receivedCategories, this.minprice, this.maxprice  , this.newtoold , this.oldtonew );
// }


}
