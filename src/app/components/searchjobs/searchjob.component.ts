import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'searchjob',
  imports: [],
  template: `
    <div>
      <input type="text" placeholder="Search job applications..." />
    </div>
  `,
  styles: [`
    `]
})
export class SearchjobComponent {
  constructor(private router: Router) {}
}
