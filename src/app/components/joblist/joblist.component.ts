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