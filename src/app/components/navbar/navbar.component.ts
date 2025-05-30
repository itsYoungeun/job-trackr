import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavheaderComponent } from './../navheader/navheader.component';
import { SearchjobComponent } from "../searchjobs/searchjob.component";
import { FilterjobsComponent } from '../filterjobs/filterjobs.component';
import { TogglejobsComponent } from '../togglejobs/togglejobs.component';

@Component({
  selector: 'navbar',
  imports: [NavheaderComponent, SearchjobComponent, FilterjobsComponent, TogglejobsComponent],
  template: `
    <div class="navbar-container">
      <navheader></navheader>

      <div class="actions-container">
        <div class="job-actions">
          <div class="left-actions">
            <searchjob (search)="onSearchChange($event)"></searchjob>
            <filterjobs (filterChange)="onFilterChange($event)"></filterjobs>
          </div>

          <div class="right-actions">
            <togglejobs [layout]="layout" (layoutChange)="layoutChange.emit($event)"></togglejobs>
            <button class="add-button" (click)="navigateToApplicationForm()">Add Application</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .actions-container {
      padding: 1rem 3.5rem 0;
    }

    .job-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;
    }

    .left-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: flex-end;
    }

    .add-button {
      padding: 0.95rem 1rem;
      background-color: var(--bg-color-2);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      color: #9ca3af;;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .add-button:focus,
    .add-button:hover {
      border-color: var(--border-hover);
    }

    @media (max-width: 768px) {
      .job-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .left-actions, .right-actions {
        margin-bottom: 1rem;
      }
    }
    `]
})
export class NavbarComponent {
  @Input() layout: 'grid' | 'list' = 'grid';
  @Input() filter: string = '';
  @Output() layoutChange = new EventEmitter<'grid' | 'list'>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  constructor(private router: Router) {};

  navigateToApplicationForm() {
    this.router.navigate(['/add-application']);
  }

  onToggleFilter(filter: 'recent' | 'status' | 'pay') {
    console.log('Selected toggle filter:', filter);
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.filterChange.emit(filter);
  }

  onSearchChange(term: string) {
    this.searchChange.emit(term);
  }
}
