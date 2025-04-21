import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavheaderComponent } from '../../components/navheader/navheader.component';
import { SearchjobComponent } from '../../components/searchjobs/searchjob.component';
import { IconModule } from '../../shared/icon.module';
import { JobService } from '../../services/job.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'managejobs',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NavheaderComponent, SearchjobComponent, IconModule
  ],
  templateUrl: `./managejobs.component.html`,
  styleUrls: [`./managejobs.component.scss`]
})
export class ManagejobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchQuery: string = '';
  currentFilter: string = 'recent';
  
  // Modal states
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  editingJob: Job = this.getEmptyJob();
  deletingJob: Job | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
    
    // Get the stored filter preference
    const storedFilter = localStorage.getItem('selectedFilter');
    if (storedFilter) {
      this.currentFilter = storedFilter;
    }
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe(jobs => {
      // Initialize favorite property if not present
      this.jobs = jobs.map(job => ({
        ...job,
        favorite: job.favorite || false
      }));
      this.applyFilters();
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  applyFilters(): void {
    // First, filter by search query
    let filtered = this.jobs;
    if (this.searchQuery) {
      filtered = this.jobs.filter(job => 
        job.company.toLowerCase().includes(this.searchQuery) ||
        job.position.toLowerCase().includes(this.searchQuery) ||
        job.location.toLowerCase().includes(this.searchQuery)
      );
    }

    // Then, apply the selected sort filter
    switch (this.currentFilter) {
      case 'recent':
        filtered = [...filtered].sort((a, b) => 
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        );
        break;
      case 'status':
        // Order: Interview, Pending, Rejected
        filtered = [...filtered].sort((a, b) => {
          const statusOrder = { 'Interview': 0, 'Pending': 1, 'Rejected': 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        break;
      case 'pay':
        filtered = [...filtered].sort((a, b) => {
          // Extract numeric values from salary strings and compare
          const salaryA = this.extractSalaryValue(a.salary);
          const salaryB = this.extractSalaryValue(b.salary);
          return salaryB - salaryA;
        });
        break;
    }

    // Put favorites at the top regardless of filter
    this.filteredJobs = [
      ...filtered.filter(job => job.favorite),
      ...filtered.filter(job => !job.favorite)
    ];
  }

  extractSalaryValue(salary: string): number {
    // Extract numeric values from salary strings
    const match = salary.match(/(\d+[\d,.]*)/);
    if (match) {
      // Remove commas and parse as number
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return 0;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Interview': return 'status-interview';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  }

  toggleFavorite(job: Job): void {
    if (!job.id) return;
    
    // Toggle the favorite status locally for immediate UI feedback
    job.favorite = !job.favorite;
    
    // Update in the database through the service
    this.jobService.toggleFavorite(job.id, job.favorite)
      .catch(error => {
        console.error('Error toggling favorite status:', error);
        // Revert the local change if the server update fails
        job.favorite = !job.favorite;
      });
  }

  // Modal handling methods
  openEditModal(job: Job): void {
    this.editingJob = { ...job };
    this.showEditModal = true;
  }

  closeEditModal(event: Event): void {
    // Close only if clicking on overlay or close button
    if (
      (event.target as HTMLElement).classList.contains('modal-overlay') ||
      (event.target as HTMLElement).closest('.close-btn') ||
      (event.target as HTMLElement).classList.contains('cancel-btn')
    ) {
      this.showEditModal = false;
    }
  }

  confirmDelete(job: Job): void {
    this.deletingJob = job;
    this.showDeleteModal = true;
  }

  closeDeleteModal(event: Event): void {
    // Close only if clicking on overlay or close button
    if (
      (event.target as HTMLElement).classList.contains('modal-overlay') ||
      (event.target as HTMLElement).closest('.close-btn') ||
      (event.target as HTMLElement).classList.contains('cancel-btn')
    ) {
      this.showDeleteModal = false;
      this.deletingJob = null;
    }
  }

  saveJob(): void {
    if (this.editingJob && this.editingJob.id) {
      // Remove id field before updating
      const { id, ...jobData } = this.editingJob;
      
      this.jobService.updateJob(id, jobData)
        .then(() => {
          // Update the job in the local array
          const index = this.jobs.findIndex(j => j.id === id);
          if (index !== -1) {
            this.jobs[index] = { ...this.editingJob };
            this.applyFilters();
          }
          this.showEditModal = false;
        })
        .catch(error => {
          console.error('Error updating job:', error);
        }
      );
    }
  }

  deleteJob(): void {
    if (this.deletingJob && this.deletingJob.id) {
      this.jobService.deleteJob(this.deletingJob.id)
        .then(() => {
          // Remove the job from the local array
          this.jobs = this.jobs.filter(job => job.id !== this.deletingJob?.id);
          this.applyFilters();
          this.showDeleteModal = false;
          this.deletingJob = null;
        })
        .catch(error => {
          console.error('Error deleting job:', error);
        });
    }
  }

  // Helper method to create an empty job
  getEmptyJob(): Job {
    return {
      company: '',
      image: '',
      position: '',
      salary: '',
      location: '',
      appliedDate: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      description: '',
      favorite: false
    };
  }
}