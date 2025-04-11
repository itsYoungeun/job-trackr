import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavheaderComponent } from './../navheader/navheader.component';
import { SearchjobComponent } from "../searchjobs/searchjob.component";
import { FilterjobsComponent } from '../filterjobs/filterjobs.component';
import { TogglejobsComponent } from '../togglejobs/togglejobs.component';
import { JoblistComponent } from '../joblist/joblist.component';

@Component({
  selector: 'navbar',
  imports: [NavheaderComponent, SearchjobComponent, FilterjobsComponent, TogglejobsComponent],
  template: `
    <navheader></navheader>

    <div class="job-actions">
      <div class="left-actions">
        <searchjob></searchjob>
        <filterjobs (filterChange)="onFilterChange($event)"></filterjobs>
      </div>
      
      <div class="right-actions">
        <togglejobs [layout]="layout" (layoutChange)="layoutChange.emit($event)"></togglejobs>
        <button class="add-button" (click)="navigateToApplicationForm()">Add Application</button>
      </div>
    </div>
  `,
  styles: [`
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
      padding: 0.5rem 1rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .add-button:hover {
      background-color: #303f9f;
    }

    @media (max-width: 768px) {
      .job-actions {
        flex-direction: column;
        align-items: stretch;
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
}
