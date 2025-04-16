import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  user: User | null = null;
  jobs: Job[] = [];
  private subscriptions: Subscription[] = [];
  
  isEditingUsername: boolean = false;
  editableUsername: string = '';
  uploading: boolean = false;
  showImageMenu = false;
  
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
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.click();
    } else {
      console.error('File input not found');
    }
  }
  
  async uploadProfileImage(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (!file || !this.user) return;
  
    this.uploading = true;
  
    try {
      const newPhotoURL = await this.authService.updateProfileImage(this.user.uid, file);
      if (this.user && typeof newPhotoURL === 'string') {
        this.user.photoURL = newPhotoURL;
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      this.uploading = false;
    }
  }   

  toggleImageMenu(event: MouseEvent): void {
    event.stopPropagation();
    console.log('Clicked profile image');
    this.showImageMenu = !this.showImageMenu;
    console.log('Menu visible?', this.showImageMenu);
  }
  
  closeImageMenu(): void {
    this.showImageMenu = false;
  }
  
  clearProfileImage(): void {
    if (this.user) {
      this.uploading = true;
      this.authService.updateProfileImage(this.user.uid, null)
        .then(() => {
          if (this.user) {
            this.user.photoURL = undefined;
          }
          this.closeImageMenu();
        })
        .catch(error => {
          console.error('Error removing profile image:', error);
        })
        .finally(() => {
          this.uploading = false;
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.profile-image') || target.closest('.image-menu');
    if (!clickedInside && this.showImageMenu) {
      this.showImageMenu = false;
    }
  }
}