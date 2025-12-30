import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-radio-input',
  imports: [UiPlayground],
  templateUrl: './neon-radio-input.html',
  styleUrl: './neon-radio-input.scss',
})
export class NeonRadioInput extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Radio Input',
    description: 'A sleek radio input with a bouncy selection animation and neon glow effect.',
    slug: 'neon-radio-input',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'radio'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
