import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  imports: [],
  template: `
    <div>
      <h1>{{ title }}</h1>
    </div>
  `,
  styles: [`
    div {
      color: black;
    }
    `]
})
export class NavbarComponent {
  title = 'JobTrackr';
}
