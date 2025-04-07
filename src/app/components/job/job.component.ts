import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Job, JobService } from '../../services/job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'job',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="job-grid">
      <div *ngFor="let job of jobs" class="job-card">
        <img [src]="job.image" alt="Company Logo" />
        <h3>{{ job.position }} at {{ job.company }}</h3>
        <p>{{ job.location }}</p>
        <p>Salary: {{ job.salary }}</p>
        <p>Applied on: {{ job.appliedDate }}</p>
        <label>
          Status:
          <select [(ngModel)]="job.status" (change)="handleStatusChange($event, job.id!)">
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .job-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 2rem;
      width: 100%;
      max-width: 1400px;
      margin: 1rem auto;
    }

    .job-card {
      padding: 1rem;
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

  constructor(private jobService: JobService) {};

  handleStatusChange(event: Event, jobId: string) {
    const newStatus = (event.target as HTMLSelectElement).value as 'Applied' | 'Interview' | 'Rejected';
    this.updateStatus(jobId, newStatus);
  }

  updateStatus(jobId: string, newStatus: 'Applied' | 'Interview' | 'Rejected') {
    this.jobService.updateJobStatus(jobId, newStatus);
  };
}
