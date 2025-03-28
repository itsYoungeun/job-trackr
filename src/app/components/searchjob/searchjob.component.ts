import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'searchjob',
  imports: [],
  template: `
    <div>
      <input type="text" placeholder="Search job applications..." />
      <button>Filter</button>
      <button>Toggle</button>
      <button (click)="navigateToApplicationForm()">Add Application</button>
    </div>
  `,
  styles: [`
    `]
})
export class SearchjobComponent {
  constructor(private router: Router) {}

  navigateToApplicationForm() {
    this.router.navigate(['/add-application']);
  }
}
