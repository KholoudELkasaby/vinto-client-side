import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CategoryComponent, TabsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
