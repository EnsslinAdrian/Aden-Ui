import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-tooltip',
  imports: [UiPlayground],
  templateUrl: './neon-tooltip.html',
  styleUrl: './neon-tooltip.scss',
})
export class NeonTooltip extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Tooltip',
    description: 'A dark-themed tooltip with a smooth entry animation, arrow indicator, and neon accent text.',
    slug: 'neon-tooltip',
  };

  get FILE_CATEGORY() { return 'feedback-indicators'; }
  get FILE_COMPONENT() { return 'tooltip'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
