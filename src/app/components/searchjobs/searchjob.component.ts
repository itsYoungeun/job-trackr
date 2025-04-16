import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'searchjob',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input 
      type="text" 
      placeholder="Search job applications..." 
      (input)="onSearch($event)"
      class="search-input"
    />
  `,
  styles: [`
    .search-input {
      width: 11rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.7rem;
      color: var(--text-color);
      background-color: var(--bg-color-2);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      outline: none;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transition: border-color 0.2s ease;
    }

    .search-input:focus,
    .search-input:hover {
      border-color: var(--border-hover);
    }

    .search-input::placeholder {
      color: #9ca3af;
    }
  `]
})
export class SearchjobComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value.toLowerCase());
  }
}
