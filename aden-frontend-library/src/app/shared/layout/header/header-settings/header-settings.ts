import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../../service/auth/authentication/authentication';
import { UserProfileService } from '../../../../../service/user/userProfile/user-profile';

const DEFAULT_AVATAR = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTI1MjViIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg==`;


@Component({
  selector: 'app-header-settings',
  imports: [],
  templateUrl: './header-settings.html',
  styleUrl: './header-settings.scss',
})
export class HeaderSettings {
private router = inject(Router);

  // Services injecten (protected, damit das Template Zugriff hat)
  protected authService = inject(AuthenticationService);
  protected userService = inject(UserProfileService);

  // --- Computed Signals ---

  // Berechnet die Avatar URL (oder Fallback)
  // Reagiert automatisch auf Änderungen im UserProfileService!
  avatarUrl = computed(() => {
    return this.userService.profile()?.photo || DEFAULT_AVATAR;
  });

  // Prüft ob User Premium ist
  isPro = computed(() => {
    return this.userService.profile()?.is_premium ?? false;
  });

  // --- Actions ---

  login() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
