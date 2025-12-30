import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

interface Slide {
  title: string;
  description: string;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-content-carousel',
  imports: [UiPlayground],
  templateUrl: './content-carousel.html',
  styleUrl: './content-carousel.scss',
})
export class ContentCarousel extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Content Carousel',
    description: 'A responsive, touch-style content slider with smooth transitions, image backgrounds, and neon controls.',
    slug: 'content-carousel',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'slider'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts', 'md'];
  }

  currentIndex = 0;

  slides: Slide[] = [
    {
      title: 'Cyberpunk Architecture',
      description: 'Exploring the neon-lit streets of future megalopolises.',
      tag: 'Design',
      image: 'https://images.unsplash.com/photo-1545153205-c0528434311c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Neural Networks',
      description: 'How AI is reshaping the landscape of data processing.',
      tag: 'Tech',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop'
    },
    {
      title: 'Deep Space',
      description: 'The final frontier remains the biggest mystery of all.',
      tag: 'Science',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2011&auto=format&fit=crop'
    }
  ];

  /**
   * Calculates the CSS transform value for the slider translation.
   * @returns The translateX CSS transform string based on the current index.
   */
  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  /**
   * Advances to the next slide with wrap-around.
   */
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  /**
   * Goes to the previous slide with wrap-around.
   */
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  /**
   * Navigates to a specific slide by index.
   * @param index The target slide index.
   */
  goToSlide(index: number) {
    this.currentIndex = index;
  }

}
