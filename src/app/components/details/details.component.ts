import { CommonModule } from '@angular/common';
import {
  Component,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DetailsInfoComponent } from './details-info/details-info.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { WishService } from '../../services/wish.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DetailsInfoComponent, RouterModule],
  providers: [WishService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  product!: Product;
  images: string[] = [];
  selectedImage: string = '';
  isFading = false;
  userId: any;

  inWishlist: boolean = false;
  wishlistItems: any[] = [];
  products: Product[] = [];
  private authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  private authSub!: Subscription;
  liked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private wishService: WishService,
    private authService: AuthService,
    private location: Location,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserId();

      if (loggedIn && this.userId) {
        this.fetchProduct();
        this.fetchWishlist();
        this.cdr.markForCheck();
      } else {
        this.fetchProduct();
        this.wishlistItems = [];
        this.liked = false;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.products) {
      this.updateLikedState();
      this.cdr.markForCheck();
    }
  }

  fetchProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
        this.images = data.img;
        this.selectedImage = data.img[0]; // Set first image as default
      });
    }
  }
  fetchWishlist() {
    this.wishService.getAll(this.userId).subscribe({
      next: (response) => {
        this.wishlistItems = response.data.wishlist.products;
        this.updateLikedState();
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error fetching wishlist:', err),
    });
  }

  handleWishToggle(event: Event): void {
    event.stopPropagation();

    if (!this.isLoggedIn) {
      this.notificationService.showNotification({
        message: 'Please log in to add items to your wishlist.',
        type: 'warning',
      });
      return;
    }

    this.toggleWish(this.userId, this.product._id);
    this.toggleLike(); // toggle only if logged in
  }

  updateLikedState() {
    if (this.userId && this.product) {
      this.liked = this.isInWishlist(this.product._id);
    }
  }

  toggleWish(userId: string, productId: string): void {
    if (!this.isLoggedIn) {
      this.notificationService.showNotification({
        message: 'Please log in to add items to your Wishlist.',
        type: 'warning',
      });
      return;
    }
    this.wishService.getAll(userId).subscribe({
      next: (response) => {
        const wishlist = response.data.wishlist;
        this.wishlistItems = wishlist.products;
        const exists = this.wishlistItems.some(
          (item) => item._id === productId
        );

        if (exists) {
          this.removefromWish(userId, productId);
        } else {
          this.addToWish(userId, productId);
        }
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      },
    });
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistItems.some((item) => item._id === productId); // Use item._id
  }
  addToWish(id: string, productId: string): void {
    this.wishService.addWish(id, productId).subscribe({
      next: () => {
        this.notificationService.showNotification({
          message: 'added to Wishlist Successfully!',
          type: 'success',
        });
        this.liked = true;
      },
      error: () => {
        this.notificationService.showNotification({
          message: 'Failed adding to Wishlist.',
          type: 'error',
        });
      },
    });
  }
  removefromWish(id: string, productId: string): void {
    this.wishService.removeOne(id, productId).subscribe({
      next: () => {
        this.notificationService.showNotification({
          message: 'removed from Wishlist Successfully!',
          type: 'success',
        });
        this.liked = false;
      },
      error: () => {
        this.notificationService.showNotification({
          message: 'Failed to remove item from Wishlist.',
          type: 'error',
        });
      },
    });
  }

  selectImage(image: string): void {
    this.isFading = true;
    setTimeout(() => {
      this.selectedImage = image;
      this.isFading = false;
      this.cdr.markForCheck(); // Mark for check after the image change
    }, 300);
  }

  toggleLike(): void {
    this.liked = !this.liked;
  }

  goBack(): void {
    this.location.back();
  }
}
