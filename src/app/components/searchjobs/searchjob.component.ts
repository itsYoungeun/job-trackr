import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'searchjob',
  standalone: true,
  template: `
    <input 
      type="text" 
      placeholder="Search job applications..." 
      (input)="onSearch($event)" />
  `,
  styles: [``]
})
export class SearchjobComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value.toLowerCase());
  }
}
