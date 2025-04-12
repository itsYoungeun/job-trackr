import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavheaderComponent } from '../../components/navheader/navheader.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, NavheaderComponent],
  template: `
    <navheader></navheader>

    <p>
      profile works!
    </p>
  `,
  styles: ``
})
export class ProfileComponent {

}
