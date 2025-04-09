import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

interface LoginResponse {
  status: string;
  message: string;
  token?: string;
  data?: {
    _id: string;
    email: string;
    username: string;
    verified: boolean;
  };
  userId?: string;
}

interface ForgotPasswordResponse {
  status: string;
  message: string;
  resetToken?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessages: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.http
        .post<LoginResponse>(
          'http://localhost:4000/api/auth/login',
          this.loginForm.value
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              localStorage.setItem('token', response.token || '');
              localStorage.setItem(
                'userEmail',
                this.loginForm.get('email')?.value
              );
              if (!localStorage.getItem('userData')) {
                localStorage.setItem('userData', JSON.stringify(response.data)); // Store user data (including picture)
              }
              this.authService.login(response.token || ''); // No need to pass userData
              this.notificationService.showNotification({
                message: 'you Logged in Successfully!',
                type: 'success',
              });
              this.router.navigate(['/']);
            }
          },
          error: (error) => {
            this.isLoading = false;
            if (error.error?.userId) {
              // Store userId for verification if email not verified
              localStorage.setItem(
                'signupData',
                JSON.stringify({
                  userId: error.error.userId,
                  email: this.loginForm.get('email')?.value,
                })
              );
              this.router.navigate(['/verify-otp']);
            } else {
              this.errorMessages = [error.error?.message || 'Login failed'];
            }
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    const email = this.loginForm.get('email')?.value;

    if (!email) {
      this.errorMessages = ['Please enter your email address'];
      return;
    }

    this.isLoading = true;
    this.http
      .post<ForgotPasswordResponse>(
        'http://localhost:4000/api/auth/forgot-password',
        { email }
      )
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.errorMessages = [];
            alert('Password reset instructions sent to your email');
          }
        },
        error: (error) => {
          this.errorMessages = [
            error.error?.message || 'Failed to send reset email',
          ];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  getImageUrl(): string {
    return 'assets/images/signup.png';
  }
}
