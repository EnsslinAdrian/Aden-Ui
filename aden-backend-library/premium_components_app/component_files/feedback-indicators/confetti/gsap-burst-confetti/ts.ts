
import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'example-component',
  imports: [],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  @ViewChild('particleContainer', { static: true }) containerRef!: ElementRef;

  private particleMinSize = 4;           // minimum particle size (px)
  private particleMaxSize = 12;          // maximum particle size (px)
  private particleMinVelocity = 100;     // minimum initial velocity of the particle
  private particleMaxVelocity = 300;     // maximum initial velocity of the particle
  private particleMinDuration = 0.5;     // minimum duration of the movement animation
  private particleMaxDuration = 1.0;     // maximum duration of the movement animation
  private particleMinRotation = -360;    // minimum rotation (degrees) during animation
  private particleMaxRotation = 360;     // maximum rotation (degrees) during animation
  private particleGravity = 100;         // minimum downward movement added (simulated gravity)
  private particleGravityMax = 300;      // maximum downward movement added (simulated gravity)
  private particleFadeDuration = 0.5;    // minimum fade-out duration
  private particleFadeDurationMax = 1.0; // maximum fade-out duration

  constructor(private renderer: Renderer2) { }

  /**
   * Fires a burst of confetti particles and triggers a button shake animation.
   * Creates 60 particles with random colors and animates the button horizontally.
   */
  fireBurst() {
    const particleCount = 60;
    const colors = ['#4ade80', '#c084fc', '#60a5fa', '#fbbf24', '#f87171', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(colors);
    }

    gsap.fromTo('.aden-btn',
      { x: -5 },
      { x: 5, duration: 0.05, repeat: 3, yoyo: true, clearProps: 'x' }
    );
  }

  /**
   * Erstellt und animiert ein Konfetti-Partikel.
   * @param colors - Array von Farbwerten für das Partikel
   */
  private createParticle(colors: string[]) {
    const particle = this.createParticleElement(colors);
    this.animateParticle(particle);
  }

  /**
   * Creates and appends a particle DOM element with random styling properties.
   * @param colors - Array of color strings to randomly select from
   * @returns The created particle HTMLElement
   */
  private createParticleElement(colors: string[]): HTMLElement {
    const particle = this.renderer.createElement('div');
    this.renderer.addClass(particle, 'gsap-particle');
    this.renderer.setStyle(particle, 'backgroundColor', colors[Math.floor(Math.random() * colors.length)]);
    this.renderer.setStyle(particle, 'width', `${Math.random() * (this.particleMaxSize - this.particleMinSize) + this.particleMinSize}px`);
    this.renderer.setStyle(particle, 'height', `${Math.random() * (this.particleMaxSize - this.particleMinSize) + this.particleMinSize}px`);
    this.renderer.setStyle(particle, 'borderRadius', Math.random() > 0.5 ? '50%' : '0%');
    this.renderer.appendChild(this.containerRef.nativeElement, particle);
    return particle;
  }

  /**
   * Animates a confetti particle with random trajectory, rotation, and fade-out effect.
   * @param particle - The HTML element representing the particle to animate
   */
  private animateParticle(particle: HTMLElement) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * (this.particleMaxVelocity - this.particleMinVelocity) + this.particleMinVelocity;
    const tl = gsap.timeline({ onComplete: () => this.renderer.removeChild(this.containerRef.nativeElement, particle) });

    tl.to(particle, {
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity,
      rotation: Math.random() * (this.particleMaxRotation - this.particleMinRotation) + this.particleMinRotation,
      duration: Math.random() * (this.particleMaxDuration - this.particleMinDuration) + this.particleMinDuration,
      ease: "power3.out"
    });
    tl.to(particle, {
      y: `+=129.2874668048025`,
      opacity: 0,
      duration: Math.random() * (this.particleFadeDurationMax - this.particleFadeDuration) + this.particleFadeDuration,
      ease: "power1.in"
    }, "-=0.4");
  }
}
  