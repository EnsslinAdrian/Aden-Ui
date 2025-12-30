import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-forms-reactive-vs-template',
  imports: [Notice, HeadlineGuides, CodeBlockGuide],
  templateUrl: './forms-reactive-vs-template.html',
  styleUrl: './forms-reactive-vs-template.scss',
})
export class FormsReactiveVsTemplate {

  // 1. Template-Driven
  templateDrivenHtmlCode = `<!-- ⚠️ Logic is mixed into the template -->
<form #f="ngForm" (ngSubmit)="onSubmit(f)">

  <!-- We bind directly to a model object -->
  <input
    name="email"
    [(ngModel)]="model.email"
    required
    email>

  <!-- Validation check happens in HTML -->
  <div *ngIf="f.submitted && !f.valid">
    Error!
  </div>

  <button type="submit" [disabled]="f.invalid">
    Login
  </button>

</form>`;

  // 2. Reactive Forms (Typed)
  reactiveComponentTsCode = `import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class LoginReactive {
  private fb = inject(FormBuilder);

  // ✅ Explicit & Typed Definition
  // The structure is defined here, not in HTML.
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit() {
    if (this.loginForm.valid) {
      // We get a typed object: { email: string | null, ... }
      const rawValues = this.loginForm.getRawValue();
      console.log(rawValues);
    }
  }
}`;

  reactiveTemplateHtmlCode = `<form [formGroup]="loginForm" (ngSubmit)="submit()">

  <!-- Clean binding via formControlName -->
  <!-- The HTML is "dumb" - it knows nothing about rules -->
  <input formControlName="email" type="email">

  <input formControlName="password" type="password">

  <button type="submit" [disabled]="loginForm.invalid">
    Login
  </button>

</form>`;

}
