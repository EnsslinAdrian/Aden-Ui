import { DOCUMENT, inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonLd {
  private doc = inject(DOCUMENT);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private readonly baseUrl = 'https://adenui.com'; // Deine Domain

  constructor() {
    // Startet den Auto-Piloten sofort beim Laden der App
    this.initAutoBreadcrumbs();
  }

  // Manuelles Einfügen (für Home oder ganz spezielle Seiten)
  insertSchema(schema: any) {
    let script = this.doc.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = this.doc.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  // --- DER AUTO-PILOT ---
  private initAutoBreadcrumbs() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.generateBreadcrumbs();
    });
  }

  private generateBreadcrumbs() {
    let currentRoute = this.activatedRoute.root;
    let url = '';

    // Startpunkt: Home
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": this.baseUrl
      }
    ];

    let position = 2;

    // Wir laufen durch alle Kinder-Routen
    while (currentRoute.children.length > 0) {
      const childRoute = currentRoute.children[0];
      const routeConfig = childRoute.snapshot.routeConfig;

      // URL zusammenbauen
      if (routeConfig && routeConfig.path) {
        url += `/${routeConfig.path}`;
      }

      // Prüfen: Hat diese Route einen Breadcrumb-Namen?
      if (childRoute.snapshot.data['breadcrumb']) {
        breadcrumbs.push({
          "@type": "ListItem",
          "position": position,
          "name": childRoute.snapshot.data['breadcrumb'],
          "item": this.baseUrl + url
        });
        position++;
      }

      currentRoute = childRoute;
    }

    // Nur generieren, wenn wir tiefer als Home sind
    if (breadcrumbs.length > 1) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs
      };
      this.insertSchema(schema);
    }
  }

  setWebsiteSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ADEN UI",
      "url": "https://adenui.com",
    };
    this.insertSchema(schema);
  }
}
