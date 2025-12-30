import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { InteractiveDemo } from "./interactive-demo/interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Typografie } from "../../../shared/text/typografie/typografie";


@Component({
  selector: 'app-auto-scroll',
  imports: [Notice, HeadlineGuides, InteractiveDemo, CodeBlockGuide, Typografie],
  templateUrl: './auto-scroll.html',
  styleUrl: './auto-scroll.scss',
})
export class AutoScroll {

  appConfigCode = `import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // The feature flag for improved scrolling:
      withInMemoryScrolling({
        // 1. Always scroll to the top on navigation (except for "Back" button)
        scrollPositionRestoration: 'enabled',

        // 2. Allows links with hash (e.g., /contact#form)
        anchorScrolling: 'enabled',
      })
    )
  ]
};`;

}
