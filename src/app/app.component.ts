import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JoblistComponent } from "./components/joblist/joblist.component";
import { SearchjobComponent } from "./components/searchjob/searchjob.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, JoblistComponent, SearchjobComponent],
  template: `
    <navbar></navbar>
    <searchjob></searchjob>
    <joblist></joblist>

    <router-outlet />
  `,
  styles: [`
  `],
})
export class AppComponent {
}
