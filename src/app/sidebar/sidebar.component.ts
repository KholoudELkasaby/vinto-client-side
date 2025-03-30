import { ProductsComponent } from './../products/products.component';
import { Component, Output, EventEmitter } from '@angular/core';
import { SliderRangeComponent } from '../slider-range/slider-range.component';
import { PoroductsService } from './../poroducts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [SliderRangeComponent , FormsModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css' ,
  providers: [PoroductsService]

})
export class SidebarComponent {
  @Output() sortedProducts = new EventEmitter<any[]>(); // Emits sorted products
  x: any[] = [];

  isDropdownVisible = false;
  isDropdownVisible2 = false;
  x1:string= "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
  x2:string= "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
  
    searchText: string = ''; // Holds input value
    minValueFromSlider: number = 200;
maxValueFromSlider: number = 50000;
isApplied: boolean = false; // Variable to track button click

newtoold:boolean = false;
oldtonew:boolean = false;


     furnitureCheckbox = document.getElementById("checked1-checkbox") as HTMLInputElement;
    accessoriesCheckbox = document.getElementById("checked2-checkbox") as HTMLInputElement;



  onSearch() {
      console.log("Search valueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:", this.searchText); // Log the input value
      this.PoroductsService.getSrearched(this.searchText).subscribe({
        next:(data)=>{console.log(data)
         var products :any = data;
         console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
          console.log((products.data.products))
          this.sortedProducts.emit(products.data.products); 
    
          this.x= products.data.products;
        }  ,
        error:(err)=>{console.log(err)},
        complete:()=>{console.log("completeeee")}
      })

      this.searchText=''
  }

