import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Input() isLoggedIn: boolean = true;
  @Input() profilePictureUrl: string = '';
  @Input() username: string = '';
  @Output() signOut = new EventEmitter<void>();

  userEmail = localStorage.getItem('userEmail');
}
