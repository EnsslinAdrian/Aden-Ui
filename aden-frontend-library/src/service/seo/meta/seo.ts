import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  slug?: string;
  breadcrumbs?: string;
  robots?: string; // z.B. 'noindex, nofollow'
}

@Injectable({
  providedIn: 'root',
})
export class Seo {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private doc = inject(DOCUMENT);

  // WICHTIG: Für SEO brauchen wir immer die echte Domain als String.
  // Wenn UrlsService ein Objekt ist, nimm lieber hier die feste Domain.
  private readonly domain = 'https://adenui.com';

  updateSeo(config: SeoConfig) {
    // 1. Browser Title
    const fullTitle = `${config.title} | Aden UI`;
    this.titleService.setTitle(fullTitle);

    // 2. Meta Description
    this.setMeta('name', 'description', config.description);

    // 3. Robots (Indexierung steuern) - NEU!
    if (config.robots) {
      this.metaService.updateTag({ name: 'robots', content: config.robots });
    } else {
      // Standard: Erlauben
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    }

    // 4. Canonical URL (Gegen Duplicate Content) - NEU!
    // Baut: https://adenui.com/components/button
    const cleanSlug = config.slug || this.router.url.split('?')[0]; // Query Params entfernen
    this.createLink('canonical', `${this.domain}${cleanSlug}`);


    // 5. Open Graph (Social Media)
    this.setMeta('property', 'og:title', fullTitle);
    this.setMeta('property', 'og:description', config.description);
    this.setMeta('property', 'og:url', this.domain + (config.slug || this.router.url));
    this.setMeta('property', 'og:type', 'website');

    // 6. Twitter Card
    this.setMeta('name', 'twitter:card', 'summary_large_image');
    this.setMeta('name', 'twitter:title', fullTitle);
    this.setMeta('name', 'twitter:description', config.description);

    // 7. Image Handling
    if (config.image) {
      // Prüfen ob absoluter Pfad (http) oder relativer Pfad (/assets...)
      const imageUrl = config.image.startsWith('http')
        ? config.image
        : `${this.domain}${config.image.startsWith('/') ? '' : '/'}${config.image}`;

      this.setMeta('property', 'og:image', imageUrl);
      this.setMeta('name', 'twitter:image', imageUrl);
    } else {
      // Fallback Bild
      const defaultImg = `${this.domain}/assets/img/aden-preview-default.png`;
      this.setMeta('property', 'og:image', defaultImg);
      this.setMeta('name', 'twitter:image', defaultImg);
    }
  }

  // Hilfsmethode für Meta Tags
  private setMeta(keyAttr: 'name' | 'property', keyVal: string, content: string) {
    this.metaService.updateTag({ [keyAttr]: keyVal, content: content });
  }

  // Hilfsmethode für <link> Tags (Canonical)
  private createLink(rel: string, href: string) {
    // Versuchen, den existierenden Tag zu finden
    let link: HTMLLinkElement | null = this.doc.querySelector(`link[rel='${rel}']`);

    // Wenn nicht da, neu erstellen
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', rel);
      this.doc.head.appendChild(link);
    }

    // Wert setzen
    link.setAttribute('href', href);
  }
}
