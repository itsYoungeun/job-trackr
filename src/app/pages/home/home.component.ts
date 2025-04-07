import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { JoblistComponent } from "../../components/joblist/joblist.component";

@Component({
  selector: 'home',
  imports: [NavbarComponent, JoblistComponent],
  template: `
    <navbar></navbar>
    <joblist></joblist>
  `,
  styles: ``
})
export class HomeComponent {

}
