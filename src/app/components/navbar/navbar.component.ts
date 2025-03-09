import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  notificationCount = 3;
  ///////////////////
  dropdownOpen = false;
  isLoggedIn = true;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    // const icon = document.querySelector('.dropdown-toggle-icon') as HTMLElement;
    // if (icon) {
    //   icon.classList.toggle('fa-bars', !this.dropdownOpen);
    //   icon.classList.toggle('fa-x', this.dropdownOpen);
    // }
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  signOut() {
    console.log('Signing out...');
    this.isLoggedIn = false;
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event) {
    const dropdown = document.querySelector('.relative .absolute');
    const dropdownContent = document.querySelector('.dropdown-content');
    const menuIcon = document.querySelector('.hamburger-icon');
    const userIcon = document.querySelector('.fa-circle-user');

    if (
      dropdown &&
      !dropdown.contains(event.target as Node) &&
      dropdownContent &&
      !dropdownContent.contains(event.target as Node) &&
      menuIcon &&
      !menuIcon.contains(event.target as Node) &&
      userIcon &&
      !userIcon.contains(event.target as Node)
    ) {
      this.dropdownOpen = false;
    }
  }

  /////////////
  flagSrc: string = '/Images/usa.svg';

  toggleFlag() {
    this.flagSrc =
      this.flagSrc === '/Images/usa.svg' ? '/Images/sa.svg' : '/Images/usa.svg';
  }
}
