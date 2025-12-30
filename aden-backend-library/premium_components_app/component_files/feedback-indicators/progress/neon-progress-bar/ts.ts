
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  progressValue = 45;

  /**
  * Example Angular component demonstrating progress value management.
  *
  * @property {number} progressValue - Current progress value (default: 45)
  */
  updateProgress(newValue: number) {
    this.progressValue = newValue;
  }
}
  