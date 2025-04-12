import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { IconModule } from '../../shared/icon.module';

@Component({
  selector: 'navheader',
  standalone: true,
  imports: [RouterModule, CommonModule, IconModule],
  template: `
    <div class="navbar-container">
      <div class="nav-header">
        <div class="nav-left" (click)="navigateToHome()">
          <span class="home-button">Job Trackr</span>
        </div>

        <div class="nav-right" *ngIf="isHomePage">
          <div *ngIf="isLoggedIn" class="signin-wrapper">
            <div class="avatar-circle" (click)="navigateToProfile()"></div>
            <span class="signin-button" (click)="logout()">Sign Out</span>
          </div>

          <div *ngIf="!isLoggedIn" class="signin-wrapper" (click)="navigateToSignin()">
            <lucide-icon name="circle-user" class="my-icon"></lucide-icon>
            <span class="signin-button">Sign In</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .navbar-container {
      width: 100%;
      background-color: #f8f9fa;
    }

    .nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 3.5rem;
      margin: 0 auto;
      max-width: 1600px;
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .home-button {
      font-size: 1.8rem;
      font-weight: bold;
      transition: color 0.2s ease;
    }

    .home-button:hover {
      color: #3f51b5;
    }

    .signin-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    ::ng-deep .my-icon svg {
      width: 2rem;
      height: 2rem;
    }

    .nav-right .signin-button {
      cursor: pointer;
      font-size: 1.4rem;
      font-weight: bold;
      transition: color 0.2s ease;
    }

    .signin-button:hover {
      color: #3f51b5;
    }

    .avatar-circle {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #cbd5e0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .avatar-circle:hover {
      background-color: #a0aec0;
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

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
