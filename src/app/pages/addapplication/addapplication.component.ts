import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job, JobService } from '../../job.service';
import { NavheaderComponent } from '../../components/navheader/navheader.component';

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
          <input type="text" name="salary" [(ngModel)]="job.salary" />
        </label>

        <label>
          Location:
          <input type="text" name="location" [(ngModel)]="job.location" />
        </label>

        <label>
          Date of Application:
          <input type="date" name="appliedDate" [(ngModel)]="job.appliedDate" />
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
export class AddapplicationComponent {
  constructor(private jobService: JobService) {}

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
      status: 'Applied'
    };
    
    this.jobService.addJob(jobWithStatus)
      .then(() => {
        console.log('Job successfully added');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Error adding job:', error);
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
