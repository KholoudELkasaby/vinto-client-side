import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FilteredImageComponent } from '../filtered-image/filtered-image.component';
import { ProductitemComponent } from '../productitem/productitem.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NotProductFoundComponent } from '../not-product-found/not-product-found.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PaginationModule } from '@coreui/angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ProductItemSkeletonComponent } from '../product-item-skeleton/product-item-skeleton.component';

@Component({
  selector: 'app-products',
  imports: [
    SidebarComponent,
    FilteredImageComponent,
    ProductitemComponent,
    CommonModule,
    NotProductFoundComponent,
    PaginatorModule,
    // PaginationModule,
    MatPaginatorModule,
    ProductItemSkeletonComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  first: number = 0;
  rows: number = 1;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  // //////////////////////////
  x: any[] = [];
  isSorted: string = '';
  lenn: number = 0;
  isusedbtn: number = 1;

  isFiltered: boolean = false; // Tracks if we're using filtered data
  productsPerPage: number = 10; // Number of items per page
  pageNumbers: number[] = [];
  tot_pages: any = 0;
  //  products:any;
  arr: number[] = [];
  flag: boolean = false;
  loading: boolean = true; // Loading state for the component

  constructor(private PoroductsService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.PoroductsService.getallproducts().subscribe({
      next: (data) => {
        console.log('Full API response:', data);
        const products: any = data;

        // Check if totalPages exists and populate arr
        if (products.data.totalPages) {
          this.tot_pages = products.data.totalPages || 0; // Use totalPages if available, otherwise default to 0
          this.generatePagination();

          // Apply style to button with innerText "1"
          setTimeout(() => {
            this.selectButtonWithText('1');
          }, 0); // Ensure the DOM is fully updated before applying the styles
        }

        console.log('Total Pages:', this.tot_pages); // Log totalPages to verify it
        console.log('Pagination array after population:', this.arr); // Log the populated pagination array
        console.log('Updated products array:', products.data.products);

        this.x = products.data.products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        console.log('Products fetch complete');
      },
    });
  }

  selectButtonWithText(buttonText: string): void {
    const allButtons = Array.from(
      document.getElementsByClassName(
        'bttngen'
      ) as HTMLCollectionOf<HTMLElement>
    );

    const buttonToSelect = allButtons.find(
      (btn) => btn.innerText === buttonText
    );

    if (buttonToSelect) {
      buttonToSelect.classList.add('bg-gray-200', 'text-black');
    }
  }

  reloadPage() {
    window.location.reload();
  }

  noProductsFound: boolean = false;

  onNoProductsFoundChange(value: boolean) {
    this.noProductsFound = value;
    console.log('No products found:', this.noProductsFound);
  }

  updatetotalpage(total_page: any[]) {
    this.isusedbtn = 1;
    this.arrr = total_page;
    // this.tot_pages= total_page
    this.tot_pages = total_page.length;

    const allButtons = Array.from(
      document.getElementsByClassName(
        'bttngen'
      ) as HTMLCollectionOf<HTMLElement>
    );

    console.log('isusedbtnkkkkkkkkkkk', this.isusedbtn);

    setTimeout(() => {
      const allButtons = Array.from(
        document.getElementsByClassName(
          'bttngen'
        ) as HTMLCollectionOf<HTMLElement>
      );
      allButtons.forEach((btn) => {
        btn.classList.remove('bg-gray-200', 'text-black');
      });

      const activeButton = allButtons.find((btn) => {
        return btn.innerText === this.isusedbtn.toString();
      });

      if (activeButton) {
        activeButton.classList.add('bg-gray-200', 'text-black');
      }
    }, 0);

    console.log('ana hna in product component', this.arrr);
    console.log('ana hna in product component Haniiii', this.tot_pages);
    ////////////////////////////
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    if (this.tot_pages <= 3) {
      if (prevButton) {
        prevButton.style.display = 'none';
      }
      if (nextButton) {
        nextButton.style.display = 'none';
      }
      console.log('hideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    } else {
      console.log('appppearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');

      if (prevButton) {
        prevButton.style.display = 'block';
      }
      if (nextButton) {
        nextButton.style.display = 'block';
      }
    }

    ///////////////////////////////
    this.lenn = this.arrr.length;
    this.currentPage = 1;

    this.generatePagination();

    console.log('this len', this.lenn);
  }

  updateProducts(sortedProducts: any[]) {
    this.x = sortedProducts;
    this.buttonValueclickedd = 1;
    console.log(this.lenn);
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

    if (state == true && state != null) {
      slider.style.display = 'block';
      element.style.background = 'white';
    } else if (state == false) {
      slider.style.display = 'none';
      element.style.background = 'transparent';
    }
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
      'Updated Data in Product Component:',
      this.receivedCategories,
      this.minprice,
      this.maxprice,
      this.newtoold,
      this.oldtonew
    );
  }
  buttonValueclickedd: number = 1;
  //////////////////////////////////////////
  searchFromSidebar: string = '';

  receiveSearchText(value: string) {
    this.searchFromSidebar = value;
    console.log('Received search text:', this.searchFromSidebar);

    if (this.searchFromSidebar.length != 0) {
      console.log('hellooooooppp');
    }
  }

  /////////hany///////////////
  currentPage = 1;
  arrr: (number | string)[] = [];

  generatePagination() {
    const buttonprev = document.getElementById('prev');
    const buttonnext = document.getElementById('next');

    const pages: (number | string)[] = [];

    let start = this.currentPage;

    if (this.currentPage >= this.tot_pages - 1) {
      start = this.tot_pages - 2;
    }

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

    console.log('Pagination buttons:', this.arrr);
    console.log('im herrrrrrrrrrrrrrrrrrrrrrrr', this.isusedbtn);

    setTimeout(() => {
      const allButtons = Array.from(
        document.getElementsByClassName(
          'bttngen'
        ) as HTMLCollectionOf<HTMLElement>
      );
      allButtons.forEach((btn) => {
        btn.classList.remove('bg-gray-200', 'text-black');
      });

      const activeButton = allButtons.find((btn) => {
        return btn.innerText === this.isusedbtn.toString();
      });

      if (activeButton) {
        activeButton.classList.add('bg-gray-200', 'text-black');
      }
    }, 0);
  }

  updateActiveButton(): void {
    const allButtons = Array.from(
      document.getElementsByClassName(
        'bttngen'
      ) as HTMLCollectionOf<HTMLElement>
    );

    allButtons.forEach((btn) => {
      btn.classList.remove('bg-gray-200', 'text-black');
    });

    const activeButton = allButtons.find(
      (btn) => btn.innerText === this.currentPage.toString()
    );
    if (activeButton) {
      activeButton.classList.add('bg-gray-200', 'text-black');
    }
  }

  press(event: Event) {
    const button = event.target as HTMLButtonElement;

    const value = parseInt(button.innerText);

    if (!isNaN(value)) {
      this.currentPage = value;
      const button = event.target as HTMLButtonElement;
      const buttonValue: number = parseInt(button.innerText, 10);
      console.log(
        'bttttttttttttttttttttttttttttttttttttttttttm',
        this.currentPage
      );
      this.isusedbtn = value;
      console.log('usebbbbbbttn Amtrrrrrrrrrrrrrrrrr', this.isusedbtn);

      this.updateActiveButton();
      /////////////////////////////////////////

      console.log('ana hna in product component Haniiii', this.tot_pages);
      const buttonnext = document.getElementById('next');
      this.buttonValueclickedd = buttonValue;
      console.log('movinggg to', this.buttonValueclickedd);

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
        this.loading = true;
        this.PoroductsService.getSrearched(
          this.searchFromSidebar,
          buttonValue
        ).subscribe({
          next: (data) => {
            console.log(data);
            var products: any = data;

            this.x = products.data.paginatedResults;
            console.log('Search results:', this.x);
            this.loading = false;

            if (this.x.length > 0) {
              console.log('Products found after search');
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
        return;
      }

      if (
        this.receivedCategories.length == 0 &&
        this.newtoold == false &&
        this.oldtonew == false &&
        this.minprice == 200 &&
        this.maxprice == 20000
      ) {
        this.loading = true;
        this.PoroductsService.getallproductsbuttn(buttonValue).subscribe({
          next: (data) => {
            console.log(data);
            var products: any = data;

            this.x = products.data.products;
            this.loading = false; // Set loading to false after data is fetched
            console.log('buttonclickeddddd');
            console.log(this.x);
          },
          error: (err) => {},
          complete: () => {
            console.log('completeeee');
          },
        });
      }
      if (this.receivedCategories.length && this.newtoold) {
        this.loading = true;
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

            this.tot_pages = products.data.totalPages;
            console.log('totalllll', this.tot_pages);

            console.log(products.data.products);
            this.x = products.data.products;
            this.loading = false; // Set loading to false after data is fetched
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
        this.loading = true;
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
            console.log('old to newww', this.tot_pages);
            console.log(products.data.products);
            this.x = products.data.products;
            this.loading = false; // Set loading to false after data is fetched
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
        this.loading = true;
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
            this.tot_pages = products.data.totalPages;

            console.log(products.data.products);
            this.x = products.data.products;

            this.loading = false; // Set loading to false after data is fetched
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
        this.loading = true;
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

            console.log('newwwwwwwwwww');
            console.log(this.arr);
            console.log(data);
            console.log(products.data.products);
            this.x = products.data.products;
            this.loading = false; // Set loading to false after data is fetched
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
        this.loading = true;
        console.log(buttonValue);
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

            console.log('newwwwwwwwwww');
            console.log(this.arr);
            console.log(data);
            console.log(products.data.products);
            this.x = products.data.products;

            this.loading = false; // Set loading to false after data is fetched
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
      console.log('..000000000000000000000000', this.isusedbtn);
      ///////////////////////////
      console.log(',,', this.buttonValueclickedd);
    }
  }

  pressclickedn() {
    if (this.currentPage < this.tot_pages) {
      this.currentPage++;
      this.generatePagination();
      console.log('..000000000000000000000000', this.isusedbtn);

      console.log(',,,', this.buttonValueclickedd);
    }
  }
}
