import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Job } from '../../job.service';

@Component({
  selector: 'job',
  imports: [CommonModule],
  template: `
    <div *ngFor="let job of jobs" class="job-card">
      <img [src]="job.image" alt="Company Logo" />
      <h3>{{ job.position }} at {{ job.company }}</h3>
      <p>{{ job.location }}</p>
      <p>Salary: {{ job.salary }}</p>
      <p>Applied on: {{ job.appliedDate }}</p>
    </div>
  `,
  styles: [`
    .job-card {
      padding: 1rem;
      margin: 1rem 0;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 8px rgba(0,0,0,0.1);
    }
    img {
      max-width: 100px;
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }
  `]
})
export class JobComponent {
  @Input() jobs: Job[] = [];
}
