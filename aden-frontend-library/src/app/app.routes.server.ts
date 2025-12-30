import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'profile', renderMode: RenderMode.Client },
  { path: 'contribution/form', renderMode: RenderMode.Client },

  { path: 'login', renderMode: RenderMode.Client },
  { path: 'register', renderMode: RenderMode.Client },
  { path: 'forgot-password', renderMode: RenderMode.Client },
  { path: 'reset-password', renderMode: RenderMode.Client },
  { path: 'verify-email', renderMode: RenderMode.Client },
  { path: 'register-success', renderMode: RenderMode.Client },

  { path: 'reset-password/:token', renderMode: RenderMode.Server },
  { path: 'profile/:username', renderMode: RenderMode.Server },
  { path: 'components/:subcategory/:slug', renderMode: RenderMode.Server },
  
  { path: '**', renderMode: RenderMode.Prerender }
];
