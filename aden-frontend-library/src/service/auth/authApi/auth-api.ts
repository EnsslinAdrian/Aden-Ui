import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlsService } from '../../global/urls/urls.service';

// Optional: Typen definieren, um 'any' zu vermeiden (Best Practice)
export interface AuthResponse {
  access: string;
  refresh?: string;
  message?: string;
  // Ergänze das hier:
  user?: {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
    // ... was auch immer dein Backend sendet
  };
}

export interface GenericResponse {
  message?: string;
  wait?: number; // Für Resend Verification
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private urls = inject(UrlsService);

  // =================================================================
  // 1. LOGIN & SESSION
  // =================================================================

  /** Prüft, ob das Session-Cookie noch gültig ist */
  checkAuthStatus(): Observable<{ authenticated: boolean; user_id?: number }> {
    return this.http.get<{ authenticated: boolean; user_id?: number }>(
      this.urls.statusUrl,
      { withCredentials: true }
    );
  }

  /** Login mit Benutzername/Email & Passwort */
  login(data: any): Observable<AuthResponse> {
    // data enthält username/email, password und stay_logged_in
    return this.http.post<AuthResponse>(
      this.urls.loginUrl,
      data,
      { withCredentials: true }
    );
  }

  /** Holt ein neues Access Token via HttpOnly Cookie */
  refreshToken(): Observable<{ access: string }> {
    return this.http.post<{ access: string }>(
      this.urls.refreshUrl,
      {},
      { withCredentials: true }
    );
  }

  /** Logout: Löscht das HttpOnly Cookie auf dem Server */
  logout(): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      this.urls.logoutUrl,
      {},
      { withCredentials: true }
    );
  }

  // =================================================================
  // 2. REGISTRIERUNG & VERIFIZIERUNG
  // =================================================================

  /** Registrierung eines neuen Users */
  register(data: any): Observable<GenericResponse> {
    // data enthält hier bereits das Captcha-Token (wird im Facade-Service zusammengebaut)
    return this.http.post<GenericResponse>(
      this.urls.registerUrl,
      data
    );
  }

  /** E-Mail Verifizierung (Link aus der E-Mail) */
  verifyEmail(token: string): Observable<GenericResponse> {
    const safeToken = encodeURIComponent(token);
    return this.http.get<GenericResponse>(
      `${this.urls.verifyEmailUrl}?token=${safeToken}`
    );
  }

  /** Sendet die Verifizierungs-E-Mail erneut */
  resendVerificationEmail(email: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      this.urls.resendVerificationUrl,
      { email },
      { withCredentials: true }
    );
  }

  // =================================================================
  // 3. PASSWORT MANAGEMENT
  // =================================================================

  /** Fordert eine Passwort-Zurücksetzen-E-Mail an */
  requestPasswordReset(email: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      this.urls.passwordResetUrl,
      { email }
    );
  }

  /** Bestätigt das neue Passwort mit Token */
  requestPasswordResetConfirm(data: { uid: string; token: string; new_password: string }): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      this.urls.passwordConfirmUrl,
      data
    );
  }

  // =================================================================
  // 4. ACCOUNT VERWALTUNG (Re-Auth, Email Change, Delete)
  // =================================================================

  /** Re-Authentifizierung mit Passwort (für sensitive Aktionen) */
  reauthenticateWithPassword(password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.urls.reAuthenticateUrl,
      { password },
      { withCredentials: true }
    );
  }

  /** Ändert die E-Mail-Adresse */
  updateEmail(newEmail: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      this.urls.changeEmailUrl,
      { new_email: newEmail },
      { withCredentials: true }
    );
  }

  /** Löscht den Account */
  deleteAccount(): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(
      this.urls.deleteAccountUrl,
      { withCredentials: true }
    );
  }

  // =================================================================
  // 5. GOOGLE AUTHENTICATION
  // =================================================================

  /** Login via Google Credential (ID Token) */
  loginWithGoogle(idToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.urls.googleLoginUrl,
      { id_token: idToken },
      { withCredentials: true }
    );
  }

  /** Re-Authentifizierung via Google */
  reauthenticateWithGoogle(idToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.urls.reAuthenticateGoogleUrl,
      { id_token: idToken },
      { withCredentials: true }
    );
  }

  getUpgradeUrl() {
    return this.http.post<{ checkout_url: string }>(this.urls.upgradeAccountUrl, {});
  }
}
