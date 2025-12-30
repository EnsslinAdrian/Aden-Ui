import { Component } from '@angular/core';
import { BrowserMockup } from "../../../../shared/ui/browser-mockup/browser-mockup";

@Component({
  selector: 'app-guards-interactive-demo',
  imports: [BrowserMockup],
  templateUrl: './guards-interactive-demo.html',
  styleUrl: './guards-interactive-demo.scss',
})
export class GuardsInteractiveDemo {
  isLoggedIn = false;
  currentPath = 'home';
  accessDeniedAnimation = false;

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    // Wenn man sich ausloggt und gerade im Admin-Bereich ist, wird man rausgeworfen
    if (!this.isLoggedIn && this.currentPath === 'admin') {
      this.currentPath = 'home';
    }
  }

  tryNavigate(path: string) {
    // Die Guard-Simulation
    if (path === 'admin' && !this.isLoggedIn) {
      // Zugriff verweigert!
      this.triggerAccessDenied();
    } else {
      // Zugriff erlaubt
      this.currentPath = path;
    }
  }

  // Visuelles Feedback für "Geblockt"
  triggerAccessDenied() {
    this.accessDeniedAnimation = true;
    setTimeout(() => {
      this.accessDeniedAnimation = false;
    }, 500);
  }
}
