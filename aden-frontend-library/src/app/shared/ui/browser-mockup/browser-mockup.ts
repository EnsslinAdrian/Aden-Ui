import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-browser-mockup',
  imports: [],
  templateUrl: './browser-mockup.html',
  styleUrl: './browser-mockup.scss',
})
export class BrowserMockup {
  /** Simple URL string (optional) */
  @Input() url: string | null = null;

  /** Optional visual feedback (e.g. Guards demo) */
  @Input() shake = false;
}
