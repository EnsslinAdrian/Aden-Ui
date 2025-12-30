import { Component } from '@angular/core';
  import { NeonTabs } from "./components/neon-tabs/neon-tabs";
import { TabNavigation } from "./components/tab-navigation/tab-navigation";

@Component({
  selector: 'app-tap',
  imports: [NeonTabs, TabNavigation],
  templateUrl: './tap.html',
  styleUrl: './tap.scss',
})
export class Tap {

}
