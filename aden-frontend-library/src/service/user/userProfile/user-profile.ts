// src/app/core/user/user-profile.service.ts
import { inject, Injectable, signal, computed } from '@angular/core';
import { UserApiService } from '../userApi/user-api';
import { UserProfile } from '../../../interface/user';
import { tap, catchError, throwError, finalize, map } from 'rxjs';
import { ToastService } from '../../feedbacks/toast/toast';
import { RandomMessage } from '../../feedbacks/randomMessage/random-message';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private api = inject(UserApiService);
  private randomMessage = inject(RandomMessage);
  private toastService = inject(ToastService);

  private _profile = signal<UserProfile | null>(null);
  private _loading = signal<boolean>(false);

  readonly profile = this._profile.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly displayName = computed(() => {
    const p = this._profile();
    if (!p) return 'Gast';
    const fullName = `${p.first_name} ${p.last_name}`.trim();
    return fullName || p.email;
  });

  // Helper: Prüft ob Premium
  readonly isPremium = computed(() => this._profile()?.is_premium ?? false);

  // --- ACTIONS ---

  loadProfile() {
    this._loading.set(true);
    return this.api.getMyProfile().pipe(
      tap(data => this._profile.set(data)),
      finalize(() => this._loading.set(false)),
      catchError(err => {
        // Optional: Error Handling
        return throwError(() => err);
      })
    );
  }

  updateInfo(data: Partial<UserProfile>) {
    this._loading.set(true);

    return this.api.updateProfile(data).pipe(
      map((response: any) => {
        const { message, ...user } = response;
        return user;
      }),
      tap((user) => {
        const msg = this.randomMessage.getProfileSavedMessage();
        this.toastService.showSuccess(msg);
        this._profile.set(user);
      }),
      catchError(err => {
        const errorMsg = err.error?.message || '❌ Error saving profile.';
        this.toastService.showError(errorMsg);
        return throwError(() => err);
      }),
      finalize(() => this._loading.set(false))
    );
  }

  updatePhoto(file: File) {
    this._loading.set(true);
    return this.api.uploadPhoto(file).pipe(
      tap(updatedUser => {
        const msg = this.randomMessage.getAvatarMessage();
        this.toastService.showSuccess(msg);
        this._profile.set(updatedUser);
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearProfile() {
    this._profile.set(null);
  }

  isPremiumUser(): boolean {
    return !!this.profile()?.is_premium;
  }

  getPublicProfile(username: string) {
    return this.api.getPublicProfile(username).pipe(
      catchError(err => {
        console.error('User not found:', err);
        return throwError(() => err);
      })
    );
  }
}
