import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [],
  template: `
    <div class="container">
      <span class="home-button" (click)="navigateToHome()">{{ title }}</span>
    </div>
  `,
  styles: [`
    .container {
      color: black;
      font-size: 1.8rem;
      font-weight: bold;
    }

    .home-button {
      cursor: pointer;
    }

    .home-button:hover {
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
}
