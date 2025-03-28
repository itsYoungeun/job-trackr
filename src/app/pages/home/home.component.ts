import { Component } from '@angular/core';
import { SearchjobComponent } from "../../components/searchjob/searchjob.component";
import { JoblistComponent } from "../../components/joblist/joblist.component";

@Component({
  selector: 'home',
  imports: [SearchjobComponent, JoblistComponent],
  template: `
    <searchjob></searchjob>
    <joblist></joblist>
  `,
  styles: ``
})
export class HomeComponent {

}
