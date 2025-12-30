import { Component } from '@angular/core';
import { NeonDropdownMenu } from "./components/neon-dropdown-menu/neon-dropdown-menu";

@Component({
  selector: 'app-menu',
  imports: [NeonDropdownMenu],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

}
