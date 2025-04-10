import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { WishService } from '../../services/wish.service';
import { Product } from '../../models/product.model';
import { forkJoin, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-wish-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  providers: [WishListComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit, OnDestroy {
  hoveredId: string | null = null;
  wishlist?: Product[];
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  private authSub!: Subscription;
  private subs = new Subscription();

  user: any;
  constructor(
    private router: Router,
    private wishListService: WishService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.authSub = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.user = this.authService.getUserId();
      if (loggedIn && this.user) {
        this.getWishList();
      } else {
        this.wishlist = [];
        this.cdr.markForCheck();
      }
    });
  }
  getWishList(): void {
    this.isLoading = true;
    this.wishListService.getAll(this.user).subscribe((data) => {
      this.wishlist = data.data.wishlist.products;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  goToDetails(product: Product): void {
    if (!product?._id) {
      console.error('Invalid product ID');
      return;
    }
    this.router.navigate(['/details', product._id]);
  }

  removeWish(product: string): void {
    this.wishListService.removeOne(this.user, product).subscribe((data) => {
      this.getWishList();
    });
  }

  removeAll(): void {
    this.wishListService.removeAll(this.user).subscribe((data) => {
      this.getWishList();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
