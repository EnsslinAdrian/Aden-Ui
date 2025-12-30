import { mergeApplicationConfig, ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { AuthStateService } from '../service/auth/authState/auht-state-service'; // Pfad ggf. anpassen

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),

    provideAppInitializer(() => {
      const authService = inject(AuthStateService);

      // TRICK 1: 'as any' beim Token, damit inject() den String akzeptiert
      // TRICK 2: ': any' bei der Variable, damit wir auf .headers.cookie zugreifen dürfen
      const request: any = inject('REQUEST' as any, { optional: true });

      // Jetzt meckert TypeScript nicht mehr wegen 'Headers' oder 'cookie'
      if (request && request.headers && request.headers.cookie) {

        const token = parseCookie(request.headers.cookie, 'refresh_token');

        if (token) {
          console.log('✅ Server: Token gefunden! User wird eingeloggt.');
          authService.setAccessToken(token);
        }
      }
    })
  ]
};

// Hilfsfunktion korrekt typisiert
function parseCookie(cookieStr: string, key: string): string | null {
  if (!cookieStr) return null;
  const match = cookieStr.match(new RegExp('(^| )' + key + '=([^;]+)'));
  return match ? match[2] : null;
}

export const config = mergeApplicationConfig(appConfig, serverConfig);
