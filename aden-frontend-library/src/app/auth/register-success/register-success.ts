import { Component, ElementRef, inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { Typografie } from "../../shared/text/typografie/typografie";
import { BackLink } from "../../shared/navigation/back-link/back-link";
import { ConfettiBtn } from "../../shared/btn-ui/confetti-btn/confetti-btn";
import { AmbientGlow } from "../../shared/styles/ambient-glow/ambient-glow";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register-success',
  imports: [Typografie, BackLink, ConfettiBtn, AmbientGlow],
  templateUrl: './register-success.html',
  styleUrl: './register-success.scss',
})
export class RegisterSuccess {
  @ViewChild('particleContainer', { static: true }) containerRef!: ElementRef;

  private renderer = inject(Renderer2);

  private platformId = inject(PLATFORM_ID);

  private particleMinSize = 6;
  private particleMaxSize = 10;
  private particleMinVelocity = 200;
  private particleMaxVelocity = 600;
  private particleMinDuration = 1;
  private particleMaxDuration = 2.5;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.fireBurst(), 300);
    }
  }

  fireBurst() {
    if (!isPlatformBrowser(this.platformId)) return;

    const particleCount = 150;
    const colors = ['#4ade80', '#c084fc', '#60a5fa', '#fbbf24', '#f87171', '#ffffff', '#22d3ee'];

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(colors);
    }

    gsap.fromTo('.confetti-btn',
      { x: -3 },
      { x: 3, duration: 0.05, repeat: 3, yoyo: true, clearProps: 'x' }
    );
  }

  private createParticle(colors: string[]) {
    // Ab hier sind wir sicher im Browser (durch den Check in fireBurst/ngAfterViewInit)

    // Safety check falls Container fehlt
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
