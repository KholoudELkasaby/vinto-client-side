import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  @Output() activeTabChange = new EventEmitter<string>();
  activeTab: string = 'New Arrivals';

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
  }
}
