
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'example-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {

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
