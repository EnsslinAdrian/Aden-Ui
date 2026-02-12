import { Component, ElementRef, inject, Inject, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Typografie } from "../../../shared/text/typografie/typografie";
import { gsap } from 'gsap';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [Typografie, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  @ViewChild('perfWord', { read: ElementRef }) perfWord!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    // Dieser Check sorgt dafür, dass GSAP nur im Browser läuft
    if (!isPlatformBrowser(this.platformId)) return;

    this.initInteractiveHover();
  }

  private initInteractiveHover() {
    const el = this.perfWord.nativeElement;

    // Wir erstellen eine Timeline, die wir bei Hover steuern
    const hoverTl = gsap.timeline({ paused: true });

    hoverTl.to(el, {
      skewX: -10,
      scale: 1.05,
      letterSpacing: '5px',
      color: '#ffffff', // Falls es vorher grau war
      duration: 0.4,
      ease: 'power2.out'
    });

    el.addEventListener('mouseenter', () => hoverTl.play());
    el.addEventListener('mouseleave', () => hoverTl.reverse());

    // Kleiner "Magnetic" Effekt: Das Wort folgt der Maus minimal
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.5;

      gsap.to(el, {
        x: x,
        y: y,
        duration: 0.5,
        ease: 'power3.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    });
  }
}
