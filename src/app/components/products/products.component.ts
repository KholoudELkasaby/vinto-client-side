import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FilteredImageComponent } from '../filtered-image/filtered-image.component';
import { ProductitemComponent } from '../productitem/productitem.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NotProductFoundComponent } from '../not-product-found/not-product-found.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PaginationModule } from '@coreui/angular';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-products',
  imports: [
    SidebarComponent,
    FilteredImageComponent,
    ProductitemComponent,
    CommonModule,
    NotProductFoundComponent,
    PaginatorModule,
    PaginationModule,
   MatPaginatorModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  first: number = 0;  // Tracks the first record on the page
  rows: number = 1;   // Number of records per page



  onPageChange(event: any) {
    // Handle page change event here
    this.first = event.first;
    this.rows = event.rows;
  }

  // //////////////////////////
  x: any[] = [];
  isSorted: string = '';
  lenn:number=0;

  // latestFilteredProducts: any[] = []; // Store latest filtered data
  isFiltered: boolean = false; // Tracks if we're using filtered data
  productsPerPage: number = 10; // Number of items per page
  pageNumbers: number[] = [];
  tot_pages:any = 0;
  //  products:any;
  arr: number[] = [];
  flag: boolean = false;

  constructor(private PoroductsService: ProductService) { }

  ngOnInit(): void {
    this.PoroductsService.getallproducts().subscribe({

      next: (data) => {
        console.log('Full API response:', data);
        const products: any = data;

        // Check if totalPages exists and populate arr
        if (products.data.totalPages) {
          this.tot_pages = products.data.totalPages || 0; // Use totalPages if available, otherwise default to 0
          // this.arr = [];
          // for (let i = 1; i <= this.tot_pages; i++) {
          //   this.arr.push(i);
          // }
        this.generatePagination(); 

        

          
        }
        console.log('Total Pages:', this.tot_pages); // Log totalPages to verify it
        console.log('Pagination array after population:', this.arr); // Log the populated pagination array

        console.log('Pagination array:', this.arr); // Log here
        console.log('Updated products array:', products.data.products);

        console.log('Pagination array:', this.arr); // Log here
        console.log('Updated products array:', products.data.products);
        this.x = products.data.products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        console.log('Products fetch complete');
      },
    });

  
    this.updateButtonState()
  }
  

  reloadPage() {
    window.location.reload();
  }

  noProductsFound: boolean = false;

  onNoProductsFoundChange(value: boolean) {
    this.noProductsFound = value;
    console.log('No products found:', this.noProductsFound);

  }

  //   ngOnInit(): void {
  //   this.PoroductsService.getallproducts().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;

  //       console.log(this.arr);
  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }
  //       console.log(this.tot_pages);
  //       // console.log((products.data.products))
  //       // products.data.products.forEach(element => {
  //       //   console.log(element)

  //       // });
  //       this.x = products.data.products;
  //       // this.latestFilteredProducts= products.data.products;
  //     },
  //     error: (err) => {
  //       // console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }


  updatetotalpage(total_page: any[]) {
    this.arrr = total_page;
    // this.tot_pages= total_page 
    this.tot_pages= total_page.length
    console.log('ana hna in product component', this.arrr);
    console.log('ana hna in product component Haniiii', this.tot_pages);
////////////////////////////
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
if(this.tot_pages<=3){
  if (prevButton) {
  prevButton.style.display = 'none';
  }
  if (nextButton) {
    nextButton.style.display = 'none';
  }
  console.log("hideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
}
else{
  console.log("appppearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

  if (prevButton) {
    prevButton.style.display = 'block';
    }
    if (nextButton) {
      nextButton.style.display = 'block';
    }
}

///////////////////////////////
    this.lenn=  this.arrr.length
    this.currentPage = 1;

    this.generatePagination();

    console.log(  "this len",this.lenn)


    // if( this.arr.length==0 || this.arr.length==1){
    //   const buttonn = document.getElementById('next');
    //   if (buttonn) {
  
    //     buttonn.style.pointerEvents = 'none'; 
    //     buttonn.style.cursor = 'not-allowed'; 
    //     buttonn.style.opacity = '0.5'; 
      
    //   }
   
    // }
    // if( this.arrr.length==0 || this.arrr.length==1){
    //   const buttonn = document.getElementById('next');
    //   if (buttonn) {
  
    //     buttonn.style.pointerEvents = 'none'; 
    //     buttonn.style.cursor = 'not-allowed'; 
    //     buttonn.style.opacity = '0.5'; 
      
    //   }
   
    // }

  }

  updateProducts(sortedProducts: any[] ) {
    this.x = sortedProducts;
     this.buttonValueclickedd=1


    //  this.tot_pages=total_page
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
// console.log(this.arr);
//  console.log(this.tot_pages)
console.log(this.lenn);

// this.updatetotalpage(total_page );


     //////////////////////////////////
    //  if(this.buttonValueclickedd==1){

    //   const button = document.getElementById('prev');
    //   if (button) {
    //     button.style.pointerEvents = 'none'; // Disable click events
    //     button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
    //     button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled
      
    //   }
    // }
 
     /////////////////////////////////

    console.log(this.x);
    if (!this.x.length) {
      this.flag = true;
    }

  }

  //////////////////////////////////////

 

  state: boolean = false;
  onHover(state: boolean) {
    var slider = (document.getElementById('slider') as HTMLElement) || null;
    var filterr = (document.getElementById('filterr') as HTMLElement) || null;
    const element = document.getElementById('xx') as HTMLElement;
    console.log('ttttttttttt');

    // console.log(slider);
    if (state == true && state != null) {
      slider.style.display = 'block';
      element.style.background = 'white';
      // filterr.style.visibility="hidden" ;
    } else if (state == false) {
      slider.style.display = 'none';
      element.style.background = 'transparent';
      // filterr.style.visibility="visible" ;
    }
    // console.log(state);
  }

  /////////////////////////////updateDatapages////////////////////////

  receivedCategories: string[] = [];
  minprice: number = 200;
  maxprice: number = 20000;
  newtoold?: boolean = false;
  oldtonew?: boolean = false;

  updateDatapages(data: {
    categories: string[];
    n_o: boolean;
    o_n: boolean;
    max_p: number;
    min_p: number;
  }) {
    this.receivedCategories = data.categories;
    this.minprice = data.min_p;
    this.maxprice = data.max_p;
    this.newtoold = data.n_o;
    this.oldtonew = data.o_n;

    console.log(
      'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
    );
    console.log(
      'Updated Data in Product Component:',
      this.receivedCategories,
      this.minprice,
      this.maxprice,
      this.newtoold,
      this.oldtonew
    );
  }
    buttonValueclickedd: number =1; 
    updateButtonState() {
      if (this.buttonValueclickedd === 1) {
        // const button = document.getElementById('prev') as HTMLButtonElement;
        // if (button) {
        //   button.style.pointerEvents = 'none';
        //   button.style.cursor = 'not-allowed';
        //   button.style.opacity = '0.5';
        // }
      } }


    // flagsearch:boolean=false;
//////////////////////////////////////////
searchFromSidebar: string = '';

// console.log(this.searchFromSidebar);

receiveSearchText(value: string) {
  this.searchFromSidebar = value;
  console.log('Received search text:', this.searchFromSidebar);
  // this.flagsearch=true
  // مثلاً تقدر تعملي فلترة أو تبعتي الطلب للسيرفر بناءً على قيمة البحث

  if(this.searchFromSidebar.length!=0){
    console.log("hellooooooppp");
    
    
   }
}

/////////hany///////////////
currentPage = 1;
arrr: (number | string)[] = [];

// generatePagination() {
//   console.log("cuurrentttt" ,this.currentPage ) ;
  
//   const buttonprev = document.getElementById('prev');

//   if(this.currentPage==1){
    
// if (buttonprev) {
//   buttonprev.style.pointerEvents = 'none'; // Disable click events
//   buttonprev.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//   buttonprev.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled

// }

//   }
//   else{
//      if (buttonprev) {

//       buttonprev.style.pointerEvents = 'auto'; 
//       buttonprev.style.cursor = 'pointer'; 
//       buttonprev.style.opacity = '1'; 
//     }
//   }

//   const buttonnext = document.getElementById('next');

//   if(this.currentPage == this.tot_pages){
// if (buttonnext) {
//   buttonnext.style.pointerEvents = 'none'; // Disable click events
//   buttonnext.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//   buttonnext.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled
// }

// }
// else{
//   if (buttonnext) {
//     buttonnext.style.pointerEvents = 'auto'; 
//     buttonnext.style.cursor = 'pointer'; 
//     buttonnext.style.opacity = '1'; 
//   }


//   }
//   const pages: (number | string)[] = [];
// console.log("for paginationnnnnnnnnnnnnnnnnnnnn ::::::" ,  this.tot_pages)
//   if ( this.tot_pages <= 3) {
//     // لو الصفحات قليلة 3 أو أقل، اعرضهم كلهم
//     for (let i = 1; i <=  this.tot_pages; i++) {
//       pages.push(i);

//       console.log("less than 3" ,i)
//     }
//   } else {
//     // دايمًا نحاول نعرض 3 أزرار
//     let start = this.currentPage - 1;
//     let end = this.currentPage + 1;

//     // لو وصلنا لنهاية الصفحات، نخلي آخر 3
//     if (this.currentPage >= this.tot_pages - 1) {
//       start = this.tot_pages - 2;
//       end = this.tot_pages;
//     }

//     // لو في البداية، نخلي أول 3
//     if (this.currentPage <= 2) {
//       start = 1;
//       end = 3;
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//       console.log("more than 3" ,i)

//     }

//     // لو لسه فيه صفحات بعدها نضيف "..."
//     if (end < this.tot_pages) {
//       pages.push('...');
//     }
//   }

//   this.arrr = pages;
//   this.buttonValueclickedd = this.currentPage;

//   console.log("ana hna frompaginationnnn" , this.arrr)
// }

generatePagination() {
  const buttonprev = document.getElementById('prev');
  const buttonnext = document.getElementById('next');

  // Enable/Disable prev button
  // if (this.currentPage === 1 && buttonprev) {
  //   buttonprev.style.pointerEvents = 'none';
  //   buttonprev.style.cursor = 'not-allowed';
  //   buttonprev.style.opacity = '0.5';
  // } else if (buttonprev) {
  //   buttonprev.style.pointerEvents = 'auto';
  //   buttonprev.style.cursor = 'pointer';
  //   buttonprev.style.opacity = '1';
  // }

  // // Enable/Disable next button
  // if (this.currentPage === this.tot_pages && buttonnext) {
  //   buttonnext.style.pointerEvents = 'none';
  //   buttonnext.style.cursor = 'not-allowed';
  //   buttonnext.style.opacity = '0.5';
  // } else if (buttonnext) {
  //   buttonnext.style.pointerEvents = 'auto';
  //   buttonnext.style.cursor = 'pointer';
  //   buttonnext.style.opacity = '1';
  // }

  const pages: (number | string)[] = [];

  let start = this.currentPage;

  // If currentPage is at the end, adjust back
  if (this.currentPage >= this.tot_pages - 1) {
    start = this.tot_pages - 2;
  }

  // If at the start, adjust to begin at 1
  if (start <= 0) {
    start = 1;
  }

  let end = start + 2;

  if (end > this.tot_pages) {
    end = this.tot_pages;
  }

  if (start === 1 && buttonprev) {
    buttonprev.style.pointerEvents = 'none';
    buttonprev.style.cursor = 'not-allowed';
    buttonprev.style.opacity = '0.5';
  } else if (buttonprev) {
    buttonprev.style.pointerEvents = 'auto';
    buttonprev.style.cursor = 'pointer';
    buttonprev.style.opacity = '1';
  }

   // Enable/Disable next button
   if (end === this.tot_pages && buttonnext) {
    buttonnext.style.pointerEvents = 'none';
    buttonnext.style.cursor = 'not-allowed';
    buttonnext.style.opacity = '0.5';
  } else if (buttonnext) {
    buttonnext.style.pointerEvents = 'auto';
    buttonnext.style.cursor = 'pointer';
    buttonnext.style.opacity = '1';
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < this.tot_pages) {
    pages.push('...');
  }

  this.arrr = pages;
  this.buttonValueclickedd = this.currentPage;

  console.log("Pagination buttons:", this.arrr);
}


press(event: Event) {
  const button = event.target as HTMLButtonElement;

/////////////////////////////////


/////////////////////////////
  
  const value = parseInt(button.innerText);

  if (!isNaN(value)) {
    this.currentPage = value;
    //  this.generatePagination();
        // نفذ الكول أو API هنا حسب الصفحة
        const button = event.target as HTMLButtonElement;
        const buttonValue: number = parseInt(button.innerText, 10);
        /////////////////////////////////////////
        const allButtons = Array.from(document.getElementsByClassName('bttngen') as HTMLCollectionOf<HTMLElement>);

        allButtons.forEach((btn) => {
          btn.classList.remove('bg-black', 'text-white');
        });
        button.classList.add('bg-black', 'text-white');
        /////////////////////////////////////
    // this.buttonValueclickedd=1
    

  //   const buttonn = document.getElementById('prev');

  //   if(buttonValue==1){
      
  //   if (buttonn) {

  //      buttonn.style.pointerEvents = 'none'; // Disable click events
  // buttonn.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
  // buttonn.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled

  //   }
  //   }
  //   else{
  //  if (buttonn) {

  //   buttonn.style.pointerEvents = 'auto'; 
  //   buttonn.style.cursor = 'pointer'; 
  //   buttonn.style.opacity = '1'; 
  //   }
  //   }

// console.log("im hereee in presss function" , this.lenn);

console.log('ana hna in product component Haniiii', this.tot_pages);
 const buttonnext = document.getElementById('next');

// if(buttonValue==this.tot_pages){
      
//   if (buttonnext) {

//     buttonnext.style.pointerEvents = 'none'; // Disable click events
//     buttonnext.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//     buttonnext.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled

//   }
//   }
//   else{
//  if (buttonnext) {

//   buttonnext.style.pointerEvents = 'auto'; 
//   buttonnext.style.cursor = 'pointer'; 
//   buttonnext.style.opacity = '1'; 
//   }
//   }
    

    // if(buttonValue<this.arr.length){

    //   const buttonn = document.getElementById('next');
    // if (buttonn) {

    //   buttonn.style.pointerEvents = 'auto'; 
    //   buttonn.style.cursor = 'pointer'; 
    //   buttonn.style.opacity = '1'; 
    // }}
    this.buttonValueclickedd= buttonValue;
    console.log("movinggg to", this.buttonValueclickedd);

    console.log('yuuuuuuuuu', buttonValue);
    console.log('Pagination array:', this.arr);
    console.log(
      'Updated Data in Product Component  xxxxxx:',
      this.receivedCategories,
      this.minprice,
      this.maxprice,
      this.newtoold,
      this.oldtonew
    );

    if (this.searchFromSidebar.length !== 0) {
      /////////////////

this.PoroductsService.getSrearched(this.searchFromSidebar , buttonValue).subscribe({
  next: (data) => {
    console.log(data);
    var products: any = data;

    this.x = products.data.paginatedResults;  // Assuming the search results are in `paginatedResults`
    console.log('Search results:', this.x);

    // Handle pagination or other logic if necessary
    if (this.x.length > 0) {
      console.log('Products found after search');
      // Emit search results or handle pagination here if needed
    } else {
      console.log('No products found for search');
    }
  },
  error: (err) => {
    console.log('Error during search:', err);
  },
  complete: () => {
    console.log('Search request complete');
  },
});

/////////////////
return; // This will exit the function early


    }



    if (
      this.receivedCategories.length == 0 &&
      this.newtoold == false &&
      this.oldtonew == false &&
      this.minprice == 200 &&
      this.maxprice == 20000
    ) {

      this.PoroductsService.getallproductsbuttn(buttonValue).subscribe({
        next: (data) => {
          console.log(data);
          var products: any = data;

          this.x = products.data.products;
          console.log('buttonclickeddddd');
          console.log(this.x);
        },
        error: (err) => { },
        complete: () => {
          console.log('completeeee');
        },
      });
    }
    if (this.receivedCategories.length && this.newtoold) {
      this.PoroductsService.getFilteredProducts(
        this.receivedCategories,
        this.minprice,
        this.maxprice,
        8,
        buttonValue,
        'oldest'
      ).subscribe({
        next: (data) => {
          console.log(data);
          var products: any = data;
          console.log(
            '1111111111112222222222222222222222222222333333333333333333333333333333'
          );

          // this.arr = [];
          this.tot_pages = products.data.totalPages;
          console.log('totalllll', this.tot_pages);
          // console.log(this.arr);

          // for (var i = 1; i <= this.tot_pages; i++) {
          //   this.arr.push(i);
          // }
          // console.log(this.arr);

          console.log(products.data.products);
          this.x = products.data.products;

          // this.x = products.data.products;
          // console.log(this.x);

        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completeeee');
        },
      });
    }

    ////////////////////////////////////////////////////

    if (this.receivedCategories.length && this.oldtonew) {
      this.PoroductsService.getFilteredProducts(
        this.receivedCategories,
        this.minprice,
        this.maxprice,
        8,
        buttonValue,
        'newest'
      ).subscribe({
        next: (data) => {
          console.log(data);
          var products: any = data;
          console.log(
            '1111111111112222222222222222222222222222333333333333333333333333333333'
          );
          // this.arr = [];
          this.tot_pages = products.data.totalPages;
          console.log("old to newww" ,  this.tot_pages);
          // this.generatePagination()
          // for (var i = 1; i <= this.tot_pages; i++) {
          //   this.arr.push(i);
          // }

          console.log(products.data.products);
          this.x = products.data.products;

        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completeeee');
        },
      });
    }

    if (this.receivedCategories.length && !this.oldtonew && !this.oldtonew) {
      this.PoroductsService.getFilteredProducts(
        this.receivedCategories,
        this.minprice,
        this.maxprice,
        8,
        buttonValue
      ).subscribe({
        next: (data) => {
          console.log(data);
          var products: any = data;
          console.log(
            '1111111111112222222222222222222222222222333333333333333333333333333333'
          );
          // this.arr = [];
          // console.log('arr before', this.arr);

          this.tot_pages = products.data.totalPages;
          // for (var i = 1; i <= this.tot_pages; i++) {
          //   this.arr.push(i);
          // }
          // console.log('arr after', this.arr);

          console.log(products.data.products);
          this.x = products.data.products;

          this.x = products.data.products;
          // console.log(this.x);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completeeee');
        },
      });
    }

    if (this.receivedCategories.length == 0 && this.oldtonew) {
      // this.PoroductsService.getnewest().subscribe({
      //   next: (data) => {
      //     console.log(data);
      //     var products: any = data;
      //     console.log(
      //       '1111111111112222222222222222222222222222333333333333333333333333333333'
      //     );
      //     console.log(products.data.products);
      //     this.x = products.data.products;

      //     this.x = products.data.products;
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      //   complete: () => {
      //     console.log('completeeee');
      //   },
      // });
      this.PoroductsService.getFilteredProducts(
        [],
        this.minprice,
        this.maxprice,
        8,
        buttonValue,
        'newest'
      ).subscribe({
        next: (data) => {
          console.log(data);
          var products: any = data;
          console.log(
            '1111111111112222222222222222222222222222333333333333333333333333333333'
          );
          // this.arr = [];
           this.tot_pages = products.data.totalPages;
          // for (var i = 1; i <= this.tot_pages; i++) {
          //   this.arr.push(i);
          // }

          console.log("newwwwwwwwwww");
          console.log(this.arr)
          console.log(data)
          console.log(products.data.products);
          this.x = products.data.products;

          this.x = products.data.products;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completeeee');
        },
      });

    }

    if (this.receivedCategories.length == 0 && this.newtoold) {
      // this.PoroductsService.getoldest().subscribe({
      //   next: (data) => {
      //     console.log(data);
      //     var products: any = data;
      //     console.log(
      //       '1111111111112222222222222222222222222222333333333333333333333333333333'
      //     );
      //     console.log(products.data.products);
      //     this.x = products.data.products;

      //     this.x = products.data.products;
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      //   complete: () => {
      //     console.log('completeeee');
      //   },
      // });
      console.log(buttonValue)
      this.PoroductsService.getFilteredProducts(
        [],
        this.minprice,
        this.maxprice,
        8,
        buttonValue,
        'oldest'
      ).subscribe({
        next: (data) => {
          console.log(data);
          var products: any = data;
          console.log(
            '1111111111112222222222222222222222222222333333333333333333333333333333'
          );
          this.arr = [];
          this.tot_pages = products.data.totalPages;
          for (var i = 1; i <= this.tot_pages; i++) {
            this.arr.push(i);
          }

          console.log("newwwwwwwwwww");
          console.log(this.arr)
          console.log(data)
          console.log(products.data.products);
          this.x = products.data.products;

          this.x = products.data.products;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completeeee');
        },
      });

    }


   


  }
}

pressclickedp() {
  if (this.currentPage > 1) {
    this.currentPage--;

    
    this.generatePagination();

 
      // const button = document.getElementById('prev') as HTMLButtonElement;
      // if (button && this.currentPage==1 ) {
      //   button.style.pointerEvents = 'none';
      //   button.style.cursor = 'not-allowed';
      //   button.style.opacity = '0.5';
      // }
      
        //  نفذ API هنا كمان
   console.log("amr" ,this.buttonValueclickedd)

  //   if(this.buttonValueclickedd==1){

  //   const button = document.getElementById('prev');
  //   if (button) {
  //     button.style.pointerEvents = 'none'; // Disable click events
  //     button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
  //     button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled
    
  //   }
  // }
  // else{
  //   const button = document.getElementById('prev');
  //   if (button) {

  //     button.style.pointerEvents = 'auto'; 
  //     button.style.cursor = 'pointer'; 
  //     button.style.opacity = '1'; 
  //   }


  // }

  //   if(this.buttonValueclickedd<=this.arr.length){
      
  //   const button = document.getElementById('next');
  //   if (button) {

  //     button.style.pointerEvents = 'auto'; 
  //     button.style.cursor = 'pointer'; 
  //     button.style.opacity = '1'; 
  //   }
  //   }
  // console.log(
  //   'Updated Data in Product Component  xxxxxx:',
  //   this.receivedCategories,
  //   this.minprice,
  //   this.maxprice,
  //   this.newtoold,
  //   this.oldtonew
  // );
  // if (
  //   this.receivedCategories.length == 0 &&this.newtoold == false &&this.oldtonew == false &&this.minprice == 200 &&this.maxprice == 20000
  // ) {
  //   this.PoroductsService.getallproductsbuttn(this.buttonValueclickedd).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;

  //       this.x = products.data.products;
  //       console.log('buttonclickeddddd');
  //       console.log(this.x);
  //     },
  //     error: (err) => { },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }
  // if (this.receivedCategories.length && this.newtoold) {
  //   this.PoroductsService.getFilteredProducts(
  //     this.receivedCategories,
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'newest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );

  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       console.log('totalllll', this.tot_pages);
  //       console.log(this.arr);

  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }
  //       console.log(this.arr);

  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //       // console.log(this.x);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }

  ////////////////////////////////////////////////////

  // if (this.receivedCategories.length && this.oldtonew) {
  //   this.PoroductsService.getFilteredProducts(
  //     this.receivedCategories,
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'oldest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }

  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }

  // if (this.receivedCategories.length && !this.oldtonew && !this.oldtonew) {
  //   this.PoroductsService.getFilteredProducts(
  //     this.receivedCategories,
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       console.log('arr before', this.arr);

  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }
  //       console.log('arr after', this.arr);

  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //       // console.log(this.x);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }

  // if (this.receivedCategories.length == 0 && this.oldtonew) {
  //   // this.PoroductsService.getnewest().subscribe({
  //   //   next: (data) => {
  //   //     console.log(data);
  //   //     var products: any = data;
  //   //     console.log(
  //   //       '1111111111112222222222222222222222222222333333333333333333333333333333'
  //   //     );
  //   //     console.log(products.data.products);
  //   //     this.x = products.data.products;

  //   //     this.x = products.data.products;
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('completeeee');
  //   //   },
  //   // });
  //   this.PoroductsService.getFilteredProducts(
  //     [],
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'newest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }

  //       console.log("newwwwwwwwwww");
  //       console.log(this.arr)
  //       console.log(data)
  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });

  // }

  // if (this.receivedCategories.length == 0 && this.newtoold) {
  //   // this.PoroductsService.getoldest().subscribe({
  //   //   next: (data) => {
  //   //     console.log(data);
  //   //     var products: any = data;
  //   //     console.log(
  //   //       '1111111111112222222222222222222222222222333333333333333333333333333333'
  //   //     );
  //   //     console.log(products.data.products);
  //   //     this.x = products.data.products;

  //   //     this.x = products.data.products;
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('completeeee');
  //   //   },
  //   // });
  //   console.log(this.buttonValueclickedd)
  //   this.PoroductsService.getFilteredProducts(
  //     [],
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'oldest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }

  //       console.log("newwwwwwwwwww");
  //       console.log(this.arr)
  //       console.log(data)
  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });

  // }
}


   
  

}

