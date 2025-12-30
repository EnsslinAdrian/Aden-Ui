import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-rail-scrollbar',
  imports: [UiPlayground],
  templateUrl: './neon-rail-scrollbar.html',
  styleUrl: './neon-rail-scrollbar.scss',
})
export class NeonRailScrollbar extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Rail Scrollbar',
    description: 'A sharp, high-contrast scrollbar with a square thumb and permanent neon glow effect.',
    slug: 'neon-scrollbar',
  };

  get FILE_CATEGORY() { return 'layout'; }
  get FILE_COMPONENT() { return 'scrollbar'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }

  logs = Array.from({ length: 20 }, (_, i) => i);

}
