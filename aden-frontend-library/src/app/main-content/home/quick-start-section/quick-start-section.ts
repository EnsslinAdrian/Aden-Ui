import { Component, ElementRef, Inject, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { Typografie } from "../../../shared/text/typografie/typografie";
import { gsap } from 'gsap';
import { VisuelRight } from "./visuel-right/visuel-right";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-quick-start-section',
  imports: [Typografie, VisuelRight],
  templateUrl: './quick-start-section.html',
  styleUrl: './quick-start-section.scss',
})
export class QuickStartSection {
  @ViewChildren('animItem') animItems!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

      gsap.registerPlugin();

      gsap.fromTo(this.animItems.map(el => el.nativeElement),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }

}