pressclickedn() {
  if (this.currentPage < this.tot_pages) {
    this.currentPage++;
    this.generatePagination();
    // نفذ API ه
    // نا كمان
  // this.buttonValueclickedd+=1
   console.log("amr" ,this.buttonValueclickedd)
  // if(this.buttonValueclickedd<=this.arr.length){

    // if(this.buttonValueclickedd==this.arr.length)
    //   {
  //       const button = document.getElementById('next');
    
  //    if (button) {
  // button.style.pointerEvents = 'none'; // Disable click events
  // button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
  // button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled

  //       }
      //  }
    // const button = document.getElementById('next');
    // if (button) {

    //   button.style.pointerEvents = 'auto'; 
    //   button.style.cursor = 'pointer'; 
    //   button.style.opacity = '1'; 
    // }
  //    if(this.buttonValueclickedd>1)
  //   {
  //   const buttonn = document.getElementById('prev');
  //   if (buttonn) {

  //     buttonn.style.pointerEvents = 'auto'; 
  //     buttonn.style.cursor = 'pointer'; 
  //     buttonn.style.opacity = '1'; 
  //   }
  // }
  // console.log(
  //   'Updated Data in Product Component  xxxxxx:',
  //   this.receivedCategories,
  //   this.minprice,
  //   this.maxprice,
  //   this.newtoold,
  //   this.oldtonew
  // );
  // if (
  //   this.receivedCategories.length == 0 &&
  //   this.newtoold == false &&
  //   this.oldtonew == false &&
  //   this.minprice == 200 &&
  //   this.maxprice == 20000
  // ) {
  //   this.PoroductsService.getallproductsbuttn(this.buttonValueclickedd).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;

  //       this.x = products.data.products;
  //       console.log('buttonclickeddddd');
  //       console.log(this.x);
  //     },
  //     error: (err) => { },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }
  // if (this.receivedCategories.length && this.newtoold) {
  //   this.PoroductsService.getFilteredProducts(
  //     this.receivedCategories,
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'newest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );

  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       console.log('totalllll', this.tot_pages);
  //       console.log(this.arr);

  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }
  //       console.log(this.arr);

  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //       // console.log(this.x);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }

  ////////////////////////////////////////////////////

  // if (this.receivedCategories.length && this.oldtonew) {
  //   this.PoroductsService.getFilteredProducts(
  //     this.receivedCategories,
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'oldest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }

  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }

  // if (this.receivedCategories.length && !this.oldtonew && !this.oldtonew) {
  //   this.PoroductsService.getFilteredProducts(
  //     this.receivedCategories,
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       console.log('arr before', this.arr);

  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }
  //       console.log('arr after', this.arr);

  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //       // console.log(this.x);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });
  // }

  // if (this.receivedCategories.length == 0 && this.oldtonew) {
  //   // this.PoroductsService.getnewest().subscribe({
  //   //   next: (data) => {
  //   //     console.log(data);
  //   //     var products: any = data;
  //   //     console.log(
  //   //       '1111111111112222222222222222222222222222333333333333333333333333333333'
  //   //     );
  //   //     console.log(products.data.products);
  //   //     this.x = products.data.products;

  //   //     this.x = products.data.products;
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('completeeee');
  //   //   },
  //   // });
  //   this.PoroductsService.getFilteredProducts(
  //     [],
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'newest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }

  //       console.log("newwwwwwwwwww");
  //       console.log(this.arr)
  //       console.log(data)
  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });

  // }

  // if (this.receivedCategories.length == 0 && this.newtoold) {
  //   // this.PoroductsService.getoldest().subscribe({
  //   //   next: (data) => {
  //   //     console.log(data);
  //   //     var products: any = data;
  //   //     console.log(
  //   //       '1111111111112222222222222222222222222222333333333333333333333333333333'
  //   //     );
  //   //     console.log(products.data.products);
  //   //     this.x = products.data.products;

  //   //     this.x = products.data.products;
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('completeeee');
  //   //   },
  //   // });
  //   console.log(this.buttonValueclickedd)
  //   this.PoroductsService.getFilteredProducts(
  //     [],
  //     this.minprice,
  //     this.maxprice,
  //     8,
  //     this.buttonValueclickedd,
  //     'oldest'
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       var products: any = data;
  //       console.log(
  //         '1111111111112222222222222222222222222222333333333333333333333333333333'
  //       );
  //       this.arr = [];
  //       this.tot_pages = products.data.totalPages;
  //       for (var i = 1; i <= this.tot_pages; i++) {
  //         this.arr.push(i);
  //       }

  //       console.log("newwwwwwwwwww");
  //       console.log(this.arr)
  //       console.log(data)
  //       console.log(products.data.products);
  //       this.x = products.data.products;

  //       this.x = products.data.products;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completeeee');
  //     },
  //   });

  // }
