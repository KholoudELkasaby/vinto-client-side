import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex flex-col bg-white">
      <div class="flex flex-col items-center px-4">
        <h1 class="text-2xl font-medium mb-8">Change Password</h1>

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

        <div class="w-full max-w-[400px]">
          <div *ngIf="errorMessage" class="mb-4 text-center">
            <p class="text-red-500 text-sm">{{ errorMessage }}</p>
          </div>

          <form
            [formGroup]="changePasswordForm"
            (ngSubmit)="onSubmit()"
            class="space-y-4"
          >
            <div>
              <label class="block text-sm mb-1">Current Password</label>
              <input
                type="password"
                formControlName="oldPassword"
                class="w-full h-[52px] px-4 border border-[#E5E5E5] rounded focus:outline-none"
                placeholder="Enter Current Password"
              />
            </div>

            <div>
              <label class="block text-sm mb-1">New Password</label>
              <input
                type="password"
                formControlName="newPassword"
                class="w-full h-[52px] px-4 border border-[#E5E5E5] rounded focus:outline-none"
                placeholder="Enter New Password"
              />
            </div>

            <div>
              <label class="block text-sm mb-1">Confirm New Password</label>
              <input
                type="password"
                formControlName="confirmPassword"
                class="w-full h-[52px] px-4 border border-[#E5E5E5] rounded focus:outline-none"
                placeholder="Confirm New Password"
              />
            </div>

            <button
              type="submit"
              [disabled]="isLoading"
              class="w-full h-[52px] bg-black text-white rounded disabled:opacity-50"
            >
              {{ isLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <div
      *ngIf="isSuccess"
      class="fixed inset-0 flex items-center justify-center bg-white"
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
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  isSuccess = false;
  isLoading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } =
        this.changePasswordForm.value;

      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.id;

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .patch<{ status: string; message: string }>(
          `http://localhost:4000/api/auth/update-password/${userId}`,
          {
            oldPassword,
            newPassword,
            confirmPassword,
          },
          { headers }
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.isSuccess = true;
              setTimeout(() => {
                this.router.navigate(['/profile/details']);
              }, 2000);
            }
          },
          error: (error) => {
            this.isLoading = false;
            if (error.status === 401) {
              this.errorMessage = 'Current password is incorrect';
            } else {
              this.errorMessage =
                error.error?.message || 'Password change failed';
            }
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      this.errorMessage = 'Please fill all required fields';
    }
  }
}
