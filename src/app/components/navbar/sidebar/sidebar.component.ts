import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnDestroy {
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Input() isLoggedIn: boolean = true;
  @Input() profilePictureUrl: string = '';
  @Input() username: string = '';
  @Output() signOut = new EventEmitter<void>();
  userEmail: string = '';
  private emailSub!: Subscription;
  private profileSub!: Subscription;
  private usernameSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.emailSub = this.authService.userEmail$.subscribe((email) => {
      this.userEmail = email || '';
      console.log('Sidebar received userEmail:', email);
    });

    this.profileSub = this.authService.profilePicture$.subscribe((pic) => {
      this.profilePictureUrl = pic || '';
    });

    this.usernameSub = this.authService.username$.subscribe((name) => {
      this.username = name || '';
    });
  }

  ngOnDestroy(): void {
    this.emailSub?.unsubscribe();
    this.profileSub?.unsubscribe();
    this.usernameSub?.unsubscribe();
  }
}
