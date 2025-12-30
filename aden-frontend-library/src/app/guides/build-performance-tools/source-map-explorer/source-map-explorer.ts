import { Component, computed, signal } from '@angular/core';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { BundleVisualizer } from "./bundle-visualizer/bundle-visualizer";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";

@Component({
  selector: 'app-source-map-explorer',
  imports: [HeadlineGuides, BundleVisualizer, CodeBlockGuide, Notice],
  templateUrl: './source-map-explorer.html',
  styleUrl: './source-map-explorer.scss',
})
export class SourceMapExplorer {

  installCode = `npm install --save-dev source-map-explorer`;

  configCode = `// angular.json
"configurations": {
  "production": {
    // Important: Without source maps, the tool only sees minified code
    "sourceMap": true,
    "namedChunks": true,
    // ... other settings
  }
}`;

  // The professional way via script
  packageJsonCode = `{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    // One command for everything: Build & Analyze
    "analyze": "ng build --source-map && npx source-map-explorer dist/my-app/browser/main-*.js"
  }
}`;

}
