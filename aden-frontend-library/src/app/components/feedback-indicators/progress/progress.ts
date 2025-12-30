import { Component } from '@angular/core';
import { NeonProgressBar } from "./components/neon-progress-bar/neon-progress-bar";


@Component({
  selector: 'app-progress',
  imports: [NeonProgressBar],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class Progress {

}
