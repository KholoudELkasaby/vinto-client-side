import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-order-skeleton',
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './order-skeleton.component.html',
  styleUrl: './order-skeleton.component.css',
})
export class OrderSkeletonComponent {}
