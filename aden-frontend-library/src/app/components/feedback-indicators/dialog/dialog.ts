import { Component } from '@angular/core';
import { NeonBlurDialog } from "./components/neon-blur-dialog/neon-blur-dialog";

@Component({
  selector: 'app-dialog',
  imports: [NeonBlurDialog],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {

}
