import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navheader',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="navbar-container">
      <div class="nav-header">
        <span class="home-button" (click)="navigateToHome()">Job Trackr</span>

        <ng-container *ngIf="isHomePage">
          <span
            class="signin-button"
            *ngIf="!isLoggedIn"
            (click)="navigateToSignin()"
          >
            Sign In
          </span>
          <span
            class="signin-button"
            *ngIf="isLoggedIn"
            (click)="logout()"
          >
            Sign Out
          </span>
        </ng-container>
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
  isOnSignUpPage = false;
  isHomePage = false;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.isOnSignInPage = currentUrl === '/sign-in';
        this.isOnSignUpPage = currentUrl === '/sign-up';
        this.isHomePage = currentUrl === '/';
      });

    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    })
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToSignin() {
    this.router.navigate(['/sign-in']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['']).then(() => {
        location.reload();
      });
    });
  }
}
