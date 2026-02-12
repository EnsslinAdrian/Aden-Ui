import { Component } from '@angular/core';
import { Typografie } from "../../shared/text/typografie/typografie";
import { CommonModule } from '@angular/common';
import { Badge } from '../../shared/ui/badge/badge';

@Component({
  selector: 'app-updates',
  imports: [Typografie, CommonModule, Badge],
  templateUrl: './updates.html',
  styleUrl: './updates.scss',
})
export class Updates {
  updates: ChangelogEntry[] = [
    {
      version: 'v1.0.0',
      date: 'Feb 28, 2026',
      description: 'Initial release of ADEN.',
      changes: [
        { type: 'feature', text: 'Launch of ADEN Design System' },
        { type: 'feature', text: 'Core UI and layout components available' },
        { type: 'feature', text: 'Comprehensive Angular guides available' },
      ]
    },
  ];

}
