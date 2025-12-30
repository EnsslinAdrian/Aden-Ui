
import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  imports: [],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  isOpen = false;

  /**
   * Opens the dialog by setting isOpen to true.
   */
  openDialog() {
    this.isOpen = true;
  }

  /**
   * Closes the dialog by setting isOpen to false.
   */
  closeDialog() {
    this.isOpen = false;
  }
}
  