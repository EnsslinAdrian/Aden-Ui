import { Component } from '@angular/core';
import { BrowserMockup } from "../../../../shared/ui/browser-mockup/browser-mockup";

@Component({
  selector: 'app-routing-interactive-demo',
  imports: [BrowserMockup],
  templateUrl: './routing-interactive-demo.html',
  styleUrl: './routing-interactive-demo.scss',
})
export class RoutingInteractiveDemo {
  currentPath = 'home';

  navigateTo(path: string) {
    this.currentPath = path;
  }
}
