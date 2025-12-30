import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserMockup } from "../../../../shared/ui/browser-mockup/browser-mockup";

@Component({
  selector: 'app-interactive-demo',
  imports: [BrowserMockup],
  templateUrl: './interactive-demo.html',
  styleUrl: './interactive-demo.scss',
})
export class InteractiveDemo {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  isAutoScrollEnabled = false;
  currentPage = 'page1';

  toggleFeature() {
    this.isAutoScrollEnabled = !this.isAutoScrollEnabled;
  }

  navigateTo(page: string) {
    this.currentPage = page;

    // Die Simulation der Angular-Funktionalität
    if (this.isAutoScrollEnabled) {
      // Kleiner Timeout, damit das DOM erst rendert (wie im echten Router)
      setTimeout(() => {
        if (this.scrollContainer) {
          this.scrollContainer.nativeElement.scrollTop = 0;
        }
      }, 10);
    }
    // Wenn deaktiviert: Wir machen nichts. Der Container bleibt runtergescrollt.
  }
}
