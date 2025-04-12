import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Job } from '../../core/models/job.model';
import { JobService } from '../../services/job.service';
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
  @Input() searchTerm: string = '';

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
    if (changes['filter'] || changes['searchTerm']) {
      this.applyFilter();
    }
  }

  parseSalary(salary: string): number {
    return parseInt(salary.replace(/[^0-9]/g, ''), 10) || 0;
  }

  applyFilter(filterOverride?: string) {
    const filter = filterOverride ?? this.filter;
  
    let filtered = [...this.allJobs];
    switch (filter) {
      case 'pay':
        filtered.sort((a, b) => this.parseSalary(b.salary) - this.parseSalary(a.salary));
        break;
      case 'status':
        filtered.sort((a, b) => {
          const statusCompare = a.status.localeCompare(b.status);
          if (statusCompare !== 0) {
            return statusCompare;
          }
          const dateA = new Date(a.appliedDate || '').getTime();
          const dateB = new Date(b.appliedDate || '').getTime();
          return dateB - dateA;
        });
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => 
          new Date(b.appliedDate || '').getTime() - new Date(a.appliedDate || '').getTime()
        );
    }
  
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(job =>
        job.position.toLowerCase().includes(this.searchTerm) ||
        job.company.toLowerCase().includes(this.searchTerm)
      );
    }
  
    this.jobs = filtered;
  }
}
