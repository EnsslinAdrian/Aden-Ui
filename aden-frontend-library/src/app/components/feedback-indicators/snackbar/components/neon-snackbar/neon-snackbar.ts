import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-snackbar',
  imports: [UiPlayground],
  templateUrl: './neon-snackbar.html',
  styleUrl: './neon-snackbar.scss',
})
export class NeonSnackbar extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Snackbar',
    description: 'A dark-themed toast notification with slide-up animation, status icon, and action buttons.',
    slug: 'neon-snackbar',
  };

  get FILE_CATEGORY() { return 'feedback-indicators'; }
  get FILE_COMPONENT() { return 'snackbar'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  isVisible = false;
  timeoutId: any;

  /**
   * Displays the snackbar for 3 seconds.
   * Clears any existing timeout before starting a new one.
   */
  showSnackbar() {
    this.isVisible = true;

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

}
