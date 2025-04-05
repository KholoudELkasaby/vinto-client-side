import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FilteredImageComponent } from '../filtered-image/filtered-image.component';
import { ProductitemComponent } from '../productitem/productitem.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NotProductFoundComponent } from '../not-product-found/not-product-found.component';

@Component({
  selector: 'app-products',
  imports: [
    SidebarComponent,
    FilteredImageComponent,
    ProductitemComponent,
    CommonModule,
    NotProductFoundComponent 
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  x: any[] = [];
  isSorted: string = '';
  // latestFilteredProducts: any[] = []; // Store latest filtered data
  isFiltered: boolean = false; // Tracks if we're using filtered data
  productsPerPage: number = 10; // Number of items per page
  pageNumbers: number[] = [];
  tot_pages = 0;
  constructor(private PoroductsService: ProductService) { }
  //  products:any;
  arr: number[] = [];
  flag:boolean=false;

  ngOnInit(): void {
    this.PoroductsService.getallproducts().subscribe({
      
      next: (data) => {
        console.log('Full API response:', data);
        const products: any = data;

        // Check if totalPages exists and populate arr
        if (products.data.totalPages) {
          this.tot_pages = products.data.totalPages || 0; // Use totalPages if available, otherwise default to 0
          this.arr = [];
          for (let i = 1; i <= this.tot_pages; i++) {
            this.arr.push(i);
          }
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
  updateProducts(sortedProducts: any[]) {
    this.x = sortedProducts;
    console.log(this.x);
    if(!this.x.length ){
      this.flag=true;
    }

  }
  updatetotalpage(total_page: any[]) {
    this.arr = total_page;
    console.log('ana hna in product component', this.arr);
  }

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

  press(event: Event) {
    const button = event.target as HTMLButtonElement;
    const buttonValue: number = parseInt(button.innerText, 10);
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
        'newest'
      ).subscribe({
        next: (data) => {
          console.log(data);
          var products: any = data;
          console.log(
            '1111111111112222222222222222222222222222333333333333333333333333333333'
          );

          this.arr = [];
          this.tot_pages = products.data.totalPages;
          console.log('totalllll', this.tot_pages);
          console.log(this.arr);

          for (var i = 1; i <= this.tot_pages; i++) {
            this.arr.push(i);
          }
          console.log(this.arr);

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

    ////////////////////////////////////////////////////

    if (this.receivedCategories.length && this.oldtonew) {
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
          this.arr = [];
          this.tot_pages = products.data.totalPages;
          for (var i = 1; i <= this.tot_pages; i++) {
            this.arr.push(i);
          }

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
          this.arr = [];
          console.log('arr before', this.arr);

          this.tot_pages = products.data.totalPages;
          for (var i = 1; i <= this.tot_pages; i++) {
            this.arr.push(i);
          }
          console.log('arr after', this.arr);

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
        buttonValue ,
        'newest'
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

          console.log("newwwwwwwwwww") ;
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
        buttonValue ,
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

          console.log("newwwwwwwwwww") ;
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
