import { Component, Input, OnInit } from '@angular/core';
import { Job, JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'joblist',
  standalone: true,
  imports: [CommonModule, JobComponent],
  template: `
    <job [jobs]="jobs" [layout]="layout"></job>
  `,
  styles: [`
  `]
})
export class JoblistComponent implements OnInit {
  @Input() layout: 'grid' | 'list' = 'grid';
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }
}