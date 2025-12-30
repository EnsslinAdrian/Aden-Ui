import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import { ErrorBanner } from "../../shared/feedbacks/error-banner/error-banner";
import { Typografie } from "../../shared/text/typografie/typografie";
import { AuthBtn } from "../../shared/btn-ui/auth-btn/auth-btn";
import { LogoInitial } from "../../shared/ui/logo-initial/logo-initial";
import { AuthInputs } from "../../shared/forms/auth-inputs/auth-inputs";
import { AmbientGlow } from "../../shared/styles/ambient-glow/ambient-glow";
import { Divider } from "../../shared/styles/divider/divider";


@Component({
  selector: 'app-login',
  imports: [RouterLink, ErrorBanner, ReactiveFormsModule, Typografie, AuthBtn, LogoInitial, AuthInputs, AmbientGlow, Divider],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    stayLoggedIn: new FormControl(false),
  });

  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  togglePassword() {
    this.showPassword.update(val => !val);
  }

  submitLogin() {
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return;

    this.isLoading.set(true);
    const { email, password, stayLoggedIn } = this.loginForm.value;

    this.authService.login({ email, password }, stayLoggedIn!)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.loginForm.enable();
          this.errorMessage.set(err);
          this.isLoading.set(false);
        }
      });
  }

  get emailCtrl() {
    return this.loginForm.get('email');
  }

  get passwordCtrl() {
    return this.loginForm.get('password');
  }

}
