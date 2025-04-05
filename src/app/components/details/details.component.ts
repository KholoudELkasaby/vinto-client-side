import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetailsInfoComponent } from './details-info/details-info.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { WishService } from '../../services/wish.service';

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
  isFavorite: boolean = false;
  isFading = false;
  userId = "67b87e4bee6c8c97157670ed";
  quantity: number = 1;
  inWishlist: boolean = false;
  wishlistItems: any[] = [];
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private wishService: WishService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
        this.images = data.img;
        this.selectedImage = data.img[0]; // Set first image as default
      });
    }
  }



  toggleWish(userId: string, productId: string): void {
    this.wishService.getAll(userId).subscribe({
      next: (response) => {
        const wishlist = response.data.wishlist;
        this.wishlistItems = wishlist.products;

        const exists = this.wishlistItems.some(item => item._id === productId);

        if (exists) {
          this.removefromWish(userId, productId);
        } else {
          this.addToWish(userId, productId);
        }
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }
  addToWish(id: string, productId: string): void {
    this.wishService.addWish(id, productId).subscribe({})
  }
  removefromWish(id: string, productId: string): void {
    this.wishService.removeOne(id, productId).subscribe({})
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistItems.some(item => item.product._id === productId);
  }


  selectImage(image: string): void {
    this.isFading = true;
    setTimeout(() => {
      this.selectedImage = image;
      this.isFading = false;
    }, 300);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
