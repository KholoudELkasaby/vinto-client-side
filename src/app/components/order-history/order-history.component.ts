import { Component, HostListener, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { OrederItemComponent } from './oreder-item/oreder-item.component';
import { ProgressComponent } from '../progress/progress.component';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, OrederItemComponent, ProgressComponent],
  providers: [CartService],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  cartService: CartService = inject(CartService);
  tabs: string[] = ['All orders', 'Summary', 'Completed', 'Cancelled', 'inprogress'];
  activeTab: string = 'All orders';
  isMenuOpen = false;
  history: any = { data: { carts: [] } };
  historyDisplayed: any[] = [];
  selectedStatus: string | null = null;


  constructor() {
    this.loadData();
  }

  private loadData() {
    this.cartService.getHistory("67b87e4bee6c8c97157670ed").subscribe({
      next: (data) => {
        this.history = data;
        this.historyDisplayed = this.cartService.filterHistory(this.activeTab);
      },
      error: (err) => {
        console.error("Error fetching the history:", err);
      }
    });
  }

  onStatusSelected(status: string): void {
    this.selectedStatus = status;
  }

  filterData(tab: string) {
    this.activeTab = tab;
    this.historyDisplayed = this.cartService.filterHistory(tab);
    console.log('Filtered data for tab', tab, ':', this.historyDisplayed);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filterData(tab);
  }
}
