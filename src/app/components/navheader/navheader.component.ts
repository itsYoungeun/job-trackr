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

        <div class="nav-right" *ngIf="isHomePage || isAddApplicationPage || isProfilePage">
          <div *ngIf="isLoggedIn" class="signin-wrapper">
            <div class="avatar-wrapper" (click)="toggleDropdown($event)" tabindex="0">
              <div class="avatar-circle">
                <img *ngIf="userPhotoURL" [src]="userPhotoURL" alt="avatar" class="avatar-img" />
                <span *ngIf="!userPhotoURL && userEmail">{{ userEmail[0] | uppercase }}</span>
              </div>

              <div *ngIf="showDropdown" class="dropdown-menu" (click)="$event.stopPropagation()">
                <div class="dropdown-item" (click)="navigateToProfile()">Profile</div>
                <div class="dropdown-item" (click)="toggleTheme()">Toggle Theme: {{theme}}</div>
                <div class="dropdown-item" (click)="logout()">Sign Out</div>
              </div>
            </div>
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
      background-color: var(--bg-color);
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
      color: var(--text-color);
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
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: #cbd5e0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 1.2rem;
      overflow: hidden;
    }

    .avatar-circle:hover {
      background-color: #a0aec0;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-wrapper {
      position: relative;
    }

    .dropdown-menu {
      position: absolute;
      top: 3rem;
      right: 0;
      background-color: var(--card-bg);
      color: var(--text-color);
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      padding: 0.5rem 0;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      z-index: 1000;
      min-width: 200px;
    }

    .dropdown-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      font-size: 1rem;
    }

    .dropdown-item:hover {
      background-color: var(--hover-bg);
    }
  `]
})
export class NavheaderComponent {
  userEmail: string | null = null;
  userPhotoURL: string | null = null;
  isHomePage = false;
  isAddApplicationPage = false;
  isProfilePage = false;
  isOnSignInPage = false;
  isOnSignUpPage = false;
  isLoggedIn = false;
  isDarkMode = false;
  showDropdown = false;

  ngAfterViewInit() {
    document.addEventListener('click', this.closeDropdown);
  }
  
  ngOnDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  }  

  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.isHomePage = currentUrl === '/';
        this.isAddApplicationPage = currentUrl === '/add-application';
        this.isProfilePage = currentUrl === '/profile';
        this.isOnSignInPage = currentUrl === '/sign-in';
        this.isOnSignUpPage = currentUrl === '/sign-up';
      });

    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.email ?? null;
      this.userPhotoURL = user?.photoURL ?? null;
    });

    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme || 'light');
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

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }  
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.showDropdown = false;
  }

  get theme() {
    return this.isDarkMode ? 'Dark' : 'Light';
  }

  closeDropdown = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.avatar-wrapper');
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }
}
