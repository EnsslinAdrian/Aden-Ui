import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-blur-dialog',
  imports: [UiPlayground],
  templateUrl: './neon-blur-dialog.html',
  styleUrl: './neon-blur-dialog.scss',
})
export class NeonBlurDialog extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Blur Dialog',
    description: 'A responsive dialog component with backdrop blur, click-outside-to-close functionality, and smooth animations.',
    slug: 'neon-blur-dialog',
  };

  get FILE_CATEGORY() { return 'feedback-indicators'; }
  get FILE_COMPONENT() { return 'dialog'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  isOpen = false;

  /**
   * Opens the dialog by setting isOpen to true.
   */
  openDialog() {
    this.isOpen = true;
  }

  /**
   * Closes the dialog by setting isOpen to false.
   */
  closeDialog() {
    this.isOpen = false;
  }
}
