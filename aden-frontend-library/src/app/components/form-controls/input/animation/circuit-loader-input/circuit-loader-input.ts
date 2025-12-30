import { Component, inject, PLATFORM_ID } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-circuit-loader-input',
  imports: [UiPlayground],
  templateUrl: './circuit-loader-input.html',
  styleUrl: './circuit-loader-input.scss',
})
export class CircuitLoaderInput extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Circuit Loader Input',
    description: 'A futuristic input field enhanced with a GSAP-animated circuit border. The SVG outline activates on focus with a flowing stroke animation and neon glow, creating a high-tech UI experience inspired by electronic circuitry.',
    slug: 'circuit-loader-input',
  };

  private platformId = inject(PLATFORM_ID);

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'input'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts', 'md'];
  }

  private readonly animationDuration = 0.8;
  private readonly glowDuration = 0.5;
  private readonly glowDelay = 0.1;
  private readonly fadeOutDuration = 0.3;
  private readonly strokeDashArrayValue = 2000;
  private readonly glowIntensity = 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.6))';
  private readonly glowOff = 'drop-shadow(0 0 0px rgba(74, 222, 128, 0))';
  private readonly animationEase = 'power2.inOut';

  /**
   * Animates a circuit rectangle element with stroke and glow effects.
   * @param isActive - If true, animates the circuit on; if false, animates it off.
   */
  animateCircuit(isActive: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    const rect = document.querySelector('.circuit-rect');

    if (!rect) return;

    gsap.killTweensOf(rect);

    if (isActive) {
      gsap.set(rect, { opacity: 1 });

      gsap.to(rect, {
        strokeDashoffset: 0,
        duration: this.animationDuration,
        ease: this.animationEase
      });

      gsap.to(rect, {
        filter: this.glowIntensity,
        duration: this.glowDuration,
        delay: this.glowDelay
      });

    } else {
      gsap.to(rect, {
        strokeDashoffset: this.strokeDashArrayValue,
        duration: this.animationDuration,
        ease: this.animationEase,
        onComplete: () => {
          gsap.set(rect, { opacity: 0 });
        }
      });

      gsap.to(rect, {
        filter: this.glowOff,
        duration: this.fadeOutDuration
      });
    }
  }
}

