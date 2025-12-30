import { Component, Input } from '@angular/core';
import { GuideBadge } from "../guide-badge/guide-badge";
import { Typografie } from "../../text/typografie/typografie";

@Component({
  selector: 'app-headline-guides',
  imports: [GuideBadge, Typografie],
  templateUrl: './headline-guides.html',
  styleUrl: './headline-guides.scss',
})
export class HeadlineGuides {
@Input() badgeText: string = '';
@Input() headline: string = ''
@Input() subheadline: string = '';
}