  // SG:any;
  constructor(private PoroductsService:PoroductsService){}

press(){
  this.isDropdownVisible = !this.isDropdownVisible;
  const dropdownHelper = document.getElementById("dropdownHelper") as HTMLDivElement | null;
  if (dropdownHelper) {
    dropdownHelper.style.display = this.isDropdownVisible ? "block" : "none";
    
    this.x1= this.x1== "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" ?  "m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1": "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7";
    // console.log(this.SG) ;
      // this.SG.tra = "transform 0.3s ease-in-out";
      // this.SG.style.transform = this.isDropdownVisible ? "rotate(180deg)" : "rotate(0deg)"; 
   
    }
  // console.log(",,,,,,,,,,,,,,,,");
}


press2(){
  

  this.isDropdownVisible2 = !this.isDropdownVisible2;
  const dropdownHelperp = document.getElementById("dropdownHelperp") as HTMLDivElement | null;
  if (dropdownHelperp) {
    dropdownHelperp.style.display = this.isDropdownVisible2 ? "block" : "none";
    this.x2= this.x2== "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" ?  "m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1": "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7";

  }
  // console.log(",,,,,,,,,,,,,,,,");
}


state:boolean=false;
onHovers(state:boolean){
  var slider= document.getElementById("slider")  as HTMLElement ||null;
  // console.log(slider);
  if(state==true &&  state!=null){
    slider.style.visibility="visible";
    
  }
  else if(state==false){
    slider.style.visibility="hidden";

  }
  // console.log(state);
}

// ////////////////////////
/////////////////////////////newtoold , old to new
pressno(event: Event){
  const button = event.currentTarget as HTMLButtonElement;
  const buttonValue=button.innerText
  console.log("****************************************************000000011111111111111111111111111111111111")
  console.log(buttonValue);
////
if(this.isApplied==false){
  if(buttonValue=="New To Old"){
    this.newtoold=true;
  this.PoroductsService.getoldest().subscribe({
    next:(data)=>{console.log(data)
     var products :any = data;
     console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
      console.log((products.data.products))
      this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent

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
// ////////////////////////////////////////////////

if(buttonValue=="Old To New"){
  this.oldtonew=true;

  this.PoroductsService.getnewest().subscribe({
    next:(data)=>{console.log(data)
     var products :any = data;
     console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
      console.log((products.data.products))
      this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent

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
else{

  ////***************************خدي بالك */

  if(this.newtoold==true){
        
    this.PoroductsService.getFilteredProducts(
      this.selectedCategories_ids, 
      this.minValueFromSlider, 
      this.maxValueFromSlider, 
     20,
     1,
      'oldest', // Sorting Order
      
    
    ).subscribe( {
      next:(data)=>{console.log(data)
        var products :any = data;
        console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
         console.log((products.data.products))
         this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
   
         this.x= products.data.products;
         // console.log(this.x);
       }  ,
       error:(err)=>{console.log(err)},
       complete:()=>{console.log("completeeee")}

    });
     }
     if(this.oldtonew==true){
      
    this.PoroductsService.getFilteredProducts(
      this.selectedCategories_ids, 
      this.minValueFromSlider, 
     this.maxValueFromSlider, 
     20,
     1,
      'newest', 
      
 
    ).subscribe( {
      next:(data)=>{console.log(data)
        var products :any = data;
        console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
         console.log((products.data.products))
         this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
   
         this.x= products.data.products;
         // console.log(this.x);
       }  ,
       error:(err)=>{console.log(err)},
       complete:()=>{console.log("completeeee")}

    });
     }
}
}



 checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
  selectedCategories: string[] = [];
  selectedCategories_ids: string[] = [];
 Apply(event: Event) {

  this.isApplied=true;


      const checkbox1 = document.getElementById("checked1-checkbox") as HTMLInputElement;
      const checkbox2 = document.getElementById("checked2-checkbox") as HTMLInputElement;
      const checkbox3 = document.getElementById("checked3-checkbox") as HTMLInputElement;
      const checkbox4 = document.getElementById("checked4-checkbox") as HTMLInputElement;
      const checkbox5 = document.getElementById("checked5-checkbox") as HTMLInputElement;

      if (!checkbox1 || !checkbox2 || !checkbox3 || !checkbox4 || !checkbox5) {
          console.error("One or more checkboxes not found!");
          return;
      }

      if (checkbox1.checked){this.selectedCategories.push("Furniture")  && this.selectedCategories_ids.push("67ba3e609dc12cc7bef5ce3b")} ;
      if (checkbox2.checked) {this.selectedCategories.push("Accessories") && this.selectedCategories_ids.push("67ba3d8fc8c7576d5a4ca888")};
      if (checkbox3.checked) {this.selectedCategories.push("Fashion") && this.selectedCategories_ids.push("67ba3e8716548f20d6370e86")};
      if (checkbox4.checked) {this.selectedCategories.push("Electronics") && this.selectedCategories_ids.push("67ba3eaad5881227117e9fb2")};
      if (checkbox5.checked) {this.selectedCategories.push("Potties") && this.selectedCategories_ids.push("67ba3e261c5c6144284d9aaa")};
      
      console.log("Selected Categories:", this.selectedCategories);
      console.log("Selected Categories_ids:", this.selectedCategories_ids);

/////clicked///
       if(this.newtoold==true){
        
      this.PoroductsService.getFilteredProducts(
        this.selectedCategories_ids, 
        this.minValueFromSlider, 
        this.maxValueFromSlider, 
       20,
       1,
        'oldest', // Sorting Order
        
      
      ).subscribe( {
        next:(data)=>{console.log(data)
          var products :any = data;
          console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
           console.log((products.data.products))
           this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
     
           this.x= products.data.products;
           // console.log(this.x);
         }  ,
         error:(err)=>{console.log(err)},
         complete:()=>{console.log("completeeee")}

      });
       }
       if(this.oldtonew==true){
        
      this.PoroductsService.getFilteredProducts(
        this.selectedCategories_ids, 
        this.minValueFromSlider, 
       this.maxValueFromSlider, 
       20,
       1,
        'newest', 
        
   
      ).subscribe( {
        next:(data)=>{console.log(data)
          var products :any = data;
          console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
           console.log((products.data.products))
           this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
     
           this.x= products.data.products;
           // console.log(this.x);
         }  ,
         error:(err)=>{console.log(err)},
         complete:()=>{console.log("completeeee")}

      });
       }



       if(this.oldtonew==false && this.newtoold==false ){
        
        this.PoroductsService.getFilteredProducts(
          this.selectedCategories_ids, 
          this.minValueFromSlider, 
         this.maxValueFromSlider,  
             20,
             1
        ).subscribe( {
          next:(data)=>{console.log(data)
            var products :any = data;
            console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
             console.log((products.data.products))
             this.sortedProducts.emit(products.data.products);  
       
             this.x= products.data.products;
             // console.log(this.x);
           }  ,
           error:(err)=>{console.log(err)},
           complete:()=>{console.log("completeeee")}
  
        });
         }

}

pressnum(event: Event){
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
      this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent

      this.x= products.data.products;
      console.log(this.x);
    }  ,
    error:(err)=>{console.log(err)},
    complete:()=>{console.log("completeeee")}
  })
}



/////////price  filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr//////////////
receiveSliderValues(event: { min: number; max: number }) {
  this.minValueFromSlider = event.min;
  this.maxValueFromSlider = event.max;
  console.log('Received min:', this.minValueFromSlider);
  console.log('Received max:', this.maxValueFromSlider);
  /////case old to new 
  /////////////stop


  if(this.isApplied){
  if(this.newtoold==true){
        
    this.PoroductsService.getFilteredProducts(
      this.selectedCategories_ids, 
      this.minValueFromSlider, 
      this.maxValueFromSlider, 
     20,
     1,
      'oldest', // Sorting Order
      
    
    ).subscribe( {
      next:(data)=>{console.log(data)
        var products :any = data;
        console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
         console.log((products.data.products))
         this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
   
         this.x= products.data.products;
         // console.log(this.x);
       }  ,
       error:(err)=>{console.log(err)},
       complete:()=>{console.log("completeeee")}

    });
     }

       /////case new to old

     if(this.oldtonew==true){
      
    this.PoroductsService.getFilteredProducts(
      this.selectedCategories_ids, 
      this.minValueFromSlider, 
      this.maxValueFromSlider, 
     20,
     1,
      'newest', 
      
 
    ).subscribe( {
      next:(data)=>{console.log(data)
        var products :any = data;
        console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
         console.log((products.data.products))
         this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
   
         this.x= products.data.products;
         // console.log(this.x);
       }  ,
       error:(err)=>{console.log(err)},
       complete:()=>{console.log("completeeee")}

    });
     }


  /////no no

     if(this.oldtonew==false && this.newtoold==false ){
      
      this.PoroductsService.getFilteredProducts(
        this.selectedCategories_ids, 
        this.minValueFromSlider, 
        this.maxValueFromSlider,  
           20,
           1
      ).subscribe( {
        next:(data)=>{console.log(data)
          var products :any = data;
          console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
           console.log((products.data.products))
           this.sortedProducts.emit(products.data.products);  
     
           this.x= products.data.products;
           // console.log(this.x);
         }  ,
         error:(err)=>{console.log(err)},
         complete:()=>{console.log("completeeee")}

      });
       }
      }
      else{
        if(this.newtoold==true){
        
          this.PoroductsService.getFilteredProducts(
            [],
            this.minValueFromSlider, 
            this.maxValueFromSlider, 
           20,
           1,
            'oldest', // Sorting Order
            
          
          ).subscribe( {
            next:(data)=>{console.log(data)
              var products :any = data;
              console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
               console.log((products.data.products))
               this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
         
               this.x= products.data.products;
               // console.log(this.x);
             }  ,
             error:(err)=>{console.log(err)},
             complete:()=>{console.log("completeeee")}
      
          });
           }
      
             /////case new to old
      
           if(this.oldtonew==true){
            
          this.PoroductsService.getFilteredProducts(
            [], 
            this.minValueFromSlider, 
            this.maxValueFromSlider, 
           20,
           1,
            'newest', 
            
       
          ).subscribe( {
            next:(data)=>{console.log(data)
              var products :any = data;
              console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
               console.log((products.data.products))
               this.sortedProducts.emit(products.data.products); // Send sorted data to ProductsComponent
         
               this.x= products.data.products;
               // console.log(this.x);
             }  ,
             error:(err)=>{console.log(err)},
             complete:()=>{console.log("completeeee")}
      
          });
           }
      
      
        /////no no
      
           if(this.oldtonew==false && this.newtoold==false ){
            
            this.PoroductsService.getFilteredProducts(
              [], 
              this.minValueFromSlider, 
              this.maxValueFromSlider,  
                 20,
                 1
            ).subscribe( {
              next:(data)=>{console.log(data)
                var products :any = data;
                console.log("1111111111112222222222222222222222222222333333333333333333333333333333")
                 console.log((products.data.products))
                 this.sortedProducts.emit(products.data.products);  
           
                 this.x= products.data.products;
                 // console.log(this.x);
               }  ,
               error:(err)=>{console.log(err)},
               complete:()=>{console.log("completeeee")}
      
            });
             }
      }
}
}
