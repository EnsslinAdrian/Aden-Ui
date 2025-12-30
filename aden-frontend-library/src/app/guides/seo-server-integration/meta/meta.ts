import { Component } from '@angular/core';
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { MetaInteractiveDemo } from "./meta-interactive-demo/meta-interactive-demo";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";

@Component({
  selector: 'app-meta',
  imports: [CodeBlockGuide, Notice, MetaInteractiveDemo, HeadlineGuides],
  templateUrl: './meta.html',
  styleUrl: './meta.scss',
})
export class Meta {

  indexHtmlCode = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Aden Library</title>
  <base href="/">
  <!-- Important for mobile ranking! -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <!-- Canonical prevents duplicate content issues -->
  <link rel="canonical" href="https://aden-library.com">
</head>
<body>
  <app-root></app-root>
</body>
</html>`;

  seoServiceCode = `import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  updateSeo(config: SeoConfig) {
    const fullTitle = \`\${config.title} | Aden Library\`;
    this.titleService.setTitle(fullTitle);

    // Standard Meta Tags
    this.setMeta('name', 'description', config.description);

    // Open Graph (WhatsApp, LinkedIn, Discord)
    this.setMeta('property', 'og:title', fullTitle);
    this.setMeta('property', 'og:description', config.description);

    if (config.image) {
       this.setMeta('property', 'og:image', config.image);
    }
  }

  private setMeta(attr: string, key: string, content: string) {
    this.metaService.updateTag({ [attr]: key, content: content });
  }
}`;

  // 1. Static Routes
  staticRoutesCode = `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // Define SEO data directly in the route config
    data: {
      title: 'Home - UI Components',
      description: 'The best library for Angular components.'
    }
  },
  {
    path: 'imprint',
    loadComponent: ... ,
    data: {
      title: 'Imprint',
      description: 'Legal information and contact.'
    }
  }
];`;

  // 2. The Auto-Pilot
  autoPilotCode = `// app.component.ts
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

export class AppComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  ngOnInit() {
    this.router.events.pipe(
      // 1. Wait for navigation to finish
      filter(event => event instanceof NavigationEnd),
      // 2. Get current route
      map(() => this.activatedRoute),
      // 3. Traverse down to the active child route
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      // 4. Extract data property
      mergeMap(route => route.data)
    ).subscribe(data => {

      // If SEO data is present -> Set it automatically
      if (data['title']) {
        this.seoService.updateSeo({
          title: data['title'],
          description: data['description'],
          image: data['image']
        });
      }
    });
  }
}`;

  // 3. Dynamic Data
  dynamicUsageCode = `// member-profile.ts
ngOnInit() {
  // We cannot use route data here because the username is dynamic.
  // SSR waits for this API call to finish!
  this.userService.getProfile('johndoe').subscribe(user => {

    // Overwrite metadata with real user info
    this.seo.updateSeo({
      title: \`\${user.firstName} \${user.lastName}\`,
      description: \`Check out the profile of \${user.firstName}.\`,
      image: user.avatarUrl
    });

  });
}`;

}
