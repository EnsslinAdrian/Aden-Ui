import { Routes } from "@angular/router";
import { premiumGuard } from "../../guards/premium/premium-guard";

export const GUIDE_ROUTES: Routes = [
  // -------------------------------------------------------------------------
  // Angular Essentials
  // -------------------------------------------------------------------------
  {
    path: 'guides/lazy-loading',
    loadComponent: () => import('../guides/angular-essentials/lazy-loading/lazy-loading').then(m => m.LazyLoading),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular Lazy Loading Guide',
      description: 'Optimize your app\'s load time. Learn how to load modules and components only when the user actually needs them.',
      breadcrumb: 'Lazy Loading' // ✅ Kurz
    }
  },
  {
    path: 'guides/auto-scroll',
    loadComponent: () => import('../guides/angular-essentials/auto-scroll/auto-scroll').then(m => m.AutoScroll),
    canActivate: [premiumGuard],
    data: {
      title: 'Auto-Scroll & Anchor Navigation',
      description: 'Improve UX. Learn how to automatically scroll to the top of the page or specific sections during navigation.',
      breadcrumb: 'Auto-Scroll'
    }
  },
  {
    path: 'guides/validators',
    loadComponent: () => import('../guides/angular-essentials/validatorspage/validatorspage').then(m => m.Validatorspage),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular Form Validators',
      description: 'Secure your forms. Everything about built-in validators, regex patterns, and custom validators.',
      breadcrumb: 'Validators'
    }
  },
  {
    path: 'guides/directives',
    loadComponent: () => import('../guides/angular-essentials/directives/directives').then(m => m.Directives),
    canActivate: [premiumGuard],
    data: {
      title: 'Custom Directives Tutorial',
      description: 'Manipulate the DOM like a pro. Learn the difference between attribute and structural directives.',
      breadcrumb: 'Directives'
    }
  },
  {
    path: 'guides/interfaces',
    loadComponent: () => import('../guides/angular-essentials/interfaces/interfaces').then(m => m.Interfaces),
    canActivate: [premiumGuard],
    data: {
      title: 'TypeScript Interfaces in Angular',
      description: 'Type safety for your data. Learn how to define clean models and avoid using "any" in your code.',
      breadcrumb: 'Interfaces'
    }
  },
  {
    path: 'guides/routing',
    loadComponent: () => import('../guides/angular-essentials/routing/routing').then(m => m.Routing),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular Routing Masterclass',
      description: 'From simple links to complex child routes. Understand Angular\'s navigation system.',
      breadcrumb: 'Routing'
    }
  },
  {
    path: 'guides/guards',
    loadComponent: () => import('../guides/angular-essentials/guards/guards').then(m => m.Guards),
    canActivate: [premiumGuard],
    data: {
      title: 'Route Guards & Security',
      description: 'Protect your admin areas. Implement AuthGuard, RoleGuard, and CanDeactivate with modern functional guards.',
      breadcrumb: 'Guards'
    }
  },
  {
    path: 'guides/interceptors',
    loadComponent: () => import('../guides/angular-essentials/interceptors/interceptors').then(m => m.Interceptors),
    canActivate: [premiumGuard],
    data: {
      title: 'HTTP Interceptors Guide',
      description: 'Centrally manage global error handling, loading spinners, and auth token injection.',
      breadcrumb: 'Interceptors'
    }
  },
  {
    path: 'guides/http',
    loadComponent: () => import('../guides/angular-essentials/http-communication/http-communication').then(m => m.HttpCommunication),
    canActivate: [premiumGuard],
    data: {
      title: 'HTTP Client & API Calls',
      description: 'Connect Angular to your backend. Learn GET, POST, PUT, DELETE, and the proper use of Observables.',
      breadcrumb: 'HTTP Client'
    }
  },
  {
    path: 'guides/pipes',
    loadComponent: () => import('../guides/angular-essentials/pipes/pipes').then(m => m.Pipes),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular Pipes',
      description: 'Easily transform data. Use built-in pipes for date/currency or write your own pure functions.',
      breadcrumb: 'Pipes'
    }
  },
  {
    path: 'guides/property-binding',
    loadComponent: () => import('../guides/angular-essentials/property-binding/property-binding').then(m => m.PropertyBinding),
    canActivate: [premiumGuard],
    data: {
      title: 'Property & Event Binding',
      description: 'Communication between parent and child components. Learn about inputs, outputs, and signals.',
      breadcrumb: 'Binding'
    }
  },
  {
    path: 'guides/forms-reactive-vs-template',
    loadComponent: () => import('../guides/angular-essentials/forms-reactive-vs-template/forms-reactive-vs-template').then(m => m.FormsReactiveVsTemplate),
    canActivate: [premiumGuard],
    data: {
      title: 'Reactive vs. Template-Driven Forms',
      description: 'Which approach is better? A detailed comparison for scalable forms.',
      breadcrumb: 'Forms'
    }
  },

  // -------------------------------------------------------------------------
  // SEO & Server Integration
  // -------------------------------------------------------------------------
  {
    path: 'guides/.htaccess',
    loadComponent: () => import('../guides/seo-server-integration/htaccess-file/htaccess-file').then(m => m.HtaccessFile),
    canActivate: [premiumGuard],
    data: {
      title: '.htaccess Config for Angular',
      description: 'Server configuration for Apache. Prevent 404 errors when reloading your single-page application.',
      breadcrumb: '.htaccess'
    }
  },
  {
    path: 'guides/robots.txt',
    loadComponent: () => import('../guides/seo-server-integration/robots-txt-file/robots-txt-file').then(m => m.RobotsTxtFile),
    canActivate: [premiumGuard],
    data: {
      title: 'robots.txt Best Practices',
      description: 'Control Google. Decide which areas of your app should be indexed and which should not.',
      breadcrumb: 'robots.txt'
    }
  },
  {
    path: 'guides/sitemap-generator',
    loadComponent: () => import('../guides/seo-server-integration/sitemap-generator/sitemap-generator').then(m => m.SitemapGenerator),
    canActivate: [premiumGuard],
    data: {
      title: 'Dynamic Sitemap for Angular',
      description: 'Help search engines find all your subpages. Automatically generate sitemaps for dynamic routes.',
      breadcrumb: 'Sitemap'
    }
  },
  {
    path: 'guides/ssr',
    loadComponent: () => import('../guides/seo-server-integration/ssr/ssr').then(m => m.Ssr),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular SSR (Server Side Rendering)',
      description: 'Maximize performance and perfect SEO. Learn setup, hydration, and how to avoid pitfalls.',
      breadcrumb: 'SSR' // ✅ Wichtiges Keyword
    }
  },
  {
    path: 'guides/seo-server-integration/meta',
    loadComponent: () => import('../guides/seo-server-integration/meta/meta').then(m => m.Meta),
    canActivate: [premiumGuard],
    data: {
      title: 'Dynamic Meta Tags & Social SEO',
      description: 'Perfect preview cards on WhatsApp and Twitter. Learn how to dynamically control titles and Open Graph tags.',
      breadcrumb: 'Meta Tags'
    }
  },
  {
    path: 'guides/seo-server-integration/semantic',
    loadComponent: () => import('../guides/seo-server-integration/semantic/semantic').then(m => m.Semantic),
    canActivate: [premiumGuard],
    data: {
      title: 'Semantic HTML',
      description: 'Improve accessibility and SEO ranking with clean HTML structure. Learn how to use header, main, and article tags properly.',
      breadcrumb: 'Semantics'
    }
  },
  {
    path: 'guides/seo-server-integration/sitelinks',
    loadComponent: () => import('../guides/seo-server-integration/sitelinks/sitelinks').then(m => m.Sitelinks),
    canActivate: [premiumGuard],
    data: {
      title: 'Google Sitelinks',
      description: 'Enhance your search results with rich snippets. Learn how to implement BreadcrumbList schema for better visibility.',
      breadcrumb: 'Sitelinks'
    }
  },

  // -------------------------------------------------------------------------
  // Build & Performance Tools
  // -------------------------------------------------------------------------
  {
    path: 'guides/source-map-explorer',
    loadComponent: () => import('../guides/build-performance-tools/source-map-explorer/source-map-explorer').then(m => m.SourceMapExplorer),
    canActivate: [premiumGuard],
    data: {
      title: 'Bundle Size Analysis',
      description: 'Why is my app so large? Identify memory hogs with the Source Map Explorer.',
      breadcrumb: 'Bundle Size'
    }
  },

  // -------------------------------------------------------------------------
  // Architecture & Best Practices
  // -------------------------------------------------------------------------
  {
    path: 'guides/folder-structure',
    loadComponent: () => import('../guides/architecture-best-practices/folder-structure/folder-structure').then(m => m.FolderStructure),
    canActivate: [premiumGuard],
    data: {
      title: 'Scalable Folder Structure',
      description: 'Architecture for enterprise apps. Learn how to organize your files to keep your project maintainable.',
      breadcrumb: 'Structure'
    }
  },
  {
    path: 'guides/thinking-in-components',
    loadComponent: () => import('../guides/architecture-best-practices/thinking-in-components/thinking-in-components').then(m => m.ThinkingInComponents),
    canActivate: [premiumGuard],
    data: {
      title: 'Thinking in Components',
      description: 'Atomic design principles. Learn how to plan reusable, smart, and dumb components.',
      breadcrumb: 'Architecture'
    }
  },

  // -------------------------------------------------------------------------
  // Git, CI/CD & Deployment
  // -------------------------------------------------------------------------
  {
    path: 'guides/github-basics',
    loadComponent: () => import('../guides/git-ci-cd/github-basics/github-basics').then(m => m.GithubBasics),
    canActivate: [premiumGuard],
    data: {
      title: 'Git Basics',
      description: 'Learn the fundamentals of Git, including branching, merging, and best practices for version control.',
      breadcrumb: 'Git Basics'
    }
  },

  // -------------------------------------------------------------------------
  // Angular CLI & Tooling
  // -------------------------------------------------------------------------
  {
    path: 'guides/angular-cli-commands',
    loadComponent: () => import('../guides/angular-workflow-cli/angular-cli-commands/angular-cli-commands').then(m => m.AngularCliCommands),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular CLI Commands',
      description: 'Boost your productivity. Learn essential Angular CLI commands for generating components, services, and building your app.',
      breadcrumb: 'Angular CLI'
    }
  }
];
