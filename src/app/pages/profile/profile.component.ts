import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavheaderComponent } from '../../components/navheader/navheader.component';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Job } from '../../core/models/job.model';
import { User } from '../../core/models/user.model';
import { Subscription } from 'rxjs';
import { IconModule } from '../../shared/icon.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavheaderComponent, IconModule],
  template: `
    <navheader></navheader>
    
    <div class="profile-container" *ngIf="user">
      <div class="profile-header">
        <div class="profile-image" (click)="triggerFileInput()">
          <img [src]="user.photoURL || 'assets/images/default-profile.jpg'" alt="Profile Picture">
          <div class="image-overlay">
            <span class="edit-image">Edit Photo</span>
          </div>
          <input type="file" id="profileImage" accept="image/*" (change)="uploadProfileImage($event)" hidden #fileInput>
        </div>
        <div class="profile-info">
          <div class="username-container" *ngIf="!isEditingUsername">
            <h1>{{ user.displayName || (user.email ? user.email.split('@')[0] : 'User') }}</h1>
            <button class="edit-username-btn" (click)="startEditUsername()">
              <lucide-icon name="pencil" class="edit-icon"></lucide-icon>
            </button>
          </div>
          <div class="username-edit" *ngIf="isEditingUsername">
            <input type="text" [(ngModel)]="editableUsername" class="username-input">
            <div class="username-actions">
              <button class="save-btn" (click)="saveUsername()">Save</button>
              <button class="cancel-btn" (click)="cancelEditUsername()">Cancel</button>
            </div>
          </div>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </div>
      
      <div class="stats-section">
        <h2>Application Stats</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ jobs.length }}</div>
            <div class="stat-label">Total Applications</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ getPendingCount() }}</div>
            <div class="stat-label">Pending</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ getInterviewCount() }}</div>
            <div class="stat-label">Interviews</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ getRejectedCount() }}</div>
            <div class="stat-label">Rejected</div>
          </div>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2>Recent Applications</h2>
        <div class="recent-applications" *ngIf="getRecentJobs().length > 0; else noApplications">
          <div class="application-item" *ngFor="let job of getRecentJobs()">
            <div class="company-logo">
              <img [src]="job.image || 'assets/images/default-company.png'" alt="{{ job.company }}">
            </div>
            <div class="application-details">
              <h3>{{ job.position }}</h3>
              <p class="company-name">{{ job.company }}</p>
              <p class="application-meta">
                <span class="location">{{ job.location }}</span> • 
                <span class="salary">{{ job.salary }}</span>
              </p>
              <p class="application-date">Applied on {{ job.appliedDate }}</p>
            </div>
            <div class="application-status" [ngClass]="job.status.toLowerCase()">
              {{ job.status }}
            </div>
          </div>
        </div>
        <ng-template #noApplications>
          <p class="no-data">No recent job applications found.</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: `
    .profile-container {
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    
    .profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .profile-image {
      margin-right: 1.5rem;
      position: relative;
      cursor: pointer;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 3px solid #f0f0f0;
      border-radius: 50%;
      transition: filter 0.3s ease;
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 50%;
    }
    
    .edit-image {
      color: white;
      font-size: 0.8rem;
      text-align: center;
      padding: 0.3rem;
    }
    
    .profile-image:hover img {
      filter: blur(1px);
    }
    
    .profile-image:hover .image-overlay {
      opacity: 1;
    }
    
    .username-container {
      display: flex;
      align-items: center;
    }
    
    .edit-username-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.3rem;
      margin-left: 0.5rem;
    }
    
    .edit-icon {
      width: 16px;
      height: 16px;
      color: #666;
    }
    
    .username-edit {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.5rem;
    }
    
    .username-input {
      padding: 0.5rem;
      font-size: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .username-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .save-btn, .cancel-btn {
      padding: 0.4rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .save-btn {
      background-color: #4caf50;
      color: white;
    }
    
    .cancel-btn {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .profile-info h1 {
      margin: 0 0 0.5rem;
      font-size: 1.8rem;
      font-weight: 600;
    }
    
    .user-email {
      color: #666;
      margin: 0;
    }
    
    .stats-section {
      margin-bottom: 2rem;
    }
    
    .stats-section h2 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
    
    .stat-card {
      background-color: #f8f9fa;
      border-radius: 0.5rem;
      padding: 1.2rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      color: #666;
      font-size: 0.9rem;
    }
    
    .recent-activity {
      margin-top: 2rem;
    }
    
    .recent-activity h2 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .application-item {
      display: flex;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      align-items: center;
    }
    
    .company-logo {
      width: 60px;
      height: 60px;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 4px;
    }
    
    .application-details {
      flex-grow: 1;
    }
    
    .application-details h3 {
      margin: 0 0 0.2rem;
      font-size: 1.1rem;
      font-weight: 500;
    }
    
    .company-name {
      font-weight: 500;
      margin: 0 0 0.2rem;
    }
    
    .application-meta {
      color: #666;
      font-size: 0.9rem;
      margin: 0 0 0.2rem;
    }
    
    .application-date {
      font-size: 0.8rem;
      color: #888;
      margin: 0;
    }
    
    .application-status {
      font-weight: 500;
      border-radius: 1rem;
      padding: 0.4rem 1rem;
      font-size: 0.85rem;
      text-align: center;
      margin-left: 1rem;
      flex-shrink: 0;
    }
    
    .pending {
      background-color: #fff8e1;
      color: #ff8f00;
    }
    
    .interview {
      background-color: #e0f7fa;
      color: #0097a7;
    }
    
    .rejected {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .no-data {
      text-align: center;
      color: #777;
      padding: 2rem;
      background-color: #f9f9f9;
      border-radius: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .profile-header {
        flex-direction: column;
        text-align: center;
      }
      
      .profile-avatar {
        margin-right: 0;
        margin-bottom: 1rem;
      }
      
      .application-item {
        flex-direction: column;
      }
      
      .company-logo {
        margin-bottom: 0.5rem;
      }
      
      .application-status {
        margin-left: 0;
        margin-top: 0.5rem;
        width: 100%;
      }
    }
  `
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  jobs: Job[] = [];
  private subscriptions: Subscription[] = [];
  
  isEditingUsername: boolean = false;
  editableUsername: string = '';
  
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
  
  // Updated to work with a ViewChild reference
  triggerFileInput(): void {
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  
  uploadProfileImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0] && this.user) {
      const file = fileInput.files[0];
      
      this.authService.updateProfileImage(this.user.uid, file)
        .then(() => {
          console.log('Profile image updated successfully');
        })
        .catch(error => {
          console.error('Error updating profile image:', error);
        });
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