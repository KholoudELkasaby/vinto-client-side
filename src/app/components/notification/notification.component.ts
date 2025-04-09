import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationType } from '../../models/notification.model';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        })
      ),
      transition(':enter', [
        animate(
          '300ms ease-out',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '250ms ease-in',
          style({
            opacity: 0,
            transform: 'translateX(100%)',
          })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notification: {
    id?: string;
    message: string;
    type: NotificationType;
    duration?: number;
  } | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification) => {
      if (notification) {
        this.notification = {
          id: notification.id,
          message: notification.message,
          type: notification.type || 'info',
          duration: notification.duration,
        };
      } else {
        this.notification = null;
      }
    });
  }

  dismiss() {
    if (this.notification?.id) {
      this.notificationService.markAsRead(this.notification.id);
    }
    this.notification = null;
  }
}
