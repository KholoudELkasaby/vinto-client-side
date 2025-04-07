import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GenralService } from '../../services/genral.service';
import { UserProfile } from '../../models/userProfile.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnDestroy {
  notificationDropDown = false;
  dropdownOpen = false;
  isSidebarOpen = false;
  isLoggedIn = true;
  user: string = '67b87e4bee6c8c97157670ed';
  numOfItems: number = 0;
  // imagePreview: string | null = null;
  private loginSub!: Subscription;
  private profileSub!: Subscription;
  userProfile: UserProfile | null = null;
  profilePictureUrl: string = '';
  username: string = '';
  userId: string = '';
  private apiUrl = 'http://localhost:4000'; // Your API base URL
  // private userDataSub!: Subscription;
  // private cartCountSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient //private cartService: CartService, //private genral: GenralService
  ) {
    // this.cartCountSub = this.cartService.cartCount$.subscribe(
    //   count => {
    //     this.numOfItems = count;
    //     console.log('Cart count updated:', this.numOfItems);
    //   }
    // );
    // this.cartService.getCart(this.user).subscribe();
    console.log(this.numOfItems);
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    // this.subscribeToUserData();
    console.log('ngOnInit triggered');
    this.fetchUserProfile();

    this.profileSub = this.authService.profilePicture$.subscribe((pic) => {
      this.profilePictureUrl = pic || '';
    });
  }

  checkLoginStatus(): void {
    this.loginSub = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.userId = tokenPayload.id;
    if (!this.userId) {
      console.error('User ID not found in token');
      return;
    }

    this.http
      .get<{ status: string; data: UserProfile }>(
        `${this.apiUrl}/api/profile/${this.userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.userProfile = response.data;
            this.profilePictureUrl = this.getImageUrl(response.data.picture);
            this.username = response.data.firstName;

            console.log('User First Name:', this.userProfile.firstName);
            // Emit to AuthService
            this.authService.updateUserProfile(
              this.profilePictureUrl,
              this.username
            );
          }
        },
        error: (error) => {
          console.error('Failed to fetch profile', error);
        },
      });
  }

  getImageUrl(picture: string): string {
    if (!picture) return '';
    if (picture.startsWith('http') || picture.startsWith('data:image')) {
      return picture;
    }
    const fullUrl = `${this.apiUrl}${picture}`;
    return fullUrl;
  }

  // subscribeToUserData(): void {
  //   this.userDataSub = this.authService.user$.subscribe((userData) => {
  //     if (userData) {
  //       this.imagePreview = userData.picture || null; // Fetch picture from the userData
  //     } else {
  //       this.imagePreview = null;
  //     }
  //   });
  // }

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
    this.profileSub?.unsubscribe();
    // this.userDataSub?.unsubscribe();
    // this.cartCountSub?.unsubscribe();
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
