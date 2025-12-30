import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-floating-label-date-input',
  imports: [UiPlayground],
  templateUrl: './floating-label-date-input.html',
  styleUrl: './floating-label-date-input.scss',
})
export class FloatingLabelDateInput extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Floating Label Date Input',
    description: 'A styled date input with floating label behavior and dark-mode optimized UI.',
    slug: 'floating-label-date-input',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
