import { Component, Input } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interactive-typography',
  imports: [UiPlayground, CommonModule, FormsModule],
  templateUrl: './interactive-typography.html',
  styleUrl: './interactive-typography.scss',
})
export class InteractiveTypography extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Interactive Typography',
    description: 'An interactive tool to preview and customize typography styles in real time.',
    slug: 'interactive-typography',
  };

  get FILE_CATEGORY() { return 'typography'; }
  get FILE_COMPONENT() { return 'text'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  previewText: string = 'Edit me to see magic!';
  previewSize: string = 'xl';
  previewColor: string = 'primary';
  previewWeight: number = 400;
  previewAlign: string = 'center';


  sizes = ['xs', 'small', 'base', 'large', 'xl', 'xxl', 'xxxl'];
  colors = ['primary', 'secondary', 'success', 'warning', 'error', 'white', 'black', 'text-light', 'text-dark'];
  weights = [400, 500, 600];
  alignments = ['left', 'center', 'right'];

  @Input() text: string = '';
  @Input() size: 'xs' | 'small' | 'base' | 'large' | 'xl' | 'xxl' | 'xxxl' = 'base';
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white' | 'black' | 'text-light' | 'text-dark' = 'black';
  @Input() weight: 400 | 500 | 600 = 400;
  @Input() align: 'left' | 'center' | 'right' = 'left';
}
