import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'togglejobs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toggle-container">
      <button [class.active]="layout === 'grid'" (click)="changeLayout('grid')">Grid View</button>
      <button [class.active]="layout === 'list'" (click)="changeLayout('list')">List View</button>
    </div>
  `,
  styles: [`
    .toggle-container {
      display: flex;
      gap: 0.5rem;
      margin: 1rem auto;
      justify-content: center;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid #d1d5db;
      background-color: #f3f4f6;
      cursor: pointer;
    }

    .active {
      background-color: #6366f1;
      color: white;
      border-color: #6366f1;
    }
  `]
})
export class TogglejobsComponent {
  @Input() layout: 'grid' | 'list' = 'grid';
  @Output() layoutChange = new EventEmitter<'grid' | 'list'>();

  changeLayout(layout: 'grid' | 'list') {
    this.layoutChange.emit(layout);
  }
}