import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

interface TabItem {
  id: string;
  label: string;
  content: string;
}

@Component({
  selector: 'app-neon-tabs',
  imports: [UiPlayground],
  templateUrl: './neon-tabs.html',
  styleUrl: './neon-tabs.scss',
})
export class NeonTabs extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Tabs',
    description: 'A sleek tab component with an animated neon underline indicator and smooth content transitions.',
    slug: 'neon-tabs',
  };

  get FILE_CATEGORY() { return 'navigation'; }
  get FILE_COMPONENT() { return 'tap'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  tabs: TabItem[] = [
    { id: 'design', label: 'Design', content: 'Our design philosophy centers around minimalism and dark aesthetics to reduce eye strain and improve focus.' },
    { id: 'code', label: 'Code', content: 'Built with Angular 18+, utilizing standalone components and strict typing for maximum reliability.' },
    { id: 'deploy', label: 'Deploy', content: 'Seamlessly deploy to Vercel, Netlify, or AWS with our pre-configured CI/CD pipelines.' }
  ];

  activeTab = 'design';

  /**
   * Selects a tab by its ID and sets it as active.
   * @param id - The ID of the tab to select
   */
  selectTab(id: string) {
    this.activeTab = id;
  }

  /**
   * Gets the currently active tab.
   * @returns The active tab object or undefined if not found.
   */
  getActiveTab() {
    return this.tabs.find(t => t.id === this.activeTab);
  }
}
