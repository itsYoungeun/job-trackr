import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job } from '../../core/models/job.model';
import { JobService } from '../../services/job.service';
import { NavheaderComponent } from '../../components/navheader/navheader.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'addapplication',
  standalone: true,
  imports: [CommonModule, FormsModule, NavheaderComponent],
  template: `
    <navheader></navheader>

    <div class="form-wrapper">
      <h2>Add Job Application</h2>

      <form #jobForm="ngForm" (ngSubmit)="submitForm()">
        <label>
          Company Title:
          <input type="text" name="company" [(ngModel)]="job.company" required />
        </label>

        <label>
          Company Logo URL:
          <input type="url" name="image" [(ngModel)]="job.image" />
        </label>

        <label>
          Position:
          <input type="text" name="position" [(ngModel)]="job.position" required />
        </label>

        <label>
          Salary:
          <input type="text" name="salary" [(ngModel)]="job.salary" required />
        </label>

        <label>
          Location:
          <input type="text" name="location" [(ngModel)]="job.location" required />
        </label>

        <label>
          Date of Application:
          <input type="date" name="appliedDate" [(ngModel)]="job.appliedDate" required />
        </label>

        <button type="submit" [disabled]="jobForm.invalid">Submit Application</button>
      </form>
    </div>
  `,
  styles: [`
    .form-wrapper {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      color: var(--text-color);
      background-color: var(--bg-color-2);
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
      border: 1px solid var(--border-color);
      color: var(--text-color);
      background-color: var(--card-bg);
      border-radius: 6px;
      font-size: 1rem;
    }

    input:focus,
    input:hover {
      border-color: var(--border-hover);
    }
  
    button {
      margin-top: 1rem;
      padding: 0.75rem;
      background-color: #3f51b5;
      color: var(--text-color);
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
      background-color: var(--toggle-color);
      cursor: not-allowed;
    }

    input:-webkit-autofill {
      background-color: var(--bg-color-3) !important;
      color: var(--text-color) !important;
      -webkit-box-shadow: 0 0 0px 1000px var(--bg-color-3) inset !important;
      transition: background-color 9999s ease-out, color 9999s ease-out;
    }
  `]
  
})
export class AddapplicationComponent {
  constructor(
    private jobService: JobService, 
    private authService: AuthService, 
    private toastr: ToastrService
  ) {}

  job = {
    company: '',
    image: '',
    position: '',
    salary: '',
    location: '',
    appliedDate: ''
  };

  submitForm() {
    const jobWithStatus: Job = {
      ...this.job,
      status: 'Pending'
    };
    
    this.jobService.addJob(jobWithStatus)
      .then(() => {
        this.toastr.success('Successfully added job!');
        this.resetForm();
      })
      .catch((error) => {
        this.toastr.error('Failed to add job');
      });
  }

  resetForm() {
    this.job = {
      company: '',
      image: '',
      position: '',
      salary: '',
      location: '',
      appliedDate: ''
    };
  }
}
