import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface RegisterResponse {
  status: string;
  message: string;
  token?: string;
  data?: {
    userId: string;
    email: string;
  };
}

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css',
})
export class VerifyOTPComponent implements OnInit {
  otpForm: FormGroup;
  isLoading = false;
  isResending = false;
  errorMessages: string[] = [];
  otpControls = [0, 1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // Assuming AuthService is imported correctly
  ) {
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit6: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    });
  }

  ngOnInit() {
    setTimeout(() => {
      const firstInput = document.querySelector('input') as HTMLInputElement;
      if (firstInput) firstInput.focus();
    }, 0);

    if (!localStorage.getItem('signupData')) {
      this.router.navigate(['/signup']);
    }
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1) {
      if (index < 5) {
        const nextInput = document.querySelector(
          `input[formControlName=digit${index + 2}]`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      if (!input.value && index > 0) {
        // Move to previous input
        const prevInput = document.querySelector(
          `input[formControlName=digit${index}]`
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          prevInput.value = '';
        }
      }
    }
  }

  goBack() {
    this.router.navigate(['/signup']);
  }

  verifyOTP() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.errorMessages = [];

      // Construct OTP from all digits
      const otp = Object.values(this.otpForm.value).join('');

      const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');
      if (!signupData.userId) {
        this.router.navigate(['/signup']);
        return;
      }

      this.http
        .post<{ status: string; message: string; token: string; data: any }>(
          'http://localhost:4000/api/auth/verify-otp',
          {
            userId: signupData.userId,
            otp: otp,
          }
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              // Store user data first
              localStorage.setItem(
                'userData',
                JSON.stringify({
                  userId: signupData.userId,
                  email: signupData.email,
                  username: signupData.username,
                  // Add any other user data from response.data
                  ...response.data,
                })
              );

              // Store token
              localStorage.setItem('token', response.token);

              // Clear signup data
              localStorage.removeItem('signupData');

              // Navigate to profile page
              this.router.navigate(['/profile']);
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessages = [
              error.error?.message || 'Failed to verify OTP. Please try again.',
            ];
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  resendOTP() {
    this.isResending = true;
    const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');

    if (signupData.userId) {
      this.http
        .post<RegisterResponse>('http://localhost:4000/api/auth/resend-otp', {
          userId: signupData.userId,
        })
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.errorMessages = ['Verification code has been resent'];
            }
          },
          error: (error) => {
            this.isResending = false;
            this.errorMessages = [
              error.error?.message || 'Failed to resend code',
            ];
          },
          complete: () => {
            this.isResending = false;
          },
        });
    }
  }
}
