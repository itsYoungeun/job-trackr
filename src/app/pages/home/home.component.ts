import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { JoblistComponent } from "../../components/joblist/joblist.component";

@Component({
  selector: 'home',
  imports: [CommonModule, NavbarComponent, JoblistComponent],
  template: `
      <navbar 
        [layout]="layout"
        (layoutChange)="layout = $event"
        (filterChange)="onFilterChange($event)"
        (searchChange)="onSearchChange($event)">
      </navbar>

      <joblist 
        [layout]="layout"
        [filter]="filter"
        [searchTerm]="searchTerm">
      </joblist>
  `,
  styles: [`
  `]
})
export class HomeComponent {
  layout: 'grid' | 'list' = 'grid';
  filter: string = '';
  searchTerm: string = '';

  onFilterChange(filter: string) {
    this.filter = filter;
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
  }
}
