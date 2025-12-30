import { Component } from '@angular/core';
import { BrowserMockup } from "../../../../shared/ui/browser-mockup/browser-mockup";

@Component({
  selector: 'app-lazy-loading-interactive-demo',
  imports: [BrowserMockup],
  templateUrl: './lazy-loading-interactive-demo.html',
  styleUrl: './lazy-loading-interactive-demo.scss',
})
export class LazyLoadingInteractiveDemo {
  currentState: 'home' | 'loading' | 'admin' = 'home';
  loadedSize = 0;

  // Simuliert den Router-Navigation und das Laden des Chunks
  navigateToAdmin() {
    if (this.currentState === 'admin') return;

    this.currentState = 'loading';
    this.loadedSize = 0;

    // Simuliere Netzwerk-Download (Chunk loading)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      this.loadedSize = progress;

      if (progress >= 100) {
        clearInterval(interval);
        this.currentState = 'admin';
      }
    }, 150); // Dauer des "Downloads"
  }

  backToHome() {
    this.currentState = 'home';
    // Hinweis: In echt würde der Chunk gecached bleiben,
    // aber für die Demo resetten wir es, damit man es nochmal sehen kann.
  }
}
