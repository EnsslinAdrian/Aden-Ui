import { Component } from '@angular/core';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";
import { LazyLoadingInteractiveDemo } from "./lazy-loading-interactive-demo/lazy-loading-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-lazy-loading',
  imports: [HeadlineGuides, Notice, LazyLoadingInteractiveDemo, CodeBlockGuide],
  templateUrl: './lazy-loading.html',
  styleUrl: './lazy-loading.scss',
})
export class LazyLoading {

  // Scenario A: Single Page (The standard for standalone components)
  singleComponentCode = `// app.routes.ts
export const routes: Routes = [
  {
    path: 'charts',
    // 1. Dynamic Import: The browser fetches this file only when clicked
    // 2. .then(): We extract the component class from the file
    loadComponent: () => import('./charts/charts.component')
      .then(m => m.ChartsComponent)
  }
];`;

  // Scenario B - Part 1: The Parent (Main Router)
  featureParentCode = `// app.routes.ts
export const routes: Routes = [
  {
    path: 'settings',
    // Here we don't load a component, but a separate ROUTE CONFIGURATION
    loadChildren: () => import('./settings/settings.routes')
      .then(m => m.settingsRoutes)
  }
];`;

  // Scenario B - Part 2: The Child (Feature Router)
  featureChildCode = `// settings/settings.routes.ts (This file is lazy loaded!)
import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  // This matches /settings (The entry point)
  {
    path: '',
    component: SettingsOverview
  },
  // This matches /settings/profile
  // The paths are concatenated automatically!
  {
    path: 'profile',
    component: ProfileSettings
  }
];`;

}
