import { Component } from '@angular/core';
import { NeonSnackbar } from "./components/neon-snackbar/neon-snackbar";

@Component({
  selector: 'app-snackbar',
  imports: [NeonSnackbar],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
})
export class Snackbar {

}
