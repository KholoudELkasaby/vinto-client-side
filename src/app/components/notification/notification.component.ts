import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationType } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      transition(':enter', [
        animate('300ms ease-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  notification: { message: string; type: NotificationType } | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification) => {
      if (notification) {
        this.notification = {
          message: notification.message,
          type: notification.type || 'info'
        };
      } else {
        this.notification = null;
      }
    });
  }

  dismiss() {
    this.notification = null;
  }
}
