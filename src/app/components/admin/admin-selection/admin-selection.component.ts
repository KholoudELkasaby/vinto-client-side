import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminSelectSideComponent } from './admin-select-side/admin-select-side.component';
import { AdminSelectNavComponent } from './admin-select-nav/admin-select-nav.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { OrderedItemsService } from '../../../services/ordered-items.service';
import { ShipingInfoService } from '../../../services/shiping-info.service';
import { CategoryService } from '../../../services/category.service';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-admin-selection',
  imports: [
    AdminSelectSideComponent,
    AdminSelectNavComponent,
    RouterModule,
    ConfirmationModalComponent,
  ],
  providers: [
    CartService,
    ProductService,
    OrderedItemsService,
    ShipingInfoService,
    CartService,
  ],
  templateUrl: './admin-selection.component.html',
  styleUrl: './admin-selection.component.css',
})
export class AdminSelectionComponent {
  model: string = '';
  items: any = [];
  displayedItems: any = [];
  routeSub!: Subscription;
  selectAll: boolean = false;
  keyword: string = '';
  selectedItems: boolean[] = [];
  showDeleteModal = false;
  itemToDelete: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private orderedItemsService: OrderedItemsService,
    private shipingInfoService: ShipingInfoService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSub = this.activedRoute.params.subscribe((p) => {
      this.model = p['model'];
      this.fetchData();
    });

    this.activedRoute.queryParams.subscribe((qParams) => {
      this.keyword = qParams['q']?.toLowerCase() || '';
      if (this.items.length > 0) {
        this.performSearch(this.keyword);
      }
    });
    console.log(this.keyword);
  }

  fetchData() {
    if (this.model != '') {
      switch (this.model.toLowerCase()) {
        case 'product':
          this.items = [];
          this.productService.getAllProducts().subscribe((data) => {
            this.items = data.map((item) => ({
              id: item._id,
              title: item.title,
            }));
            this.displayedItems = this.items;
            this.selectedItems = new Array(this.displayedItems.length).fill(
              false
            );
          });
          break;
        case 'cart':
          this.items = [];
          this.cartService.getAllCarts().subscribe((data) => {
            this.items = data.map((item) => ({ id: item.product._id }));
            this.displayedItems = this.items;
            this.selectedItems = new Array(this.displayedItems.length).fill(
              false
            );
          });
          break;
        case 'itemordered':
          this.items = [];
          this.orderedItemsService.getAllitemOrdered().subscribe((data) => {
            this.items = data.map((item) => ({ id: item._id }));
            this.displayedItems = this.items;
            this.selectedItems = new Array(this.displayedItems.length).fill(
              false
            );
          });
          break;
        case 'category':
          this.items = [];
          this.categoryService.getAllCategories().subscribe((data) => {
            this.items = data.map((item) => ({ id: item._id }));
            this.displayedItems = this.items;
            this.selectedItems = new Array(this.displayedItems.length).fill(
              false
            );
          });
          break;
        case 'shipinginfo':
          this.items = [];
          this.shipingInfoService.getAllShipingInfo().subscribe((data) => {
            this.items = data.map((item) => ({ id: item._id }));
            this.displayedItems = this.items;
            this.selectedItems = new Array(this.displayedItems.length).fill(
              false
            );
          });
          break;
      }
    }
  }

  toggleAllCheckboxes() {
    this.selectAll = !this.selectAll;
    this.selectedItems = this.selectedItems.map(() => this.selectAll);
  }

  updateSelectAllState() {
    this.selectAll = this.selectedItems.every((value) => value === true);
  }

  performSearch(keyword: string) {
    this.displayedItems = this.items.filter(
      (item: { title?: string; id?: string }) => {
        if (item.title) {
          item.title.toLowerCase().includes(keyword.toLowerCase());
        } else if (item.id) {
          item.id.toLowerCase().includes(keyword.toLowerCase());
        }
      }
    );
  }
  getSelectedCount(): number {
    return this.selectedItems.filter((item) => item).length;
  }
  confirmDelete() {
    this.showDeleteModal = true;
  }
  handleDeleteConfirmation(confirmed: boolean) {
    this.showDeleteModal = false;
    if (confirmed) {
      this.deleteSelectedItems();
    }
  }
  private deleteSelectedItems() {
    const indexes = this.selectedItems
      .map((selected, index) => (selected ? index : -1))
      .filter((index) => index !== -1);

    indexes
      .sort((a, b) => b - a)
      .forEach((index) => {
        const itemId = this.items[index];
        this.items.splice(index, 1);
      });

    this.selectedItems = new Array(this.items.length).fill(false);
    this.selectAll = false;
  }
}
