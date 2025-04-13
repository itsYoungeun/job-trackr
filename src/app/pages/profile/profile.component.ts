import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Job } from '../../core/models/job.model';
import { User } from '../../core/models/user.model';
import { Subscription } from 'rxjs';
import { IconModule } from '../../shared/icon.module';
import { NavheaderComponent } from "../../components/navheader/navheader.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, IconModule, NavheaderComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  jobs: Job[] = [];
  private subscriptions: Subscription[] = [];
  
  isEditingUsername: boolean = false;
  editableUsername: string = '';
  uploading: boolean = false;

  
  constructor(
    private authService: AuthService,
    private jobService: JobService
  ) {}
  
  ngOnInit(): void {
    const userSub = this.authService.currentUser$.subscribe(authUser => {
      if (authUser) {
        this.user = {
          uid: authUser.uid,
          email: authUser.email || '',
          photoURL: authUser.photoURL || undefined,
          displayName: authUser.displayName || undefined
        };
        this.editableUsername = this.user.displayName || 
          (this.user.email ? this.user.email.split('@')[0] : 'User');
      } else {
        this.user = null;
      }
    });
    this.subscriptions.push(userSub);
    
    const jobSub = this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
    this.subscriptions.push(jobSub);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  triggerFileInput(): void {
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  
  async uploadProfileImage(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (!file || !this.user) return;
  
    this.uploading = true;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Job Trackr');
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dsx2dmd0f/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (data.secure_url) {
        await this.authService.updateProfileImage(this.user.uid, data.secure_url);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      this.uploading = false;
    }
  }  
  
  startEditUsername(): void {
    this.isEditingUsername = true;
  }
  
  saveUsername(): void {
    if (this.user && this.editableUsername.trim()) {
      this.authService.updateDisplayName(this.user.uid, this.editableUsername.trim())
        .then(() => {
          if (this.user) {
            this.user.displayName = this.editableUsername.trim();
          }
          this.isEditingUsername = false;
        })
        .catch(error => {
          console.error('Error updating display name:', error);
        });
    }
  }
  
  cancelEditUsername(): void {
    if (this.user) {
      this.editableUsername = this.user.displayName || 
        (this.user.email ? this.user.email.split('@')[0] : 'User');
    }
    this.isEditingUsername = false;
  }
  
  getPendingCount(): number {
    return this.jobs.filter(job => job.status === 'Pending').length;
  }
  
  getInterviewCount(): number {
    return this.jobs.filter(job => job.status === 'Interview').length;
  }
  
  getRejectedCount(): number {
    return this.jobs.filter(job => job.status === 'Rejected').length;
  }
  
  getRecentJobs(): Job[] {
    return [...this.jobs]
      .sort((a, b) => {
        const dateA = new Date(a.appliedDate);
        const dateB = new Date(b.appliedDate);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  }
}