// }

// else{
// console.log("stopppppppp");
// const button = document.getElementById('next');
    
// if (button) {
//   button.style.pointerEvents = 'none'; // Disable click events
//   button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//   button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled
// }
// }

    //////////////////////
  }
}


////////////////////////


/////////////////////////////////////////////////
    /////////////////
//   press(event: Event) {



//     // this.buttonValueclickedd=1
//     const button = event.target as HTMLButtonElement;
//     const buttonValue: number = parseInt(button.innerText, 10);


//     if(buttonValue>1){
      
//     const button = document.getElementById('prev');
//     if (button) {

//       button.style.pointerEvents = 'auto'; 
//       button.style.cursor = 'pointer'; 
//       button.style.opacity = '1'; 
//     }
//     }
//     if(buttonValue<this.arr.length){

//       const buttonn = document.getElementById('next');
//     if (buttonn) {

//       buttonn.style.pointerEvents = 'auto'; 
//       buttonn.style.cursor = 'pointer'; 
//       buttonn.style.opacity = '1'; 
//     }}
//     this.buttonValueclickedd= buttonValue;
//     console.log("movinggg to", this.buttonValueclickedd);

//     console.log('yuuuuuuuuu', buttonValue);
//     console.log('Pagination array:', this.arr);
//     console.log(
//       'Updated Data in Product Component  xxxxxx:',
//       this.receivedCategories,
//       this.minprice,
//       this.maxprice,
//       this.newtoold,
//       this.oldtonew
//     );

