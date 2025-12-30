import { Component } from '@angular/core';
import { GsapReactiveHoverButton } from "./components/gsap-reactive-hover-button/gsap-reactive-hover-button";
import { NeonGlowHoverButton } from "./components/neon-glow-hover-button/neon-glow-hover-button";

@Component({
  selector: 'app-button',
  imports: [GsapReactiveHoverButton, NeonGlowHoverButton],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

}
