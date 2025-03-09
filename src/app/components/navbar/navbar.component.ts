import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  ///////////////////
  dropdownOpen = false;
  isLoggedIn = true;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
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
    const userIcon = document.querySelector('.fa-circle-user');

    if (
      dropdown &&
      !dropdown.contains(event.target as Node) &&
      userIcon &&
      !userIcon.contains(event.target as Node)
    ) {
      this.dropdownOpen = false;
    }
  }

  /////////////
  flagSrc: string = '/Images/us.svg';

  toggleFlag() {
    this.flagSrc =
      this.flagSrc === '/Images/us.svg' ? '/Images/eg.svg' : '/Images/us.svg';
  }
}
