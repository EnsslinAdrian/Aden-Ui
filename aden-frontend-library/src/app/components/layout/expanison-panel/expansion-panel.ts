import { Component } from '@angular/core';
import { NeonExpansionPanel } from "./components/neon-expansion-panel/neon-expansion-panel";
import { DynamicExpansionPanel } from "./components/dynamic-expansion-panel/dynamic-expansion-panel";

@Component({
  selector: 'app-expansion-panel',
  imports: [NeonExpansionPanel, DynamicExpansionPanel],
  templateUrl: './expansion-panel.html',
  styleUrl: './expansion-panel.scss',
})
export class ExpansionPanel {

}
