import { Component, inject } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-neon-validation-form',
  imports: [UiPlayground, ReactiveFormsModule],
  templateUrl: './neon-validation-form.html',
  styleUrl: './neon-validation-form.scss',
})
export class NeonValidationForm extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Validation Form',
    description: 'A complete form with floating labels, real-time error validation, and reactive visual feedback.',
    slug: 'neon-validation-form',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'formfield'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

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
