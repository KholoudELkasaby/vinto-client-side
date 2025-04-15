import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-oreder-item',
  imports: [],
  templateUrl: './oreder-item.component.html',
  styleUrl: './oreder-item.component.css'
})
export class OrederItemComponent {
  @Input() cart: any;
  @Output() statusSelected = new EventEmitter<string>();
  selectedStatus: string | null = null;
  constructor(
    private notificationService: NotificationService
  ) { }

  onStatusSelected(status: string): void {
    this.selectedStatus = status;
  }
  onItemClick(): void {
    if (this.cart.status !== 'canceled') {
      this.statusSelected.emit(this.cart.status);
    } else {
      this.notificationService.showNotification({
        message: 'Order have been canceled',
        type: 'error', // or 'info', 'error', based on your style
      });
    }
  }
}
