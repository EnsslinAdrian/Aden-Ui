import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-tab-navigation',
  imports: [UiPlayground],
  templateUrl: './tab-navigation.html',
  styleUrl: './tab-navigation.scss',
})
export class TabNavigation extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Tab Navigation',
    description: 'A tab navigation component with smooth transitions between content sections.',
    slug: 'tab-navigation',
  };

  get FILE_CATEGORY() { return 'navigation'; }
  get FILE_COMPONENT() { return 'tap'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  @ViewChild('contentContainer') contentContainer!: ElementRef;

  labels = ['Content 1', 'Content 2', 'Content 3'];
  activeLabel = 0;

  /**
   * Sets the active label by index.
   * @param index - The index of the label to select
   */
  selectLabel(index: number): void {
    this.activeLabel = index;
  }
}
