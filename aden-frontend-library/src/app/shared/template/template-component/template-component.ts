import { Component } from '@angular/core';
import { UiPlayground } from "../../ui/ui-playground/ui-playground";
import { ComponentMeta } from '../../../../interface/component-meta';
import { BaseUi, FileType } from '../../base/base-ui/base-ui';

@Component({
  selector: 'app-template-component',
  imports: [UiPlayground],
  templateUrl: './template-component.html',
  styleUrl: './template-component.scss',
})
export class TemplateComponent extends BaseUi {
  override meta: ComponentMeta = {
    title: '',
    description: '',
    slug: '',
  };

  get FILE_CATEGORY() { return 'form_controls'; }
  get FILE_COMPONENT() { return 'checkbox'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }

}
