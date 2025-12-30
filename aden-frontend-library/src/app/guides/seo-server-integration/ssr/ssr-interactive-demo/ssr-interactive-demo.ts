import { Component } from '@angular/core';

@Component({
  selector: 'app-ssr-interactive-demo',
  imports: [],
  templateUrl: './ssr-interactive-demo.html',
  styleUrl: './ssr-interactive-demo.scss',
})
export class SsrInteractiveDemo {
  activeView: 'visual' | 'source' = 'visual';

  // CSR State
  csrLoading = true;
  csrContentVisible = false;

  // SSR State
  ssrHydrating = false; // SSR ist sofort sichtbar, muss aber hydrieren

  ngOnInit() {
    this.startSimulation();
  }

  startSimulation() {
    // Reset
    this.csrLoading = true;
    this.csrContentVisible = false;
    this.ssrHydrating = true;

    // 1. SSR ist sofort da (nur Hydration dauert kurz)
    setTimeout(() => {
      this.ssrHydrating = false;
    }, 800);

    // 2. CSR muss erst JS laden (Verzögerung)
    setTimeout(() => {
      this.csrLoading = false;
      this.csrContentVisible = true;
    }, 2500); // 2.5s Verzögerung für dramatischen Effekt
  }

  toggleView(view: 'visual' | 'source') {
    this.activeView = view;
  }
}
