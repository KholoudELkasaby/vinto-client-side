
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<string | null>(null);
  notification$ = this.notificationSource.asObservable();

  showNotification(message: string) {
    console.log(`NotificationService: ${message}`); // Log the message to the console
    this.notificationSource.next(message);
    setTimeout(() => this.clearNotification(), 3000); // Notification disappears after 3 seconds
  }

  clearNotification() {
    this.notificationSource.next(null);
  }
}
