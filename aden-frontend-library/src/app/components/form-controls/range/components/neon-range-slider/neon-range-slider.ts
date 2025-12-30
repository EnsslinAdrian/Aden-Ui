import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { FormsModule } from '@angular/forms';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-range-slider',
  imports: [UiPlayground, FormsModule],
  templateUrl: './neon-range-slider.html',
  styleUrl: './neon-range-slider.scss',
})
export class NeonRangeSlider extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Range Slider',
    description: 'A customizable range input with a dynamic fill gradient and neon glow effects.',
    slug: 'neon-range-slider',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'range'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  volume = 75;
  brightness = 40;

}
