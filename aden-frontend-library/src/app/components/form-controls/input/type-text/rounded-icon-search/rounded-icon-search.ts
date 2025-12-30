import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-rounded-icon-search',
  imports: [UiPlayground],
  templateUrl: './rounded-icon-search.html',
  styleUrl: './rounded-icon-search.scss',
})
export class RoundedIconSearch extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Rounded Icon Search',
    description: 'A sleek, pill-shaped search input with an integrated SVG icon that highlights on focus.',
    slug: 'rounded-icon-search',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
