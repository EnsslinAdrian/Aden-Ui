import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SiteRoute {
  path: string;
  priority: number;
  changefreq: string;
}

@Component({
  selector: 'app-sitemap-simulater',
  imports: [FormsModule],
  templateUrl: './sitemap-simulater.html',
  styleUrl: './sitemap-simulater.scss',
})
export class SitemapSimulater {
  baseUrl = 'https://www.example.com';

  routes: SiteRoute[] = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog', priority: 0.9, changefreq: 'weekly' },
    { path: '/contact', priority: 0.5, changefreq: 'yearly' }
  ];

  frequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

  addRoute() {
    this.routes.push({ path: '/new-page', priority: 0.5, changefreq: 'monthly' });
  }

  removeRoute(index: number) {
    this.routes.splice(index, 1);
  }

  get xmlOutput(): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    this.routes.forEach(route => {
      const cleanPath = route.path.startsWith('/') ? route.path : '/' + route.path;

      xml += `
  <url>
    <loc>${this.baseUrl}${cleanPath}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    xml += `
</urlset>`;
    return xml;
  }
}
