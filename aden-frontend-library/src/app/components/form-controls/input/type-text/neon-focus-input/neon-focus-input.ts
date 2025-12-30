import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-neon-focus-input',
  imports: [UiPlayground],
  templateUrl: './neon-focus-input.html',
  styleUrl: './neon-focus-input.scss',
})
export class NeonFocusInput extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Focus Input',
    description: 'A clean and modern text input field with neon focus effect and smooth transitions.',
    slug: 'neon-focus-input',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
