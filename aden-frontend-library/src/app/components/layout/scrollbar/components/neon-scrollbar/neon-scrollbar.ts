import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-neon-scrollbar',
  imports: [UiPlayground],
  templateUrl: './neon-scrollbar.html',
  styleUrl: './neon-scrollbar.scss',
})
export class NeonScrollbar extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Scrollbar',
    description: 'A custom, sleek scrollbar that floats inside the container and lights up neon green when dragged.',
    slug: 'neon-scrollbar',
  };

  get FILE_CATEGORY() { return 'layout'; }
  get FILE_COMPONENT() { return 'scrollbar'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }

  items = Array.from({ length: 15 }, (_, i) => i);
}
