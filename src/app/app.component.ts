import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar></navbar>
    <router-outlet />
  `,
  styles: [`
    `],
})
export class AppComponent {
}
