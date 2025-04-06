import { Component } from '@angular/core';
import { JoblistComponent } from "../../components/joblist/joblist.component";

@Component({
  selector: 'home',
  imports: [JoblistComponent],
  template: `
    <joblist></joblist>
  `,
  styles: ``
})
export class HomeComponent {

}
