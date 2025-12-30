import { Component, ElementRef, inject, PLATFORM_ID, Renderer2, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../service/auth/authentication/authentication';
import gsap from 'gsap';
import { Typografie } from "../../shared/text/typografie/typografie";
import { BackLink } from "../../shared/navigation/back-link/back-link";
import { ConfettiBtn } from "../../shared/btn-ui/confetti-btn/confetti-btn";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  imports: [Typografie, BackLink, ConfettiBtn],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail {
private route = inject(ActivatedRoute);
  private authService = inject(AuthenticationService);
  private renderer = inject(Renderer2);

   private platformId = inject(PLATFORM_ID);

  @ViewChild('particleContainer') containerRef!: ElementRef;

  // Status Management
  status = signal<'loading' | 'success' | 'error'>('loading');
  message = signal<string>('Verifying verification token...');

  // Confetti Settings (Turbo Mode wie beim Register)
  private particleMinSize = 6;
  private particleMaxSize = 14;
  private particleMinVelocity = 250;
  private particleMaxVelocity = 900;
  private particleMinDuration = 1;
  private particleMaxDuration = 2.5;

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.status.set('error');
      this.message.set('Invalid link. No token found.');
      return;
    }

    // API Call
    this.authService.verifyEmail(token).subscribe({
      next: (msg) => {
        this.status.set('success');
        this.message.set('Your email has been successfully verified.');

        setTimeout(() => {
            this.fireBurst();
        }, 100);
      },
      error: (err) => {
        this.status.set('error');
        this.message.set(err.error?.message || 'The verification link is invalid or has expired.');
      }
    });
  }

  fireBurst() {
    if (!isPlatformBrowser(this.platformId)) {
        return;
    }

    const particleCount = 150;
    const colors = ['#4ade80', '#c084fc', '#60a5fa', '#fbbf24', '#f87171', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(colors);
    }

    gsap.fromTo('.confetti-btn',
      { x: -3 },
      { x: 3, duration: 0.05, repeat: 3, yoyo: true, clearProps: 'x' }
    );
  }

private createParticle(colors: string[]) {
    if (!this.containerRef) return;

    const particle = this.renderer.createElement('div');
    this.renderer.addClass(particle, 'gsap-particle');

    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * (this.particleMaxSize - this.particleMinSize) + this.particleMinSize;

    this.renderer.setStyle(particle, 'backgroundColor', color);
    this.renderer.setStyle(particle, 'width', `${size}px`);
    this.renderer.setStyle(particle, 'height', `${size}px`);
    this.renderer.setStyle(particle, 'borderRadius', Math.random() > 0.4 ? '50%' : '2px');

    this.renderer.appendChild(this.containerRef.nativeElement, particle);
    this.animateParticle(particle);
  }


  private animateParticle(particle: HTMLElement) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * (this.particleMaxVelocity - this.particleMinVelocity) + this.particleMinVelocity;

    // Startbereich verbreitern (wie bei RegisterSuccess)
    const startX = (Math.random() - 0.5) * 300;
    const startY = (Math.random() - 0.5) * 100;

    const tl = gsap.timeline({
      onComplete: () => this.renderer.removeChild(this.containerRef.nativeElement, particle)
    });

    gsap.set(particle, { x: startX, y: startY });

    tl.to(particle, {
      x: startX + Math.cos(angle) * velocity,
      y: startY + Math.sin(angle) * velocity,
      rotation: Math.random() * 1000 - 500,
      duration: Math.random() * (this.particleMaxDuration - this.particleMinDuration) + this.particleMinDuration,
      ease: "power4.out"
    });

    tl.to(particle, {
      y: `+=${Math.random() * 300 + 100}`,
      opacity: 0,
      duration: 0.8,
      ease: "power1.in"
    }, "-=0.8");
  }
}
