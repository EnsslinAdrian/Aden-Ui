import { Component } from '@angular/core';
import { ConfettiExplosionEffect } from "./components/confetti-explosion-effect/confetti-explosion-effect";
import { GsapBurstConfetti } from "./components/gsap-burst-confetti/gsap-burst-confetti";

@Component({
  selector: 'app-confetti',
  imports: [ConfettiExplosionEffect, GsapBurstConfetti],
  templateUrl: './confetti.html',
  styleUrl: './confetti.scss',
})
export class Confetti {

}
