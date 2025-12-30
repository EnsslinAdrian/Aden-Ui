
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'example-component',
  imports: [ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  fb = inject(FormBuilder)

  accountForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  isInvalid(controlName: keyof typeof this.accountForm.controls) {
    const control = this.accountForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.accountForm.valid) {
      console.log('Form Submitted!', this.accountForm.value);
      alert('Account created successfully for ' + this.accountForm.value.username);
    }
  }
}
  