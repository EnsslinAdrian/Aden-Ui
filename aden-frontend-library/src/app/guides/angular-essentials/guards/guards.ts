import { Component } from '@angular/core';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";
import { GuardsInteractiveDemo } from "./guards-interactive-demo/guards-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-guards',
  imports: [HeadlineGuides, Notice, GuardsInteractiveDemo, CodeBlockGuide],
  templateUrl: './guards.html',
  styleUrl: './guards.scss',
})
export class Guards {

  // 1. The Modern Functional Guard
  authGuardCode = `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Check: Is the user logged in?
  if (authService.isLoggedIn()) {
    return true; // Gate opens
  }

  // 2. Access denied -> Redirect to login
  // PRO TIP: We pass the target URL (state.url) as a query param.
  // This allows us to redirect the user back to the admin page
  // immediately after they log in.
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};`;

  // 2. Route Implementation
  protectedRouteCode = `export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.Admin),
    // The guard is placed here.
    // You can add multiple guards: [AuthGuard, RoleGuard]
    canActivate: [authGuard]
  }
];`;

}
