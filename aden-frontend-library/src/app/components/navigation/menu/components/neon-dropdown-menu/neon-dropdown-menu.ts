import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-neon-dropdown-menu',
  imports: [UiPlayground],
  templateUrl: './neon-dropdown-menu.html',
  styleUrl: './neon-dropdown-menu.scss',
})
export class NeonDropdownMenu extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Dropdown Menu',
    description: 'A floating contextual menu with icons, dividers, and click-outside-to-close functionality.',
    slug: 'neon-dropdown-menu',
  };

  get FILE_CATEGORY() { return 'navigation'; }
  get FILE_COMPONENT() { return 'menu'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

    isOpen = false;
  lastAction = '';

  /**
   * Toggles the menu open/closed state.
   */
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Closes the menu by setting isOpen to false.
   */
  closeMenu() {
    this.isOpen = false;
  }

  /**
   * Selects an action, closes the menu, and resets after 2 seconds.
   * @param action - The action identifier to select
   */
  selectAction(action: string) {
    this.lastAction = action;
    this.closeMenu();
    setTimeout(() => { if (this.lastAction === action) this.lastAction = ''; }, 2000);
  }
}
