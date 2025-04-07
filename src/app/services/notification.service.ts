import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  message: string;
  type?: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSource.asObservable();

  showNotification(message: string, type: NotificationType = 'info') {
    console.log(`NotificationService: ${message} (${type})`);
    this.notificationSource.next({ message, type });
    setTimeout(() => this.clearNotification(), 5000);
  }

  clearNotification() {
    this.notificationSource.next(null);
  }
}
