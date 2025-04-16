import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../shared/icon.module';

@Component({
  selector: 'togglejobs',
  standalone: true,
  imports: [CommonModule, IconModule],
  template: `
    <div class="slider-toggle">
      <div class="slider-background">
        <div 
          class="slider-indicator" 
          [ngClass]="{ 'left': layout === 'grid', 'right': layout === 'list' }"
        ></div>
        <button 
          class="toggle-button"  
          (click)="changeLayout('grid')"
          title="Grid View"
        >
          <lucide-icon name="layout-grid" class="toggle-icon" size="20"></lucide-icon>
        </button>
        <button 
          class="toggle-button" 
          (click)="changeLayout('list')"
          title="List View"
        >
          <lucide-icon name="list" class="toggle-icon" size="20"></lucide-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .slider-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .slider-background {
      position: relative;
      display: flex;
      width: 84px;
      height: 44px;
      background-color: var(--bg-color-2);
      border-radius: 5px;
      padding: 4px;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    }

    .toggle-button {
      flex: 1;
      border: none;
      background: transparent;
      cursor: pointer;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }

    .toggle-icon {
      color: var(--text-color);
      padding-top: 0.2rem;
    }

    .slider-indicator {
      position: absolute;
      top: 4px;
      bottom: 4px;
      width: 42px;
      background-color: var(--toggle-color);
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
      z-index: 1;
    }

    .slider-indicator.left {
      transform: translateX(0%);
    }

    .slider-indicator.right {
      transform: translateX(100%);
    }
  `]
})
export class TogglejobsComponent {
  @Input() layout: 'grid' | 'list' = 'grid';
  @Output() layoutChange = new EventEmitter<'grid' | 'list'>();

  changeLayout(layout: 'grid' | 'list') {
    this.layoutChange.emit(layout);
  }
}