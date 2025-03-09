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
    if (!(event.target as HTMLElement).closest('.relative')) {
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
