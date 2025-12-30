import { Component } from '@angular/core';
import { InteractiveTypography } from "./components/interactive-typography/interactive-typography";

@Component({
  selector: 'app-text-component',
  imports: [InteractiveTypography],
  templateUrl: './text-component.html',
  styleUrl: './text-component.scss',
})
export class TextComponent {

}
