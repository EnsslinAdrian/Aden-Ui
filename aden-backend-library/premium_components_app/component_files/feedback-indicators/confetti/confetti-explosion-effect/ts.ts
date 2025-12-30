
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'example-component',
  imports: [],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  @ViewChild('confettiCanvas') confettiCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private confettiParticles: any[] = [];
  private animationId: any;

  /**
   * Configuration settings for the confetti animation effect.
   *
   * @property {number} particleCount - The total number of confetti particles to generate (300)
   * @property {number} explosionDuration - Duration of the initial explosion phase in seconds (3s)
   * @property {number} gravity - Gravitational force applied to particles, affects downward acceleration (0.15)
   * @property {number} minSize - Minimum size of confetti particles in pixels (4px)
   * @property {number} maxSize - Maximum size of confetti particles in pixels (9px)
   * @property {number} minVelocity - Minimum initial velocity of particles (5)
   * @property {number} maxVelocity - Maximum initial velocity of particles (15)
   * @property {number} opacity - Initial opacity of particles, range 0-1 (1 = fully opaque)
   * @property {number} rotationSpeed - Speed at which particles rotate during animation (10)
   * @property {number} airResistance - Resistance factor that slows particles over time, 0-1 (0.95 = 5% slowdown)
   * @property {number} windForce - Horizontal force simulating wind effect (0.05)
   * @property {number} oscillationAmplitude - Maximum horizontal displacement during oscillation (1)
   * @property {number} oscillationSpeed - Speed of the horizontal oscillation movement (0.05)
   * @property {number} particleLife - Lifespan of each particle in frames before fading out (300)
   * @property {number} fadeStep - Rate at which particles fade out per frame (0.5)
   * @property {number} originX - Horizontal origin point of confetti explosion, 0-1 (0.5 = center)
   * @property {number} originY - Vertical origin point of confetti explosion, 0-1 (0.5 = center)
   */
  private confettiSettings = {
    particleCount: 300,
    explosionDuration: 3,
    gravity: 0.15,
    minSize: 4,
    maxSize: 9,
    minVelocity: 5,
    maxVelocity: 15,
    opacity: 1,
    rotationSpeed: 10,
    airResistance: 0.95,
    windForce: 0.05,
    oscillationAmplitude: 1,
    oscillationSpeed: 0.05,
    particleLife: 300,
    fadeStep: 0.5,
    originX: 0.5,
    originY: 0.5
  };

  /**
   * Initializes the canvas context and sets up resize observer after view initialization.
   */
  ngAfterViewInit() {
    const canvas = this.confettiCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.resizeCanvas();

    const resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    resizeObserver.observe(canvas.parentElement!);
  }

  /**
   * Resizes the canvas to match its parent element's dimensions.
   */
  resizeCanvas() {
    if (!this.confettiCanvas) return;
    const canvas = this.confettiCanvas.nativeElement;
    const parent = canvas.parentElement;
    if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
    }
  }

  /**
   * Initializes and starts the confetti animation by creating particles with random properties
   * and beginning the animation loop.
   */
  startConfetti() {
    const duration = this.confettiSettings.explosionDuration * 1000;
    const end = Date.now() + duration;
    this.confettiParticles = [];
    const canvas = this.confettiCanvas.nativeElement;

    for (let i = 0; i < this.confettiSettings.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (this.confettiSettings.maxVelocity - this.confettiSettings.minVelocity) + this.confettiSettings.minVelocity;
      const shape = Math.random() > 0.7 ? 'circle' : 'rect';
      let aspectRatio = 1;
      if (shape === 'rect') {
        aspectRatio = Math.random() < 0.5 ? (Math.random() * 0.5 + 0.5) : (Math.random() * 0.5 + 1);
      }

      this.confettiParticles.push({
        x: canvas.width * this.confettiSettings.originX,
        y: canvas.height * this.confettiSettings.originY,
        size: Math.random() * (this.confettiSettings.maxSize - this.confettiSettings.minSize) + this.confettiSettings.minSize,
        shape: shape,
        aspectRatio: aspectRatio,
        color: this.randomColor(),
        opacity: this.confettiSettings.opacity,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        gravity: this.confettiSettings.gravity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * this.confettiSettings.rotationSpeed,
        wind: (Math.random() - 0.5) * this.confettiSettings.windForce,
        airResistance: this.confettiSettings.airResistance,
        oscillationPhase: Math.random() * Math.PI * 2,
        life: this.confettiSettings.particleLife,
        initialLife: this.confettiSettings.particleLife
      });
    }

    cancelAnimationFrame(this.animationId);
    this.animateConfetti(end);
  }

  /**
   * Animates confetti particles on the canvas by updating their positions, rotations, and opacity,
   * then removes particles when their life reaches zero.
   * @param endTime - The timestamp when the animation should end
   */
  animateConfetti(endTime: number) {
    const canvas = this.confettiCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.confettiParticles.forEach((p, index) => {
      p.x += p.velocityX + this.confettiSettings.oscillationAmplitude * Math.sin(p.oscillationPhase);
      p.y += p.velocityY;
      p.velocityY += p.gravity;
      p.velocityX *= p.airResistance;
      p.velocityY *= p.airResistance;
      p.velocityX += p.wind;
      p.rotation += p.rotationSpeed;
      p.rotationSpeed *= p.airResistance;
      p.oscillationPhase += this.confettiSettings.oscillationSpeed;
      p.life -= this.confettiSettings.fadeStep;
      p.opacity = (p.life / p.initialLife) * this.confettiSettings.opacity;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, 2 * Math.PI);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size * p.aspectRatio, p.size);
      }
      this.ctx.restore();

      if (p.life <= 0) {
        this.confettiParticles.splice(index, 1);
      }
    });

    if (this.confettiParticles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animateConfetti(endTime));
    }
  }

  /**
   * Returns a random color from a predefined palette.
   * @returns A random RGBA color string.
   */
  randomColor() {
    const colors = [
      'rgba(255, 150, 150, 1)',
      'rgba(150, 255, 150, 1)',
      'rgba(150, 150, 255, 1)',
      'rgba(255, 255, 180, 1)',
      'rgba(255, 180, 255, 1)',
      'rgba(74, 222, 128, 1)' // Aden Neon Green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
  