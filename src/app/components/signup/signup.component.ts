import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

interface AuthResponse {
  status: string;
  message: string;
  data?: {
    userId: string;
    email: string;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessages: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        gender: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  getErrorMessage(controlName: string): string[] {
    const control = this.signupForm.get(controlName);
    const messages: string[] = [];

    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        messages.push(`${controlName} is required`);
      }
      if (control.errors['email']) {
        messages.push('Please enter a valid email');
      }
      if (control.errors['minlength']) {
        messages.push(
          `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`
        );
      }
      if (control.errors['pattern'] && controlName === 'password') {
        messages.push(
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        );
      }
      if (control.errors['mismatch']) {
        messages.push('Passwords do not match');
      }
    }
    return messages;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;

      const signupData = {
        email: this.signupForm.get('email')?.value,
        username: this.signupForm.get('username')?.value,
        password: this.signupForm.get('password')?.value,
        confirmPassword: this.signupForm.get('confirmPassword')?.value,
        role: 'user',
      };

      this.http
        .post<AuthResponse>(
          'http://localhost:4000/api/auth/register',
          signupData
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'success' && response.data) {
              // localStorage.setItem(
              //   'signupData',
              //   JSON.stringify({
              //     ...this.signupForm.value,
              //     userId: response.data.userId,
              //   })
              // );

              this.router.navigate(['/profile']);
            }
          },
          error: (error) => {
            this.isLoading = false;
            if (
              error.error?.code === 11000 ||
              error.error?.message?.includes('duplicate key error')
            ) {
              this.errorMessages = ['This email is already registered'];
            } else {
              this.errorMessages = [
                error.error?.message || 'Failed to send verification email',
              ];
            }
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      Object.keys(this.signupForm.controls).forEach((key) => {
        const control = this.signupForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  resendOTP() {
    const userId = localStorage.getItem('tempUserId');
    if (userId) {
      this.http
        .post<AuthResponse>('http://localhost:4000/api/auth/resend-otp', {
          userId,
        })
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.errorMessages = ['OTP has been resent to your email'];
            }
          },
          error: (error) => {
            this.errorMessages = [
              error.error?.message || 'Failed to resend OTP',
            ];
          },
        });
    }
  }

  getImageUrl(): string {
    return '../../assets/images/signup.png';
  }

  getBackgroundImageUrl(): string {
    return '../../assets/images/Signup.png';
  }
}
