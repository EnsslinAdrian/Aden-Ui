import { Component, ElementRef, inject, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { gsap } from 'gsap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gsap-reactive-hover-button',
  imports: [UiPlayground],
  templateUrl: './gsap-reactive-hover-button.html',
  styleUrl: './gsap-reactive-hover-button.scss',
})
export class GsapReactiveHoverButton extends BaseUi {
override meta: ComponentMeta = {
    title: 'GSAP Reactive Hover Button',
    description: 'A highly interactive hover button powered by GSAP, featuring a fluid, radius-based flair effect that dynamically follows mouse movement. Includes smooth scale transitions, motion tracking, and customizable animation parameters for premium UI interactions.',
    slug: 'gsap-reactive-hover-button',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'button'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts', 'md'];
  }

  private platformId = inject(PLATFORM_ID);

  @ViewChildren('animatedBtn') buttons!: QueryList<ElementRef>;

  private readonly animConfig = {
    scale: {
      initial: 0,    // Initial size (invisible)
      hover: 1.0     // Target size on hover (1.0 = 100% coverage, previously was 0.5)
    },
    duration: {
      enter: 1.0,    // Duration of fade-in
      leave: 0.3,    // Duration of fade-out
      move: 0.4      // Speed of circle following mouse (smaller = more direct)
    },
    ease: {
      enter: "power2.out",
      leave: "power2.out",
      move: "power2"
    }
  };

  /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   * Initializes button animations by setting up GSAP animations for each button element.
   * For each button, it finds the flair element, sets its initial scale, and configures the button interactions.
   *
   * @returns {void}
   */
  ngAfterViewInit(): void {
   if (!isPlatformBrowser(this.platformId)){return;}

    this.buttons.forEach(buttonRef => {
      const flair = buttonRef.nativeElement.querySelector('.button__flair');
      gsap.set(flair, { scale: this.animConfig.scale.initial });
      this.setupButton(buttonRef.nativeElement);
    });
  }

  /**
   * Initializes button animation with flair element tracking mouse movement.
   * @param buttonElement - The button DOM element to set up
   */
  private setupButton(buttonElement: HTMLElement): void {
    const el = gsap.utils.selector(buttonElement);
    const flair = el(".button__flair")[0] as HTMLElement;

    if (!flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent") as (value: number | string) => void;
    const ySet = gsap.quickSetter(flair, "yPercent") as (value: number | string) => void;

    const getXY = this.createGetXYFunction(buttonElement);

    this.setupMouseEnter(buttonElement, flair, xSet, ySet, getXY);
    this.setupMouseLeave(buttonElement, flair, getXY);
    this.setupMouseMove(buttonElement, flair, getXY);
  }

  /**
   * Creates a function that converts mouse coordinates to normalized percentages (0-100) relative to the button element.
   * @param buttonElement - The HTML element to calculate relative coordinates from
   * @returns A function that takes a MouseEvent and returns normalized x/y coordinates as percentages
   */
  private createGetXYFunction(buttonElement: HTMLElement) {
    return (e: MouseEvent) => {
      const { left, top, width, height } = buttonElement.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top)
      };
    };
  }

  /**
   * Sets up mouse enter event handler with GSAP animation for button flair effect.
   * @param buttonElement - The button element to attach the listener to
   * @param flair - The flair element to animate
   * @param xSet - Setter function for x coordinate
   * @param ySet - Setter function for y coordinate
   * @param getXY - Function to extract mouse coordinates from event
   */
  private setupMouseEnter(
    buttonElement: HTMLElement,
    flair: HTMLElement,
    xSet: (value: number | string) => void,
    ySet: (value: number | string) => void,
    getXY: (e: MouseEvent) => { x: number; y: number }
  ): void {
    buttonElement.addEventListener("mouseenter", (e: MouseEvent) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);

      gsap.to(flair, {
        scale: this.animConfig.scale.hover,
        duration: this.animConfig.duration.enter,
        ease: this.animConfig.ease.enter
      });
    });
  }

  /**
   * Sets up mouse leave event handler for button animation.
   * @param buttonElement - The button HTML element
   * @param flair - The flair effect element
   * @param getXY - Function to calculate x/y coordinates from mouse event
   */
  private setupMouseLeave(
    buttonElement: HTMLElement,
    flair: HTMLElement,
    getXY: (e: MouseEvent) => { x: number; y: number }
  ): void {
    buttonElement.addEventListener("mouseleave", (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);

      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        scale: this.animConfig.scale.initial,
        duration: this.animConfig.duration.leave,
        ease: this.animConfig.ease.leave
      });
    });
  }

  /**
   * Sets up mousemove event listener to animate flair element based on mouse position.
   * @param buttonElement - The button element to attach the listener to
   * @param flair - The flair element to animate
   * @param getXY - Function to calculate relative x/y coordinates from mouse event
   */
  private setupMouseMove(
    buttonElement: HTMLElement,
    flair: HTMLElement,
    getXY: (e: MouseEvent) => { x: number; y: number }
  ): void {
    buttonElement.addEventListener("mousemove", (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: this.animConfig.duration.move,
        ease: this.animConfig.ease.move
      });
    });
  }
}
