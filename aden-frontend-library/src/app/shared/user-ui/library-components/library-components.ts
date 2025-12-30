import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-library-components',
  imports: [RouterLink],
  templateUrl: './library-components.html',
  styleUrl: './library-components.scss',
})
export class LibraryComponents {
  // Das Daten-Objekt (Pflicht)
  comp = input.required<any>();

  // Der aktuelle Modus ('created' oder 'saved') (Pflicht)
  tab = input.required<'created' | 'saved'>();
}
