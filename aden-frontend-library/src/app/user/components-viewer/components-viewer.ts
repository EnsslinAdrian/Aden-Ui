import { Component, inject, signal, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { COMPONENT_REGISTRY } from '../../../service/components/library/component-registry';
import { JsonLd } from '../../../service/seo/sitelinks/json-ld';
import { Seo } from '../../../service/seo/meta/seo';

@Component({
  selector: 'app-components-viewer',
  imports: [NgComponentOutlet],
  templateUrl: './components-viewer.html',
  styleUrl: './components-viewer.scss',
})
export class ComponentsViewer {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jsonLd = inject(JsonLd);
  private seo = inject(Seo);

  selectedComponent = signal<Type<any> | null>(null);

  // WICHTIG: Diese Variable fehlte!
  currentSlug = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      const subcategory = params.get('subcategory');

      if (slug && subcategory) {
        this.currentSlug = slug;

        this.loadComponent(slug);

        if (this.selectedComponent()) {
            this.setSeoAndBreadcrumbs(slug, subcategory);
        }
      }
    });
  }

  private loadComponent(slug: string) {
    const comp = COMPONENT_REGISTRY[slug];
    if (comp) {
      this.selectedComponent.set(comp);
    } else {
      this.selectedComponent.set(null);
    }
  }

  private setSeoAndBreadcrumbs(slug: string, subcategory: string) {
    const prettyName = this.formatSlug(slug);

    this.seo.updateSeo({
      title: `${prettyName} Component - Aden UI`,
      description: `Documentation, examples and API for the Angular ${prettyName} component.`,
    });

    this.jsonLd.insertSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://adenui.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Components",
          "item": "https://adenui.com/components"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": this.formatSlug(subcategory),
          "item": `https://adenui.com/components#${subcategory}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": prettyName,
          "item": `https://adenui.com/components/${subcategory}/${slug}`
        }
      ]
    });
  }

  private formatSlug(text: string): string {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  goBack() {
    this.router.navigate(['/components']);
  }
}
