import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-password-input-with-toggle',
  imports: [UiPlayground],
  templateUrl: './password-input-with-toggle.html',
  styleUrl: './password-input-with-toggle.scss',
})
export class PasswordInputWithToggle extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Password Input with Toggle',
    description: 'A secure password input field with show/hide toggle functionality and modern dark theme styling.',
    slug: 'password-input-with-toggle',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  // Code starts here

  hidePassword = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
