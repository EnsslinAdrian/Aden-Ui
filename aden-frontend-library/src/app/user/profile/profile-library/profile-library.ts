import { Component, computed, effect, ElementRef, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { ComponentInteraction } from '../../../../service/components/component-interaction/component-interaction';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { LibraryComponents } from "../../../shared/user-ui/library-components/library-components";
import { isPlatformBrowser } from '@angular/common';

type LibraryTab = 'created' | 'saved';

@Component({
  selector: 'app-profile-library',
  imports: [RouterLink, LibraryComponents],
  templateUrl: './profile-library.html',
  styleUrl: './profile-library.scss',
})
export class ProfileLibrary {
  private el = inject(ElementRef);

  createdComponents = input.required<any[]>();
  savedComponents = input.required<any[]>();

  activeTab = signal<LibraryTab>('created');
  currentPage = signal(0);
  pageSize = 6;
  readonly MAX_VISIBLE_DOTS = 5;

  private platformId = inject(PLATFORM_ID);

  currentList = computed(() =>
    this.activeTab() === 'created' ? this.createdComponents() : this.savedComponents()
  );

  visibleItems = computed(() => {
    const list = this.currentList();
    const start = this.currentPage() * this.pageSize;
    const end = start + this.pageSize;
    return list.slice(start, end);
  });

  totalPages = computed(() => Math.ceil(this.currentList().length / this.pageSize));

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

  // 5. Navigation Checks
  hasMore = computed(() => (this.currentPage() + 1) * this.pageSize < this.currentList().length);
  hasPrev = computed(() => this.currentPage() > 0);


  constructor() {
    effect(() => {
      const items = this.visibleItems();

      if (isPlatformBrowser(this.platformId) && items.length > 0) {
        requestAnimationFrame(() => {
          this.startGsapAnimation();
        });
      }
    });
  }

  private startGsapAnimation() {
    if (!isPlatformBrowser(this.platformId)) return;

    const cards = this.el.nativeElement.querySelectorAll('.mini-card');

    if (cards.length === 0) return;

    gsap.killTweensOf(cards);

    gsap.fromTo(cards,
      {
        autoAlpha: 0,
        scale: 0.9,
        y: 15
      },
      {
        duration: 0.4,
        autoAlpha: 1,
        scale: 1,
        y: 0,
        ease: 'back.out(1.2)',
        stagger: {
          each: 0.05,
          grid: 'auto'
        },
        clearProps: 'transform'
      }
    );
  }

  // --- ACTIONS ---

  setTab(tab: LibraryTab) {
    this.activeTab.set(tab);
    this.currentPage.set(0); // Reset auf Seite 1 beim Tab-Wechsel
  }

  goToPage(pageIndex: number) {
    this.currentPage.set(pageIndex);
  }

  nextPage() {
    if (this.hasMore()) this.currentPage.update(p => p + 1);
  }

  prevPage() {
    if (this.hasPrev()) this.currentPage.update(p => p - 1);
  }
}
