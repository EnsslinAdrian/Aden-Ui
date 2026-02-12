import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { RoutingInteractiveDemo } from "./routing-interactive-demo/routing-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-routing',
  imports: [Notice, HeadlineGuides, RoutingInteractiveDemo, CodeBlockGuide],
  templateUrl: './routing.html',
  styleUrl: './routing.scss',
})
export class Routing {

  // 1. Basic Example
  routesConfigCode = `import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Default route
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  // IMPORTANT: The Wildcard (404) must always be the last entry!
  // Angular checks routes from top to bottom.
  { path: '**', redirectTo: 'home' }
];`;

  // 2. HTML Usage
  routerOutletLinksCode = `<!-- Navigation Bar -->
<nav>
  <!--
    ❌ NEVER use href="/home" -> This reloads the whole app!
    ✅ ALWAYS use routerLink -> Angular swaps components internally.
  -->
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/about">About</a>
</nav>

<!-- The Stage: This is where the route components appear -->
<router-outlet></router-outlet>`;

  // 3. Modular Routes (Child File)
  subRouteCode = `// routes/auth.routes.ts
import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../auth/login/login.component').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('../auth/register/register.component').then(m => m.Register)
  }
];`;

  // 4. Main Config (Merging)
  mainRouteCode = `// app.routes.ts
import { AUTH_ROUTES } from './routes/auth.routes';
import { ADMIN_ROUTES } from './routes/admin.routes';

export const routes: Routes = [
  // The Spread Operator (...) unpacks the arrays into one flat list
  ...AUTH_ROUTES,
  ...ADMIN_ROUTES,

  // Base Routes
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];`;

}
