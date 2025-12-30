import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

declare var Prism: any;

@Component({
  selector: 'app-code-highlight',
  imports: [CommonModule],
  templateUrl: './code-highlight.html',
  styleUrl: './code-highlight.scss',
})
export class CodeHighlight {
  @Input({ required: true }) code = '';
  @Input() language = 'html';

  @ViewChild('codeElement', { static: true }) codeElement!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] || changes['language']) {
      this.highlight();
    }
  }

  private highlight() {
    if (!this.codeElement) return;
    const el = this.codeElement.nativeElement;
    el.textContent = this.code;
    el.className = 'language-' + this.language;
    if (typeof Prism !== 'undefined') {
      Prism.highlightElement(el);
    }
  }
}
