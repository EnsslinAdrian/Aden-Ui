import { Component } from '@angular/core';
import { BentoGridSystem } from "./components/bento-grid-system/bento-grid-system";
import { CustomAreaGrid } from "./components/custom-area-grid/custom-area-grid";

@Component({
  selector: 'app-grid',
  imports: [BentoGridSystem, CustomAreaGrid],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class Grid {

}
