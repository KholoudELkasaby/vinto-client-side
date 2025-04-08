import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  message: string;
  type?: NotificationType;
  duration?: number; // in milliseconds
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSource.asObservable();

  showNotification(notification: Notification | string) {
    let notificationObj: Notification;

    if (typeof notification === 'string') {
      notificationObj = {
        message: notification,
        type: 'info',
        duration: 3000
      };
    } else {
      notificationObj = {
        type: 'info',
        duration: 3000,
        ...notification
      };
    }

    console.log(`NotificationService: ${notificationObj.message}`, notificationObj);
    this.notificationSource.next(notificationObj);

    setTimeout(() => this.clearNotification(), notificationObj.duration);
  }

  clearNotification() {
    this.notificationSource.next(null);
  }
}
