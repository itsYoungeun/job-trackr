import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavheaderComponent } from '../../components/navheader/navheader.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'signup',
  standalone: true,
  imports: [CommonModule, FormsModule, NavheaderComponent],
  template: `
    <navheader></navheader>

    <div class="form-wrapper">
      <h2>Sign Up</h2>

      <form #signUpForm="ngForm" (ngSubmit)="signUp()">
        <label>
          Email:
          <input
            type="email"
            name="email"
            [(ngModel)]="email"
            required
            #emailInput="ngModel"
          />
          <span class="error" *ngIf="emailTaken">{{ emailTaken }}</span>
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            [(ngModel)]="password"
            required
            minlength="6"
            #passwordInput="ngModel"
          />
          <span class="error" *ngIf="passwordInput.invalid && passwordInput.touched">
            Password must be at least 6 characters.
          </span>
        </label>

        <button type="submit" [disabled]="signUpForm.invalid">Create Account</button>
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

    .error {
      color: #d9534f;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    button {
      margin-top: 1rem;
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
  `]
})
export class SignupComponent {
  email = '';
  password = '';
  emailTaken: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signUp() {
    this.emailTaken = null;

    this.authService.signUp(this.email, this.password)
      .then(() => {
        this.toastr.success('Successfully signed up!');
        this.router.navigate(['/']);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.emailTaken = 'Email is already taken.';
        } else if (error.code === 'auth/invalid-email') {
          this.emailTaken = 'Invalid email address.';
        } else {
          this.toastr.error('Failed to sign up');
        }
      });
  }
}