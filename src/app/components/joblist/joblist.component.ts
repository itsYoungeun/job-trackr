import { Component, OnInit } from '@angular/core';
import { Job, JobService } from '../../job.service';
import { CommonModule } from '@angular/common';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'joblist',
  standalone: true,
  imports: [CommonModule, JobComponent],
  template: `
    <job [jobs]="jobs"></job>
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