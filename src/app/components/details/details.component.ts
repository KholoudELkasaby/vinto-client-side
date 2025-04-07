import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { DetailsInfoComponent } from './details-info/details-info.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { WishService } from '../../services/wish.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
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
  quantity: number = 1;
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSub = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserId();

      if (loggedIn && this.userId) {
        this.fetchProduct();
        this.fetchWishlist();
      } else {
        this.fetchProduct();
        this.wishlistItems = [];
        this.liked = false;
      }
    });


  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.products) {
      this.updateLikedState();
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
      },
      error: (err) => console.error('Error fetching wishlist:', err)
    });
  }

  updateLikedState() {
    if (this.userId && this.product) {
      this.liked = this.isInWishlist(this.product._id);
    }
  }

  toggleWish(userId: string, productId: string): void {
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
    this.wishService.addWish(id, productId).subscribe({});
  }
  removefromWish(id: string, productId: string): void {
    this.wishService.removeOne(id, productId).subscribe({});
  }


  selectImage(image: string): void {
    this.isFading = true;
    setTimeout(() => {
      this.selectedImage = image;
      this.isFading = false;
    }, 300);
  }


  toggleLike(): void {
    this.liked = !this.liked;
  }
}
