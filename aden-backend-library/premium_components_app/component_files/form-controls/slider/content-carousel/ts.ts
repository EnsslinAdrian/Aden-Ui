import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  imports: [],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  currentIndex = 0;
  slides = [...];

  /**
   * Calculates the CSS transform value for the slider translation.
   * @returns The translateX CSS transform string based on the current index.
   */
  getTransform() {
    return `translateX(-\${this.currentIndex * 100}%)`;
  }

  /**
   * Advances to the next slide with wrap-around.
   */
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  /**
   * Goes to the previous slide with wrap-around.
   */
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  /**
   * Navigates to a specific slide by index.
   * @param index The target slide index.
   */
  goToSlide(index: number) {
    this.currentIndex = index;
  }
}