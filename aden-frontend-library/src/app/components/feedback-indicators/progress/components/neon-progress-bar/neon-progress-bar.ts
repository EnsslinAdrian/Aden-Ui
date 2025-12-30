import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-neon-progress-bar',
  imports: [UiPlayground],
  templateUrl: './neon-progress-bar.html',
  styleUrl: './neon-progress-bar.scss',
})
export class NeonProgressBar extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Progress Bar',
    description: 'A modern, dark-themed progress bar with neon green glow effects and smooth animations.',
    slug: 'neon-progress-bar',
  };

  get FILE_CATEGORY() { return 'feedback-indicators'; }
  get FILE_COMPONENT() { return 'progress'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }

  progressValue = 45;

  setProgress(val: number) {
    this.progressValue = val;
  }
}
