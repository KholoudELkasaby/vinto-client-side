import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div *ngIf="!isSuccess" class="min-h-screen flex flex-col bg-white">
      <div class="px-6 mt-6">
        <a routerLink="/login" class="text-black">
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

      <div class="flex flex-col items-center px-4">
        <h1 class="text-2xl font-medium mb-8">Create New Password</h1>

        <div
          class="w-20 h-20 bg-[#CD853F] rounded-lg flex items-center justify-center mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
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

        <p class="text-center mb-8">please Enter a New Password</p>

        <div class="w-full max-w-[400px]">
          <form
            [formGroup]="resetForm"
            (ngSubmit)="onSubmit()"
            class="space-y-4"
          >
            <div>
              <label class="block text-sm mb-1">New Password</label>
              <input
                type="password"
                formControlName="newPassword"
                class="w-full h-[52px] px-4 border border-[#E5E5E5] rounded focus:outline-none"
                placeholder="Enter Your Password"
              />
            </div>

            <div>
              <label class="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                formControlName="confirmPassword"
                class="w-full h-[52px] px-4 border border-[#E5E5E5] rounded focus:outline-none"
                placeholder="Confirm Your Password"
              />
            </div>

            <button
              type="submit"
              class="w-full h-[52px] bg-black text-white rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

    <div
      *ngIf="isSuccess"
      class="min-h-screen flex items-center justify-center bg-white"
    >
      <div class="text-center">
        <div class="mb-6">
          <svg class="mx-auto w-20 h-20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="black" stroke-width="2" />
            <path
              d="M7 13l3 3 7-7"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="text-xl">Your Password Has Been Changed Successfully</h2>
      </div>
    </div>
  `,
  styles: [
    `
      input::placeholder {
        color: #9ca3af;
      }
    `,
  ],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isSuccess = false;
  token: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const { newPassword, confirmPassword } = this.resetForm.value;

      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      this.http
        .patch<{ status: string; message: string; token: string }>(
          `http://localhost:4000/api/auth/reset-password/${this.token}`,
          {
            password: newPassword,
            confirmPassword: confirmPassword,
          }
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              if (response.token) {
                localStorage.setItem('token', response.token);
              }
              this.isSuccess = true;
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            }
          },
          error: (error) => {
            this.errorMessage = error.error.message || 'Password reset failed';
            console.error('Password reset failed:', error);
          },
        });
    }
  }
}
