import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Job, JobService } from '../../services/job.service';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../../shared/icon.module';
import { JobdescriptionComponent } from '../jobdescription/jobdescription.component';

@Component({
  selector: 'job',
  imports: [CommonModule, FormsModule, IconModule, JobdescriptionComponent],
  template: `
    <jobdescription
      *ngIf="isModalOpen"
      [job]="selectedJob!"
      (close)="closeModal()"
      (save)="saveDescription($event)"
    ></jobdescription>

    <div [ngClass]="layout === 'grid' ? 'job-grid' : 'job-list'">
      <div *ngFor="let job of jobs" class="job-card" (click)="openModal(job)">

        <div class="job-header">
          <div class="job-header-content">
            <img [src]="job.image" alt="Company Logo" class="job-logo" />
            <div class="job-info-block">
              <h3 class="job-title">{{ job.position }}</h3>
              <div class="job-company">
                <lucide-icon name="building2" class="my-icon"></lucide-icon>
                <span>{{ job.company }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="job-details">
          <div class="job-location">
            <lucide-icon name="map-pin" class="my-icon"></lucide-icon>
            <span [ngClass]="{ 'clamp-1': layout === 'grid' }">
              {{ job.location }}
            </span>
          </div>

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

          <span 
            class="status-badge" 
            [ngClass]="getStatusClass(job.status)"
            (click)="handleStatusClick(job); $event.stopPropagation()"
            title="Click to cycle status"
          >
            {{ job.status }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .job-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2rem;
      margin: 1rem auto;
    }

    .job-list .job-card {
      display: flex;
      flex-direction: row;
    }

    .job-list .job-details {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 1.5rem;
    }

    .job-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
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

    .job-location {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: #6b7280;
      gap: 0.5rem;
      max-width: 500px;
    }

    .clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
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

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 500;
      width: fit-content;
    }

    .status-badge:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    .status-pending {
      background-color: #fef9c3;
      color: #a16207;
    }

    .status-interview {
      background-color: #dbeafe;
      color: #1d4ed8;
    }

    .status-rejected {
      background-color: #fee2e2;
      color: #b91c1c;
    }

    @media (max-width: 768px) {
      .job-list, .job-grid {
        padding: 2rem;
        gap: 1rem;
      }

      .job-card {
        padding: 2rem;
      }

      .job-list .job-card {
        flex-direction: column;
      }

      .job-list .job-details {
        flex-direction: column;
        align-items: flex-start;
        margin-left: 0;
      }

      .job-header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .job-logo {
        width: 60px;
        height: 60px;
      }

      .job-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .status-badge {
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
      }
    }
  `]
})
export class JobComponent implements OnInit{
  @Input() jobs: Job[] = [];
  @Input() layout: 'grid' | 'list' = 'grid';
  isModalOpen = false;
  selectedJob: Job | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  getStatusClass(status: 'Pending' | 'Interview' | 'Rejected'): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Interview': return 'status-interview';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  }

  cycleStatus(currentStatus: 'Pending' | 'Interview' | 'Rejected'): 'Pending' | 'Interview' | 'Rejected' {
    const order: ('Pending' | 'Interview' | 'Rejected')[] = ['Pending', 'Interview', 'Rejected'];
    const index = order.indexOf(currentStatus);
    return order[(index + 1) % order.length];
  }

  handleStatusClick(job: Job) {
    const newStatus = this.cycleStatus(job.status);
    this.updateStatus(job.id!, newStatus);
    job.status = newStatus;
  }

  updateStatus(jobId: string, newStatus: 'Pending' | 'Interview' | 'Rejected') {
    this.jobService.updateJobStatus(jobId, newStatus);
  }

  saveDescription(newDescription: string) {
    if (this.selectedJob) {
      this.selectedJob.description = newDescription;
      this.jobService.updateJobDescription(this.selectedJob.id!, newDescription);
      this.closeModal();
    }
  }

  openModal(job: Job) {
    this.selectedJob = job;
    this.isModalOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
    this.selectedJob = null;
  }  
}
