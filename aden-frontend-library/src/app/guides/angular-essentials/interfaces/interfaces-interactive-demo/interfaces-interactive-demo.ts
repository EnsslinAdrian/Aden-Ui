import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interfaces-interactive-demo',
  imports: [FormsModule],
  templateUrl: './interfaces-interactive-demo.html',
  styleUrl: './interfaces-interactive-demo.scss',
})
export class InterfacesInteractiveDemo {
    // Model Daten
  username = '';
  age: number | null = null;
  isPremium = false;

  // Simulation Status
  compilerStatus: 'idle' | 'success' | 'error' = 'idle';
  errorMessage = '';

  checkTypes() {
    this.compilerStatus = 'idle';

    // Kurze Verzögerung für "Compiler" Feeling
    setTimeout(() => {
      // Regel 1: Username ist Pflicht (string)
      if (!this.username.trim()) {
        this.errorMessage = "Property 'username' is missing or empty.";
        this.compilerStatus = 'error';
        return;
      }

      // Regel 2: Age muss eine Nummer sein (TypeScript Runtime Check Simulation)
      if (this.age === null || this.age < 0) {
        this.errorMessage = "Property 'age' must be a valid number.";
        this.compilerStatus = 'error';
        return;
      }

      // Alles gut
      this.compilerStatus = 'success';
    }, 400);
  }
}
