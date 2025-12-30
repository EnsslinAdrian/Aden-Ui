import { Component, ElementRef, Inject, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('animItem') animItems!: QueryList<ElementRef>;

  private platformId = Inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

      gsap.registerPlugin();

      gsap.fromTo(this.animItems.map(el => el.nativeElement),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );

  }
}
