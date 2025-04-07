import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navheader',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="navbar-container">
      <div class="nav-header">
        <span class="home-button" (click)="navigateToHome()">Job Trackr</span>
        <span 
          class="signin-button" 
          (click)="navigateToSignin()"
          *ngIf="!isOnSignInPage"
        >
          Sign In
        </span>
      </div>
    </div>
  `,
  styles: [`
    .navbar-container {
      padding: 1rem;
      width: 100%;
      box-sizing: border-box;
    }

    .nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .home-button {
      cursor: pointer;
      font-size: 1.8rem;
      font-weight: bold;
      transition: color 0.2s ease;
    }

    .home-button:hover {
      color: #3f51b5;
    }

    .signin-button {
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
      transition: color 0.2s ease;
    }

    .signin-button:hover {
      color: #3f51b5;
    }
  `]
})
export class NavheaderComponent {
  isOnSignInPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isOnSignInPage = this.router.url === '/sign-in';
    });
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
