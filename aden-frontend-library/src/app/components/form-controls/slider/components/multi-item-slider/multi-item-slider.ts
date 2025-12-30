import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

@Component({
  selector: 'app-multi-item-slider',
  imports: [UiPlayground],
  templateUrl: './multi-item-slider.html',
  styleUrl: './multi-item-slider.scss',
})
export class MultiItemSlider extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Multi-Item Slider',
    description: 'A testimonial carousel that slides multiple items at once. Configurable view count and smooth track animation.',
    slug: 'multi-item-slider',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'slider'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  feedbacks = [
    { name: 'Sarah Jenkins', role: 'CTO, TechFlow', comment: 'This library significantly reduced our development time. The components are rock solid.', initials: 'SJ', color: '#4ade80' },
    { name: 'Mike Ross', role: 'Frontend Lead', comment: 'The best dark mode implementation I have seen. Accessibility features are top notch.', initials: 'MR', color: '#60a5fa' },
    { name: 'Jessica Lee', role: 'Product Manager', comment: 'Our users love the new UI. It feels modern, snappy and very professional.', initials: 'JL', color: '#fbbf24' },
    { name: 'David Kim', role: 'DevOps Engineer', comment: 'Documentation is clear and integration was seamless. Highly recommended.', initials: 'DK', color: '#c084fc' },
    { name: 'Elena V.', role: 'UX Designer', comment: 'Pixel perfect components. It made my design handover so much easier.', initials: 'EV', color: '#f87171' }
  ];

  currentIndex = 0;
  itemsVisible = 2;

  /** Advances to the next slide if not at the end */
  next() {
    if (!this.isEnd()) {
      this.currentIndex++;
    }
  }

  /** Moves to the previous slide if not at the start */
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  /** Checks if the slider has reached the end */
  isEnd(): boolean {
    return this.currentIndex >= this.feedbacks.length - this.itemsVisible;
  }

  /** Calculates the CSS transform for sliding the track based on current index */
  getTransform() {
    const itemWidthPercent = 100 / this.itemsVisible;
    const move = -(this.currentIndex * itemWidthPercent);
    return `translateX(${move}%)`;
  }

}
