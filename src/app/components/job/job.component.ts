import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Job, JobService } from '../../services/job.service';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../../shared/icon.module';

@Component({
  selector: 'job',
  imports: [CommonModule, FormsModule, IconModule],
  template: `
    <div [ngClass]="layout === 'grid' ? 'job-grid' : 'job-list'">
      <div *ngFor="let job of jobs" class="job-card">
        <div class="job-header">
          <div class="job-header-content">
            <img [src]="job.image" alt="Company Logo" class="job-logo" />
            <div>
              <h3 class="job-title">{{ job.position }}</h3>
              <div class="job-company">
                <lucide-icon name="building2" class="my-icon"></lucide-icon>
                <span>{{ job.company }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="job-details">
          <span class="status-badge" [ngClass]="getStatusClass(job.status)">
            {{ job.status }}
          </span>

          <div class="job-meta">
            <div class="job-meta-item">
            <lucide-icon name="calendar" class="my-icon"></lucide-icon>
            <span>{{ job.appliedDate }}</span>
            </div>
            <div class="job-meta-item">
              <lucide-icon name="hand-coins" class="my-icon"></lucide-icon>
              <span>{{ job.salary }}</span>
            </div>
          </div>

          <div class="job-status-select">
            <label class="job-status-label">Status:</label>
            <select 
              [(ngModel)]="job.status" 
              (change)="handleStatusChange($event, job.id!)"
              class="job-select"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .job-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: 1rem auto;
    }

    .job-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2rem;
      max-width: 800px;
      margin: 1rem auto;
    }

    .job-card {
      padding: 1.5rem;
      background-color: #ffffff;
      border-radius: 1rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      transition: border-color 0.2s ease-in-out;
    }

    .job-card:hover {
      border-color: #6366f1;
    }

    .job-logo {
      width: 75px;
      height: 75px;
      object-fit: cover;
      border-radius: 0.5rem;
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .job-header-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .job-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }

    .job-company {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: #6b7280;
      gap: 0.5rem;
    }

    .job-details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      width: fit-content;
    }

    .status-applied {
      background-color: #dbeafe;
      color: #1d4ed8;
    }

    .status-interview {
      background-color: #fef9c3;
      color: #a16207;
    }

    .status-rejected {
      background-color: #fee2e2;
      color: #b91c1c;
    }

    .job-meta {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .job-meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .job-status-select {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .job-status-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .job-select {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      outline: none;
      transition: box-shadow 0.2s ease-in-out;
    }

    .job-select:focus {
      box-shadow: 0 0 0 1px #6366f1;
    }
  `]
})
export class JobComponent {
  @Input() jobs: Job[] = [];
  @Input() layout: 'grid' | 'list' = 'grid'

  constructor(private jobService: JobService) {};

  getStatusClass(status: 'Applied' | 'Interview' | 'Rejected'): string {
    switch (status) {
      case 'Applied': return 'status-applied';
      case 'Interview': return 'status-interview';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  }

  handleStatusChange(event: Event, jobId: string) {
    const newStatus = (event.target as HTMLSelectElement).value as 'Applied' | 'Interview' | 'Rejected';
    this.updateStatus(jobId, newStatus);
  }

  updateStatus(jobId: string, newStatus: 'Applied' | 'Interview' | 'Rejected') {
    this.jobService.updateJobStatus(jobId, newStatus);
  };
}
