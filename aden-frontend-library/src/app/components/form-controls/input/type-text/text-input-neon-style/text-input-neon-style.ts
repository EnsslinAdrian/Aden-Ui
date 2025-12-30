import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-text-input-neon-style',
  imports: [UiPlayground],
  templateUrl: './text-input-neon-style.html',
  styleUrl: './text-input-neon-style.scss',
})
export class TextInputNeonStyle extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Text Input - Neon Style',
    description: 'A modern text input component with dark theme, neon green accents, and smooth focus transitions. Features clean typography and subtle glow effects.',
    slug: 'text-input-neon-style',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}

