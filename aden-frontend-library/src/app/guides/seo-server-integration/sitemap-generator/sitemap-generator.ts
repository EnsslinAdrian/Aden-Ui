import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";
import { SitemapSimulater } from "./sitemap-simulater/sitemap-simulater";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-sitemap-generator',
  imports: [FormsModule, HeadlineGuides, Notice, SitemapSimulater, CodeBlockGuide],
  templateUrl: './sitemap-generator.html',
  styleUrl: './sitemap-generator.scss',
})
export class SitemapGenerator {

  // 1. The Node Script
  scriptCode = `const fs = require('fs');

// 1. Define all routes (in real apps often fetched dynamically from an API)
const routes = [
  '/',
  '/about',
  '/blog',
  '/blog/angular-seo'
];

const baseUrl = 'https://www.your-domain.com';
const distPath = './dist/my-app/browser/sitemap.xml';

// 2. Build XML header
let xml = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\`;

// 3. Loop through routes
routes.forEach(route => {
  xml += \`
  <url>
    <loc>\${baseUrl}\${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\`;
});

xml += \`</urlset>\`;

// 4. Write file (after the build!)
fs.writeFileSync(distPath, xml);
console.log('✅ Sitemap generated at ' + distPath);`;

  // 2. The Build Command
  packageJsonCode = `{
  "scripts": {
    "start": "ng serve",
    // Chain command: First build, then generate sitemap
    "build": "ng build && node scripts/generate-sitemap.js"
  }
}`;

}
