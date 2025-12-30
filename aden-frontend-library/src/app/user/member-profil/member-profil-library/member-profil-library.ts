import { Component, computed, effect, ElementRef, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { gsap } from 'gsap';
import { LibraryComponents } from "../../../shared/user-ui/library-components/library-components";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-member-profil-library',
  imports: [LibraryComponents],
  templateUrl: './member-profil-library.html',
  styleUrl: './member-profil-library.scss',
})
export class MemberProfilLibrary {
  private el = inject(ElementRef);

  components = input.required<any[]>();
  userFirstName = input.required<string>();

  currentPage = signal(0);
  pageSize = 6;
  readonly MAX_VISIBLE_DOTS = 5;

  private platformId = inject(PLATFORM_ID);


  visibleComponents = computed(() => {
    const list = this.components();
    const start = this.currentPage() * this.pageSize;
    const end = start + this.pageSize;
    return list.slice(start, end);
  });

  totalPages = computed(() => Math.ceil(this.components().length / this.pageSize));

  hasMore = computed(() => (this.currentPage() + 1) * this.pageSize < this.components().length);
  hasPrev = computed(() => this.currentPage() > 0);

  pageDots = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const max = this.MAX_VISIBLE_DOTS;

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i);
    }

    let start = current - Math.floor(max / 2);
    let end = start + max;

    if (start < 0) {
      start = 0;
      end = max;
    }

    if (end > total) {
      end = total;
      start = total - max;
    }

    return Array.from({ length: max }, (_, i) => start + i);
  });


  constructor() {
    effect(() => {
      const items = this.visibleComponents();
      if (isPlatformBrowser(this.platformId) && items.length > 0) {
        requestAnimationFrame(() => this.startGsapAnimation());
      }
    });
  }

  private startGsapAnimation() {
    if (!isPlatformBrowser(this.platformId)) return;

    const cards = this.el.nativeElement.querySelectorAll('.mini-card');
    if (cards.length === 0) return;

    gsap.killTweensOf(cards);
    gsap.fromTo(cards,
      { autoAlpha: 0, scale: 0.9, y: 20 },
      { duration: 0.5, autoAlpha: 1, scale: 1, y: 0, ease: 'power3.out', stagger: 0.05, clearProps: 'transform' }
    );
  }

  nextPage() {
    if (this.hasMore()) this.currentPage.update(p => p + 1);
  }

  prevPage() {
    if (this.hasPrev()) this.currentPage.update(p => p - 1);
  }

  goToPage(pageIndex: number) {
    this.currentPage.set(pageIndex);
  }
}
