import { Routes } from '@angular/router';
import { Home } from './main-content/home/home';
import { authGuard } from '../guards/auth/auth-guard';
import { unsavedChangesGuard } from '../guards/unsaved/unsaved-changes-guard';

import { GUIDE_ROUTES } from './routes/guide.routes';
import { COMPONENT_ROUTES } from './routes/component.routes';
import { AUTH_ROUTES } from './routes/auth.routes';

export const routes: Routes = [
  // Externalized Modules (Components, Guides, Auth)
  ...GUIDE_ROUTES,
  ...COMPONENT_ROUTES,
  ...AUTH_ROUTES,

  // 1. HOME (Startseite -> Index)
  {
    path: '',
    component: Home,
    data: {
      title: 'Aden UI Library - Modern Angular UI Components',
      description: 'The ultimate component library for Angular. Performance-optimized, SSR-ready, and accessible. Build better apps in less time.',
    }
  },

  // 2. PRIVATE PROFILE (Mein Dashboard -> NoIndex)
  {
    path: 'profile',
    loadComponent: () => import('./user/profile/profile').then(m => m.Profile),
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    data: {
      title: 'My Profile',
      description: 'Manage your settings and saved components.',
      robots: 'noindex, nofollow'
    }
  },

  // 3. PUBLIC PROFILE (Anderer User -> Index)
  {
    path: 'profile/:username',
    loadComponent: () => import('./user/member-profil/member-profil').then(m => m.MemberProfil)
  },

  // 4. MAIN CONTENT (Trafficbringer -> Index)

  {
    path: 'updates',
    loadComponent: () => import('./main-content/updates/updates').then(m => m.Updates),
    data: {
      title: 'Updates & Changelog',
      description: 'Stay up to date: All new features, bug fixes, and updates of the Aden UI Library at a glance.',
      breadcrumb: 'Updates'
    }
  },

  {
    path: 'showcase',
    loadComponent: () => import('./main-content/showecase/showecase').then(m => m.Showecase),
    data: {
      title: 'Showcase - Made with Aden UI',
      description: 'Get inspired. See the amazing apps other developers have built with our components.',
      breadcrumb: 'Showcase'
    }
  },

  {
    path: 'components',
    loadComponent: () => import('./main-content/components-home/components-home').then(m => m.ComponentsHome),
    data: {
      title: 'All UI Components',
      description: 'Browse our collection: Buttons, inputs, dialogs, and more. Copy-paste ready for your Angular project.',
      breadcrumb: 'Components'
    }
  },

  {
    path: 'guides',
    loadComponent: () => import('./main-content/guides-home/guides-home').then(m => m.GuidesHome),
    data: {
      title: 'Angular Guides & Tutorials',
      description: 'Become a pro. Learn everything about SSR, performance, SEO, and best practices in modern web development.',
      breadcrumb: 'Guides'
    }
  },

  {
    path: 'contribution',
    loadComponent: () => import('./main-content/contribution/contribution').then(m => m.Contribution),
    data: {
      title: 'Contribute - Join Us!',
      description: 'Become part of the Aden UI community. Submit your own components and help us improve the library.',
      breadcrumb: 'Contribution'
    }
  },

  // 5. PRIVATE FORM (Formular -> NoIndex)
  {
    path: 'contribution/form',
    loadComponent: () => import('./main-content/contribution-form/contribution-form').then(m => m.ContributionForm),
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    data: {
      title: 'Submit Component',
      description: 'Send us your creation.',
      robots: 'noindex, nofollow'
    }
  },

  {
    path: 'imprint',
    loadComponent: () => import('./imprint/imprint/imprint').then(m => m.Imprint),
    data: {
      title: 'Imprint',
      description: 'Legal information and provider identification.',
      robots: 'noindex, nofollow'
    }
  },

  {
    path: 'legal-notice',
    loadComponent: () => import('./imprint/legal-notice/legal-notice').then(m => m.LegalNotice),
    data: {
      title: 'Privacy Policy',
      description: 'Information about the processing of your data.',
      robots: 'noindex, nofollow'
    }
  },
];
