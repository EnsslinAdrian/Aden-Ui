import { Component } from '@angular/core';
import { NeonCheckbox } from "./components/neon-checkbox/neon-checkbox";

@Component({
  selector: 'app-checkbox',
  imports: [NeonCheckbox],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {

}
