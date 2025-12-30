import { Component } from '@angular/core';
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";

@Component({
  selector: 'app-sitelinks',
  imports: [CodeBlockGuide, Notice, HeadlineGuides],
  templateUrl: './sitelinks.html',
  styleUrl: './sitelinks.scss',
})
export class Sitelinks {

  // 1. The Service (The Heart)
  serviceCode = `import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private doc = inject(DOCUMENT);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private baseUrl = 'https://adenui.com';

  constructor() {
    // The "Auto-Pilot" starts immediately upon injection
    this.initAutoBreadcrumbs();
  }

  // 1. Automatically generate breadcrumbs on navigation
  private initAutoBreadcrumbs() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // ... Logic traverses the router tree ...
      // ... and generates JSON-LD BreadcrumbList ...
    });
  }

  // 2. Helper method for the homepage (Amazon-style)
  setWebsiteSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ADEN UI",
      "url": this.baseUrl
    };
    this.insertSchema(schema);
  }

  // 3. Injection into the <head>
  private insertSchema(schema: any) {
    let script = this.doc.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = this.doc.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
}`;

  // 2. The Route Config
  routesCode = `// app.routes.ts
export const routes: Routes = [
  // Homepage (No breadcrumb needed)
  {
    path: '',
    component: Home
  },

  // Subpages: Just set the 'breadcrumb' property!
  {
    path: 'components',
    loadComponent: ...,
    data: {
      title: 'UI Components',
      breadcrumb: 'Components' // <--- This triggers the service
    }
  },
  {
    path: 'showcase',
    loadComponent: ...,
    data: {
      title: 'Showcase',
      breadcrumb: 'Showcase'
    }
  }
];`;

  // 3. Integration
  integrationCode = `// 1. app.component.ts (Activate globally)
export class AppComponent {
  // Just inject it to start the service (Constructor runs immediately)
  private jsonLd = inject(JsonLdService);
}

// 2. home.component.ts (Define the brand)
export class Home implements OnInit {
  private jsonLd = inject(JsonLdService);

  ngOnInit() {
    // Tells Google: "This is the main page of the brand"
    this.jsonLd.setWebsiteSchema();
  }
}`;

}