//     if (this.searchFromSidebar.length !== 0) {
//       /////////////////

// this.PoroductsService.getSrearched(this.searchFromSidebar , buttonValue).subscribe({
//   next: (data) => {
//     console.log(data);
//     var products: any = data;

//     this.x = products.data.paginatedResults;  // Assuming the search results are in `paginatedResults`
//     console.log('Search results:', this.x);

//     // Handle pagination or other logic if necessary
//     if (this.x.length > 0) {
//       console.log('Products found after search');
//       // Emit search results or handle pagination here if needed
//     } else {
//       console.log('No products found for search');
//     }
//   },
//   error: (err) => {
//     console.log('Error during search:', err);
//   },
//   complete: () => {
//     console.log('Search request complete');
//   },
// });

// /////////////////
// return; // This will exit the function early


//     }



//     if (
//       this.receivedCategories.length == 0 &&
//       this.newtoold == false &&
//       this.oldtonew == false &&
//       this.minprice == 200 &&
//       this.maxprice == 20000
//     ) {
//       this.PoroductsService.getallproductsbuttn(buttonValue).subscribe({
//         next: (data) => {
//           console.log(data);
//           var products: any = data;

//           this.x = products.data.products;
//           console.log('buttonclickeddddd');
//           console.log(this.x);
//         },
//         error: (err) => { },
//         complete: () => {
//           console.log('completeeee');
//         },
//       });
//     }
//     if (this.receivedCategories.length && this.newtoold) {
//       this.PoroductsService.getFilteredProducts(
//         this.receivedCategories,
//         this.minprice,
//         this.maxprice,
//         8,
//         buttonValue,
//         'newest'
//       ).subscribe({
//         next: (data) => {
//           console.log(data);
//           var products: any = data;
//           console.log(
//             '1111111111112222222222222222222222222222333333333333333333333333333333'
//           );

