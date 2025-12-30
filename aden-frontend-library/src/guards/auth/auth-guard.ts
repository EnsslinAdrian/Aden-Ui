import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../service/auth/authentication/authentication';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastService } from '../../service/feedbacks/toast/toast';
import { isPlatformBrowser } from '@angular/common';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  const platformId = inject(PLATFORM_ID);

  // ❗ Server: keine Interaktion, kein Toast
  if (!isPlatformBrowser(platformId)) {
    return authService.isAuthenticated();
  }

  // Browser
  if (authService.isAuthenticated()) {
    return true;
  }

  toastService.add(
    'You need to be logged in to access this page.',
    'info'
  );

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
