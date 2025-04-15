import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    NavbarComponent,
    RouterOutlet,
    CommonModule,
    FooterComponent,
    NotificationComponent,
  ],
})
export class AppComponent {
  title = 'vinto-client-side';
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = [
          '/login',
          '/signup',
          '/shipments',
          '/forgot-password',
          '/reset-password',
          '/verify-otp',
        ];
        this.showNavbar = !hiddenRoutes.some((route) =>
          event.urlAfterRedirects.includes(route)
        );
      });
  }
}
