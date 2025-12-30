
import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    openPanelIndex: number | null = null;

    panels = [
        { headline: 'Neon Button Integration', content: 'Der Neon Button kann einfach über npm installiert werden und nutzt CSS Variablen für das Leuchten.' },
        { headline: 'Magnetic Hover Effect', content: 'Basierend auf GSAP sorgt dieser Effekt dafür, dass der Button dem Mauszeiger magnetisch folgt.' },
        { headline: 'ADEN Design System', content: 'Unser Design System basiert auf Dark-Mode First Prinzipien und hoher Performance.' },
    ];

    /**
     * Toggles the expansion state of a panel at the specified index.
     * @param index - The index of the panel to toggle
     */
    toggleExpansionPanel(index: number): void {
        if (this.openPanelIndex === index) {
            this.openPanelIndex = null;
        } else {
            this.openPanelIndex = index;
        }
    }

    /**
     * Prüft, ob das Panel mit dem angegebenen Index geöffnet ist.
     * @param index - Der Index des zu prüfenden Panels
     * @returns 'true', wenn das Panel geöffnet ist, sonst 'false'
     */
    isPanelOpen(index: number): boolean {
        return this.openPanelIndex === index;
    }
}
