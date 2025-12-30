import { Component } from '@angular/core';
import { NeonRangeSlider } from "./components/neon-range-slider/neon-range-slider";

@Component({
  selector: 'app-range',
  imports: [NeonRangeSlider],
  templateUrl: './range.html',
  styleUrl: './range.scss',
})
export class Range {

}
