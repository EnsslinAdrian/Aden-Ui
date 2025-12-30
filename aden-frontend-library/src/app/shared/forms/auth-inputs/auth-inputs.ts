import { Component, inject, Input, signal } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { Typografie } from "../../text/typografie/typografie";

@Component({
  selector: 'app-auth-inputs',
  imports: [ReactiveFormsModule, Typografie],
  templateUrl: './auth-inputs.html',
  styleUrl: './auth-inputs.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class AuthInputs {
  @Input({ required: true }) name!: string;
  @Input() type: 'text' | 'email' | 'password' | 'checkbox' | 'url' = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = '';
  @Input() patternError: string = 'Invalid format.'; 

  // Wir holen uns den Container (die FormGroup)
  private parentContainer = inject(ControlContainer);

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(val => !val);
  }

  get currentType(): string {
    if (this.type === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type;
  }

  // Helper, um auf das spezifische Control (z.B. 'email') zuzugreifen
  get control(): AbstractControl | null {
    return this.parentContainer.control?.get(this.name) || null;
  }
}
