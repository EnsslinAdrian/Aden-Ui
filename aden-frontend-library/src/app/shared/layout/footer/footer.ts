import { Component } from '@angular/core';
import { Typografie } from "../../text/typografie/typografie";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [Typografie, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();
}
