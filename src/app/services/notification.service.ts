import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification.model';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSource.asObservable();

  private notificationsListSource = new BehaviorSubject<Notification[]>([]);
  notificationsList$ = this.notificationsListSource.asObservable();

  private unreadCountSource = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSource.asObservable();

  showNotification(notification: Notification | string) {
    let notificationObj: Notification;

    if (typeof notification === 'string') {
      notificationObj = {
        id: this.generateId(),
        message: notification,
        type: 'info',
        duration: 3000,
        read: false,
        timestamp: new Date()
      };
    } else {
      notificationObj = {
        id: this.generateId(),
        type: 'info',
        duration: 3000,
        read: false,
        timestamp: new Date(),
        ...notification
      };
    }

    console.log(`NotificationService: ${notificationObj.message}`, notificationObj);

    // Update the popup notification
    this.notificationSource.next(notificationObj);

    // Add to notification list
    const currentList = this.notificationsListSource.value;
    this.notificationsListSource.next([notificationObj, ...currentList]);

    // Update unread count
    this.updateUnreadCount();

    // Auto-clear popup after duration
    setTimeout(() => {
      this.clearPopupNotification();
    }, notificationObj.duration);
  }

  clearPopupNotification() {
    this.notificationSource.next(null);
  }

  markAllAsRead() {
    const updatedList = this.notificationsListSource.value.map(notification => ({
      ...notification,
      read: true
    }));

    this.notificationsListSource.next(updatedList);
    this.updateUnreadCount();
  }

  markAsRead(id: string) {
    const updatedList = this.notificationsListSource.value.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );

    this.notificationsListSource.next(updatedList);
    this.updateUnreadCount();
  }

  clearAllNotifications() {
    this.notificationsListSource.next([]);
    this.updateUnreadCount();
  }

  private updateUnreadCount() {
    const unreadCount = this.notificationsListSource.value.filter(n => !n.read).length;
    this.unreadCountSource.next(unreadCount);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
