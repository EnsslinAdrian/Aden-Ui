import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import { AuthBtn } from "../../shared/btn-ui/auth-btn/auth-btn";
import { AuthInputs } from "../../shared/forms/auth-inputs/auth-inputs";
import { LogoInitial } from "../../shared/ui/logo-initial/logo-initial";
import { Typografie } from "../../shared/text/typografie/typografie";
import { RegisterAdvantages } from "./register-advantages/register-advantages";
import { AmbientGlow } from "../../shared/styles/ambient-glow/ambient-glow";
import { Divider } from "../../shared/styles/divider/divider";

@Component({
  selector: 'app-register',
  imports: [RouterLink, AuthBtn, AuthInputs, ReactiveFormsModule, LogoInitial, Typografie, RegisterAdvantages, AmbientGlow, Divider],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthenticationService);
  private router = inject(Router);


  registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    acceptedTerms: new FormControl(false, [Validators.requiredTrue]),
  });

  // --- UI STATE ---
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);
  showMobileBenefits = signal(false);


    toggleMobileView() {
    this.showMobileBenefits.update(val => !val);
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  submitRegister() {
    this.registerForm.markAllAsTouched();

    if (!this.registerForm.valid) return; {
      this.isLoading.set(true);

      this.authService.register(this.registerForm.value).subscribe({
      next: (successMessage) => {
        this.router.navigate(['/register-success']);
      },
      error: (err) => {
        this.errorMessage.set(err);
        this.isLoading.set(false);
        this.isLoading.set(false);
      }
    });
    }
  }


}
