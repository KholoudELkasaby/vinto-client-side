import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  notificationDropDown = false;
  dropdownOpen = false;
  isSidebarOpen = false;
  isLoggedIn = true;
  private loginSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.loginSub = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  toggleNotifications() {
    this.notificationDropDown = !this.notificationDropDown;
  }
  closeNotifications() {
    this.notificationDropDown = false;
  }
  /////
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  ////
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }
  ////

  signOut() {
    this.authService.logout();
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const sidebarElement = document.querySelector('.sidebar');
    const menuIcon = document.querySelector('.hamburger-icon');
    const dropdown = document.querySelector('.relative .absolute');
    const userIcon = document.querySelector('.fa-circle-user');
    const notIcon = document.querySelector('.notification');

    // Close sidebar if clicked outside
    if (
      this.isSidebarOpen &&
      sidebarElement &&
      !sidebarElement.contains(event.target as Node) &&
      menuIcon &&
      !menuIcon.contains(event.target as Node)
    ) {
      this.isSidebarOpen = false;
    }

    // Close dropdown if clicked outside
    if (
      this.dropdownOpen &&
      dropdown &&
      !dropdown.contains(event.target as Node) &&
      userIcon &&
      !userIcon.contains(event.target as Node)
    ) {
      this.dropdownOpen = false;
    }

    // Close notifications dropdown if clicked outside
    if (
      this.notificationDropDown &&
      notIcon &&
      !notIcon.contains(event.target as Node)
    ) {
      this.notificationDropDown = false;
    }
  }

  /////////////
  flagSrc: string = '/Images/usa.svg';

  toggleFlag() {
    this.flagSrc =
      this.flagSrc === '/Images/usa.svg' ? '/Images/sa.svg' : '/Images/usa.svg';
  }
}
