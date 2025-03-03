import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
