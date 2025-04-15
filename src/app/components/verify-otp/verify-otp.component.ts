import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
})
export class VerifyOTPComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otpForm: FormGroup;
  isLoading = false;
  isResending = false;
  errorMessages: string[] = [];
  otpControls = [0, 1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    // Create form controls for each digit
    const group: { [key: string]: any } = {};
    this.otpControls.forEach((_, i) => {
      group[`digit${i + 1}`] = [
        '',
        [Validators.required, Validators.pattern(/^[0-9]$/)],
      ];
    });
    this.otpForm = this.fb.group(group);
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

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const previousInput = this.otpInputs.get(index - 1)?.nativeElement;
    const nextInput = this.otpInputs.get(index + 1)?.nativeElement;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (previousInput) {
          previousInput.focus();
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (nextInput) {
          nextInput.focus();
        }
        break;
      case 'Backspace':
        if (!input.value && previousInput) {
          previousInput.focus();
          previousInput.value = '';
          this.otpForm.get(`digit${index}`)?.setValue('');
        }
        break;
      default:
        // Allow only numbers
        if (
          !/^[0-9]$/.test(event.key) &&
          !['Tab', 'Delete', 'Backspace'].includes(event.key)
        ) {
          event.preventDefault();
        }
    }
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const nextInput = this.otpInputs.get(index + 1)?.nativeElement;
    const value = input.value;

    // Ensure single digit
    if (value.length > 1) {
      input.value = value.slice(-1);
    }

    // Move to next input if available
    if (value && nextInput) {
      nextInput.focus();
    }

    // Update form control
    this.otpForm.get(`digit${index + 1}`)?.setValue(input.value);
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData
      ?.getData('text')
      ?.replace(/\D/g, '')
      .slice(0, 6);

    if (pastedData) {
      [...pastedData].forEach((digit, i) => {
        const control = this.otpForm.get(`digit${i + 1}`);
        if (control) {
          control.setValue(digit);
          const input = this.otpInputs.get(i)?.nativeElement;
          if (input) {
            input.value = digit;
          }
        }
      });

      // Focus last filled input or next empty one
      const lastIndex = Math.min(pastedData.length, 6);
      const nextEmptyIndex = this.otpInputs
        .toArray()
        .findIndex((el, i) => i >= lastIndex && !el.nativeElement.value);

      if (nextEmptyIndex !== -1) {
        this.otpInputs.get(nextEmptyIndex)?.nativeElement.focus();
      } else {
        this.otpInputs.get(lastIndex - 1)?.nativeElement.focus();
      }
    }
  }

  verifyOTP() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otp = Object.values(this.otpForm.value).join('');

      const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');
      if (!signupData.userId) {
        this.router.navigate(['/signup']);
        return;
      }

      this.http
        .post<{ status: string; message: string; token: string; data: any }>(
          'https://vinto-ecommerce-api-production.up.railway.app/api/auth/verify-otp',
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
        .post<RegisterResponse>('https://vinto-ecommerce-api-production.up.railway.app/api/auth/resend-otp', {
          userId: signupData.userId,
        })
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.errorMessages = ['Verification code has been resent'];
            }
          },
          error: (error) => {
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

  goBack() {
    this.router.navigate(['/signup']);
  }
}
