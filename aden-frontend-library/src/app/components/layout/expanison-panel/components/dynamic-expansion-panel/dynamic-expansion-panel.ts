import { Component } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';

@Component({
  selector: 'app-dynamic-expansion-panel',
  imports: [UiPlayground],
  templateUrl: './dynamic-expansion-panel.html',
  styleUrl: './dynamic-expansion-panel.scss',
})
export class DynamicExpansionPanel extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Dynamic Expansion Panel',
    description: 'An accordion component with smooth animations for dark-mode apps.',
    slug: 'dynamic-expansion-panel',
  };

  get FILE_CATEGORY() { return 'layout'; }
  get FILE_COMPONENT() { return 'expansion_panel'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  openPanelIndex: number | null = null;

  panels = [
    { headline: 'Neon Button Integration', content: 'Der Neon Button kann einfach über npm installiert werden und nutzt CSS Variablen für das Leuchten.' },
    { headline: 'Magnetic Hover Effect', content: 'Basierend auf GSAP sorgt dieser Effekt dafür, dass der Button dem Mauszeiger magnetisch folgt.' },
    { headline: 'ADEN Design System', content: 'Unser Design System basiert auf Dark-Mode First Prinzipien und hoher Performance.' },
  ];

  /**
   * Toggles the expansion state of a panel at the specified index.
   * @param index - The index of the panel to toggle
   */
  toggleExpansionPanel(index: number): void {
    if (this.openPanelIndex === index) {
      this.openPanelIndex = null;
    } else {
      this.openPanelIndex = index;
    }
  }

  /**
   * Prüft, ob das Panel mit dem angegebenen Index geöffnet ist.
   * @param index - Der Index des zu prüfenden Panels
   * @returns `true`, wenn das Panel geöffnet ist, sonst `false`
   */
  isPanelOpen(index: number): boolean {
    return this.openPanelIndex === index;
  }

}
