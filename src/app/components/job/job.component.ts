import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../core/models/job.model';
import { JobService } from '../../services/job.service';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../../shared/icon.module';
import { JobdescriptionComponent } from '../jobdescription/jobdescription.component';

@Component({
  selector: 'job',
  imports: [CommonModule, FormsModule, IconModule, JobdescriptionComponent],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit{
  @Input() jobs: Job[] = [];
  @Input() layout: 'grid' | 'list' = 'grid';
  isModalOpen = false;
  selectedJob: Job | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
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
