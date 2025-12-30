import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-checkbox',
  imports: [UiPlayground],
  templateUrl: './neon-checkbox.html',
  styleUrl: './neon-checkbox.scss',
})
export class NeonCheckbox extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Checkbox',
    description: 'A modern, dark-themed checkbox component featuring smooth animations, a neon green checkmark glow, and fully custom styling. Designed to replace the native checkbox with an accessible, polished UI experience.',
    slug: 'neon-checkbox',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'checkbox'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }

}
