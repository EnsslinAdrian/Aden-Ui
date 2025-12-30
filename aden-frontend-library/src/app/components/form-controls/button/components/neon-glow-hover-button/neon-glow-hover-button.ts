import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-neon-glow-hover-button',
  imports: [UiPlayground],
  templateUrl: './neon-glow-hover-button.html',
  styleUrl: './neon-glow-hover-button.scss',
})
export class NeonGlowHoverButton extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Neon Glow Hover Button',
    description: 'A dynamic, neon-themed button featuring a multi-color animated glow effect that activates on hover. Built with pure CSS using gradient animation, blurred glow layers, and smooth transitions to create an eye-catching interactive UI element.',
    slug: 'neon-glow-hover-button',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'button'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss'];
  }
}