//           this.arr = [];
//           this.tot_pages = products.data.totalPages;
//           console.log('totalllll', this.tot_pages);
//           console.log(this.arr);

//           for (var i = 1; i <= this.tot_pages; i++) {
//             this.arr.push(i);
//           }
//           console.log(this.arr);

//           console.log(products.data.products);
//           this.x = products.data.products;

//           this.x = products.data.products;
//           // console.log(this.x);
//         },
//         error: (err) => {
//           console.log(err);
//         },
//         complete: () => {
//           console.log('completeeee');
//         },
//       });
//     }

//     ////////////////////////////////////////////////////

//     if (this.receivedCategories.length && this.oldtonew) {
//       this.PoroductsService.getFilteredProducts(
//         this.receivedCategories,
//         this.minprice,
//         this.maxprice,
//         8,
//         buttonValue,
//         'oldest'
//       ).subscribe({
//         next: (data) => {
//           console.log(data);
//           var products: any = data;
//           console.log(
//             '1111111111112222222222222222222222222222333333333333333333333333333333'
//           );
//           this.arr = [];
//           this.tot_pages = products.data.totalPages;
//           for (var i = 1; i <= this.tot_pages; i++) {
//             this.arr.push(i);
//           }

//           console.log(products.data.products);
//           this.x = products.data.products;

