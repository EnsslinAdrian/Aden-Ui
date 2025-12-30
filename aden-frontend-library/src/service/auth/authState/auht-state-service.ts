// auth-state.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  exp: number;
  iat: number;
  user_id: number;
  re_auth_until?: number;
  auth_method?: 'password' | 'google';
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  // Private Signals
  private _accessToken = signal<string | null>(null);
  private _user = signal<DecodedToken | null>(null);
  private _authInitialized = signal<boolean>(false);

  // Public Read-only Signals (Computed)
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isInitialized = this._authInitialized.asReadonly();

  // Computed: Braucht User Re-Auth?
  readonly needsReAuth = computed(() => {
    const user = this._user();
    if (!user || !user.re_auth_until) return false;
    // Prüfen ob re_auth Zeit abgelaufen ist (Timestamp vergleich)
    return user.re_auth_until <= (Date.now() / 1000);
  });

  setAccessToken(token: string): void {
    this._accessToken.set(token);
    try {
      const decoded: DecodedToken = jwtDecode(token);
      this._user.set(decoded);
    } catch {
      this.clearSession();
    }
    this._authInitialized.set(true);
  }

  getAccessToken(): string | null {
    return this._accessToken();
  }

  clearSession(): void {
    this._accessToken.set(null);
    this._user.set(null);
  }

  markInitialized(): void {
    this._authInitialized.set(true);
  }
}
