import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ChangeType = 'feature' | 'improvement' | 'fix';

export interface Change {
  type: ChangeType;
  text: string;
}

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  @Input({ required: true }) change!: Change;
}
