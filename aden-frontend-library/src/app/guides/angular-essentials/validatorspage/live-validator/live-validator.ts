import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-live-validator',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './live-validator.html',
  styleUrl: './live-validator.scss',
})
export class LiveValidator {
  demoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');

    if (password && confirm && password.value !== confirm.value) {
      confirm.setErrors({ mismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirm?.hasError('mismatch')) {
        confirm.setErrors(null);
      }
      return null;
    }
  }

  get f() { return this.demoForm.controls; }

  resetDemo() {
    this.demoForm.reset();
  }
}
