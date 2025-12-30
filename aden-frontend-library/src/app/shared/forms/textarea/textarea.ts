import { Component, inject, Input } from '@angular/core';
import { Typografie } from "../../text/typografie/typografie";
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  imports: [Typografie, ReactiveFormsModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
   viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class Textarea {
  @Input({ required: true }) name!: string; // formControlName
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() maxLength: number = 500; // Standard-Limit
  @Input() rows: number = 4;

  private parentContainer = inject(ControlContainer);

  // Helper für Zugriff auf das Control (Validierung, Value)
  get control() {
    return this.parentContainer.control?.get(this.name);
  }

  // Helper für den Zähler
  get currentLength(): number {
    return this.control?.value?.length || 0;
  }
}

