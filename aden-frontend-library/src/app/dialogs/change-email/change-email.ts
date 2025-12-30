import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import { ReAuthenticate } from "../re-authenticate/re-authenticate";
import { AuthBtn } from "../../shared/btn-ui/auth-btn/auth-btn";
import { AuthInputs } from "../../shared/forms/auth-inputs/auth-inputs";
import { Typografie } from "../../shared/text/typografie/typografie";
import { CancelBtn } from "../../shared/btn-ui/cancel-btn/cancel-btn";
import { CloseBtn } from "../../shared/btn-ui/close-btn/close-btn";

@Component({
  selector: 'app-change-email',
  imports: [ReactiveFormsModule, ReAuthenticate, AuthBtn, AuthInputs, Typografie, CancelBtn, CloseBtn],
  templateUrl: './change-email.html',
  styleUrl: './change-email.scss',
})
export class ChangeEmail {
  @Output() close = new EventEmitter<void>();

  private authService = inject(AuthenticationService);

  step = signal<'input' | 'reauth' | 'success'>('input');

  isLoading = signal(false);


  emailForm = new FormGroup({
    newEmail: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    if (this.emailForm.invalid) return;
    this.performUpdate();
  }


  onReAuthSuccess() {
    this.performUpdate();
  }

  private performUpdate() {
    this.isLoading.set(true);
    const email = this.emailForm.value.newEmail!;

    this.authService.updateEmail(email).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);

        if (err.status === 403) {
          this.step.set('reauth');
        } else {
          console.error('Update email failed', err);
          this.emailForm.get('newEmail')?.setErrors({ serverError: true });
        }
      }
    });
  }

  onCancel() {
    this.close.emit();
  }
}