//           this.x = products.data.products;
//         },
//         error: (err) => {
//           console.log(err);
//         },
//         complete: () => {
//           console.log('completeeee');
//         },
//       });
//     }

//     if (this.receivedCategories.length && !this.oldtonew && !this.oldtonew) {
//       this.PoroductsService.getFilteredProducts(
//         this.receivedCategories,
//         this.minprice,
//         this.maxprice,
//         8,
//         buttonValue
//       ).subscribe({
//         next: (data) => {
//           console.log(data);
//           var products: any = data;
//           console.log(
//             '1111111111112222222222222222222222222222333333333333333333333333333333'
//           );
//           this.arr = [];
//           console.log('arr before', this.arr);

//           this.tot_pages = products.data.totalPages;
//           for (var i = 1; i <= this.tot_pages; i++) {
//             this.arr.push(i);
//           }
//           console.log('arr after', this.arr);

//           console.log(products.data.products);
//           this.x = products.data.products;

//           this.x = products.data.products;
//           // console.log(this.x);
//         },
//         error: (err) => {
//           console.log(err);
//         },
//         complete: () => {
//           console.log('completeeee');
//         },
//       });
//     }

//     if (this.receivedCategories.length == 0 && this.oldtonew) {
//       // this.PoroductsService.getnewest().subscribe({
//       //   next: (data) => {
//       //     console.log(data);
//       //     var products: any = data;
//       //     console.log(
//       //       '1111111111112222222222222222222222222222333333333333333333333333333333'
//       //     );
//       //     console.log(products.data.products);
//       //     this.x = products.data.products;

