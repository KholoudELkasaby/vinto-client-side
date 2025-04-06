// src/app/components/notification/notification.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,  // Since you're using standalone component
  imports: [CommonModule],  // Add CommonModule here
})
export class NotificationComponent {
  message: string = '';
  showNotification: boolean = false;

  showNotificationMessage(message: string) {
    this.message = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);  // Hide after 3 seconds
  }
}
