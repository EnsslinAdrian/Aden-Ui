import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pipes-interactive-demo',
  imports: [FormsModule, SlicePipe, JsonPipe, DatePipe, CurrencyPipe, UpperCasePipe, LowerCasePipe, TitleCasePipe],
  templateUrl: './pipes-interactive-demo.html',
  styleUrl: './pipes-interactive-demo.scss',
})
export class PipesInteractiveDemo {
  rawText = 'Angular is Awesome';
  selectedTextPipe: 'uppercase' | 'lowercase' | 'titlecase' | 'slice' = 'uppercase';

  // Demo 2: Number & Date Formatting
  rawPrice = 1234.5678;
  rawDate = new Date();
  rawJson = { name: 'Aden', level: 99, items: ['Sword', 'Shield'] };

  // State für Custom Pipe Demo (Truncate)
  customPipeText = 'Dies ist ein sehr langer Text, der eigentlich abgeschnitten werden sollte, damit er ins Layout passt.';
  truncateLimit = 20;
}
