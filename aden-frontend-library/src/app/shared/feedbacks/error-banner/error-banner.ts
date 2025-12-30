import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  imports: [],
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.scss',
})
export class ErrorBanner {
  errorMsg = input<string | null>();
}
