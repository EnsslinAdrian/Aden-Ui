// auth.interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthStateService } from '../authState/auht-state-service';
import { UrlsService } from '../../global/urls/urls.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthStateService);
  const urls = inject(UrlsService);
  const http = inject(HttpClient); // Ein frischer Client für den Refresh Call

  const token = authState.getAccessToken();

  // Header setzen, wenn Token da
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // Prüfen: Ist es 401? Ist es NICHT der Refresh-Call selbst? Ist es NICHT der Login?
      if (err.status === 401 && !req.url.includes(urls.refreshUrl) && !req.url.includes(urls.loginUrl)) {

        // Refresh Call starten
        return http.post<{ access: string }>(urls.refreshUrl, {}, { withCredentials: true }).pipe(
          switchMap(res => {
            // Neues Token speichern
            authState.setAccessToken(res.access);

            // Request wiederholen mit neuem Token
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.access}` }
            });
            return next(retryReq);
          }),
          catchError((refreshErr) => {
            authState.clearSession();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
