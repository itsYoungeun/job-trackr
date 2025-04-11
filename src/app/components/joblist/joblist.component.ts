import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  styles: [``]
})
export class JoblistComponent implements OnInit {
  @Input() layout: 'grid' | 'list' = 'grid';
  @Input() filter: string = 'recent';

  jobs: Job[] = [];
  allJobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(jobs => {
      this.allJobs = jobs;
      this.applyFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.applyFilter();
    }
  }

  parseSalary(salary: string): number {
    return parseInt(salary.replace(/[^0-9]/g, ''), 10) || 0;
  }

  applyFilter(filterOverride?: string) {
    const filter = filterOverride ?? this.filter;
  
    switch (filter) {
      case 'pay':
        this.jobs = [...this.allJobs].sort((a, b) => 
          this.parseSalary(b.salary) - this.parseSalary(a.salary)
        );
        break;
      case 'status':
        this.jobs = [...this.allJobs].sort((a, b) => 
          a.status.localeCompare(b.status)
        );
        break;
      case 'recent':
      default:
        this.jobs = [...this.allJobs].sort((a, b) => 
          new Date(b.appliedDate || '').getTime() - new Date(a.appliedDate || '').getTime()
        );
        break;
    }
  }  
}