//       //     this.x = products.data.products;
//       //   },
//       //   error: (err) => {
//       //     console.log(err);
//       //   },
//       //   complete: () => {
//       //     console.log('completeeee');
//       //   },
//       // });
//       this.PoroductsService.getFilteredProducts(
//         [],
//         this.minprice,
//         this.maxprice,
//         8,
//         buttonValue,
//         'newest'
//       ).subscribe({
//         next: (data) => {
//           console.log(data);
//           var products: any = data;
//           console.log(
//             '1111111111112222222222222222222222222222333333333333333333333333333333'
//           );
//           this.arr = [];
//           this.tot_pages = products.data.totalPages;
//           for (var i = 1; i <= this.tot_pages; i++) {
//             this.arr.push(i);
//           }

//           console.log("newwwwwwwwwww");
//           console.log(this.arr)
//           console.log(data)
//           console.log(products.data.products);
//           this.x = products.data.products;

//           this.x = products.data.products;
//         },
//         error: (err) => {
//           console.log(err);
//         },
//         complete: () => {
//           console.log('completeeee');
//         },
//       });

//     }

//     if (this.receivedCategories.length == 0 && this.newtoold) {
//       // this.PoroductsService.getoldest().subscribe({
//       //   next: (data) => {
//       //     console.log(data);
//       //     var products: any = data;
//       //     console.log(
//       //       '1111111111112222222222222222222222222222333333333333333333333333333333'
//       //     );
//       //     console.log(products.data.products);
//       //     this.x = products.data.products;

//       //     this.x = products.data.products;
//       //   },
//       //   error: (err) => {
//       //     console.log(err);
//       //   },
//       //   complete: () => {
//       //     console.log('completeeee');
//       //   },
//       // });
//       console.log(buttonValue)
//       this.PoroductsService.getFilteredProducts(
//         [],
//         this.minprice,
//         this.maxprice,
//         8,
//         buttonValue,
//         'oldest'
//       ).subscribe({
//         next: (data) => {
//           console.log(data);
//           var products: any = data;
//           console.log(
//             '1111111111112222222222222222222222222222333333333333333333333333333333'
//           );
//           this.arr = [];
//           this.tot_pages = products.data.totalPages;
//           for (var i = 1; i <= this.tot_pages; i++) {
//             this.arr.push(i);
//           }

//           console.log("newwwwwwwwwww");
//           console.log(this.arr)
//           console.log(data)
//           console.log(products.data.products);
//           this.x = products.data.products;

//           this.x = products.data.products;
//         },
//         error: (err) => {
//           console.log(err);
//         },
//         complete: () => {
//           console.log('completeeee');
//         },
//       });

//     }


   
//   }
///////////////////trv//////////////////////////
// pressclickedp(event: Event) {
//   this.buttonValueclickedd-=1
//    console.log("amr" ,this.buttonValueclickedd)
//   if(this.buttonValueclickedd>=1){

//     if(this.buttonValueclickedd==1){

//     const button = document.getElementById('prev');
//     if (button) {
//       button.style.pointerEvents = 'none'; // Disable click events
//       button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//       button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled
    
//     }
//   }
//   else{
//     const button = document.getElementById('prev');
//     if (button) {

//       button.style.pointerEvents = 'auto'; 
//       button.style.cursor = 'pointer'; 
//       button.style.opacity = '1'; 
//     }


//   }

//     if(this.buttonValueclickedd<=this.arr.length){
      
//     const button = document.getElementById('next');
//     if (button) {

//       button.style.pointerEvents = 'auto'; 
//       button.style.cursor = 'pointer'; 
//       button.style.opacity = '1'; 
//     }
//     }
//   console.log(
//     'Updated Data in Product Component  xxxxxx:',
//     this.receivedCategories,
//     this.minprice,
//     this.maxprice,
//     this.newtoold,
//     this.oldtonew
//   );
//   if (
//     this.receivedCategories.length == 0 &&
//     this.newtoold == false &&
//     this.oldtonew == false &&
//     this.minprice == 200 &&
//     this.maxprice == 20000
//   ) {
//     this.PoroductsService.getallproductsbuttn(this.buttonValueclickedd).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;

//         this.x = products.data.products;
//         console.log('buttonclickeddddd');
//         console.log(this.x);
//       },
//       error: (err) => { },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }
//   if (this.receivedCategories.length && this.newtoold) {
//     this.PoroductsService.getFilteredProducts(
//       this.receivedCategories,
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'newest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );

//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         console.log('totalllll', this.tot_pages);
//         console.log(this.arr);

//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }
//         console.log(this.arr);

//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//         // console.log(this.x);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }

//   ////////////////////////////////////////////////////

//   if (this.receivedCategories.length && this.oldtonew) {
//     this.PoroductsService.getFilteredProducts(
//       this.receivedCategories,
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'oldest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }

//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }

//   if (this.receivedCategories.length && !this.oldtonew && !this.oldtonew) {
//     this.PoroductsService.getFilteredProducts(
//       this.receivedCategories,
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         console.log('arr before', this.arr);

//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }
//         console.log('arr after', this.arr);

//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//         // console.log(this.x);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }

//   if (this.receivedCategories.length == 0 && this.oldtonew) {
//     // this.PoroductsService.getnewest().subscribe({
//     //   next: (data) => {
//     //     console.log(data);
//     //     var products: any = data;
//     //     console.log(
//     //       '1111111111112222222222222222222222222222333333333333333333333333333333'
//     //     );
//     //     console.log(products.data.products);
//     //     this.x = products.data.products;

//     //     this.x = products.data.products;
//     //   },
//     //   error: (err) => {
//     //     console.log(err);
//     //   },
//     //   complete: () => {
//     //     console.log('completeeee');
//     //   },
//     // });
//     this.PoroductsService.getFilteredProducts(
//       [],
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'newest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }

//         console.log("newwwwwwwwwww");
//         console.log(this.arr)
//         console.log(data)
//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });

//   }

//   if (this.receivedCategories.length == 0 && this.newtoold) {
//     // this.PoroductsService.getoldest().subscribe({
//     //   next: (data) => {
//     //     console.log(data);
//     //     var products: any = data;
//     //     console.log(
//     //       '1111111111112222222222222222222222222222333333333333333333333333333333'
//     //     );
//     //     console.log(products.data.products);
//     //     this.x = products.data.products;

