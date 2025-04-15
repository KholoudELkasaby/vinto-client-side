import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { OrederItemComponent } from './oreder-item/oreder-item.component';
import { ProgressComponent } from '../progress/progress.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, OrederItemComponent, ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CartService],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  cartService: CartService = inject(CartService);
  tabs: string[] = [
    'all orders',
    'summary',
    'completed',
    'canceled',
    'inprogress',
  ];
  activeTab: string = 'all orders';
  isMenuOpen = false;
  history: any = { data: { carts: [] } };
  historyDisplayed: any[] = [];
  selectedStatus: string | null = null;
  cartId: string = '';
  date: string = '';
  user: any;
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;

  constructor(
    private authService: AuthService,
    private stripeService: StripeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authSub = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.user = this.authService.getUserId();
      if (loggedIn && this.user) {
        this.loadData();
      }
    });
  }

  private loadData() {
    this.cartService.getHistory(this.user).subscribe({
      next: (data) => {
        console.log('history', data);
        this.history = data;
        this.historyDisplayed = this.cartService.filterHistory(this.activeTab);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching the history:', err);
      },
    });
  }

  onStatusSelected(status: string, id: string): void {
    this.selectedStatus = status;
    this.cartId = id;
  }

  filterData(tab: string) {
    this.activeTab = tab;
    this.historyDisplayed = this.cartService.filterHistory(tab);
    console.log('Filtered data for tab', tab, ':', this.historyDisplayed);
    this.cdr.markForCheck();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filterData(tab);
  }

  cancelOrder(cart: any) {
    this.stripeService.cancel(this.user, cart.cartId);
    this.cdr.markForCheck();
  }
}
