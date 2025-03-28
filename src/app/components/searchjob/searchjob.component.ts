import { Component } from '@angular/core';

@Component({
  selector: 'searchjob',
  imports: [],
  template: `
    <div>
      <input type="text" placeholder="Search job applications..." />
      <button>Filter</button>
      <button>Toggle</button>
      <button>Add Application</button>
    </div>
  `,
  styles: ``
})
export class SearchjobComponent {

}
