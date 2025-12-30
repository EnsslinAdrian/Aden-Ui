import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { SsrInteractiveDemo } from "./ssr-interactive-demo/ssr-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-ssr',
  imports: [Notice, HeadlineGuides, SsrInteractiveDemo, CodeBlockGuide],
  templateUrl: './ssr.html',
  styleUrl: './ssr.scss',
})
export class Ssr {

  // 1. Installation
  setupCommandCode = `ng add @angular/ssr`;

  // 2. The new files (Explanation)
  fileStructureCode = `// server.ts
// An Express server (Node.js) that handles requests.
const app = express();
// ...renders Angular and sends back HTML.

// main.server.ts
// The entry point for the app on the server (instead of main.ts).
export default bootstrap; // Starts the app without the browser DOM`;

  // 3. The "Safe Code" approach (isPlatformBrowser)
  safeDomCode = `import { Component, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <--- IMPORTANT

export class AnimationComponent implements AfterViewInit {
  // 1. Inject platform ID
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    // 2. CHECK: Are we in the browser?
    // The server does not know 'window', 'document', 'gsap', or 'canvas'.
    // If we don't check, the server will crash.
    if (!isPlatformBrowser(this.platformId)) return;

    // --- SAFE ZONE ---
    // Here we can do everything:
    gsap.to('.box', { x: 100 });
    this.canvas.getContext('2d');
    console.log(window.innerWidth);
  }
}`;

  // 4. Routing & Prerendering
  serverRoutesCode = `// app.routes.server.ts (New in Angular 19)
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // DYNAMIC (SSR):
  // Routes with parameters (:username, :token) must be rendered live.
  {
    path: 'profile/:username',
    renderMode: RenderMode.Server
  },

  // STATIC (SSG):
  // Everything else is built once during the build process (extremely fast).
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];`;

  // 5. Testing methods
  testingCode = `# Method 1: Terminal Check (Live)
ng serve
# Reload the page (F5). If red errors appear in the VS Code terminal
# (ReferenceError: window is not defined), it is not safe.

# Method 2: No-JS Check (The ultimate test)
# Chrome DevTools -> Ctrl+Shift+P -> "Disable JavaScript"
# Reload the page. Is the content visible? ✅

# Method 3: Build Check (Strict)
npm run build
# The build is stricter than 'ng serve'. It immediately finds routing issues.`;

}
