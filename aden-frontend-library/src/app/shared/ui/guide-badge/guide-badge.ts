import { Component, Input } from '@angular/core';
import { Typografie } from "../../text/typografie/typografie";

@Component({
  selector: 'app-guide-badge',
  imports: [Typografie],
  templateUrl: './guide-badge.html',
  styleUrl: './guide-badge.scss',
})
export class GuideBadge {
  @Input() text: string = '';
}
