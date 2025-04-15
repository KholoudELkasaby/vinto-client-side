import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-product-item-skeleton',
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './product-item-skeleton.component.html',
  styleUrl: './product-item-skeleton.component.css',
})
export class ProductItemSkeletonComponent {}
