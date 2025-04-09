import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-category',
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  @Output() Category = new EventEmitter<void>();
  categories: Category[] = [];
  isLoading: boolean = true;
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data.categories;
        console.log('Fetched Categories:', this.categories);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.isLoading = false;
      },
    });
  }
}
