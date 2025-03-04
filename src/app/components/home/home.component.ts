import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { TabsComponent } from './tabs/tabs.component';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CategoryComponent, TabsComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
