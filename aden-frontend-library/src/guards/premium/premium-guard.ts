import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserProfileService } from '../../service/user/userProfile/user-profile';
import { AuthenticationService } from '../../service/auth/authentication/authentication';
import { ToastService } from '../../service/feedbacks/toast/toast';
import { Library } from '../../service/components/library/library';
import { isPlatformBrowser } from '@angular/common';

export const premiumGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const library = inject(Library);
  const profile = inject(UserProfileService);
  const toastService = inject(ToastService);
  const platformId = inject(PLATFORM_ID);

  // -----------------------------------------------------------
  // 1. SSR / SERVER CHECK
  // -----------------------------------------------------------
  if (!isPlatformBrowser(platformId)) {
    // WICHTIG: Auf dem Server erlauben wir das Rendern IMMER.
    // Warum?
    // 1. Damit SEO funktioniert (Google sieht den Content).
    // 2. Damit kein Redirect-Loop entsteht.
    // 3. Falls der Cookie-Login oben geklappt hat, ist es eh okay.
    // 4. Falls nicht, wird der Client (Browser) gleich sofort sperren.
    return true;
  }

  // -----------------------------------------------------------
  // 2. BROWSER CHECK (Ab hier sind wir sicher im Client)
  // -----------------------------------------------------------

  const targetUrl = state.url;
  const allComponents = library.getCategories().flatMap(cat => cat.components);
  const targetItem = allComponents.find(item => item.route === targetUrl);

  // Nicht premium → frei
  if (!targetItem || !targetItem.premium) {
    return true;
  }

  // Premium User → frei
  if (profile.isPremiumUser()) {
    return true;
  }

  // Wenn User eingeloggt aber kein Premium
  if (authService.isAuthenticated()) {
    toastService.add(
      'This is Pro content 🚀. Please upgrade to access.',
      'info'
    );
    return router.parseUrl('/profile');
  }

  // Wenn gar nicht eingeloggt
  toastService.add(
    'Pro content locked. Please login to continue.',
    'info'
  );

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: targetUrl }
  });
};
