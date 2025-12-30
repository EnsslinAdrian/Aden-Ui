import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-floating-label-input',
  imports: [UiPlayground],
  templateUrl: './floating-label-input.html',
  styleUrl: './floating-label-input.scss',
})
export class FloatingLabelInput extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Floating Label Input',
    description: 'A modern input field implementing the floating label pattern. The label elegantly transitions to the top upon focus or content entry.',
    slug: 'floating-label-input',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
