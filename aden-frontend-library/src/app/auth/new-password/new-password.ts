import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import { AuthBtn } from "../../shared/btn-ui/auth-btn/auth-btn";
import { AuthInputs } from "../../shared/forms/auth-inputs/auth-inputs";
import { LogoInitial } from "../../shared/ui/logo-initial/logo-initial";
import { Typografie } from "../../shared/text/typografie/typografie";
import { AmbientGlow } from "../../shared/styles/ambient-glow/ambient-glow";

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule, RouterLink, AuthBtn, AuthInputs, LogoInitial, Typografie, AmbientGlow],
  templateUrl: './new-password.html',
  styleUrl: './new-password.scss',
})
export class NewPassword {
 private route = inject(ActivatedRoute);
  private authService = inject(AuthenticationService);

  private uid = '';
  private token = '';

  // STATE
  isLoading = signal(false);
  isSuccess = signal(false);
  errorMessage = signal<string | null>(null);

  // FORM
  newPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator }); // Cross-Field Validator

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.uid = params.get('uid') || '';
        this.token = params.get('token') || '';
    });
    this.route.queryParamMap.subscribe(params => {
      if (!this.uid) this.uid = params.get('uid') || '';
      if (!this.token) this.token = params.get('token') || '';
    });
  }

  onSubmit() {
    if (this.newPasswordForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { password, confirmPassword } = this.newPasswordForm.value;

    // Payload für Django
    const payload = {
      uid: this.uid,
      token: this.token,
      new_password: password,
      re_new_password: confirmPassword
    };

    this.authService.confirmPasswordReset(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isSuccess.set(true);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.errorMessage.set('Invalid token or password too weak.');
      }
    });
  }

  // Custom Validator: Prüft ob Passwörter übereinstimmen
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    // Wenn beide Felder gefüllt sind und nicht gleich sind -> Error
    return password && confirm && password !== confirm
      ? { mismatch: true }
      : null;
  }
}
