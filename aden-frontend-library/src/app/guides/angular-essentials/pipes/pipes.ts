import { Component } from '@angular/core';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { PipesInteractiveDemo } from "./pipes-interactive-demo/pipes-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";

@Component({
  selector: 'app-pipes',
  imports: [HeadlineGuides, FormsModule, SlicePipe, PipesInteractiveDemo, CodeBlockGuide, Notice],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss',
})
export class Pipes {

  // 1. The Logic
  truncatePipeCode = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate', // This is how you use it: {{ val | truncate }}
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  // The 'transform' method is mandatory.
  // value: The data coming in before the pipe (|)
  // limit: An optional argument passed with :
  transform(value: string, limit: number = 20): string {
    if (!value) return '';

    if (value.length <= limit) {
      return value;
    }

    // Cut string and append dots
    return value.substring(0, limit) + '...';
  }
}`;

  // 2. The Usage
  truncatePipeUsageCode = `<!-- 1. Default limit (20) -->
<p>{{ articleDescription | truncate }}</p>

<!-- 2. Custom limit (passing arguments with :) -->
<p>{{ articleDescription | truncate:50 }}</p>

<!-- 3. Chaining Pipes (Chainable) -->
<!-- First truncate, then uppercase -->
<p>{{ title | truncate:10 | uppercase }}</p>`;

  // State for the mini-demo
  customPipeText = 'This is a very long text that should actually be truncated to fit into the card layout. Pipes are perfect for this job because they keep the original data intact.';
  truncateLimit = 30;
}
