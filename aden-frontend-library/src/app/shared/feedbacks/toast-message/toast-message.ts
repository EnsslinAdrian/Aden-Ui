import { Component, ElementRef, inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { ToastItem, ToastService } from '../../../../service/feedbacks/toast/toast';
import { gsap } from 'gsap';
import { Typografie } from "../../text/typografie/typografie";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-toast-message',
  imports: [Typografie],
  templateUrl: './toast-message.html',
  styleUrl: './toast-message.scss',
})
export class ToastMessage {
  @Input({ required: true }) toast!: ToastItem;
  @ViewChild('toastEl') toastEl!: ElementRef;

  private toastService = inject(ToastService);
  private autoCloseTimer: any;

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.autoCloseTimer = setTimeout(() => {
      this.startExitAnimation();
    }, 5000);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.fromTo(
      this.toastEl.nativeElement,
      { xPercent: 20, opacity: 0, scale: 0.95 },
      { xPercent: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.2)" }
    );

  }

  startExitAnimation() {
    if (!isPlatformBrowser(this.platformId)) return;

    clearTimeout(this.autoCloseTimer);

    // Animation: Nach oben wegfliegen
    gsap.to(this.toastEl.nativeElement, {
      opacity: 0,
      y: -20,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Erst JETZT wirklich löschen!
        this.toastService.remove(this.toast.id);
      }
    });
  }

  ngOnDestroy() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }

    if (this.toastEl && isPlatformBrowser(this.platformId)) {
      gsap.killTweensOf(this.toastEl.nativeElement);
    }
  }
}
