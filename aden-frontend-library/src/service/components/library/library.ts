import { Injectable } from '@angular/core';
import { LibraryCategory } from '../../../interface/category';

@Injectable({
  providedIn: 'root',
})
export class Library {
  private categories: LibraryCategory[] = [
    {
      title: 'Form Controls',
      components: [
        {
          name: 'Autocomplete',
          route: '/components/autocomplete',
          type: 'component',
          premium: false,
          description: 'A smart input with real-time suggestions, keyboard navigation, and accessibility support.',
          tags: ['Forms', 'Search', 'Accessibility']
        },
        {
          name: 'Checkbox',
          route: '/components/checkbox',
          type: 'component',
          premium: false,
          description: 'A binary control for selecting multiple options with clear and accessible states.',
          tags: ['Forms', 'Selection', 'Accessibility']
        },
        {
          name: 'Input',
          route: '/components/input',
          type: 'component',
          premium: false,
          description: 'A versatile text input for everything from simple entries to validated form fields.',
          tags: ['Forms', 'Text', 'Validation']
        },
        {
          name: 'Radio',
          route: '/components/radio',
          type: 'component',
          premium: false,
          description: 'A single-choice control for clear, mutually exclusive selections.',
          tags: ['Forms', 'Selection', 'Accessibility']
        },
        {
          name: 'Range',
          route: '/components/range',
          type: 'component',
          premium: false,
          description: 'A numeric input for selecting values within a defined range.',
          tags: ['Forms', 'Numeric', 'Controls']
        },
        {
          name: 'Slider',
          route: '/components/slider',
          type: 'component',
          premium: false,
          description: 'An interactive control for adjusting values through direct manipulation.',
          tags: ['Forms', 'Interaction', 'UX']
        },
        {
          name: 'Formfield',
          route: '/components/formfield',
          type: 'component',
          premium: false,
          description: 'A wrapper that aligns labels, inputs, and validation into a consistent form layout.',
          tags: ['Forms', 'Layout', 'Accessibility']
        },
        {
          name: 'Button',
          route: '/components/button',
          type: 'component',
          premium: false,
          description: 'An action trigger designed to clearly communicate intent and interaction state.',
          tags: ['Actions', 'Interaction', 'UX']
        }
      ]
    },
    {
      title: 'Navigation',
      components: [
        {
          name: 'Menu',
          route: '/components/menu',
          type: 'component',
          premium: false,
          description: 'A structured navigation component for organizing actions and links efficiently.',
          tags: ['Navigation', 'Layout', 'UX']
        },
        {
          name: 'Tap',
          route: '/components/tap',
          type: 'component',
          premium: false,
          description: 'A compact tab-based navigation for switching between related views.',
          tags: ['Navigation', 'Interaction', 'UX']
        }
      ]
    },
    {
      title: 'Media & Interaction',
      components: [
        {
          name: 'Drag and Drop',
          route: '/components/drag-and-drop',
          type: 'component',
          premium: false,
          description: 'An intuitive interaction pattern for moving and reordering content.',
          tags: ['Interaction', 'UX', 'Reordering']
        }
      ]
    },
    {
      title: 'Typography',
      components: [
        {
          name: 'Text Component',
          route: '/components/text-component',
          type: 'component',
          premium: false,
          description: 'A flexible text primitive for consistent typography and semantic styling.',
          tags: ['Typography', 'Text', 'Accessibility']
        }
      ]
    },
    {
      title: 'Layout',
      components: [
        {
          name: 'Expansion-Panel',
          route: '/components/expansion-panel',
          type: 'component',
          premium: false,
          description: 'A collapsible container for progressively revealing content.',
          tags: ['Layout', 'Interaction', 'UX']
        },
        {
          name: 'Grid',
          route: '/components/grid',
          type: 'component',
          premium: false,
          description: 'A responsive layout system for structured and aligned content.',
          tags: ['Layout', 'Grid', 'Responsive']
        },
        {
          name: 'Scrollbar',
          route: '/components/scrollbar',
          type: 'component',
          premium: false,
          description: 'A customizable scrollbar that integrates seamlessly into layouts.',
          tags: ['Layout', 'Scrolling', 'UX']
        }
      ]
    },
    {
      title: 'Feedback & Indicators',
      components: [
        {
          name: 'Dialog',
          route: '/components/dialog',
          type: 'component',
          premium: false,
          description: 'A focused modal for confirmations and critical user decisions.',
          tags: ['Feedback', 'Modal', 'UX']
        },
        {
          name: 'Tooltip',
          route: '/components/tooltip',
          type: 'component',
          premium: false,
          description: 'A lightweight hint for contextual information.',
          tags: ['Feedback', 'Accessibility', 'UX']
        },
        {
          name: 'Progress',
          route: '/components/progress',
          type: 'component',
          premium: false,
          description: 'A visual indicator for loading states and task progress.',
          tags: ['Feedback', 'Status', 'UX']
        },
        {
          name: 'Snackbar',
          route: '/components/snackbar',
          type: 'component',
          premium: false,
          description: 'A brief message for system feedback and user actions.',
          tags: ['Feedback', 'Notification', 'UX']
        },
        {
          name: 'Badge',
          route: '/components/badge',
          type: 'component',
          premium: false,
          description: 'A compact indicator for status or supplementary information.',
          tags: ['Indicator', 'Status', 'UI']
        },
        {
          name: 'Confetti',
          route: '/components/confetti',
          type: 'component',
          premium: false,
          description: 'A celebratory effect for positive user moments.',
          tags: ['Feedback', 'Animation', 'Delight']
        }
      ]
    },
    // {
    //   title: 'Styling & Theming',
    //   components: [
    //     { name: 'Theming', route: '/components/theming' },
    //   ]
    // },
    {
      title: 'Architecture & Best Practices',
      components: [
        {
          name: 'Folder Structure',
          route: '/guides/folder-structure',
          type: 'guide',
          description: 'Recommended project structure for scalable Angular applications, including feature modules and Clean Architecture principles.',
          readingTime: '6 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Thinking in Components',
          route: '/guides/thinking-in-components',
          type: 'guide',
          description: 'Refactor monolithic forms into scalable, reusable components using ControlContainer and clean architectural patterns.',
          readingTime: '7 min',
          level: 'Advanced',
          premium: true
        }
      ]
    },
    {
      title: 'Angular Essentials',
      components: [
        {
          name: 'Routing',
          route: '/guides/routing',
          type: 'guide',
          description: 'Fundamentals of Angular routing, navigation flow, RouterModule and route configuration.',
          readingTime: '6 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'Lazy Loading',
          route: '/guides/lazy-loading',
          type: 'guide',
          description: 'Optimize loading time through module-based lazy loading in Angular Router.',
          readingTime: '5 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Auto Scroll',
          route: '/guides/auto-scroll',
          type: 'guide',
          description: 'Customize and configure automatic scroll behavior in the Router.',
          readingTime: '4 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'Validators',
          route: '/guides/validators',
          type: 'guide',
          description: 'Create custom validators and correctly apply built-in FormValidators.',
          readingTime: '7 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Directives',
          route: '/guides/directives',
          type: 'guide',
          description: 'Creating and using structural and attribute directives in Angular.',
          readingTime: '8 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Interceptors',
          route: '/guides/interceptors',
          type: 'guide',
          description: 'Globally modify, extend or intercept HTTP requests.',
          readingTime: '7 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'HTTP Communication',
          route: '/guides/http',
          type: 'guide',
          description: 'Everything about HttpClient, requests, error handling and API communication.',
          readingTime: '8 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'Guards',
          route: '/guides/guards',
          type: 'guide',
          description: 'Use routing guards to control access and protect navigation.',
          readingTime: '6 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Interfaces',
          route: '/guides/interfaces',
          type: 'guide',
          description: 'Clean data models with TypeScript interfaces for Angular applications.',
          readingTime: '4 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'Pipes',
          route: '/guides/pipes',
          type: 'guide',
          description: 'Write custom pipes, use and optimize asynchronous pipes.',
          readingTime: '5 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Property Binding',
          route: '/guides/property-binding',
          type: 'guide',
          description: 'How Angular binds values to DOM properties and reacts to changes.',
          readingTime: '3 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'Reactive vs Template Forms',
          route: '/guides/forms-reactive-vs-template',
          type: 'guide',
          description: 'Short comparison between Angular’s reactive and template-driven forms and when to use which approach.',
          readingTime: '4 min',
          level: 'Beginner',
          premium: false
        }
      ]
    },
    {
      title: 'SEO & Server Integration',
      components: [
        {
          name: '.htaccess',
          route: '/guides/.htaccess',
          type: 'guide',
          description: 'Important .htaccess rules for SPA routing, redirects and performance.',
          readingTime: '4 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'robots.txt',
          route: '/guides/robots.txt',
          type: 'guide',
          description: 'Search engine control with robots.txt – allow, block or crawl.',
          readingTime: '3 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'Sitemap-Generator',
          route: '/guides/sitemap-generator',
          type: 'guide',
          description: 'Automatic generation of dynamic XML sitemaps for SEO.',
          readingTime: '5 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Server Side Rendering (SSR)',
          route: '/guides/ssr',
          type: 'guide',
          description: 'Set up Angular Universal, improve SEO and accelerate First Contentful Paint.',
          readingTime: '10 min',
          level: 'Expert',
          premium: true
        },
        {
          name: 'Meta Tags',
          route: '/guides/seo-server-integration/meta',
          type: 'guide',
          description: 'Dynamically set meta tags for SEO and social media previews using Angular Meta service.',
          readingTime: '8 min',
          level: 'Advanced',
          premium: true
        },
        {
          name: 'Semantic HTML',
          route: '/guides/seo-server-integration/semantic',
          type: 'guide',
          description: 'Improve SEO and accessibility with semantic HTML5 elements and ARIA roles.',
          readingTime: '7 min',
          level: 'Beginner',
          premium: false
        },
        {
          name: 'Google Sitelinks',
          route: '/guides/seo-server-integration/sitelinks',
          type: 'guide',
          description: 'Enhance your search results with rich snippets. Learn how to implement BreadcrumbList schema for better visibility.',
          readingTime: '6 min',
          level: 'Advanced',
          premium: true
        }
      ]
    },
    {
      title: 'Git & CI/CD',
      components: [
        {
          name: 'Git & GitHub Basics',
          route: '/guides/github-basics',
          type: 'guide',
          description: 'Essential Git and GitHub commands, workflows and best practices for daily development.',
          readingTime: '6 min',
          level: 'Beginner',
          premium: false
        }
      ]
    },
    {
      title: 'Angular Workflow & CLI',
      components: [
        {
          name: 'Angular CLI Commands',
          route: '/guides/angular-cli-commands',
          type: 'guide',
          description: 'Common Angular CLI commands, shortcuts and best practices for daily development.',
          readingTime: '5 min',
          level: 'Beginner',
          premium: false
        },
      ]
    },
    {
      title: 'Build & Performance Tools',
      components: [
        {
          name: 'Source Map Explorer',
          route: '/guides/source-map-explorer',
          type: 'guide',
          description: 'Analyze bundle size, identify large dependencies and optimization opportunities.',
          readingTime: '6 min',
          level: 'Advanced',
          premium: false
        }
      ]
    },
    // {
    //   title: 'Code Quality & Tooling',
    //   components: [
    //     {
    //       name: 'ESLint Setup for Angular',
    //       route: '/guides/eslint-setup-angular',
    //       type: 'guide',
    //       description: 'Set up ESLint in Angular projects and replace deprecated TSLint.',
    //       readingTime: '7 min',
    //       level: 'Beginner',
    //       premium: false
    //     },
    //     {
    //       name: 'ESLint Rules & Best Practices',
    //       route: '/guides/eslint-rules',
    //       type: 'guide',
    //       description: 'Understand ESLint rules, configurations and clean code strategies.',
    //       readingTime: '8 min',
    //       level: 'Advanced',
    //       premium: true
    //     },
    //     {
    //       name: 'Linting in CI Pipelines',
    //       route: '/guides/eslint-ci',
    //       type: 'guide',
    //       description: 'Run ESLint automatically in CI pipelines to ensure consistent code quality.',
    //       readingTime: '5 min',
    //       level: 'Advanced',
    //       premium: true
    //     }
    //   ]
    // }

  ];



  getCategories() {
    return this.categories;
  }

  filterCategories(search: string) {
    const s = search.trim().toLowerCase();

    if (!s) return this.categories;

    return this.categories
      .map(cat => ({
        ...cat,
        components: cat.components.filter(c =>
          c.name.toLowerCase().includes(s)
        )
      }))
      .filter(cat => cat.components.length > 0);
  }

  getOnlyComponents() {
    return this.categories
      .map(cat => ({
        ...cat,
        components: cat.components.filter(item => item.type !== 'guide')
      }))
      .filter(cat => cat.components.length > 0);
  }

  getOnlyGuides() {
    return this.categories
      .map(cat => ({
        ...cat,
        components: cat.components.filter(item => item.type === 'guide')
      }))
      .filter(cat => cat.components.length > 0);
  }
}
