import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { JoblistComponent } from "../../components/joblist/joblist.component";

@Component({
  selector: 'home',
  imports: [CommonModule, NavbarComponent, JoblistComponent],
  template: `
    <navbar [layout]="layout" (layoutChange)="layout = $event"></navbar>
    <joblist [layout]="layout"></joblist>
  `,
  styles: ``
})
export class HomeComponent {
  layout: 'grid' | 'list' = 'grid';
}
