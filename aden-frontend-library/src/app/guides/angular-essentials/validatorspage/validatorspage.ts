import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";
import { LiveValidator } from "./live-validator/live-validator";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-validatorspage',
  imports: [ReactiveFormsModule, HeadlineGuides, Notice, LiveValidator, CodeBlockGuide],
  templateUrl: './validatorspage.html',
  styleUrl: './validatorspage.scss',
})
export class Validatorspage {

  // 1. Logic (TypeScript)
  logicCode = `import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class RegisterComponent {
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    // Syntax: ['Initial Value', [Sync Validators], [Async Validators]]

    username: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email // Checks for @ and domain structure
    ]],

    password: ['', [
      Validators.required,
      // Regex: At least 8 chars, one uppercase letter
      Validators.pattern(/^(?=.*[A-Z]).{8,}$/)
    ]]
  });

  // Pro Tip: Getters make the HTML cleaner
  get email() { return this.registerForm.get('email'); }
}`;

  // 2. View (HTML)
  templateCode = `<div class="form-group">
  <label>Email Address</label>
  <input type="email" formControlName="email">

  <!--
    Feedback Logic:
    1. 'touched': User clicked inside and left (Blur)
    2. 'dirty': User actually typed something
    3. 'invalid': The rules were violated
  -->
  @if (email?.invalid && (email?.touched || email?.dirty)) {

    <div class="error-container">
      @if (email?.hasError('required')) {
        <span>Email is required.</span>
      }
      @if (email?.hasError('email')) {
        <span>Please enter a valid email address.</span>
      }
    </div>

  }
</div>`;

}
