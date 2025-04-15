import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      // Server error (500)
      if (error.status === 500) {
        console.error('Server error:', error.message);
        this.router.navigate(['/fail']);
      }
    } else {
      // Handle other errors
      this.router.navigate(['/fail']);
    }
  }
}
