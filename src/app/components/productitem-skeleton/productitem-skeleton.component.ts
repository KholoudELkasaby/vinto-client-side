import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-productitem-skeleton',
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './productitem-skeleton.component.html',
  styleUrl: './productitem-skeleton.component.css',
})
export class ProductitemSkeletonComponent {}
