// authentication.service.ts
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, of, switchMap, tap, throwError, firstValueFrom } from 'rxjs';
import { AuthApiService } from '../authApi/auth-api';
import { AuthStateService } from '../authState/auht-state-service';
import { BackendStatusService } from '../backendSatus/backend-satus.service';
import { Recaptcha } from '../../global/recaptcha/recaptcha';
import { GoogleAuthService } from '../googleAuth/google-auth';
import { UserProfileService } from '../../user/userProfile/user-profile';
import { RandomMessage } from '../../feedbacks/randomMessage/random-message';
import { ToastService } from '../../feedbacks/toast/toast';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private api = inject(AuthApiService);
  private state = inject(AuthStateService);
  private router = inject(Router);
  private backendStatus = inject(BackendStatusService);
  private recaptcha = inject(Recaptcha);
  private googleAuth = inject(GoogleAuthService);
  private profileService = inject(UserProfileService);

  private toastService = inject(ToastService);
  private randomMessage = inject(RandomMessage);

  private loggedOutManually = false;

  readonly user = this.state.user;
  readonly isAuthenticated = this.state.isAuthenticated;


  async checkAuthStatusAndRefresh(): Promise<void> {
    try {
      const res = await firstValueFrom(this.api.checkAuthStatus());
      if (res.authenticated) {
        await this.refreshAccessToken();
        this.backendStatus.setBackendAvailable();
      } else {
        this.state.clearSession();
      }
    } catch (err) {
      this.state.clearSession();
      this.backendStatus.setBackendUnavailable();
    } finally {
      this.state.markInitialized();
    }
  }

  async refreshAccessToken(): Promise<string> {
    if (this.loggedOutManually) return Promise.reject('Logged out manually');
    try {
      const res = await firstValueFrom(this.api.refreshToken());
      this.state.setAccessToken(res.access);
      return res.access;
    } catch (e) {
      this.state.clearSession();
      throw e;
    }
  }

  login(data: any, stayLoggedIn: boolean): Observable<string> {
    this.loggedOutManually = false;
    return this.api.login({ ...data, stay_logged_in: stayLoggedIn }).pipe(
      tap(res => {
        this.state.setAccessToken(res.access);
        this.profileService.loadProfile().subscribe();

        const firstName = (res as any).user?.first_name;
        const msg = this.randomMessage.getWelcomeMessage(firstName);

        this.toastService.showSuccess(msg);
      }),
      map(res => res.message || '✅ Login successful.'),
      catchError(err => this.handleError(err, '❌ Login failed.'))
    );
  }

  logout(): Observable<string> {
    this.loggedOutManually = true;
    return this.api.logout().pipe(
      tap(() => {
        this.performClientLogout();
        // const msg = this.randomMessage.getGoodbyeMessage();
        // this.toastService.showSuccess(msg);

        this.router.navigate(['/login']);
      }),
      map(res => res.message || 'Logged out.'),
      catchError(() => {
        this.performClientLogout();
        this.router.navigate(['/login']);
        return of('Logout completed');
      })
    );
  }

  register(data: any): Observable<string> {
    return from(this.recaptcha.execute('REGISTER')).pipe(
      switchMap(token => this.api.register({ ...data, captcha: token })),
      map(res => res.message || '✅ Registration successful.'),
      catchError(err => this.handleError(err))
    );
  }

  verifyEmail(token: string): Observable<string> {
    return this.api.verifyEmail(token).pipe(
      map(res => res.message || '✅ Email verified successfully.'),
      catchError(err => this.handleError(err, '❌ Verification failed.'))
    );
  }

  resendVerificationEmail(email: string): Observable<string> {
    return this.api.resendVerificationEmail(email).pipe(
      map(res => res.message || '📨 Verification link has been resent.'),
      catchError(err => this.handleError(err, '❌ Error while sending.'))
    );
  }

  reauthenticate(password: string): Observable<any> {
    return this.api.reauthenticateWithPassword(password).pipe(
      tap((res) => {
        if (res.access) {
          this.state.setAccessToken(res.access);
        }
      })
    );
  }

  deleteAccount(): Observable<any> {
    return this.api.deleteAccount().pipe(
      tap(() => {
        this.toastService.showSuccess(this.randomMessage.getDeleteAccountMessage());
        this.performClientLogout();
        this.router.navigate(['/register']);
      })
    );
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.api.requestPasswordReset(email).pipe(
      tap(() => {

      })
    );
  }

  confirmPasswordReset(data: any): Observable<any> {
    return this.api.requestPasswordResetConfirm(data).pipe(
      tap(() => {
        // Kein Redirect hier, wir machen das in der Component mit dem Success-Screen
      })
    );
  }

  updateEmail(newEmail: string): Observable<any> {
    return this.api.updateEmail(newEmail).pipe(
      tap(() => {
        this.toastService.showSuccess(this.randomMessage.getEmailChangedMessage());
        this.performClientLogout();
        this.router.navigate(['/login']);
      })
    );
  }


  private handleError(err: any, defaultMsg = '❌ An error occurred.') {

    if (err.status === 0) {
      return throwError(() => '🚫 Server unreachable. Please try again later.');
    }

    const errorMsg =
      err?.error?.error ||
      err?.error?.message ||
      err?.error?.detail ||
      defaultMsg;

    return throwError(() => errorMsg);
  }

  private performClientLogout() {
    this.state.clearSession();
    this.profileService.clearProfile();
  }
}
