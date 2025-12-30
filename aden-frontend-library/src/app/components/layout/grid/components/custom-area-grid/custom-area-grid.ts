import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-custom-area-grid',
  imports: [UiPlayground],
  templateUrl: './custom-area-grid.html',
  styleUrl: './custom-area-grid.scss',
})
export class CustomAreaGrid extends BaseUi {
  override meta: ComponentMeta = {
     title: 'Custom Area Grid',
    description: 'A highly customizable grid layout using SCSS mixins and named grid-areas for precise control over desktop, tablet, and mobile views.',
    slug: 'custom-area-grid',
  };

  get FILE_CATEGORY() { return 'layout'; }
  get FILE_COMPONENT() { return 'grid'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }

}
