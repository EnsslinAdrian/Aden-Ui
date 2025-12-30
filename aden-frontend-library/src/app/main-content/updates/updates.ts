import { Component } from '@angular/core';
import { Typografie } from "../../shared/text/typografie/typografie";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updates',
  imports: [Typografie, CommonModule],
  templateUrl: './updates.html',
  styleUrl: './updates.scss',
})
export class Updates {
  updates: ChangelogEntry[] = [
    {
      version: 'v1.1.0',
      date: '28. Nov 2025',
      description: 'Ein großes Update mit Fokus auf Performance und neuen Grid-Komponenten.',
      changes: [
        { type: 'feature', text: 'Neues Data-Grid mit Sortierfunktion' },
        { type: 'improvement', text: 'Ladezeit um 20% reduziert durch Lazy Loading Optimierung' },
        { type: 'fix', text: 'Fehlerhafte Darstellung im Mobile-Menu behoben' }
      ]
    },
    {
      version: 'v1.0.2',
      date: '15. Nov 2025',
      description: 'Hotfix Release für kleinere Styling-Probleme.',
      changes: [
        { type: 'fix', text: 'Typografie Komponente rendert nun korrekt im Safari' },
        { type: 'improvement', text: 'Kontrast der Border-Colors angepasst' }
      ]
    },
    {
      version: 'v1.0.0',
      date: '01. Nov 2025',
      description: 'Initialer Release von ADEN.',
      changes: [
        { type: 'feature', text: 'Release des kompletten Design Systems' },
        { type: 'feature', text: 'Einführung der Core-Components' }
      ]
    }
  ];

}
