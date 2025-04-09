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

  constructor() {
    this.loadNotificationsFromStorage();
  }

  private loadNotificationsFromStorage() {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications);
        const notificationsWithDateObjects = parsedNotifications.map(
          (n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp),
          })
        );
        this.notificationsListSource.next(notificationsWithDateObjects);
        this.updateUnreadCount();
      } catch (error) {
        console.error('Error parsing saved notifications:', error);
        localStorage.removeItem('notifications');
      }
    }
  }

  private saveNotificationsToStorage() {
    localStorage.setItem(
      'notifications',
      JSON.stringify(this.notificationsListSource.value)
    );
  }

  showNotification(notification: Notification | string) {
    let notificationObj: Notification;

    if (typeof notification === 'string') {
      notificationObj = {
        id: this.generateId(),
        message: notification,
        type: 'info',
        duration: 3000,
        read: false,
        timestamp: new Date(),
      };
    } else {
      notificationObj = {
        id: this.generateId(),
        type: 'info',
        duration: 3000,
        read: false,
        timestamp: new Date(),
        ...notification,
      };
    }

    console.log(
      `NotificationService: ${notificationObj.message}`,
      notificationObj
    );

    this.notificationSource.next(notificationObj);

    const currentList = this.notificationsListSource.value;
    this.notificationsListSource.next([notificationObj, ...currentList]);

    this.saveNotificationsToStorage();

    this.updateUnreadCount();

    setTimeout(() => {
      this.clearPopupNotification();
    }, notificationObj.duration);
  }

  clearPopupNotification() {
    this.notificationSource.next(null);
  }

  markAllAsRead() {
    const updatedList = this.notificationsListSource.value.map(
      (notification) => ({
        ...notification,
        read: true,
      })
    );

    this.notificationsListSource.next(updatedList);
    this.saveNotificationsToStorage();
    this.updateUnreadCount();
  }

  markAsRead(id: string) {
    const updatedList = this.notificationsListSource.value.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );

    this.notificationsListSource.next(updatedList);
    this.saveNotificationsToStorage();
    this.updateUnreadCount();
  }

  clearAllNotifications() {
    this.notificationsListSource.next([]);
    localStorage.removeItem('notifications');
    this.updateUnreadCount();
  }

  private updateUnreadCount() {
    const unreadCount = this.notificationsListSource.value.filter(
      (n) => !n.read
    ).length;
    this.unreadCountSource.next(unreadCount);
  }

  private generateId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
