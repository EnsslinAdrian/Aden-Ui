import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    @ViewChild('contentContainer') contentContainer!: ElementRef;

    labels = ['Content 1', 'Content 2', 'Content 3'];
    activeLabel = 0;

    /**
     * Sets the active label by index.
     * @param index - The index of the label to select
     */
    selectLabel(index: number): void {
        this.activeLabel = index;
    }
}
