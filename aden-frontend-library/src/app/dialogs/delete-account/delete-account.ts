import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import { ReAuthenticate } from "../re-authenticate/re-authenticate";
import { CloseBtn } from "../../shared/btn-ui/close-btn/close-btn";
import { Typografie } from "../../shared/text/typografie/typografie";
import { CancelBtn } from "../../shared/btn-ui/cancel-btn/cancel-btn";
import { WarningBtn } from "../../shared/btn-ui/warning-btn/warning-btn";


@Component({
  selector: 'app-delete-account',
  imports: [FormsModule, ReAuthenticate, CloseBtn, Typografie, CancelBtn, WarningBtn],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccount {
  @Output() close = new EventEmitter<void>();

  private authService = inject(AuthenticationService);

  step = signal<'confirm' | 'reauth'>('confirm');
  confirmationInput = signal('');
  isLoading = signal(false);

  requiredWord = 'DELETE';
  isValid = computed(() => this.confirmationInput() === this.requiredWord);

  onInitiateDelete() {
    if (!this.isValid()) return;
    this.performDelete();
  }

  onReAuthSuccess() {
    this.performDelete();
  }

  private performDelete() {
    this.isLoading.set(true);

    this.authService.deleteAccount().subscribe({
      next: () => {
        this.close.emit();
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);

        if (err.status === 403) {
          this.step.set('reauth');
        } else {
          console.error('Delete failed', err);
        }
      }
    });
  }

  onCancel() {
    this.close.emit();
  }

}
