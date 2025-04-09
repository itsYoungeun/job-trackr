import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Job } from '../../services/job.service';

@Component({
  selector: 'jobdescription',
  imports: [CommonModule, FormsModule],
  standalone: true,
  template: `
    <div class="modal-overlay" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Edit Job Description</h2>
        <textarea
          [(ngModel)]="job.description"
          rows="8"
          class="modal-textarea"
        ></textarea>
        <div class="modal-actions">
          <button (click)="onSave()">Save</button>
          <button (click)="onClose()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      width: 90%;
      max-width: 600px;
    }

    .modal-textarea {
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      font-size: 1rem;
      resize: vertical;
    }

    .modal-actions {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }
  `]
})
export class JobdescriptionComponent {
  @Input() job!: Job;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();

  onSave() {
    this.save.emit(this.job.description);
  }

  onClose() {
    this.close.emit();
  }
}
