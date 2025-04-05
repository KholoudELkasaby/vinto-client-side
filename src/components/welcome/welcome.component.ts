import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
      <h1>Welcome!</h1>
      <p>You have successfully logged in.</p>
    </div>
  `,
  styles: [
    `
      .welcome-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
    `,
  ],
})
export class WelcomeComponent {}
