import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchjobComponent } from "../searchjobs/searchjob.component";
import { FilterjobsComponent } from '../filterjobs/filterjobs.component';
import { TogglejobsComponent } from '../togglejobs/togglejobs.component';

@Component({
  selector: 'navbar',
  imports: [SearchjobComponent, FilterjobsComponent, TogglejobsComponent],
  template: `
    <div class="navbar-container">
      <div class="nav-header">
        <span class="home-button" (click)="navigateToHome()">{{ title }}</span>
        <span class="signin-button" (click)="navigateToSignin()">Sign In</span>
      </div>
      
      <div class="job-actions">
        <div class="left-actions">
          <searchjob></searchjob>
          <filterjobs></filterjobs>
        </div>
        <div class="right-actions">
          <togglejobs></togglejobs>
          <button class="add-button" (click)="navigateToApplicationForm()">Add Application</button>
        </div>
      </div>
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

    .job-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
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

  navigateToApplicationForm() {
    this.router.navigate(['/add-application']);
  }
}
