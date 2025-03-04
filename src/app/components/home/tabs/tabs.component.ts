import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  activeTab: string = 'New Arrivals';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
