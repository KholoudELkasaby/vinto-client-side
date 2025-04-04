import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetailsInfoComponent } from './details-info/details-info.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, DetailsInfoComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  product!: Product;
  images: string[] = [];
  selectedImage: string = '';
  isFavorite: boolean = false;
  isFading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
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
