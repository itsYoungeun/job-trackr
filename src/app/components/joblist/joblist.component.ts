import { Component, OnInit } from '@angular/core';
import { Job, JobService } from '../../job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'joblist',
  standalone: true,
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
      margin: 1rem;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 8px rgba(0,0,0,0.1);
    }
    img {
      max-width: 100px;
      border-radius: 8px;
    }
  `]
})
export class JoblistComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }
}