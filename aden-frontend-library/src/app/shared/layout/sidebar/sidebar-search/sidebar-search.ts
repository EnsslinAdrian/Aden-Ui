import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-search',
  imports: [FormsModule],
  templateUrl: './sidebar-search.html',
  styleUrl: './sidebar-search.scss',
})
export class SidebarSearch {
  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
}
