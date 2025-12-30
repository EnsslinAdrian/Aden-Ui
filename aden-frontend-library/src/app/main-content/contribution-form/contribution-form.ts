import { Component, effect, inject, signal } from '@angular/core';
import { Typografie } from "../../shared/text/typografie/typografie";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInputs } from "../../shared/forms/auth-inputs/auth-inputs";
import { Textarea } from "../../shared/forms/textarea/textarea";
import { AuthBtn } from "../../shared/btn-ui/auth-btn/auth-btn";
import { UserProfileService } from '../../../service/user/userProfile/user-profile';
import { Observable, Subject } from 'rxjs';
import { UnsavedChanges } from "../../dialogs/unsaved-changes/unsaved-changes";

@Component({
  selector: 'app-contribution-form',
  imports: [Typografie, ReactiveFormsModule, AuthInputs, Textarea, AuthBtn, UnsavedChanges],
  templateUrl: './contribution-form.html',
  styleUrl: './contribution-form.scss',
})
export class ContributionForm {
  private fb = inject(FormBuilder);
  private userService = inject(UserProfileService);

  private readonly repoOwner = 'EnsslinAdrian';
  private readonly repoName = 'ADEN-Library';

  userEmail = signal<string>('');

  showUnsavedDialog = signal(false);
  private deactivationSubject: Subject<boolean> | null = null;

  contributionForm = this.fb.group({
    componentName: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
    codeLink: ['', [Validators.required, Validators.pattern('https?://.+')]],

    // Checkboxen
    hasDocumentation: [false, Validators.requiredTrue],
    hasReadme: [false, Validators.requiredTrue],
    isOriginalWork: [false, Validators.requiredTrue],
    agreesToPublish: [false, Validators.requiredTrue]
  });

  constructor() {
    // Lade User Daten, falls noch nicht da
    if (!this.userService.profile()) {
      this.userService.loadProfile().subscribe();
    }

    // Sobald User da ist, Email setzen
    effect(() => {
      const user = this.userService.profile();
      if (user) {
        this.userEmail.set(user.email);
      }
    });
  }

  submitToGitHub() {
    if (this.contributionForm.invalid) {
      this.contributionForm.markAllAsTouched(); // Zeigt Fehler an
      return;
    }

    const data = this.contributionForm.value;
    const authorEmail = this.userEmail(); // Die feste Email nehmen!

    const body = `
### 👤 Author
**Email:** ${authorEmail}
*(Verified ADEN User)*

### 📦 Component Name
${data.componentName}

### 📝 Description
${data.description}

### 🔗 Repository / Gist
${data.codeLink}

### ✅ Quality Checklist
- [x] Code is documented (JSDoc)
- [x] Includes README.md
- [x] Original Work (Confirmed)
- [x] Agree to Publish (Confirmed)

---
*Submitted via ADEN Website Builder*
    `;

    const title = encodeURIComponent(`[New Component] ${data.componentName}`);
    const encodedBody = encodeURIComponent(body);
    const labels = 'community-submission,triage';

    const url = `https://github.com/${this.repoOwner}/${this.repoName}/issues/new?title=${title}&body=${encodedBody}&labels=${labels}`;

    window.open(url, '_blank');
  }

canDeactivate(): boolean | Observable<boolean> {
    if (this.contributionForm.pristine) {
      return true;
    }

    this.showUnsavedDialog.set(true);
    this.deactivationSubject = new Subject<boolean>();
    return this.deactivationSubject.asObservable();
  }

  handleUnsavedDecision(leave: boolean) {
    this.showUnsavedDialog.set(false);
    if (this.deactivationSubject) {
      this.deactivationSubject.next(leave);
      this.deactivationSubject.complete();
      this.deactivationSubject = null;
    }
  }

}
