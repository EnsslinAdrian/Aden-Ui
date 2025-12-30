import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { GUIDE_ROUTES } from './app/routes/guide.routes';
import { COMPONENT_ROUTES } from './app/routes/component.routes';


interface ComponentData {
  slug: string;
  subcategory: string;
}

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

const API_URL = 'http://localhost:8000/api/meta-components/';

// -------------------------------------------------------------------------
// SITEMAP GENERATOR (ASYNC)
// -------------------------------------------------------------------------
app.get('/sitemap.xml', async (req, res) => {
  const baseUrl = 'https://adenui.com';
  const urls: string[] = [];

  // 1. STATISCHE SEITEN
  const staticPages = [
    '',
    '/components',
    '/guides',
    '/showcase',
    '/updates',
    '/contribution',
    '/login',
    '/register',
    '/imprint',
    '/legal-notice'
  ];
  staticPages.forEach(page => urls.push(`${baseUrl}${page}`));

  COMPONENT_ROUTES.forEach(route => {
    if (route.path && !route.path.includes(':')) {
      urls.push(`${baseUrl}/${route.path}`);
    }
  });

  GUIDE_ROUTES.forEach(route => {
    if (route.path) {
      urls.push(`${baseUrl}/${route.path}`);
    }
  });

  try {
    const response = await fetch(API_URL);

    if (response.ok) {
      const components = await response.json() as ComponentData[];

      components.forEach(comp => {
        if (comp.subcategory && comp.slug) {
           urls.push(`${baseUrl}/components/${comp.subcategory}/${comp.slug}`);
        }
      });
    } else {
      console.error('Sitemap Error: API returned', response.status);
    }
  } catch (error) {
    console.error('Sitemap Error: Could not fetch components from API. Is Django running?', error);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    xml += `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// -------------------------------------------------------------------------
// SERVER SETUP
// -------------------------------------------------------------------------

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req, {
      providers: [{ provide: 'REQUEST', useValue: req }]
    })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
