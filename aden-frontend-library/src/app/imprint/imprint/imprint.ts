import { Component } from '@angular/core';
import { Typografie } from "../../shared/text/typografie/typografie";

@Component({
  selector: 'app-imprint',
  imports: [Typografie],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class Imprint {
  currentYear = new Date().getFullYear();
}
