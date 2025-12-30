import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search || !text) return text;

    // Sonderzeichen maskieren
    const escaped = search.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

    // Case-insensitive matching
    const regex = new RegExp(escaped, 'gi');

    // HTML ersetzen
    return text.replace(regex, match =>
      `<span class="highlight-match">${match}</span>`
    );
  }
}
