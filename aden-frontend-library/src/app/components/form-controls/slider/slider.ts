import { Component } from '@angular/core';
import { ContentCarousel } from "./components/content-carousel/content-carousel";
import { MultiItemSlider } from "./components/multi-item-slider/multi-item-slider";

@Component({
  selector: 'app-slider',
  imports: [ContentCarousel, MultiItemSlider],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider {

}
