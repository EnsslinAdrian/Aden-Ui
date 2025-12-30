import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    items = [
        { title: 'Item 1', content: 'Content 1', expanded: true },
        { title: 'Item 2', content: 'Content 2', expanded: false }
    ];

    /**
     * Toggles the expanded state of an item at the specified index.
     * @param index - The index of the item to toggle
     */
    toggle(index: number) {
        this.items[index].expanded = !this.items[index].expanded;
    }
}
