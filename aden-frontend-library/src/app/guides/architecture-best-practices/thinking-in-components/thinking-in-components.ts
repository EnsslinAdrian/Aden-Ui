import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-thinking-in-components',
  imports: [Notice, HeadlineGuides, CodeBlockGuide],
  templateUrl: './thinking-in-components.html',
  styleUrl: './thinking-in-components.scss',
})
export class ThinkingInComponents {
  monolithRegisterHtmlCode = `<!-- ❌ REPETITIVE & HARD TO MAINTAIN -->
<form [formGroup]="registerForm">

  <!-- Firstname -->
  <div class="form-group">
    <label>First Name</label>
    <input formControlName="firstName" type="text">
    @if(firstName?.touched && firstName?.errors?.['required']) {
      <span class="error">Required field</span>
    }
  </div>

  <!-- Lastname (Copy Paste...) -->
  <div class="form-group">
    <label>Last Name</label>
    <input formControlName="lastName" type="text">
    @if(lastName?.touched && lastName?.errors?.['required']) {
      <span class="error">Required field</span>
    }
  </div>

  <!-- Email (More Copy Paste...) -->
  <div class="form-group">
    <label>Email</label>
    <input formControlName="email" type="email">
    @if(email?.touched && email?.errors?.['email']) {
      <span class="error">Invalid email</span>
    }
  </div>

  <!-- Password (Complex Logic inline) -->
  <div class="form-group">
    <label>Password</label>
    <div class="input-wrapper">
      <input
        [type]="showPassword ? 'text' : 'password'"
        formControlName="password">
      <button (click)="togglePassword()">👁️</button>
    </div>
  </div>

  <button type="submit">Register</button>
</form>`;

  authInputsComponentTsCode = `@Component({
  selector: 'app-auth-inputs',
  // The Magic Sauce: Access parent FormGroup 👇
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class AuthInputs {

  @Input({ required: true }) name!: string;
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';

  // Logic encapsulated specifically for this component
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  get currentType() {
    return this.type === 'password' && this.showPassword()
      ? 'text'
      : this.type;
  }
}`;

  authInputsComponentHtmlCode = `<div class="form-group">
  <label [for]="name">{{ label }}</label>

  <div class="input-wrapper">
    <input
      [type]="currentType"
      [id]="name"
      [formControlName]="name">

    @if(type === 'password') {
      <button (click)="togglePassword()">👁️</button>
    }
  </div>

  <!-- Error handling central & consistent -->
  @if(control.touched && control.hasError('required')) {
    <span class="error">
      Please enter a {{ label }}
    </span>
  }
</div>`;

  cleanRegisterHtmlCode = `<form [formGroup]="registerForm" (ngSubmit)="submit()">

  <!-- ✅ CLEAN, READABLE, REUSABLE -->

  <app-auth-inputs
    type="text"
    name="firstName"
    label="First Name">
  </app-auth-inputs>

  <app-auth-inputs
    type="text"
    name="lastName"
    label="Last Name">
  </app-auth-inputs>

  <app-auth-inputs
    type="email"
    name="email"
    label="Email">
  </app-auth-inputs>

  <app-auth-inputs
    type="password"
    name="password"
    label="Password">
  </app-auth-inputs>

  <!-- Specific Logic remains here -->
  <button class="btn-primary" type="submit">
    Register
  </button>

</form>`;
}
