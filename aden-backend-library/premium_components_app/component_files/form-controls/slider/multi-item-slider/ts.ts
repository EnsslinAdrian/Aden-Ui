
import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    feedbacks = [];

    currentIndex = 0;
    itemsVisible = 2;

    /** Advances to the next slide if not at the end */
    next() {
        if (!this.isEnd()) {
            this.currentIndex++;
        }
    }

    /** Moves to the previous slide if not at the start */
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    /** Checks if the slider has reached the end */
    isEnd(): boolean {
        return this.currentIndex >= this.feedbacks.length - this.itemsVisible;
    }

    /** Calculates the CSS transform for sliding the track based on current index */
    getTransform() {
        const itemWidthPercent = 100 / this.itemsVisible;
        const move = -(this.currentIndex * itemWidthPercent);
        return `translateX(${move}%)`;
    }
}
