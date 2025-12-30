import { Component, Input } from '@angular/core';
import { Typografie } from "../../text/typografie/typografie";

@Component({
  selector: 'app-notice',
  imports: [Typografie],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
})
export class Notice {
  @Input() noticeType: 'tipp' | 'warning' | 'error' | 'setting' | 'success' = 'tipp';
  @Input() noticeText: string = '';
}
