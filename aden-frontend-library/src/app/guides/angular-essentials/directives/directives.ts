import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { CustomAttributeDirective } from "./custom-attribute-directive/custom-attribute-directive";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Typografie } from "../../../shared/text/typografie/typografie";

@Component({
  selector: 'app-directives',
  imports: [Notice, HeadlineGuides, CustomAttributeDirective, CodeBlockGuide, Typografie],
  templateUrl: './directives.html',
  styleUrl: './directives.scss',
})
export class Directives {

  // 1. The Directive Logic
  highlightDirectiveCode = `import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  // The square brackets [] mean: This is used as an attribute.
  // Usage: <div appHighlight>...</div>
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Access the DOM element this directive is attached to
  private el = inject(ElementRef);

  // Allow configuration from outside (e.g. appHighlight="blue")
  @Input() appHighlight = '';

  // Listen to native events on the host element
  @HostListener('mouseenter') onMouseEnter() {
    this.setColor(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor('');
  }

  private setColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = 'background-color 0.3s';
  }
}`;

  // 2. The HTML Usage
  highlightUsageCode = `<!-- 1. Simple usage (default color) -->
<p appHighlight>
  Hover me (Default)
</p>

<!-- 2. Passing a value (custom color) -->
<!-- Note: We assign the string 'cyan' directly to the directive -->
<div appHighlight="cyan" class="box">
  I turn cyan on hover.
</div>

<!-- 3. Works on any tag -->
<button appHighlight="#ff00ff">
  Even Buttons!
</button>`;

}
