import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-status-badges',
  imports: [UiPlayground],
  templateUrl: './status-badges.html',
  styleUrl: './status-badges.scss',
})
export class StatusBadges extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Status Badges',
    description: 'A collection of modern, dark-themed status badges including soft labels, animated status dots, and notification counters. Designed for dashboards and system UIs with smooth visuals and clear state representation.',
    slug: 'status-badges',
  };

  get FILE_CATEGORY() { return 'feedback-indicators'; }
  get FILE_COMPONENT() { return 'badge'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
