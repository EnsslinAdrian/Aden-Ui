import { Component, Input } from '@angular/core';

export interface FilterItem {
  label: string;
  targetId: string;
}

@Component({
  selector: 'app-components-filter',
  imports: [],
  templateUrl: './components-filter.html',
  styleUrl: './components-filter.scss',
})
export class ComponentsFilter {
 @Input() items: FilterItem[] = [];
  @Input() title: string = 'Navigation';

  activeId: string = '';

  ngOnInit() {
    // Setzt den ersten Tab aktiv beim Laden
    if (this.items.length > 0) {
      this.activeId = this.items[0].targetId;
    }
  }

scrollTo(id: string) {
    // 1. Aktiv-Status setzen
    this.activeId = id;

    // 2. Element suchen
    const element = document.getElementById(id);

    if (element) {
      // 3. Native Browser-Funktion nutzen
      // 'block: start' heißt: Scrolle so, dass das Element oben beginnt
      // 'inline: nearest' verhindert seitliches Springen
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    } else {
      console.warn(`Element mit ID '${id}' nicht gefunden!`);
    }
  }
}
