import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

interface PanelItem {
  title: string;
  content: string;
  expanded: boolean;
}

@Component({
  selector: 'app-neon-expansion-panel',
  imports: [UiPlayground],
  templateUrl: './neon-expansion-panel.html',
  styleUrl: './neon-expansion-panel.scss',
})
export class NeonExpansionPanel extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Expansion Panel',
    description: 'A smooth accordion component with grid-based height animation and neon active states.',
    slug: 'neon-expansion-panel',
  };

  get FILE_CATEGORY() { return 'layout'; }
  get FILE_COMPONENT() { return 'expansion_panel'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  items: PanelItem[] = [
    {
      title: 'Account Settings',
      content: 'Manage your personal details, email preferences, and password settings securely from this panel.',
      expanded: true
    },
    {
      title: 'Billing Information',
      content: 'View your billing history, download invoices, and manage your payment methods.',
      expanded: false
    },
    {
      title: 'Integrations',
      content: 'Connect your workspace with third-party tools like Slack, GitHub, and Jira to streamline your workflow.',
      expanded: false
    }
  ];

  /**
   * Toggles the expanded state of an item at the specified index.
   * @param index - The index of the item to toggle
   */
  toggle(index: number) {
    this.items[index].expanded = !this.items[index].expanded;
  }

}
