import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-liquid-border-input',
  imports: [UiPlayground],
  templateUrl: './liquid-border-input.html',
  styleUrl: './liquid-border-input.scss',
})
export class LiquidBorderInput extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Liquid Border Input',
    description: 'A stylish input field featuring an animated liquid border effect using a rotating conic gradient. The effect activates on focus, creating a smooth neon-like glow for modern dark UI designs.',
    slug: 'liquid-border-input',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
