import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CodeHighlight } from "../../code-highlight/code-highlight";

@Component({
  selector: 'app-ui-playground-code',
  imports: [CodeHighlight],
  templateUrl: './ui-playground-code.html',
  styleUrl: './ui-playground-code.scss',
})
export class UiPlaygroundCode {
  private router = inject(Router);

  // --- INPUTS ---
  mode = input.required<'code' | 'install'>();
  lang = input<'html' | 'scss' | 'ts'>('html');

  codeHtml = input('');
  codeScss = input('');
  codeTs = input('');
  codeInstall = input('');

  canView = input.required<boolean>();
  isPremium = input.required<boolean>();

  protected placeholderCode = `
    <!-- Locked Content -->
    <div class="premium-component">
      <div class="header">
        <h1>Premium Access Only</h1>
      </div>
      <div class="content">
        <p>Unlock to view the full source code implementation.</p>
        <span>*****************</span>
        <span>*****************</span>
        <span>*****************</span>
      </div>
    </div>
  `;

  // --- DER FIX: Computed Signal (Das berechnet den Code String) ---
  currentCodeDisplay = computed(() => {
    // 1. Check: Darf der User sehen?
    if (!this.canView()) {
      return this.placeholderCode;
    }

    // 2. Check: Welche Sprache ist gewählt?
    const language = this.lang();

    switch (language) {
      case 'html': return this.codeHtml();
      case 'scss': return this.codeScss();
      case 'ts':   return this.codeTs();
      default:     return '';
    }
  });

  handleAccessAction() {
    if (this.isPremium()) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    }
  }
}
