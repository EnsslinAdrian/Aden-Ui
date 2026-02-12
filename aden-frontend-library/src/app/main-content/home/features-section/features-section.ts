import { Component, ElementRef, inject, Inject, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { Typografie } from "../../../shared/text/typografie/typografie";
import { gsap } from 'gsap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-features-section',
  imports: [Typografie],
  templateUrl: './features-section.html',
  styleUrl: './features-section.scss',
})
export class FeaturesSection {
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initTiltEffect();
  }

  private initTiltEffect() {
    this.cards.forEach(cardRef => {
      const card = cardRef.nativeElement;
      const icon = card.querySelector('.icon-box');

      // WICHTIG: Einmalige Initialisierung, damit GSAP die Startwerte kennt
      gsap.set(card, { rotateX: 0, rotateY: 0, transformPerspective: 1000 });
      gsap.set(icon, { x: 0, y: 0, translateZ: 20 });

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();

        // Mausposition im Verhältnis zur Kartenmitte
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Die Animation
        gsap.to(card, {
          rotateY: x * 12, // Etwas mehr Neigung für besseres Feedback
          rotateX: -y * 12,
          duration: 0.5,
          ease: 'power2.out',
          force3D: true
        });

        gsap.to(icon, {
          x: x * 20,
          y: y * 20,
          duration: 0.5,
          ease: 'power2.out',
          force3D: true
        });
      });

      card.addEventListener('mouseleave', () => {
        // Sanftes Zurückfedern
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)'
        });

        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }
}
