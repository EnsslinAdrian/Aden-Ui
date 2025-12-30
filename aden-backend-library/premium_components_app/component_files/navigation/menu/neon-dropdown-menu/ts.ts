import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    isOpen = false;
    lastAction = '';

    /**
     * Toggles the menu open/closed state.
     */
    toggleMenu() {
        this.isOpen = !this.isOpen;
    }

    /**
     * Closes the menu by setting isOpen to false.
     */
    closeMenu() {
        this.isOpen = false;
    }

    /**
     * Selects an action, closes the menu, and resets after 2 seconds.
     * @param action - The action identifier to select
     */
    selectAction(action: string) {
        this.lastAction = action;
        this.closeMenu();
        setTimeout(() => { if (this.lastAction === action) this.lastAction = ''; }, 2000);
    }
}
