import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../shared/icon.module';

@Component({
  selector: 'filterjobs',
  standalone: true,
  imports: [CommonModule, IconModule],
  template: `
    <div class="dropdown">
      <button (click)="toggleDropdown()" class="dropdown-btn">
        <lucide-icon name="funnel" class="my-icon"></lucide-icon>
        <span>Filter</span>
      </button>

      <ul *ngIf="open" class="dropdown-menu">
        <li (click)="select('recent')">Most Recent</li>
        <li (click)="select('status')">App Status</li>
        <li (click)="select('pay')">Highest Pay</li>
      </ul>
    </div>
  `,
  styles: [`
    .dropdown {
      position: relative;
      width: 12rem;
      display: inline-block;
    }

    .dropdown-btn {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      color: #374151;
      background-color: #fff;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: border-color 0.2s ease;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      gap: 0.5rem;
    }

    .dropdown-btn:hover {
      border-color: #a1a1aa;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      margin-top: 0.25rem;
      background-color: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 10;
      font-size: 0.875rem;
      padding: 0;
    }

    .dropdown-menu li {
      list-style: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      text-align: left;
      white-space: nowrap;
    }

    .dropdown-menu li:hover {
      background-color: #f3f4f6;
    }
  `]
})
export class FilterjobsComponent {
  @Output() filterChange = new EventEmitter<string>();
  open = false;

  toggleDropdown() {
    this.open = !this.open;
  }

  select(value: string) {
    this.filterChange.emit(value);
    this.open = false;
  }
}
