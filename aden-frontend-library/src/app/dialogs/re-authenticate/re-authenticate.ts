import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import { UserProfileService } from '../../../service/user/userProfile/user-profile';
import { AuthBtn } from "../../shared/btn-ui/auth-btn/auth-btn";
import { AuthInputs } from "../../shared/forms/auth-inputs/auth-inputs";
import { Typografie } from "../../shared/text/typografie/typografie";
import { CancelBtn } from "../../shared/btn-ui/cancel-btn/cancel-btn";
import { ErrorBanner } from "../../shared/feedbacks/error-banner/error-banner";

@Component({
  selector: 'app-re-authenticate',
  imports: [ReactiveFormsModule, AuthBtn, AuthInputs, Typografie, CancelBtn, ErrorBanner],
  templateUrl: './re-authenticate.html',
  styleUrl: './re-authenticate.scss',
})
export class ReAuthenticate {
  @Output() authenticated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private authService = inject(AuthenticationService);
  private profileService = inject(UserProfileService);

  // --- STATE ---
  isLoading = signal(false);
  hasError = signal(false); // Für Backend-Fehler (z.B. falsches PW)

  // --- FORM ---
  reAuthForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  });

  // --- COMPUTED DATA ---
  userAvatar = computed(() => {
    const profile = this.profileService.profile();
    return profile?.photo || `https://api.dicebear.com/9.x/avataaars/svg?seed=${profile?.email || 'User'}`;
  });

  userName = computed(() => this.profileService.displayName());
  userEmail = computed(() => this.profileService.profile()?.email || '');

  onSubmit() {
    if (this.reAuthForm.invalid) return;

    this.isLoading.set(true);
    this.hasError.set(false);

    const password = this.reAuthForm.value.password!;

    this.authService.reauthenticate(password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.authenticated.emit();
      },
      error: (err) => {
        console.error('Re-Auth failed', err);
        this.isLoading.set(false);
        this.hasError.set(true); // Zeigt Fehlermeldung an

        // Optional: Reset Passwort Feld
        this.reAuthForm.get('password')?.reset();
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
