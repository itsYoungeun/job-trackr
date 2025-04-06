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

    .job-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;
    }

    .left-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: flex-end;
    }

    .add-button {
      padding: 0.5rem 1rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .add-button:hover {
      background-color: #303f9f;
    }

    @media (max-width: 768px) {
      .job-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .left-actions, .right-actions {
        margin-bottom: 1rem;
      }
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