//     //     this.x = products.data.products;
//     //   },
//     //   error: (err) => {
//     //     console.log(err);
//     //   },
//     //   complete: () => {
//     //     console.log('completeeee');
//     //   },
//     // });
//     console.log(this.buttonValueclickedd)
//     this.PoroductsService.getFilteredProducts(
//       [],
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'oldest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }

//         console.log("newwwwwwwwwww");
//         console.log(this.arr)
//         console.log(data)
//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });

//   }
// }

// else{
// console.log("stopppppppp");
// const button = document.getElementById('prev');
    
// if (button) {
//   button.style.pointerEvents = 'none'; // Disable click events
//   button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//   button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled

// }
// this.buttonValueclickedd=1;
// console.log(this.buttonValueclickedd)

// }
// }
////////////////next//////////////////////////////////

// pressclickedn(event: Event) {
//   this.buttonValueclickedd+=1
//    console.log("amr" ,this.buttonValueclickedd)
//   if(this.buttonValueclickedd<=this.arr.length){

//     if(this.buttonValueclickedd==this.arr.length)
//       {
//         const button = document.getElementById('next');
    
//      if (button) {
//   button.style.pointerEvents = 'none'; // Disable click events
//   button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//   button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled

//         }
//        }
//     // const button = document.getElementById('next');
//     // if (button) {

//     //   button.style.pointerEvents = 'auto'; 
//     //   button.style.cursor = 'pointer'; 
//     //   button.style.opacity = '1'; 
//     // }
//      if(this.buttonValueclickedd>1)
//     {
//     const buttonn = document.getElementById('prev');
//     if (buttonn) {

//       buttonn.style.pointerEvents = 'auto'; 
//       buttonn.style.cursor = 'pointer'; 
//       buttonn.style.opacity = '1'; 
//     }
//   }
//   console.log(
//     'Updated Data in Product Component  xxxxxx:',
//     this.receivedCategories,
//     this.minprice,
//     this.maxprice,
//     this.newtoold,
//     this.oldtonew
//   );
//   if (
//     this.receivedCategories.length == 0 &&
//     this.newtoold == false &&
//     this.oldtonew == false &&
//     this.minprice == 200 &&
//     this.maxprice == 20000
//   ) {
//     this.PoroductsService.getallproductsbuttn(this.buttonValueclickedd).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;

//         this.x = products.data.products;
//         console.log('buttonclickeddddd');
//         console.log(this.x);
//       },
//       error: (err) => { },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }
//   if (this.receivedCategories.length && this.newtoold) {
//     this.PoroductsService.getFilteredProducts(
//       this.receivedCategories,
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'newest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );

//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         console.log('totalllll', this.tot_pages);
//         console.log(this.arr);

//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }
//         console.log(this.arr);

//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//         // console.log(this.x);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }

//   ////////////////////////////////////////////////////

//   if (this.receivedCategories.length && this.oldtonew) {
//     this.PoroductsService.getFilteredProducts(
//       this.receivedCategories,
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'oldest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }

//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }

//   if (this.receivedCategories.length && !this.oldtonew && !this.oldtonew) {
//     this.PoroductsService.getFilteredProducts(
//       this.receivedCategories,
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         console.log('arr before', this.arr);

//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }
//         console.log('arr after', this.arr);

//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//         // console.log(this.x);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });
//   }

//   if (this.receivedCategories.length == 0 && this.oldtonew) {
//     // this.PoroductsService.getnewest().subscribe({
//     //   next: (data) => {
//     //     console.log(data);
//     //     var products: any = data;
//     //     console.log(
//     //       '1111111111112222222222222222222222222222333333333333333333333333333333'
//     //     );
//     //     console.log(products.data.products);
//     //     this.x = products.data.products;

//     //     this.x = products.data.products;
//     //   },
//     //   error: (err) => {
//     //     console.log(err);
//     //   },
//     //   complete: () => {
//     //     console.log('completeeee');
//     //   },
//     // });
//     this.PoroductsService.getFilteredProducts(
//       [],
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'newest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }

//         console.log("newwwwwwwwwww");
//         console.log(this.arr)
//         console.log(data)
//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });

//   }

//   if (this.receivedCategories.length == 0 && this.newtoold) {
//     // this.PoroductsService.getoldest().subscribe({
//     //   next: (data) => {
//     //     console.log(data);
//     //     var products: any = data;
//     //     console.log(
//     //       '1111111111112222222222222222222222222222333333333333333333333333333333'
//     //     );
//     //     console.log(products.data.products);
//     //     this.x = products.data.products;

//     //     this.x = products.data.products;
//     //   },
//     //   error: (err) => {
//     //     console.log(err);
//     //   },
//     //   complete: () => {
//     //     console.log('completeeee');
//     //   },
//     // });
//     console.log(this.buttonValueclickedd)
//     this.PoroductsService.getFilteredProducts(
//       [],
//       this.minprice,
//       this.maxprice,
//       8,
//       this.buttonValueclickedd,
//       'oldest'
//     ).subscribe({
//       next: (data) => {
//         console.log(data);
//         var products: any = data;
//         console.log(
//           '1111111111112222222222222222222222222222333333333333333333333333333333'
//         );
//         this.arr = [];
//         this.tot_pages = products.data.totalPages;
//         for (var i = 1; i <= this.tot_pages; i++) {
//           this.arr.push(i);
//         }

//         console.log("newwwwwwwwwww");
//         console.log(this.arr)
//         console.log(data)
//         console.log(products.data.products);
//         this.x = products.data.products;

//         this.x = products.data.products;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('completeeee');
//       },
//     });

//   }
// }

// else{
// console.log("stopppppppp");
// const button = document.getElementById('next');
    
// if (button) {
//   button.style.pointerEvents = 'none'; // Disable click events
//   button.style.cursor = 'not-allowed'; // Change cursor to "not allowed"
//   button.style.opacity = '0.5'; // Optional: you can dim the button to indicate it's disabled
// }
// }
// }
}
