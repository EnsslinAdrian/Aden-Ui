import { Component } from '@angular/core';
import { NeonRailScrollbar } from "./components/neon-rail-scrollbar/neon-rail-scrollbar";
import { NeonScrollbar } from "./components/neon-scrollbar/neon-scrollbar";

@Component({
  selector: 'app-scrollbar',
  imports: [NeonRailScrollbar, NeonScrollbar],
  templateUrl: './scrollbar.html',
  styleUrl: './scrollbar.scss',
})
export class Scrollbar {

}
