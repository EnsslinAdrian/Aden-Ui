import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import { Typografie } from "../../shared/text/typografie/typografie";
import { AuthInputs } from "../../shared/forms/auth-inputs/auth-inputs";
import { AuthBtn } from "../../shared/btn-ui/auth-btn/auth-btn";
import { LogoInitial } from "../../shared/ui/logo-initial/logo-initial";
import { BackLink } from "../../shared/navigation/back-link/back-link";

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, Typografie, AuthInputs, AuthBtn, LogoInitial, BackLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private authService = inject(AuthenticationService);

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  isLoading = signal(false);
  emailSent = signal(false);

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const email = this.forgotForm.value.email!;

    this.authService.requestPasswordReset(email).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.emailSent.set(true);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.forgotForm.setErrors({ serverError: true });
      }
    });
  }

  retry() {
    this.emailSent.set(false);
    this.forgotForm.reset();
  }

  get emailControl() {
    return this.forgotForm.get('email');
  }
}
