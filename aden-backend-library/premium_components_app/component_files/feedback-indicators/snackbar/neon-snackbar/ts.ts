
import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  imports: [],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  isVisible = false;
  timeoutId: any;

  /**
   * Displays the snackbar for 3 seconds.
   * Clears any existing timeout before starting a new one.
   */
  showSnackbar() {
    this.isVisible = true;

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}
  