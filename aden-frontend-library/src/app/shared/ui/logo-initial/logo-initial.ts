import { Component, Input } from '@angular/core';
import { Typografie } from "../../text/typografie/typografie";

@Component({
  selector: 'app-logo-initial',
  imports: [Typografie],
  templateUrl: './logo-initial.html',
  styleUrl: './logo-initial.scss',
})
export class LogoInitial {
  @Input() initial: string = 'AE';
}
