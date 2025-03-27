import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  template: `
    <div>
      <h1>{{ title }}</h1>
    </div>
  `,
  styles: [`
    div {
      background-color: lightgrey;
    }
    `]
})
export class NavbarComponent {
  title = 'JobTrackr';
}
