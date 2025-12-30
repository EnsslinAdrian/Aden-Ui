import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../../../../service/user/userProfile/user-profile';
import { ChangeEmail } from "../../../dialogs/change-email/change-email";
import { AuthInputs } from "../../../shared/forms/auth-inputs/auth-inputs";
import { Typografie } from "../../../shared/text/typografie/typografie";
import { Textarea } from "../../../shared/forms/textarea/textarea";
import { CancelBtn } from "../../../shared/btn-ui/cancel-btn/cancel-btn";
import { CanComponentDeactivate } from '../../../../interface/can-deactivate.interface';

@Component({
  selector: 'app-profile-settings',
  imports: [ReactiveFormsModule, ChangeEmail, AuthInputs, Typografie, Textarea, CancelBtn],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.scss',
})
export class ProfileSettings {
  profileForm: FormGroup;
  private fb = inject(FormBuilder);
  public userService = inject(UserProfileService);

  showEmailDialog = signal(false);

  constructor() {
    this.profileForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      bio: ['', [Validators.maxLength(200)]],
      github_url: ['', [Validators.pattern('https?://.+')]],
      linkedin_url: ['', [Validators.pattern('https?://.+')]]
    });

    if (!this.userService.profile()) {
      this.userService.loadProfile().subscribe();
    }

    effect(() => {
      const user = this.userService.profile();
      if (user) {
        this.profileForm.patchValue({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          bio: user.bio || '',
          github_url: user.github_url || '',
          linkedin_url: user.linkedin_url || ''
        }, { emitEvent: false });
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) return;

    const formData = this.profileForm.value;
    this.userService.updateInfo(formData).subscribe({
      next: () => {
        this.profileForm.markAsPristine();
      }
    });
  }

  cancelEdit() {
    const user = this.userService.profile();
    if (user) {
      this.profileForm.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio || '',
        github_url: user.github_url || '',
        linkedin_url: user.linkedin_url || ''
      });
    }
  }

  hasUnsavedChanges(): boolean {
    return this.profileForm.dirty;
  }


}

