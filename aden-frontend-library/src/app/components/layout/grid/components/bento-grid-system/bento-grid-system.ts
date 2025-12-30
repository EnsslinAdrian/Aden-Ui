import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-bento-grid-system',
  imports: [UiPlayground],
  templateUrl: './bento-grid-system.html',
  styleUrl: './bento-grid-system.scss',
})
export class BentoGridSystem extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Bento Grid System',
    description: 'A responsive dashboard grid layout with auto-fitting cards, column spans, and hover effects.',
    slug: 'bento-grid-system',
  };

  get FILE_CATEGORY() { return 'layout'; }
  get FILE_COMPONENT() { return 'grid'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }

}
