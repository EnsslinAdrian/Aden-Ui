import { ApplicationConfig, provideAppInitializer, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, PLATFORM_ID } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';

import { routes } from './app.routes';
import { authenticationInterceptor } from '../service/auth/interceptor/authentication.interceptor';
// Pfad ggf. anpassen:
import { AuthenticationService } from '../service/auth/authentication/authentication';
import { UserProfileService } from '../service/user/userProfile/user-profile';
import { firstValueFrom } from 'rxjs';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideHttpClient(
      withFetch(),
      withInterceptors([authenticationInterceptor]),
      withXsrfConfiguration({
        cookieName: 'csrftoken',
        headerName: 'X-CSRFToken',
      })
    ),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),

    provideAppInitializer(() => {
      const auth = inject(AuthenticationService);
      const profile = inject(UserProfileService);
      const platformId = inject(PLATFORM_ID);

      if (!isPlatformBrowser(platformId)) {
        return Promise.resolve();
      }

      return auth.checkAuthStatusAndRefresh().then(() => {
        if (auth.isAuthenticated()) {
          return firstValueFrom(profile.loadProfile());
        }
        return;
      });
    }), provideClientHydration(withEventReplay())
  ]
};
