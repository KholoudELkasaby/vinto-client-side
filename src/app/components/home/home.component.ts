import { Component, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { TabsComponent } from './tabs/tabs.component';
import { CardComponent } from './card/card.component';
import { ViewBtnComponent } from './view-btn/view-btn.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CategoryComponent,
    TabsComponent,
    CardComponent,
    ViewBtnComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activeTab: string = 'New Arrivals';
  @ViewChild('tabsSection') tabsSection!: ElementRef;
  @ViewChild('cardSection') cardSection!: ElementRef;

  Category() {
    this.cardSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  Explore() {
    this.tabsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  updateActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
