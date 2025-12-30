import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warning-btn',
  imports: [],
  templateUrl: './warning-btn.html',
  styleUrl: './warning-btn.scss',
})
export class WarningBtn {
  @Input() disabled: boolean = false;
  @Input() text: string = 'Warning Button';
}
