import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white flex flex-col">
      <!-- Back Button -->
      <div class="p-4">
        <a routerLink="/login" class="text-black hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </a>
      </div>

      <div class="flex-grow flex flex-col items-center px-4">
        <h1 class="text-2xl font-semibold mb-8">Forgot Password</h1>

        <div class="w-full max-w-md">
          <div class="flex justify-center mb-6">
            <div
              class="w-24 h-24 bg-[#CD853F] rounded-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <p class="text-center mb-6">
            Please Enter Your Email Address To Receive a Verification Code
          </p>

          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                formControlName="email"
                class="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                placeholder="Enter Your Email"
              />
            </div>

            <div *ngIf="errorMessages.length > 0" class="mb-4">
              <p
                *ngFor="let message of errorMessages"
                class="text-red-500 text-sm"
              >
                {{ message }}
              </p>
            </div>

            <button
              type="submit"
              [disabled]="!forgotPasswordForm.valid || isLoading"
              class="w-full bg-black text-white p-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Sending...' : 'Send' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (!this.forgotPasswordForm.valid) {
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.get('email')?.value;

    this.http
      .post<{ status: string; message: string; resetToken: string }>(
        'https://vinto-ecommerce-api-production.up.railway.app/api/auth/forgot-password',
        { email }
      )
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.errorMessages = [
              'Password reset instructions sent to your email',
            ];
            localStorage.setItem('resetToken', response.resetToken);
            setTimeout(() => {
              this.router.navigate(['/reset-password', response.resetToken]);
            }, 2000);
          }
        },
        error: (error) => {
          if (error.error?.message) {
            this.errorMessages = [error.error.message];
          } else {
            this.errorMessages = ['Failed to send reset email'];
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
