import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavheaderComponent } from "../../components/navheader/navheader.component";

@Component({
  selector: 'signin',
  imports: [CommonModule, FormsModule, NavheaderComponent],
  template: `
    <navheader></navheader>

    <div class="form-wrapper">
      <h2>Sign In</h2>

      <form #signInForm="ngForm" (ngSubmit)="signIn()">
        <label>
          Enter your email:
          <input type="text" name="email" [(ngModel)]="email" required />
        </label>

        <label>
          Password:
          <input type="password" name="password" [(ngModel)]="password" required />
        </label>

        <button type="submit" [disabled]="signInForm.invalid">Sign In</button>

        <span 
          (click)="navigateToSignupForm()" 
          class="signup-link"
        >
          Haven't signed up? Sign up here
        </span>
      </form>
    </div>
  `,
  styles: [`
    .form-wrapper {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: #f7f7f7;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  
    h2 {
      margin-bottom: 2.5rem;
      text-align: center;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    label {
      display: flex;
      flex-direction: column;
      font-weight: 500;
    }
  
    input {
      padding: 0.75rem;
      margin-top: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }
  
    button {
      margin: 1rem 0;
      padding: 0.75rem;
      background-color: #3f51b5;
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
  
    button:hover:not(:disabled) {
      background-color: #2c3ea7;
    }
  
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .signup-link {
      color: #3f51b5;
      text-align: center;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 500;
    }
  `]
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  signIn() {
    this.authService.signIn(this.email, this.password)
      .then(() => {
        console.log('Signed in successfully');
        this.router.navigate(['/']); // or route to jobs list
      })
      .catch(error => {
        console.error('Sign-in failed:', error.message);
      });
  }

  navigateToSignupForm() {
    this.router.navigate(['/sign-up']);
  }
}
