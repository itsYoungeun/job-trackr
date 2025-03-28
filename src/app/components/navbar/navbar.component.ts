import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [],
  template: `
    <div class="container">
      <span class="home-button" (click)="navigateToHome()">{{ title }}</span>
      <span class="signin-button" (click)="navigateToSignin()">Sign In</span>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: black;
    }

    .home-button {
      cursor: pointer;
      font-size: 1.8rem;
      font-weight: bold;
    }

    .home-button:hover {
      color: gray;
    }

    .signin-button {
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .signin-button:hover {
      color: gray;
    }
    `]
})
export class NavbarComponent {
  title = 'JobTrackr';

  constructor(private router: Router) {};

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
